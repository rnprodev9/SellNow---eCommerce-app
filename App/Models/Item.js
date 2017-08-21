import { AsyncStorage } from 'react-native'
import BaseModel from './BaseModel'
import UserModel from './User.js'
import ItemsModel from './Items'

const types = BaseModel.constants

export class ItemModel extends BaseModel {
  category = ''
  category_id = ''
  created_date = ''
  description = ''
  expiry_end = ''
  expiry_start = ''
  id = ''
  images = ''
  item_condition = ''
  item_featured = ''
  owner = ''
  owner_id = ''
  price = ''
  short_desc = ''
  status = ''
  status_lang = ''
  title = ''
  type = ''
  type_id = ''
  like = 0
  wishlist = 0
  owner_rate = 0
  total_likes = 0
  owner_image = null
  follow = false
  isLiked = false
  isWished = false
  owner_mobile = ''
  slug = ''
  owner_enable_call = 0

  constructor(id) {
    super()
    this.setTokens({ device: types.ANDROID })
    this.id = id
    if (!this.userToken && UserModel.userToken) { this.setTokens({ userToken: UserModel.userToken }) }
  }

  async getItemDetials() {
    if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
    let res = await this.apiReq(types.ONE_ITEM, {
      optionalParams: { item_id: this.id }
    })
    console.log('iteem res ------------', res)
    res = await this.getResult(
      res,
      'category',
      'category_id',
      'created_date',
      'description',
      'expiry_end',
      'expiry_start',
      'id',
      'images',
      'item_condition',
      'item_featured',
      'owner',
      'owner_id',
      'price',
      'short_desc',
      'status',
      'status_lang',
      'title',
      'type',
      'type_id',
      'like',
      'wishlist',
      'owner_rate',
      'total_likes',
      'follow',
      'owner_image',
      'owner_mobile',
      'slug',
      'owner_enable_call'
    )
    this.setItemData(res)
    return this
  }

  async likeItemAction(like) {
    console.log('item action ---> ', like)
    try {
      if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
      let res = await this.apiReq(types.LIKE_ITEM, {
        options: { item_id: this.id, action: !like ? 'dislike' : 'like' }
      })
      this.isLiked = !this.isLiked
      this.like = this.like ? 0 : 1
      res = await this.getResult(res)
      return res
    } catch (e) {
      console.log('LIKE ITEM ERROR => ', e)
    }
  }

  async wishItem(wish) {
    try {
      let res = await this.apiReq(types.WISH_ITEM, {
        options: { action: !wish ? 'remove' : 'add', item_id: this.id }
      })
      this.isWished = !this.isWished
      this.wishlist = this.wishlist ? 0 : 1
      res = await this.getResult(res)
      return res
    } catch (e) {
      console.log('WISH ITEM ERROR => ', e)
      this.errors = e
    }
  }

  async saveItem(options = {}) {
    if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
    try {
      let res = await this.apiReq(types.SAVE_ITEM, { options })
      console.log('res => ', res)
      return res
    } catch (e) {
      console.log('SAVING ITEM ERROR => ', e)
      this.errors = e
      throw e
    }
  }

  isItemLiked = async () => {
    await ItemsModel.loadAllLikedItems()
    for (var i = 0; i < ItemsModel.likedItems.length; i++) {
      let item = ItemsModel.likedItems[i]
      if (item.item_id == this.id) {
        this.isLiked = true
        return true
      }
    }
    this.isLiked = false
    return false
  }

  isItemWished = async () => {
    await ItemsModel.loadAllWishedItems()
    for (var i = 0; i < ItemsModel.wishedItems.length; i++) {
      let item = ItemsModel.wishedItems[i]
      if (item.item_id == this.id) {
        this.isWished = true
        return true
      }
    }
    this.isWished = false
    return false
  }

  getReasons = async () => {
    if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
    try {
      let res = await this.apiReq(types.REPORT_REASONS_LIST, {})
      res = await this.getResult(res)
      console.log('REASONS LOADED => ', res)
      return res
    } catch (e) {
      console.log('REASONS ERROR => ', e)
    }
  }

  setItemData(data) {
    Object.keys(data).map(key => {
      this[key] = data[key]
    })
  }
}

// export default new ItemModel();
