import React from 'react'
import {
  ScrollView,
  Text,
  KeyboardAvoidingView,
  View,
  BackAndroid
} from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Background from '../../Components/BackgroundImage'
import LogoImage from '../../Components/LogoImage'
import Button from '../../Components/FullButton'
import OrLine from '../../Components/OrLine'
// Styles
import styles from './EnableVerificationScreenStyle'
import { Images } from '../../Themes'
import { observe } from 'mobx'
import { observer } from 'mobx-react/native'
import NotificationComponent from '../../Components/NotificationComponent'
import vm from './EnableVerificationStore'
import TopBar from '../../Components/TopBar'
import { Actions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'

@observer
export default class EnableVerificationScreen extends React.Component {
  constructor (props) {
    super(props)
    vm.resendCode()
  }

  render () {
    console.log('verf', vm.errors.errors)
    return (
      <View style={{ flex: 1 }}>
        <TopBar
          leftImage={
            I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft
          }
          leftText={I18n.t('Back')}
          leftAction={() => {
            Actions.mainlogin({ type: 'reset' })
          }}
          title={I18n.t('enableCall')}
        />
        <NotificationComponent
          Verification
          Submit={vm.verifyMobileNumber}
          onVerfCodeChange={vm.onMobileCodeChange}
          ResendVerification={vm.resendCode}
          verifyLoading={vm.isLoading}
          errorMessage={
            vm.errors && vm.errors.errors ? vm.errors.errors.mobile_code : ''
          }
        />
      </View>
    )
  }
}
