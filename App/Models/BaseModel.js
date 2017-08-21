import axios from 'axios'
import CONSTANTS from './Constants'
import { stringify } from 'querystringify'
import { Alert } from 'react-native'
import API from './API'
import { Actions } from 'react-native-router-flux'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../Themes'
import I18n from 'react-native-i18n'
export default class BaseModel {
  static constants = CONSTANTS
  static defaultUrl = 'http://174.138.71.101/sell_now/api_system/'
  api = API

  baseUrl = global.baseUrl || 'http://174.138.71.101/sell_now/api_system/'

  deviceToken = ''
  userToken = ''
  reqResult = {}
  appToken = {
    android: '1e8176a792cc6bd4af6d39d3c523f5bc',
    ios: '6d4899fc7b1f2b25fee88fcab358bf11'
  }

  disconnected = false
  isLoggedIn = false
  request = {}
  def_lang = I18n.locale
  errors = {}
  /**
     *
     * @param {device_type___user_token} param0
     */
  setTokens({ device, userToken, def_lang }) {
    if (device) {
      this.deviceToken = this.appToken[device]
    }
    if (userToken) {
      this.userToken = userToken
      this.isLoggedIn = true
    }
    if (def_lang) {
      this.def_lang = def_lang
    }
  }
  /**
     *
     * @param {*String} type
     * @param {*Boolen} userToken
     */
  async apiReq(type, { optionalParams, options }) {
    console.log(type, optionalParams, options)
    let api = this.api[type]
    let result = null
    this.request = {
      optionalParams,
      options,
      method: api.method
    }
    api.useUserToken ? (this.request.useUserToken = true) : null
    // if(api.method == 'post'){
    result = await this.createReqest(`${this.baseUrl}${api.url}`, type)
    return result
    // }
  }

  async createReqest(url, type) {
    let fullUrl = url
    // this.deviceToken = null
    fullUrl += `?token=${this.deviceToken}&def_lang=${this.def_lang}`
    this.request.useUserToken && this.userToken
      ? (fullUrl += `&user=${this.userToken}`)
      : null
    fullUrl += this.addOptionalParamsToUrl(this.request.optionalParams)
    let res = null
    console.log(`NEW REQUEST { ${this.request.method} } TO =>`, fullUrl)
    try {
      res = await axios[this.request.method](
        fullUrl,
        stringify(this.request.options)
      )
      console.log('res ---- ' + type, res)
      res = JSON.stringify(res)
      let result = JSON.parse(res)
      res = result.data.meta
      res.data = result.data.data || null
    } catch (e) {
      let data = JSON.stringify(e)
      data = JSON.parse(data)
      console.log('ERROR => ', data.response.data.meta)
      console.log(data)
      if (!data.response.data.meta) {
        // Alert.alert(
        //   'Ooops',
        //   'Internet Connection Error',
        //   [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        //   { cancelable: false }
        // )
        Snackbar.show({
          title: 'Internet Connection Error please restart the application',
          length: 3000,
          backgroundColor: Colors.mainColor
        })
      }
      throw data.response.data.meta
    } finally {
      console.log(`RESULT OF REQUEST TYPE: => ${type}`, res)
      this.reqResult = res
      return res
    }
  }

  addOptionalParamsToUrl(optionalParams) {
    let params = ''
    optionalParams
      ? Object.keys(optionalParams).map(key => {
        console.log('OPTION PARAM KEY => ', key)
        console.log('OPTION PARAM VALUE => ', optionalParams[key])
        params += `&${key}=${optionalParams[key]}`
      })
      : null
    return params
  }

  getResult = async (result, ...neededData) => {
    if (result && (result.status == 'error' || result.code != 200)) {
      let errors = {}
      if (result.errors) {
        errors = result.errors
      }
      if (result.message) {
        errors._message = result.message
      }

      result.code = errors && errors._code ? errors._code : 'no code'
      console.log('this.errors', this.errors)
      throw errors
    } else if (Array.isArray(result.data)) {
      return result.data
    } else if (neededData.length > 0) {
      let returnedObj = {}
      this.errors = false
      await neededData.map(async key => (returnedObj[key] = result.data[key]))
      return returnedObj
    } else {
      return result
    }
  }

  async simpleApiRequest(type, options = {}, dontFilter, optionalParams) {
    try {
      let res = await this.apiReq(type, { options, optionalParams })
      !dontFilter ? (res = await this.getResult(res)) : null
      console.log('SIMPLE API REQ RESULT => ', res)
      return res
    } catch (e) {
      console.log('### SIMPLE API REQ ERROR => ', e)
      this.errors = e
      throw e
    }
  }

  isDisconnected = res => {
    if (!res) return
    let { status, code, message } = res
    if (!status || !code || !message) return
    if (
      status == 'error' &&
      code == 401 &&
      message ==
      'You do not have authrize to access Application, please login again or contact Admin'
    ) {
      // alert(message)
      Snackbar.show({
        title: message,
        length: 3000,
        backgroundColor: 'red'
      })
      Actions.launchScreen()
    }
  }
}
