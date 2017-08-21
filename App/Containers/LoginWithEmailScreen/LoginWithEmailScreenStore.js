import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import UserModel from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes'

export class LoginWithEmailScreenStore extends BaseViewModel {
  @observable userIdentity = '';
  @observable password = '';
  @observable token = '';
  @observable username = '';
  @observable email = '';
  @observable picture = '';
  @observable lastLogin = '';

  clearData () {
    this.password = ''
    this.username = ''
    this.email = ''
  }

  @action
  login = async () => {
    this.isLoading = true
    this.errors = {}

    try {
      let res = await UserModel.login(this.userIdentity, this.password)
      setTimeout(
        () => {
          Actions.HomeScreen({ type: 'reset' })
        }, 0
      )
    } catch (e) {
      this.isLoading = false
      if ((e._message && e._message === 'You need to activate your mobile number') ||
        (e.message && e.message === 'You need to activate your mobile number')) {
        // alert(e.message || e._message || ' error ')
        Snackbar.show({
          title: e.message || e._message || ' error ',
          length: 3000,
          backgroundColor: Colors.mainColor
        })
        Actions.enableverification()
        return
      }
      this.errors = e
    }
  }

  onUserIdenityChanged = userIdentity => {
    this.userIdentity = userIdentity
  }
  onPasswordChanged = password => {
    this.password = password
  }
}

export default new LoginWithEmailScreenStore()
