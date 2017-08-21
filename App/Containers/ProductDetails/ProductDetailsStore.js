import { observable } from 'mobx'
// import { Actions } from 'react-native-router-flux'
import { ItemModel } from '../../Models/Item'
import { Actions } from 'react-native-router-flux'
import UserModel from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import Items, { ItemsModel} from '../../Models/Items'
import { Colors } from '../../Themes/index'
import Snackbar from 'react-native-snackbar'
import Constants from '../../Models/Constants'

export class ProductDetailsStore extends BaseViewModel {
  @observable item = {}
  @observable like = false
  @observable wishlist = false
  @observable isFollowing = false
  @observable otherSellerItemsIsLoading = false
  @observable otherSellerItems = []
  @observable rate = 0
  @observable isOwner = false
  @observable editing = false
  @observable deleting = false
  @observable pagingLoad = false
  @observable relatedItems = []
  @observable makingOffer = false
  @observable offerValue = null
  @observable user = UserModel
  @observable ownerId = ''
  @observable owner_mobile = ''
  @observable slug = ''
  @observable status = ''
  @observable owner_enable_call = 0

  onStatusChanged = async item_status => {
    this.status = item_status
    let _imgs = {}
    this.item.images.slice &&
      this.item.images.slice().map((i, index) => {
        _imgs[`images_image_${index}`] = i.link
        _imgs[`images_name_${index}`] = i.link
        return index === 0 ? 1 : 0
      })
    try {
      let res = await Items.simpleApiRequest(Constants.SAVE_ITEM, {
        ...this.item,
        item_id: this.item.id,
        item_status: item_status.toLowerCase(),
        item_condition: this.item.item_condition.toLowerCase(),
        action_type: 'update',
        category: this.item.category_id,
        ..._imgs
      })
    } catch (error) {
      console.log('ERROR CHANGING ITEM STATUS => ', error)
    }
  }

  edit = () => {
    this.editing = true
  }

  delete = () => {
    this.deleting = true
  }

  cancelEditDelete = () => {
    this.editing = false
    this.deleting = false
  }

  confirmEditDelete = async () => {
    if (this.deleting) {
      let res = await this.item.simpleApiRequest(
        ItemModel.constants.DELETE_ITEM,
        {
          item_id: this.item.id
        }
      )
      console.log('delete item res ======= ', res)
      if (res.message) {
        // alert(res.message)
        Snackbar.show({
          title: res.message,
          length: 3000,
          backgroundColor: Colors.mainColor
        })
      }
      Actions.HomeScreen({ type: 'reset' })
    } else if (this.editing) {
      Actions.AddPost({ edit: true, id: this.item.id })
    }

    this.cancelEditDelete()
  }

  showMakeOffer = () => {
    if (this.isOwner) {
      Actions.OfferList({
        direction: 'vertical',
        itemId: this.item.id
      })
      return
    }
    this.makingOffer = true
  }

  cancelMakeOffer = () => {
    this.makingOffer = false
  }

  onChangeOfferValue = value => {
    this.offerValue = parseFloat(value)
  }

  loadItemData = async id => {
    this.isLoading = true
    this.item = new ItemModel(id)
    try {
      let res = await this.item.getItemDetials()
      this.ownerId = res.owner_id
      if (res.owner_id == UserModel.seller_id) {
        this.isOwner = true
      } else {
        this.isOwner = false
      }
      this.status = res.status
      this.slug = res.slug
      this.owner_mobile = res.owner_mobile
      this.owner_enable_call = res.owner_enable_call
      this.like = this.item.like
      this.wishlist = this.item.wishlist
      this.isFollowing = this.item.follow
      this.isLoading = false
      await this.loadOtherSellerItemss(this.ownerId)
      await this.loadRelatedItemsWithCategory(this.item.category_id)
      return res
    } catch (e) {
      this.isLoading = false
    }
  }

