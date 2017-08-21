import {AsyncStorage} from 'react-native'
import BaseModel from './BaseModel'
import UserModel from './User.js'

const types = BaseModel.constants

export class CategoriesModel extends BaseModel {
  categories = [];

  constructor () {
    super()
    this.setTokens({device: types.ANDROID})
  }

  async loadCategories (options = {}, optionalParams = {}) {
    if (!this.userToken) this.setTokens({userToken: UserModel.userToken})
    let res = await this.apiReq(types.CATEGORIES, {options, optionalParams})
    this.categories = await this.getResult(res)
    return this.categories
  }

}

export default new CategoriesModel()
