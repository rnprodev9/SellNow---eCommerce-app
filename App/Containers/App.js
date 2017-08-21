import '../Config'
import '../I18n/I18n'
import React, { Component } from 'react'
import { AsyncStorage, View, NetInfo, Platform } from 'react-native'

import { Provider } from 'react-redux'
import createStore from '../Redux'
import Snackbar from 'react-native-snackbar'
// import I18n from 'react-native-i18n'
import { Colors } from '../Themes'
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from 'react-native-fcm'
import BaseModel from '../Models/BaseModel'
import Constants from '../Models/Constants'

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  constructor() {
    super()

    this.state = {
      loaded: false
    }
  }
  async componentWillMount() {
    let b = new BaseModel()
    // let url = await b.simpleApiRequest(Constants.GET_URL)
    // global.baseUrl = url
    // console.log('BASE URL SCHEMA => ', global.baseUrl)
    AsyncStorage.getItem('locale')
      .then((locale) => {
        if (locale) {
          global.locale = locale;
        } else {
          global.locale = 'en';
        }
        this.setState({
          loaded: true,
        });
      });
  }

  async componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange)

    NetInfo.isConnected.fetch().done(isConnected => {
      this.setState({ status: isConnected })
    })
    await this.getToken()
  }

  handleConnectionChange = isConnected => {
    const I18n = require('react-native-i18n')
    this.setState({ status: isConnected })
    if (!this.state.status) {
      Snackbar.show({
        title: I18n.locale == 'ar' ? 'من فضلك تأكد من إتصالك بالإنترنت' : 'Please Make Sure Of Your Internet Connection',
        length: 15000,
        backgroundColor: Colors.mainColor
      })
    }
  }

  getToken = async () => {
    FCM.requestPermissions() // for iOS
    return FCM.getFCMToken()
      .then(token => {
        // console.log(token)
        console.log('FCM TOKEN => ', token)
        // store fcm token in your  console.log('FCM TOKEN => ', token)server
        global.token = token
        return token
      })
      .then(token => {
        this.notificationListener = FCM.on(
          FCMEvent.Notification,
          async notif => {
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            if (notif.local_notification) {
              // this is a local notification
            }
            if (notif.opened_from_tray) {
              // app is open/resumed because user clicked banner
            }
            // await someAsyncCall()

            if (Platform.OS === 'ios') {
              // optional
              // iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
              // This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
              // notif._notificationType is available for iOS platfrom
              switch (notif._notificationType) {
                case NotificationType.Remote:
                  notif.finish(RemoteNotificationResult.NewData) // other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                  break
                case NotificationType.NotificationResponse:
                  notif.finish()
                  break
                case NotificationType.WillPresent:
                  notif.finish(WillPresentNotificationResult.All) // other types available: WillPresentNotificationResult.None
                  break
              }
            }
          }
        )
        this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
          console.log(token)
          global.token
          // fcm token may not be available on first load, catch it here
        })
      })
    // console.log('FCM TOKEN => ', token)
    // store fcm token in your server
  }

  componentWillUnmount() {
    // stop listening for events
    NetInfo.isConnected.removeEventListener(
      'change',
      this.handleConnectionChange
    )
    this.notificationListener.remove()
    this.refreshTokenListener.remove()
  }

  render() {
    if (this.state.loaded) {
      const localization = require('../I18n/I18n').default;
      localization();
      const RootContainer = require('./RootContainer').default
      return (
        <Provider store={store}>
          <RootContainer />
        </Provider>
      )
    }
    return <View />
  }
}

export default App