  loadRelatedItemsWithCategory = async (category, loadMore) => {
    let cat = category || this.item.category_id
    try {
      if (loadMore) {
        this.pagingLoad = true
        let _ItemsModel = new ItemsModel()
        let items = await _ItemsModel.loadAllItems({
          page: Items.allItemsPaging.next_page,
          cat,
          item_except: this.item.id
        })
        this.allItems = [...this.allItems, ...items]
        this.totalAllitems = Items.allItemsPaging.total
        this.pagingLoad = false
      } else {
        this.isLoading = true
        let items = await Items.loadAllItems({ category, item_except: this.item.id })
        this.totalAllitems = Items.allItemsPaging.total
        this.isLoading = false
        this.relatedItems = items
      }
    } catch (e) {
      this.isLoading = false
      this.pagingLoad = false
      console.log('loadAllItemsError => ', e)
    }
  }

  likeItemAction = () => {
    this.like = !this.like
    this.like ? (this.item.total_likes += 1) : (this.item.total_likes -= 1)
    // return this.item.likeItemAction(this.like)
  }

  wishItemAction = () => {
    this.wishlist = !this.wishlist
    return this.item.wishItem(this.wishlist)
  }

  followUserAction = async () => {
    this.isFollowing = !this.isFollowing
    console.log(UserModel.api)
    try {
      let res = await UserModel.followUserAction(
        this.item.owner_id,
        this.isFollowing ? 'follow' : 'unfollow'
      )
      return res
    } catch (e) {
      console.log('FOLLOW USER ERROR, -> ', e)
      // alert(e._message)
      Snackbar.show({
        title: e.message || e._message || ' error ',
        length: 3000,
        backgroundColor: Colors.mainColor
      })
    }
  }

  onUserRateChange = rate => {
    this.rateAnotherUserAction(rate)
  }

  rateAnotherUserAction = rate => {
    UserModel.rateUser(this.item.owner_id, rate)
      .then(res => {
        console.log(res)
        this.rate = rate
      })
      .catch(e => {
        Snackbar.show({
          title: 'You have already rated this user',
          length: 3000,
          backgroundColor: Colors.mainColor
        })
      })
  }

  loadOtherSellerItemss = () => {
    this.otherSellerItems = []
    this.otherSellerItemsIsLoading = true
    let _ItemsModel = new ItemsModel()
    _ItemsModel.loadOtherSellerItems(this.ownerId, this.item.id)
      .then(res => {
        this.otherSellerItemsIsLoading = false
        this.otherSellerItems = res
      })
      .catch(e => {
        this.otherSellerItemsIsLoading = false
        console.log('RATE USER ERR => ', e)
      })
  }

  makeOffer = async offer => {
    this.isLoading = true
    try {
      let options = {
        item_id: this.item.id,
        price: offer
      }
      let res = await Items.simpleApiRequest(Constants.MAKE_OFFER, options)
      this.isLoading = false
      this.makingOffer = false
      console.log('resssss', res)
      if (res && res.message) {
        Snackbar.show({
          title: res.message,
          length: 3000,
          backgroundColor: Colors.mainColor
        })
      }
      return res
    } catch (e) {
      Snackbar.show({
        title: e._message,
        length: 3000,
        backgroundColor: Colors.mainColor
      })
      this.isLoading = false
      this.makingOffer = false
      console.log('MAKE OFFER ERROR => ', e)
    }
  }

  blockUser = async user_id => {
    try {
      let options = {
        user_id,
        action: 'block'
      }
      let res = await this.item.simpleApiRequest(Constants.BLOCK_USER, options)
      res.message &&
        Snackbar.show({
          title: res.message,
          length: 3000,
          backgroundColor: Colors.mainColor
        })
      return res
    } catch (e) {
      console.log('BLOCKING USER ERROR => ', e)
      Snackbar.show({
        title: e.message || e._message,
        length: 3000,
        backgroundColor: Colors.mainColor
      })
    } finally {
    }
  }
}

export default new ProductDetailsStore()
