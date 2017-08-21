import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import BaseViewModel from '../../Models/BaseViewModel'
import UserModel from '../../Models/User'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes/index'
import fire from '../../Utils/firebase'
import map from '../../Utils/mapObject'
import moment from 'moment'
// import Items from '../../Models/Items'
import Constants from '../../Models/Constants'
export class ConversationStore extends BaseViewModel {
  @observable chats = []

  onStartUp = async () => {
    this.isLoading = true
    try {
      this.chats = []
      let chatsArray = []
      let conversations = await UserModel.simpleApiRequest(
        Constants.CONVERSATIONS
      )
      conversations.length > 0 &&
        conversations.map(con => {
          chatsArray.push({
            follower_picture: con.user_picture,
            follower_join_date: con.chate_date,
            follower: con.user_name,
            main_id: con.main_id,
            user: {
              name: UserModel.first_name,
              avatar: UserModel.picture,
              id: UserModel.seller_id
            },
            seller: {
              id: con.user_id
            }
          })
        })
      this.chats = chatsArray
      this.isLoading = false
    } catch (error) {
      console.log('GETTING CHAT ERROR => ', error)
      this.isLoading = false
    }
  }

  deleteChat = async chat_id => {
    let options = {
      chat_id
    }
    try {
      let res = await UserModel.simpleApiRequest(Constants.DELETE_CHAT, options)
    } catch (error) {
      console.log('DELETE CONVERSATION ERROR => ', error)
    }
  }
}

export default new ConversationStore()
