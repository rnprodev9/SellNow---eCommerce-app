import { observable, action } from 'mobx'

export default class BaseViewModel {
  @observable isLoading = false
  @observable errors = {}
  @observable resultError

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
}
