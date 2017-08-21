import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import UserModel from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import { AsyncStorage } from 'react-native'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes'
import req from '../../Models/Items'
import Constants from '../../Models/Constants'

export class EnableNotificationStore extends BaseViewModel {

  onStartUp = async () => {
    // let email = await AsyncStorage.getItem('unVerEmail')
    // let pass = await AsyncStorage.getItem('unVerPass')
    // UserModel.email = email
    // UserModel.password = pass
    try {
      // await UserModel.login(email, pass)
      Actions.HomeScreen({ type: 'reset' })
    } catch (e) {
      Actions.mainlogin({ type: 'reset' })
      // alert('You Need to activate Your Email First ')
      // Snackbar.show({
      //   title: 'You Need to activate Your Email First ',
      //   length: 3000,
      //   backgroundColor: Colors.mainColor
      // })
    }
  }

  enableNotifications = async notif_status => {
    console.log('Enable Notification')
    UserModel.notification = true
    let res = await req.simpleApiRequest(Constants.SET_CONFIG, {notif_status: notif_status ? 1 : 0})
  }

  redirctToMainScreen = () => {
    Actions.HomeScreen({ type: 'reset' })
  }
}

export default new EnableNotificationStore()
