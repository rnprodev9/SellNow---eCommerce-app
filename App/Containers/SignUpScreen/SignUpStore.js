import BaseViewModel from '../../Models/BaseViewModel'
import { observable, action } from 'mobx'
import GeoCoder from 'react-native-geocoder'
import UserModel from '../../Models/User'
import { Actions } from 'react-native-router-flux'
import { Alert, AsyncStorage } from 'react-native'
import { stringify } from 'querystringify'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes'

class SignUpStore extends BaseViewModel {
  @observable success = '';
  @observable first_name = '';
  @observable last_name = '';
  @observable mobile = '';
  @observable email = '';
  @observable password = '';
  @observable address = '';
  @observable
  locationObj = {
    latitude: '',
    longitude: '',
    latitudeDelta: 0,
    longitudeDelta: 0
  };
  @observable customErrors = '';
  @observable emailMessage = '';
  @observable reqResult = {};

  clearData () {
    this.first_name = ''
    this.last_name = ''
    this.mobile = ''
    this.email = ''
    this.password = ''
    this.address = ''
    this.locationObj = {
      latitude: '',
      longitude: ''
    }
    this.customErrors = ''
    this.emailMessage = ''
  }

  clearEmailError = () => {
    if (this.emailMessage) {
      this.errors = false
    } else {
      this.errors = true
      this.emailMessage = null
    }
  };

  onFirstNameChange = first_name => (this.first_name = first_name);
  onLastNameChange = last_name => (this.last_name = last_name);
  onmMobileChange = mobile => (this.mobile = mobile);
  onAddressChange = address => (this.address = address);

  onLocationObjChange = async (locationObj, editProfileFunc, addressFunc) => {
    this.locationObj = locationObj
    this.getLocationInfo()
    console.log(addressFunc)
    if (editProfileFunc) editProfileFunc(this.locationObj)
    if (addressFunc) {
      await this.getLocationInfo()
      addressFunc(this.address)
    }
  };

  onEmailChange = async email => {
    this.email = email
    let res = await this.checkEmail()
    console.log('EMAIL CHECK RES => ', res)
    if (res.status === 'success') {
      this.errors._message = null
    } else if (this.errors) {
      this.errors._message = res.message
      this.emailMessage = null
    }
  };
  onPasswordChange = password => {
    this.password = password
    if (this.password.length < 6 && this.password.length > 0) {
      this.customErrors = 'make sure password minimum 6 characters'
    } else {
      this.customErrors = ''
    }
  };

  getLocationInfo = async () => {
    let latLng = {
      lat: this.locationObj.latitude,
      lng: this.locationObj.longitude
    }
    const curLocation = await GeoCoder.geocodePosition(latLng)
    try {
      if (curLocation.length === 1) {
        this.address = curLocation[0].formattedAddress
      } else {
        for (i = 0; i < curLocation.length; i++) {
          if (
            curLocation[i].formattedAddress &&
            curLocation[i].formattedAddress !== null
          ) {
            this.address = curLocation[i].formattedAddress
            break
          }
        }
      }
    } catch (e) {
      console.log('geocoder error message', e)
      throw e
    }
  };

  signUp = async () => {
    this.isLoading = true
    try {
      let mailCheckedRes = await this.checkEmail(UserModel.email)
      this.isLoading = false
      let { code, message, status } = mailCheckedRes
      if (
        status === 'error' &&
        code === 204 &&
        message == 'E-Mail already taken by other user'
      ) {
        // alert('E-mail already taken, please try to login')
        Snackbar.show({
          title: 'E-mail already taken, please try to login',
          length: 3000,
          backgroundColor: Colors.mainColor
        })
        return
      }
    } catch (e) {
      console.log('mailCheckedRes ERROR => ', e)
    }

    try {
      let res = await UserModel.register({
        ...this.locationObj,
        first_name: this.first_name,
        last_name: this.last_name,
        mobile: this.mobile,
        email: this.email,
        password: this.password,
        address: this.address
      })
      this.isLoading = false
      this.success = true
      console.log('signup result', UserModel.reqResult)
      this.reqResult = UserModel.reqResult
      // alert(this.reqResult.message)
      Snackbar.show({
        title: 'Sucess' + this.reqResult.message,
        length: 3000,
        action: {
          title: 'Ok',
          color: 'green',
          onPress: () => {
            Snackbar.show({
              title:
                'Your Activation Code is :  ' +
                '  ' +
                this.reqResult.mobile_code,
              length: 3000,
              backgroundColor: Colors.mainColor
            })
          }
        },
        backgroundColor: Colors.mainColor
      })
      AsyncStorage.setItem('unVerMob', this.mobile)
      Actions.enableverification({
        type: 'replace',
        mobile_code: this.reqResult.mobile_code
      })
      return res
    } catch (e) {
      this.isLoading = false
      this.errors = e
      if (e.errors && e.errors.email) {
        this.errors._message = e.errors.email
        this.emailMessage = null
      }
      console.log('THIS.ERRORS', this.errors)
    }
  };

  signUpSocial = async () => {
    this.isLoading = true
    try {
      let mailCheckedRes = await this.checkEmail(UserModel.email)
      this.isLoading = false
      let { code, message, status } = mailCheckedRes
      if (
        status === 'error' &&
        code === 204 &&
        message == 'E-Mail already taken by other user'
      ) {
        // alert('E-mail already taken, please try to login')
        Snackbar.show({
          title: 'E-mail already taken, please try to login',
          length: 3000,
          backgroundColor: Colors.mainColor
        })
        return
      }
    } catch (e) {
      console.log('mailCheckedRes ERROR => ', e)
    }
    try {
      let { first_name, last_name, email, password } = UserModel
      let res = await UserModel.register(
        {
          ...this.locationObj,
          first_name: first_name,
          last_name: last_name,
          mobile: this.mobile,
          email: email,
          password: password,
          address: this.address
        },
        UserModel.provider == 'google' ? 'google' : 'facebook'
      )
      this.isLoading = false
      this.success = true
      this.reqResult = UserModel.reqResult
      AsyncStorage.setItem('unVerMob', this.mobile)
      Actions.enableverification({
        type: 'reset',
        mobile_code: this.reqResult.mobile_code
      })
      return res
    } catch (e) {
      Snackbar.show({
        title: JSON.stringify(e.message),
        length: 3000,
        backgroundColor: Colors.mainColor
      })
      this.isLoading = false
      this.errors = e

      console.log('THIS.ERRORS', this.errors)
    }
  };

  checkEmail = async () => {
    this.isLoading = true
    try {
      let res = await UserModel.checkEmail(this.email)
      this.isLoading = false
      this.emailMessage = UserModel.isEmailAvailable
      return res
    } catch (e) {
      this.isLoading = false
      this.errors = e
    }
  };

  checkPassword = () => {
    this.isLoading = true
    UserModel.checkPassword(this.password)
      .then(res => {
        this.isLoading = false
      })
      .catch(e => {
        this.isLoading = false
        this.errors = e
      })
  };
}
export default new SignUpStore()
