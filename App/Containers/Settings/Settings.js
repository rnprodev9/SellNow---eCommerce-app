import React from 'react'
import {
  ScrollView,
  Text,
  AsyncStorage,
  View,
  TouchableOpacity,
  ActivityIndicator

} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import TopBar from '../../Components/TopBar'
import Tabs from '../../Components/TabBar'
import { Switch } from '../../Components/Switch'
// Styles
import styles from './SettingsStyle'
import { Colors, Images } from '../../Themes/'
import { Actions } from 'react-native-router-flux'
import vm from './SettingsStore'
import I18n from 'react-native-i18n'
import RNRestart from 'react-native-restart'
import {observer} from 'mobx-react'
import ConfirmationPopUp from '../../Components/ConfirmationPopUP'

@observer
class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showPopUp: false
    }
    vm.onStartUp()
  }

  changeLanguage = () => {
    this.hidePopUp()
    AsyncStorage.setItem('locale', I18n.locale == 'en' ? 'ar' : 'en')
      .then(() => {
        RNRestart.Restart()
      })
      .catch(console.log)
  };

  showPopUp = () => {
    this.setState({
      showPopUp: true
    })
  }

  hidePopUp = () => {
    this.setState({
      showPopUp: false
    })
  }

  render () {
    if (vm.isLoading) return <ActivityIndicator style={{ flex: 1 }} size='large' />
    return (
      <View style={{ flex: 1, paddingBottom: 60 }}>
        <ConfirmationPopUp
          hideCancelBtn
          showConfirmationModal={this.state.showPopUp}
          confirmationTitle={I18n.t('Hint')}
          confirmationMessage={I18n.t('RestartHint')}
          closeConfirmationModal={this.hidePopUp}
          confirmAction={() => {
            this.changeLanguage()
          }}
        />
        <TopBar
          leftImage={
            I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft
          }
          leftText={I18n.t('Back')}
          title={I18n.t('Settings')}
        />
        <ScrollView style={styles.container}>
          <TouchableOpacity style={styles.rowView} onPress={vm.editProfile}>
            <Text style={styles.text}>
              {I18n.t('editProfile')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowView}
            onPress={() => {
              Actions.Upgrade()
            }}
          >
            <Text style={styles.text}>
              {I18n.t('upgradeSub')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowView}>
            <Text style={styles.text}>
              {I18n.t('notifications')}
            </Text>
            <Switch
              value={vm.notif == true ? true : false}
              /* onValueChange={vm.setIsFeatured} */
              onValueChange={vm.onNotifChanged}
              disabled={false}
              activeText={''}
              inActiveText={''}
              backgroundActive={Colors.silver}
              backgroundInactive={Colors.silver}
              circleActiveColor={Colors.darkGray}
              circleInActiveColor={Colors.steel}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowView}>
            <Text style={styles.text}>
              {I18n.t('calls')}
            </Text>
            <Switch
              value={vm.calls == true ? true : false}
              // onValueChange={vm.setIsFeatured}
              onValueChange={vm.onCallsChanged}
              disabled={false}
              activeText={''}
              inActiveText={''}
              backgroundActive={Colors.silver}
              backgroundInactive={Colors.silver}
              circleActiveColor={Colors.darkGray}
              circleInActiveColor={Colors.steel}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={Actions.Terms} style={styles.rowView}>
            <Text style={styles.text}>
              {I18n.t('termsCondition')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Actions.Privacy} style={styles.rowView}>
            <Text style={styles.text}>
              {I18n.t('privacy')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Actions.Help} style={styles.rowView}>
            <Text style={styles.text}>
              {I18n.t('Help')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Actions.ContactStatusList} style={styles.rowView}>
            <Text style={styles.text}>
              {I18n.t('ContactUs')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowView}
            onPress={() => this.showPopUp()}
          >
            <Text style={styles.text}>
              {I18n.locale == 'ar' ? 'English' : 'اللغة العربية'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rowView} onPress={vm.signout}>
            <Text style={styles.text}>
              {I18n.t('logOut')}
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <Tabs />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
