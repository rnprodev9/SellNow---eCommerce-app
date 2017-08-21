// import { Actions } from 'react-native-router-flux'
import { observable } from 'mobx'
import UserModel from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import ItemsModel from '../../Models/Items'
import { ItemModel } from '../../Models/Item'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes/index'

export class UserProfileStore extends BaseViewModel {
  @observable user = {}
  @observable items = []
  @observable soldItems = []
  @observable wishList = []
  @observable itemsIsLoading = false
  @observable pagingLoad = false
  @observable wishListIsLoading = false
  @observable numOfFollowings = 0
  @observable numOfBlockers = 0
  @observable wishCount = 0
  @observable soldCount = 0
  @observable allCount = 0
  @observable currentScreen = 'all'

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

  loadUserProfile = async () => {
    this.isLoading = true
    this.itemsIsLoading = true
    this.wishListIsLoading = true
    try {
      console.log('user profile pic => ', UserModel.picture)
      await UserModel.getUserProfile()
      this.user = UserModel
      console.log('user profile pic => ', UserModel.picture)
      console.log('user profile pic => ', this.user.picture)
      let items = []
      let wishList = []
      let soldItems = []

      items = await ItemsModel.loadOtherSellerItems(this.user.seller_id)
      wishList = await ItemsModel.loadAllWishedItems()
      soldItems = await ItemsModel.loadAllSoldItems(this.user.seller_id)

      this.items = items
      this.wishList = wishList
      this.soldItems = soldItems
      this.wishCount = ItemsModel.wishedItemsPaging.total < 0
        ? 0
        : ItemsModel.wishedItemsPaging.total || 0
      this.soldCount = ItemsModel.soldItemsPaging.total < 0
        ? 0
        : ItemsModel.soldItemsPaging.total || 0
      this.allCount = ItemsModel.otherSellerItemsPaging.total < 0
        ? 0
        : ItemsModel.otherSellerItemsPaging.total || 0
      this.numOfFollowings = 0
      this.numOfBlockers = 0

      let followNum = await UserModel.getUserFollowingList()
      let blockNum = await UserModel.getUserBlockingList()

      // console.log('blockNum => ', blockNum.length)
      // console.log('blockNum => ', followNum.length)

      this.numOfFollowings = followNum ? followNum.length : 0
      this.numOfBlockers = blockNum ? blockNum.length : 0


      this.isLoading = false
      this.itemsIsLoading = false
      this.wishListIsLoading = false

      return this.items
    } catch (e) {
      this.user.isDisconnected(e)
      this.isLoading = false
      this.itemsIsLoading = false
      this.wishListIsLoading = false
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
        this.user.seller_id,
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

  loadMoreSoldItems = async () => {
    try {
      this.pagingLoad = true
      let options = {
        page: ItemsModel.soldItemsPaging.next_page
      }
      let items = await ItemsModel.loadAllSoldItems(options)
      this.soldItems = [...this.soldItems, ...items]
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
  loadMoreWishedItems = async () => {
    try {
      this.pagingLoad = true
      let options = {
        page: ItemsModel.wishedItemsPaging.next_page
      }
      let items = await ItemsModel.loadAllWishedItems(options)
      this.wishList = [...this.wishList, ...items]
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

  noBolckedusers = () =>
    Snackbar.show({
      title: 'There is no blocked users',
      length: 3000,
      backgroundColor: Colors.mainColor
    })

  noFollowinguUsers = () =>
    Snackbar.show({
      title: 'You do not follow any user right now',
      length: 3000,
      backgroundColor: Colors.mainColor
    })

  // TODO: get blocked list
}

export default new UserProfileStore()
