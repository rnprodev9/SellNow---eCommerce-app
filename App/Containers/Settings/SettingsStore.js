import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import User from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import { Alert } from 'react-native'
import { stringify } from 'querystringify'
import Constants from '../../Models/Constants'
import req from '../../Models/Items'

export class SettingsStore extends BaseViewModel {
  @observable notif = false;
  @observable calls = false;

  signout = async () => {
    await User.logout()
    Actions.launchScreen()
  };
  editProfile = () => {
    Actions.editProfile()
  };

  onStartUp = async () => {
    this.callsEnabled()
  };

  onCallsChanged = async call_status => {
    try {
      let res = await req.simpleApiRequest(Constants.SET_CONFIG, {call_status: call_status ? 1 : 0})
    } catch (error) {
      console.log(error)
    }
  }

  onNotifChanged = async notif_status => {
    try {
      let res = await req.simpleApiRequest(Constants.SET_CONFIG, {notif_status: notif_status ? 1 : 0})
    } catch (error) {
      console.log(error)
    }
  }

  callsEnabled = async () => {
    try {
      this.isLoading = true
      let res = await req.simpleApiRequest(Constants.GET_CONFIG, {setting_key: 'all'})
      this.notif = res.notif_status === 1 ? true : false
      this.calls = res.call_status === 1 ? true : false
      this.isLoading = false
    } catch (error) {
      console.log('ERROR -> ', error)
    }
  }
  // notifEnabled = async () => await AsyncStorage.getItem("enableNotif");
}

export default new SettingsStore()
