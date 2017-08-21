import BaseModel from './BaseModel'
import { AsyncStorage } from 'react-native'
const {
  LOGIN,
  ANDROID,
  IOS,
  REGISTER,
  FORGET_PASSWORD,
  CHECK_PASSWORD,
  CHECK_EMAIL,
  CHECK_PHONE,
  MOBILE_VERF,
  RESEND_CODE,
  LOGOUT
} = BaseModel.constants
import Snackbar from 'react-native-snackbar'
import { Colors } from '../Themes/index'
import { Alert } from 'react-native'
import RNRestart from 'react-native-restart' // Import package from node modules

// Immediately reload the React Native Bundle
const types = BaseModel.constants

export class UserModel extends BaseModel {
  email = '';
  first_name = '';
  last_name = '';
  address = '';
  locationObj = {};
  mobile = '';
  password = '';
  notification = false;
  provider = '';
  userToken = '';
  picture = '';
  type_id = '';
  isEmailAvailable = '';
  userRate = 0;
  unique_id = '';
  join_date = '';
  about_seller = '';
  seller_id = null;
  following = '';
  followingList = [];
  blockingList = [];

  constructor (data) {
    super()
    this.setTokens({ device: ANDROID })

    if (data) {
      Object.keys(data).map(key => {
        if (key == 'rate') {
          this.userRate = data[key]
        } else {
          this[key] = data[key]
        }
      })
    }
  }

  async login (userIdenity, password) {
    // let res = await this.apiReq(LOGIN, {options})
    // return this.getResult(res);
    let options = {
      email: userIdenity,
      password,
      device_token: global.token
    }
    let optionalParams = {
      device_token: global.token
    }
    let res = await this.apiReq(LOGIN, { options, optionalParams })
    // return true;
    let data = await this.getResult(
      res,
      'address',
      'first_name',
      'last_login',
      'last_name',
      'latitude',
      'longitude',
      'mobile',
      'reg_by',
      'unique_id',
      'user',
      'user_type',
      'email',
      'picture',
      'join_date',
      'about_seller',
      'seller_id'
    )
    this.setTokens({ userToken: data['user'] })

    await this.setUserData(data, true)
    return data
  }

  async setUserData (data, saveAtAsyncStorage) {
    Object.keys(data).map(key => {
      this[key] = data[key]
    })
    this.locationObj = {
      longitude: data['longitude'],
      latitude: data['latitude']
    }
    // this.userToken = data["user"];
    this.provider = data['reg_by']
    this.setTokens({ userToken: data['user'] })
    if (saveAtAsyncStorage) {
      await AsyncStorage.setItem('user', JSON.stringify(this))
    }
  }

  getNewUserToken () {
    // To referesh User Token
  }

  async logout (email) {
    try {
      let options = { email }
      let optionalParams = {
        device_token: global.token
      }
      await this.apiReq(LOGOUT, { options, optionalParams })
      await AsyncStorage.setItem('user', '')
      RNRestart.Restart()
      return 'user logged out'
    } catch (e) {
      console.log('LOGOUT ERROR => ', e)
      await AsyncStorage.setItem('user', '')
      RNRestart.Restart()
      return 'user logged out'
    }
    // this.emptyUserData
  }

  async checkEmail (email) {
    let options = { email }
    let res = await this.apiReq(CHECK_EMAIL, { options })
    this.isEmailAvailable = res.message
    return res
  }

  async checkPassword (password) {
    let options = { password }
    let res = await this.apiReq(CHECK_PASSWORD, { options })
    return this.getResult(res)
  }

  async register (userData, type) {
    let options = userData
    this.mobile = userData.mobile
    this.email = userData.email
    !type ? (options.reg_type = 'form') : (options.reg_type = type)
    let res = await this.apiReq(REGISTER, { options })
    res = this.getResult(res)
    AsyncStorage.setItem('unVerMob', userData.mobile)
    AsyncStorage.setItem('unVerEmail', userData.email)
    AsyncStorage.setItem('unVerPass', userData.password)
    return res
  }

  async resetPassword (email) {
    let options = { email }
    let res = await this.apiReq(FORGET_PASSWORD, { options })
    return this.getResult(res)
  }

  async verifyMobileNumber (mobile_code) {
    let options = {
      mobile_code,
      mobile: this.mobile
    }
    let res = await this.apiReq(MOBILE_VERF, { options })
    return this.getResult(res)
  }

  async resendCode () {
    let options = {
      mobile: this.mobile,
      email: this.email,
      activate_field: 'mobile'
    }
    let res = await this.apiReq(RESEND_CODE, { options })
    return this.getResult(res)
  }

  async followUserAction (user_id, action) {
    let options = {
      user_id,
      action
    }
    let res = await this.apiReq(types.FOLLOW_USER, { options })
    return this.getResult(res)
  }

  async getUserFollowingList () {
    try {
      let res = await this.apiReq(types.USER_FOLLOWING_LIST, {})
      this.followingList = await this.getResult(res)
      return this.followingList
    } catch (e) {
      console.log('FOLLOW LIST ERROR => ', e)
    }
  }

  async blockUserAction (user_id, action) {
    let options = {
      user_id,
      action
    }
    let res = await this.apiReq(types.BLOCK_USER, { options })
    return this.getResult(res)
  }

  async getUserBlockingList () {
    try {
      let res = await this.apiReq(types.USER_BLOCKING_LIST, {})
      this.blockingList = await this.getResult(res)
      return this.blockingList
    } catch (e) {
      console.log('BlOCKED LIST ERROR 2 => ', e)
    }
  }

  async checkIfUserIsFollowed (followerId) {
    await this.getUserFollowingList()
    for (var i = 0; i < this.followingList.length; i++) {
      let item = this.followingList[i]
      if (item.follower_id == followerId) {
        return true
      }
    }
    return false
  }

  async rateUser (owner_id, rate) {
    let options = {
      owner_id,
      rate
    }
    try {
      let res = await this.apiReq(types.RATE_USER, { options })
      return this.getResult(res)
    } catch (e) {
      this.errors = e
      throw e
    }
  }

  async getUserProfile () {
    let res = await this.apiReq(types.GET_PROFILE, {})
    let data = this.getResult(
      res,
      'address',
      'first_name',
      'last_login',
      'last_name',
      'latitude',
      'longitude',
      'mobile',
      'reg_by',
      'unique_id',
      'user',
      'user_type',
      'email',
      'picture',
      'join_date',
      'about_seller',
      'seller_id'
    )
    await this.setUserData(data, true)
  }

  async getSellerProfile (user_id) {
    let optionalParams = {
      user_id
    }
    let res = await this.apiReq(types.GET_PROFILE, { optionalParams })
    let data = this.getResult(
      res,
      'address',
      'first_name',
      'last_login',
      'last_name',
      'latitude',
      'longitude',
      'mobile',
      'reg_by',
      'unique_id',
      'user',
      'user_type',
      'email',
      'picture',
      'join_date',
      'about_seller',
      'seller_id',
      'rate',
      'following'
    )
    return data
  }

  async updateProfile (options = {}) {
    try {
      let res = await this.apiReq(types.UPDATE_PROFILE, { options })
      // res = this.getResult(res)
      console.log('updateprofile result => ', res)
      return res
    } catch (e) {
      this.errors = e
      throw e
    }
  }
}

export default new UserModel()
