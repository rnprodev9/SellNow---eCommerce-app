import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import BaseViewModel from '../../Models/BaseViewModel'
import User, { UserModel } from '../../Models/User'
import { Alert, AsyncStorage } from 'react-native'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes'

class EnableVerificationStore extends BaseViewModel {
  @observable mobileCode = ''

  onMobileCodeChange = mobileCode => (this.mobileCode = mobileCode)

  verifyMobileNumber = () => {
    this.isLoading = true
    if (!User.mobile) {
      AsyncStorage.getItem('unVerMob')
        .then(mob => {
          UserModel.mobile = mob
          return User.verifyMobileNumber(this.mobileCode)
        })
        .then(res => {
          this.isLoading = false
          Actions.enablecalles({ type: 'reset' })
        })
        .catch(e => {
          this.errors = e
          this.isLoading = false
          Snackbar.show({
            title: e.message || e._message || e,
            length: 3000,
            backgroundColor: Colors.mainColor
          })
        })
    } else {
      User.verifyMobileNumber(this.mobileCode)
        .then(res => {
          this.isLoading = false
          Actions.enablecalles({ type: 'reset' })
        })
        .catch(e => {
          console.log('VERF ERROR => ', e)
          this.errors = {
            errors: e
          }
          Snackbar.show({
            title: e.message || e._message || e,
            length: 3000,
            backgroundColor: Colors.mainColor
          })
          this.isLoading = false
        })
    }
  }

  resendCode = () => {
    this.isLoading = true
    if (!User.mobile) {
      AsyncStorage.getItem('unVerMob')
        .then(mob => {
          User.mobile = mob
          return User.resendCode()
        })
        .then(res => {
          console.log('verification result', User.reqResult.mobile_code)
          // Alert.alert('Your Activation Code is :', User.reqResult.mobile_code)
          Snackbar.show({
            title: 'Your Activation Code is : ' + User.reqResult.mobile_code,
            length: 3000,
            backgroundColor: Colors.mainColor
          })
          this.isLoading = false
        })
        .catch(e => {
          this.errors = e
          this.isLoading = false
        })
    } else {
      User.resendCode()
        .then(res => {
          console.log('verification result', User.reqResult.mobile_code)
          // Alert.alert('Your Activation Code is :', User.reqResult.mobile_code)
          Snackbar.show({
            title: 'Your Activation Code is :' + User.reqResult.mobile_code,
            length: 3000,
            backgroundColor: Colors.mainColor
          })
          this.isLoading = false
        })
        .catch(e => {
          console.log(e)
          this.errors = e
          this.isLoading = false
        })
    }
  }
}

export default new EnableVerificationStore()
