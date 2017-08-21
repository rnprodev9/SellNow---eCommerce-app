import React from 'react'
import { ScrollView, Text, StatusBar, View, TouchableOpacity } from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'
import Background from '../../Components/BackgroundImage'
import LogoImage from '../../Components/LogoImage'
import Button from '../../Components/FullButton'
import OrLine from '../../Components/OrLine'
import TextInputField from '../../Components/TextInputField'
import Topbar from '../../Components/TopBar'
import { Images } from '../../Themes';
import { observe } from 'mobx';
import { observer } from 'mobx-react/native';
import vm from './LoginWithEmailScreenStore'
import { Actions } from 'react-native-router-flux'
import KeyboardAwareScrollView from 'react-native-keyboard-aware-scroll-view'
import I18n from 'react-native-i18n'

// Styles
import styles from './LoginWithEmailScreenStyle'

@observer
export default class LoginWithEmailScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = { hidden: true, animated: true }
  }

  componentWillMount() {
    vm.clearData();
    vm.errors = {}
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={this.state.hidden} animated={this.state.animated} />
        <Background image={Images.loginBackGround} style={{ alignSelf: 'center' }} />
        <View >
          <ScrollView >
            <Topbar
              leftImage={I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft}
              leftText={I18n.t('Back')}
              backgroundColor={Colors.transparent}
            />
            <View style={styles.blurView}>
              <LogoImage style={{ marginTop: 20, width: 229, height: 129 }} />
              <View style={{ marginTop: 30, marginBottom: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, height: 1, borderWidth: 1, borderColor: Colors.steel }}></View>
                <Text style={styles.loginText}>{I18n.t('login')}</Text>
                <View style={{ flex: 1, height: 1, borderWidth: 1, borderColor: Colors.steel }}></View>
              </View>
              <View behavior='position' style={{ alignSelf: 'center', height: 125, paddingHorizontal: 25 }}>
                <TextInputField
                  placeholder={I18n.t('emailOrPhone')}
                  onChangeText={vm.onUserIdenityChanged}
                  error={vm.errors}
                  errorMessage={vm.errors.errors ? vm.errors.errors.email : ''}
                />
                <TextInputField placeholder={I18n.t('password')}
                  secureTextEntry
                  onChangeText={vm.onPasswordChanged}
                  error={vm.errors}
                  errorMessage={vm.errors.errors ? vm.errors.errors.password : vm.errors._message ? vm.errors._message : ''}
                />
              </View>
              <Button
                onPress={vm.login}
                loading={vm.isLoading}
                text={I18n.t('loginNow')}
                style={[styles.loginFb, { backgroundColor: 'white' }]}
                styleText={{ color: '#2A2722' }} />
              <TouchableOpacity onPress={Actions.ForgetPasswordScreen} style={{ alignSelf: 'stretch', marginHorizontal: 60, marginTop: 8 }}>
                <Text style={styles.forgotText}>{I18n.t('forgetPass')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ flexDirection: I18n.t('direction'), alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', marginTop: 20 }} onPress={Actions.SignUpScreen}>
                <Text style={styles.createText}>{I18n.t('create')}</Text>
                <Text style={styles.accountNowText}>{I18n.t('newAccount')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }

}
