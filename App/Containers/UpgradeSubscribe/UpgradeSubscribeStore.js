// import { Actions } from 'react-native-router-flux'
import { observable } from 'mobx'
import UserModel from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import ItemsModel from '../../Models/Items'
import { ItemModel } from '../../Models/Item'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes/index'
import Constants from '../../Models/Constants'
import { Actions } from 'react-native-router-flux'
var base64 = require('base-64')

export class UpgradeSubscribeStore extends BaseViewModel {
  @observable user = UserModel
  @observable pageLoading = false
  @observable types = []
  @observable basicPrice = ''
  @observable premPrice = ''
  @observable imageBase64 = null
  onStartUp = async () => {
    this.isLoading = true
    let req = new ItemModel(-1)
    let res = await req.simpleApiRequest(Constants.GET_USER_TYPE, {type_id: 2}, true)

    let res2 = await req.simpleApiRequest(Constants.GET_USER_TYPE, {type_id: 2}, true)
    this.isLoading = false
    console.log('BASIC PACK', res)
    this.basicPrice = res.data.price
    this.premPrice = res2.data.price
    // try {
    // } catch (error) {
    //   console.log('error = >', error)
    // } finally {
    //   this.isLoading = true
    // }
  }

  upgradeReq = async (type_id) => {
    try {
      this.pageLoading = true
      let item = new ItemModel(-1)
      let res = await item.simpleApiRequest(Constants.GET_USER_TYPE, {
        type_id
      })
      this.pageLoading = false
      Actions.BasicPackage({...res.data})
      // return res
    } catch (e) {
      console.log('UPGRRADE ERROR => ', e)
      this.pageLoading = false
      Snackbar.show({
        title: e.message || e._message || e,
        length: 3000,
        backgroundColor: Colors.mainColor
      })
    } finally {
      // this.isLoading = false
    }
  }

  upgradePay = async (type_id) => {
    let options = {
      user_id: this.user.unique_id,
      upgrade_to: type_id
    }
    if (this.imageBase64) {
      options.image = base64.encode(this.imageBase64.data)
      options.image_name = this.imageBase64.fileName
    }
    try {
      this.isLoading = true
      let item = new ItemModel(-1)
      let res = await item.simpleApiRequest(Constants.UPGRADE_PAY, options)
      Snackbar.show({
        title: res.message || '',
        length: 3000,
        backgroundColor: Colors.mainColor
      })
      Actions.HomeScreen({type: 'reset'})
    } catch (e) {
      console.log('UPGRRADE ERROR => ', e)
      Snackbar.show({
        title: e.message || e._message || e,
        length: 3000,
        backgroundColor: Colors.mainColor
      })
    } finally {
      this.isLoading = false
    }
  }

  // TODO: get blocked list
}

export default new UpgradeSubscribeStore()
