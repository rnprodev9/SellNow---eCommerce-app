import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import BaseViewModel from '../../Models/BaseViewModel'
import UserModel from '../../Models/User'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes/index'
import { ItemModel } from '../../Models/Item'
import Constants from '../../Models/Constants'

export class OffersStore extends BaseViewModel {
  @observable offersList = []
  @observable isLoading = false
  @observable item = {}

  onStartup = async item_id => {
    this.isLoading = true
    this.item_id = item_id
    this.item = new ItemModel(item_id)
    try {
      let options = {
        item_id
      }
      let res = await this.item.simpleApiRequest(Constants.OFFERS_LIST, options)

      this.offersList = res.map(offer => {
        return {
          follower_picture: offer.sender_picture,
          followe_id: offer.sender_id,
          follower: offer.sender_name,
          follower_join_date: offer.sender_join.split('  ')[0],
          offer: offer.offer,
          ...offer
        }
      })
      return this.offersList
    } catch (e) {
      console.log('GETTING OFFERS LIST ERROR => ', e)
    } finally {
      this.isLoading = false
    }
  }
  acceptOffer = async offerId => {
    // wating for the end point to be created
    Snackbar.show({
      title: 'Offer Accepted',
      length: 3000,
      backgroundColor: Colors.mainColor
    })
  }
}

export default new OffersStore()
