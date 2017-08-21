import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import BaseViewModel from '../../Models/BaseViewModel'
import UserModel from '../../Models/User'
import ItemModel from '../../Models/Item'
import Items from '../../Models/Items'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes/index'
import fire from '../../Utils/firebase'
import map from '../../Utils/mapObject'
import moment from 'moment'
// import Items from '../../Models/Items'
import Constants from '../../Models/Constants'

export class ConversationStore extends BaseViewModel {
  @observable notifications = []
  onStartUp = async () => {
    this.isLoading = true

    try {
      this.notifications = []
      let notificationsArray = []
      let conversations = await UserModel.simpleApiRequest(
        Constants.NOTIFICATION_LIST
      )
      conversations.length > 0 &&
        conversations.map(item => {
          let _d = new Date(0)
          _d.setUTCSeconds(item.notif_time)
          notificationsArray.push({
            offer: moment(_d).format('DD-MM-YYYY'),
            follower: item.notif_content,
            main_id: item.notif_id
          })
        })
      this.notifications = notificationsArray
      console.log('THIS.NOTIF => ', this.notifications)
      this.isLoading = false
    } catch (error) {
      console.log('GETTING NOTIFICATOIN ERROR => ', error)
      this.isLoading = false
    }
  }

  deleteChat = async notif_id => {
    let options = {
      notif_id
    }
    try {
      let res = await Items.simpleApiRequest(
        Constants.DELETE_NOTIFICATION,
        options
      )
    } catch (error) {
      console.log('DELETE CONVERSATION ERROR => ', error)
    }
  }
}

export default new ConversationStore()
