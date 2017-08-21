// import { Actions } from 'react-native-router-flux'
import { observable } from 'mobx'
import UserModel, { UserModel as _User } from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import ItemsModel from '../../Models/Items'
import { ItemModel } from '../../Models/Item'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes/index'

export class SellerProfileStore extends BaseViewModel {
  @observable user = UserModel
  @observable items = []
  @observable soldItems = []
  @observable wishList = []
  @observable itemsIsLoading = false
  @observable wishListIsLoading = false
  @observable numOfFollowings = 0
  @observable numOfBlockers = 0
  @observable wishCount = 0
  @observable soldCount = 0
  @observable allCount = 0
  @observable currentScreen = 'all'
  @observable currentUser = UserModel
  @observable isFollowing = false

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

  // loadUserItems = async (userId) => {
  //   let items
  //   items = await ItemsModel.loadOtherSellerItems(userId)
  //   this.items = items
  // }

  loadUserProfile = async userId => {
    this.isLoading = true
    this.itemsIsLoading = true
    try {
      // this.user = new _User()
      let userData = await UserModel.getSellerProfile(userId)
      this.user = new _User(userData)
      // await this.user.getUserProfile()
      this.isFollowing = this.user.following != '0' ? true : false
      let items = []
      let soldItems = []
      items = await ItemsModel.loadOtherSellerItems(userId)
      // wishList = await ItemsModel.loadAllWishedItems()
      soldItems = await ItemsModel.loadAllSoldItems(userId)

      this.items = items
      this.soldItems = soldItems
      this.soldCount = (soldItems && soldItems.length) || 0
      this.allCount = items.length || 0

      this.numOfFollowings = UserModel.followingList.length
      this.numOfBlockers = UserModel.blockingList.length

      this.isLoading = false
      this.itemsIsLoading = false

      return this.items
    } catch (e) {
      this.user.isDisconnected(e)
      this.isLoading = false
      this.itemsIsLoading = false
      this.wishListIsLoading = false
      console.log('ERROR LOADING USER PROFILE => ', e)
    }
  }

  followUserAction = async () => {
    this.isFollowing = !this.isFollowing
    console.log(UserModel.api)
    try {
      let res = await UserModel.followUserAction(
        this.user.seller_id,
        this.isFollowing ? 'follow' : 'unfollow'
      )
      return res
    } catch (e) {
      console.log('FOLLOW USER ERROR, -> ', e)
      Snackbar.show({
        title: e.message || e._message || ' error ',
        length: 3000,
        backgroundColor: Colors.mainColor
      })
    }
  }
}

export default new SellerProfileStore()
