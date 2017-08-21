import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'
import UserModel, { UserModel as userModel } from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import RNRestart from 'react-native-restart'
import I18n from 'react-native-i18n'
export class MainLoginScreenStore extends BaseViewModel {
  onStartUp = (productIdFromShare) => {
    this.isLoading = true
    return AsyncStorage.getItem('user')
      .then(data => JSON.parse(data))
      .then(this.checkUserExistance)
      .then(res => {
        this.isLoading = false

        if (res.userExist) {
          UserModel.getUserProfile()
            .then(res => {
              if (productIdFromShare) {
                Actions.ProductDetails({productId: productIdFromShare, fromShare: true, type: 'reset'})
              } else {
                Actions.HomeScreen({ type: 'reset' })
              }
            })
            .catch(e => {
              Actions.mainlogin({ type: 'reset' })
            })
        }
      })
      .catch(e => {
        this.isLoading = false
        console.log('INTERNAL ERROR => ', e)
        Actions.mainlogin({ type: 'reset' })
      })
  }

  checkUserExistance = user => {
    if (user) {
      console.log('USER IS EXIST', user)
      UserModel.setUserData(user)
      return { userExist: true }
    } else {
      throw { userExist: false }
    }
  }

  onEnglishPress = async () => {
    // let locale = await AsyncStorage.getItem('locale')
    // locale === I18n.locale
    //   ? Actions.splash()
    //   : await AsyncStorage.setItem('locale', 'en')
    // RNRestart.Restart()
    if (I18n.locale === 'en') {
      Actions.splash()
    } else {
      await AsyncStorage.setItem('locale', 'en')
      RNRestart.Restart()
    }
  }
  onArabicPress = async () => {
    if (I18n.locale === 'ar') {
      Actions.splash()
    } else {
      await AsyncStorage.setItem('locale', 'ar')
      RNRestart.Restart()
    }
  }
}

export default new MainLoginScreenStore()
