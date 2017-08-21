import { AsyncStorage } from 'react-native'
import BaseModel from './BaseModel'
import UserModel from './User.js'

const types = BaseModel.constants

const pagingObj = {
  next_page: 1,
  prev_page: 1,
  current_page: 1,
  total: -1
}

export class ItemsModel extends BaseModel {
  allItems = []
  featuredItems = []
  soldItems = []
  likedItems = []
  wishedItems = []
  otherSellerItems = []
  allItemsPaging = {
    ...pagingObj
  }
  featuredItemsPaging = {
    ...pagingObj
  }
  soldItemsPaging = {
    ...pagingObj
  }
  likedItemsPaging = {
    ...pagingObj
  }
  wishedItemsPaging = {
    ...pagingObj
  }
  otherSellerItemsPaging = {
    ...pagingObj
  }

  constructor () {
    super()
    this.setTokens({ device: types.ANDROID })
  }

  async loadAllItems (options = {}) {
    if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
    let res = await this.apiReq(types.ITEMS, {
      options: { ...options, _cat: 1 }
    })
    this.allItems = await this.getResult(res)
    // console.log('items res ---- => ', res)
    // this.isDisconnected(res)
    let { next_page, prev_page, current_page, total_data } = res
    this.allItemsPaging = {
      next_page,
      prev_page,
      current_page,
      total: total_data
    }
    console.log('ALL ITEMS COUNT => ', total_data)

    return this.allItems
  }

  async loadAllSoldItems (owner_id, op = {}) {
    if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
    try {
      let options = {
        status: 'sold',
        owner_id,
        ...op
      }
      if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
      let res = await this.apiReq(types.ITEMS, { options })
      this.allItems = await this.getResult(res)
      let { next_page, prev_page, current_page, total_data } = res
      this.soldItemsPaging = {
        next_page,
        prev_page,
        current_page,
        total: total_data
      }
      console.log('SOLD ITEMS COUNT => ', total_data)
      return this.allItems
    } catch (e) {
      console.log('SOLD ITEMS ERROR => ', e)
      this.errors = e
    }
  }

  async loadAllLikedItems (options = {}) {
    if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
    try {
      if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
      let res = await this.apiReq(types.USER_LIKED_ITEMS, { options })
      this.likedItems = await this.getResult(res)
      let { next_page, prev_page, current_page, total_data } = res
      this.likedItemsPaging = {
        next_page,
        prev_page,
        current_page,
        total: total_data
      }
    } catch (e) {
      this.errors = e
      console.log('GET ALL LIKED ITEMS ERROR => ', e)
      return []
    }
    return this.likedItems
  }

  async loadAllWishedItems (options = {}) {
    if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
    try {
      if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
      let res = await this.apiReq(types.USER_WISH_LIST, { options })
      this.wishedItems = await this.getResult(res)
      let { next_page, prev_page, current_page, total_data } = res
      this.wishedItemsPaging = {
        next_page,
        prev_page,
        current_page,
        total: total_data
      }
      console.log('WISHED ITEMS COUNT => ', total_data)
    } catch (e) {
      this.errors = e
      console.log('GET ALL WISHED ITEMS ERROR => ', e)
      return []
    }
    return this.wishedItems
  }

  async loadAllFeaturedItems (options = {}) {
    if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
    try {
      if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
      options.item_featured = 'yes'
      let res = await this.apiReq(types.ITEMS, { options })
      this.featuredItems = await this.getResult(res)
      let { next_page, prev_page, current_page, total_data } = res
      this.featuredItemsPaging = {
        next_page,
        prev_page,
        current_page,
        total: total_data
      }
    } catch (e) {
      this.errors = e
      console.log('ALL FEATURED ITEMS ERROR => ', e)
      return []
    }
    return this.featuredItems
  }

  async saveSearchItem (options = {}) {
    if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
    try {
      if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
      let res = await this.apiReq(types.SAVE_SEARCH_ITEM, { options })
      return res
    } catch (e) {
      this.errors = e
      console.log('SAVE SEARCH ERROR => ', e)
      return false
    }
  }

  async loadOtherSellerItems (owner_id, item_except, op = {}) {
    if (!this.userToken) this.setTokens({ userToken: UserModel.userToken })
    try {
      let options = {
        owner_id,
        item_except,
        ...op
      }
      let res = await this.apiReq(types.ITEMS, { options })
      this.otherSellerItems = await this.getResult(res)
      let { next_page, prev_page, current_page, total_data } = res
      this.otherSellerItemsPaging = {
        next_page,
        prev_page,
        current_page,
        total: total_data
      }
      console.log('OTHER SELLER COUNT => ', total_data)
    } catch (e) {
      this.errors = e
      console.log('OTHER SELLER ITEMS ERROR => ', e)
      return []
    }
    return this.otherSellerItems
  }
}

export default new ItemsModel()
