import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import UserModel from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import { Alert, AsyncStorage } from 'react-native'
import { stringify } from 'querystringify'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes'

export class MainLoginScreenStore extends BaseViewModel {
  @observable userIdentity = '';
  @observable password = '';
  @observable token = '';
  @observable username = '';
  @observable email = '';
  @observable picture = '';
  @observable lastLogin = '';

  login = () => {
    this.isLoading = true
    this.errors = {}

    UserModel.login(this.userIdentity, this.password)
      .then(res => {
        Actions.ExploreScreen({ type: 'reset' })
      })
      .catch(e => {
        this.errors = e
        console.log(e)
      })
  }

  async loginWithSocial (provider, authData, email, fullname) {
    // Login the user with the social provider
    this.isLoading = true
    let user = {
      provider: provider,
      password: authData.access_token,
      email: email
    }
    if (fullname) {
      let names = fullname.split(' ')
      if (names[0]) user.first_name = names[0]
      if (names[1]) user.last_name = names[1]
    }
    try {
      let checkEmailRes = await UserModel.checkEmail(user.email)
      let { code, message } = checkEmailRes
      if (code == 200 && message == 'E-Mail is available') {
        UserModel.email = user.email
        UserModel.password = user.password
        UserModel.first_name = user.first_name
        UserModel.last_name = user.last_name
        UserModel.provider = provider
        Actions.SignUpScreen({ social: true })
        AsyncStorage.setItem('unVerEmail', user.email)
        AsyncStorage.setItem('unVerPass', user.password)
        return
      }
      let res = await UserModel.login(user.email, user.password)
      UserModel.setTokens({ userToken: res.user })
      await UserModel.setUserData(res, true)
      this.isLoading = false
      setTimeout(() => Actions.HomeScreen({ type: 'reset' }), 20)
    } catch (e) {
      if (e._message && e._message !== 'Please fix wrong Data') {
        Snackbar.show({
          title: e.message || e._message || ' error ',
          length: 3000,
          backgroundColor: Colors.mainColor
        })
      }
      console.log(e)
      if (e._message && e._message === 'You need to activate your mobile number') {
        Actions.enableverification({ type: 'reset' })
        return
      }
      if (e.message && e.message === 'Please fix wrong Data') {
        UserModel.email = user.email
        UserModel.password = user.password
        UserModel.first_name = user.first_name
        UserModel.last_name = user.last_name
        UserModel.provider = provider
        Actions.SignUpScreen({ social: true })
      }
    }
  }
}

export default new MainLoginScreenStore()
