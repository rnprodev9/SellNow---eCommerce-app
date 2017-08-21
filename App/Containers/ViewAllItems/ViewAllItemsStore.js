// import { Actions } from 'react-native-router-flux'
import { observable } from 'mobx'
import UserModel, { UserModel as _User } from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import ItemsModel from '../../Models/Items'
import { ItemModel } from '../../Models/Item'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes/index'

export class ViewAllItemsStore extends BaseViewModel {
  @observable user = UserModel
  @observable items = []
  @observable soldItems = []
  @observable itemsIsLoading = false
  @observable allCount = 0
  @observable currentScreen = 'all'
  @observable currentUser = UserModel

  likeItemAction = (itemIndex, action, currentScreen) => {
    let currentItem = {}
    if (currentScreen === 'all') {
      currentItem = this.items[itemIndex]
    } else if (currentScreen === 'sold') {
      currentItem = this.featuredItems[itemIndex]
    } else {
      currentItem = this.wishList[itemIndex]
    }
    let item = new ItemModel(currentItem.id)
    console.log('item -> ', item)
    item.likeItemAction(action)
    // this.currentScreen === 'explore' ? this.loadAllItems() : this.loadAllFeaturedItems()
  }

  loadUserItems = async userId => {
    this.userId = userId
    this.isLoading = true
    this.itemsIsLoading = true
    try {
      let items = []
      items = await ItemsModel.loadOtherSellerItems(16)
      this.items = items
      console.log('===============================>', this.items.slice())
      this.allCount = items.length || 0

      this.isLoading = false
      this.itemsIsLoading = false

      return this.items
    } catch (e) {
      this.user.isDisconnected(e)
      this.isLoading = false
      this.itemsIsLoading = false
      console.log('ERROR LOADING USER PROFILE => ', e)
    }
  }

  loadMoreItems = async () => {
    try {
      this.pagingLoad = true
      let options = {
        page: ItemsModel.otherSellerItemsPaging.next_page
      }
      let items = await ItemsModel.loadOtherSellerItems(
        this.userId,
        -1,
        options
      )
      this.items = [...this.items, ...items]
      this.pagingLoad = false
    } catch (e) {
      console.log('LOAD MORE ERROR => ', e)
      Snackbar.show({
        title: e.message || e._message || e,
        length: 3000,
        backgroundColor: Colors.mainColor
      })
    } finally {
      this.pagingLoad = false
    }
  }

}

export default new ViewAllItemsStore()
