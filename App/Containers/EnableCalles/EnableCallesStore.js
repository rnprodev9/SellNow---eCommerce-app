import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import {AsyncStorage} from 'react-native'
import BaseViewModel from '../../Models/BaseViewModel'
import user from '../../Models/User'
import req from '../../Models/Items'
import Constants from '../../Models/Constants'

export class EnableCallesScreenStore extends BaseViewModel {
  onStartup = async () => {
    let password = await AsyncStorage.getItem('unVerPass')
    let email = await AsyncStorage.getItem('unVerEmail')
    user.email = email
    user.password = password
    let res = await user.login(email, password)

    req.setTokens({userToken: res.user})
    return res
  }

  onChange = async call_status => {
    let password = await AsyncStorage.getItem('unVerPass')
    let email = await AsyncStorage.getItem('unVerEmail')
    let res = await req.simpleApiRequest(Constants.SET_CONFIG, {call_status: call_status ? 1 : 0})
  }
}

export default new EnableCallesScreenStore()
