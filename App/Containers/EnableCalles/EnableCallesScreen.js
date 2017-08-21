import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, StatusBar } from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Background from '../../Components/BackgroundImage'
import LogoImage from '../../Components/LogoImage'
import Button from '../../Components/FullButton'
import OrLine from '../../Components/OrLine'
// Styles
import styles from './EnableCallesScreenStyle'
import { Images } from '../../Themes'
import { observe } from 'mobx'
import { observer } from 'mobx-react/native'
import NotificationComponent from '../../Components/NotificationComponent'
import MainLoginScreenStore from './EnableCallesStore'
import { Actions } from 'react-native-router-flux'
import TopBar from '../../Components/TopBar'
import I18n from 'react-native-i18n'
import vm from './EnableCallesStore'

@observer
export default class EnableCallesScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hidden: false,
      animated: true
    }
  }

  async componentWillMount () {
    await vm.onStartup()
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={this.state.hidden} animated={this.state.animated} />
        <TopBar
          leftImage={I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft}
          leftText={I18n.t('Back')}
          leftAction={() => { Actions.mainlogin({type: 'reset'}) }}
          title={I18n.t('call')}
          rightText={I18n.t('next')}
          rightAction={() => { Actions.enablenotification({ type: 'reset', alert: this.props.alert }) }}
        />
        <NotificationComponent
          Calles
          EnableCalls={vm.onChange}
        />
      </View>
    )
  }

}
