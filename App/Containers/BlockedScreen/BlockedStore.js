import { observable, action, map } from 'mobx'
import { Actions } from 'react-native-router-flux'
import BaseViewModel from '../../Models/BaseViewModel'
import UserModel from '../../Models/User'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes/index'

export class BlockedStore extends BaseViewModel {
  @observable blockedList = []

  loadBlockedList = async () => {
    this.blockedList = []
    try {
      let blocked = await UserModel.getUserBlockingList()
      this.blockedList = blocked.map(b => ({
        ...b,
        user: b.blocked
      }))
    } catch (e) {
      console.log('BLOCK LIST ERROR => ', e)
    }
  }

  unBlockAction = async id => {
    await UserModel.blockUserAction(id, 'unblock')
  }
}

export default new BlockedStore()
