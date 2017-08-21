import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import UserModel from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import { Alert } from 'react-native'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes'

export class ForgetPasswrodStore extends BaseViewModel {
  @observable email = '';

  onEmailChanged = email => { this.email = email }

  resetPassword = () => {
    UserModel.resetPassword(this.email)
      .then(res => {
        // Alert.alert(
        //   'Password Reset Successful',
        //   'Please Check Your Email for New Password, you can change it later from your profile',
        //   [
        //     { text: 'OK', onPress: () => console.log('OK Pressed') }
        //   ],
        //   { cancelable: false }
        // )
        Snackbar.show({
          title: 'Password Reset Successful , Please Check Your Email for New Password, you can change it later from your profile',
          length: 10000,
          backgroundColor: Colors.mainColor
        })
        Actions.mainlogin({ type: 'reset' })
      })
      .catch(e => {
        this.errors = e
      })
  }

}

export default new ForgetPasswrodStore()
