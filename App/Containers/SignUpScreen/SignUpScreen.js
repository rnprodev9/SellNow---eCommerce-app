import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, TouchableOpacity, StatusBar } from 'react-native'
import { Images, Colors } from '../../Themes'
import TopBar from '../../Components/TopBar'
import TextInputField from '../../Components/TextInputField'
import Button from '../../Components/FullButton'
import vm from './SignUpStore'
import { Actions } from 'react-native-router-flux'
import User from '../../Models/User'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import I18n from 'react-native-i18n'

// Styles
import styles from './SignUpScreenStyle'
import { observer } from 'mobx-react'

const textInputStyle = { color: 'black' }

@observer
export default class SignUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hidePassword: true,
      hidden: false,
      animated: true
    }
  }

  componentWillMount () {
    vm.clearData()
    vm.errors = {}
  }

  showPassword = () => {
    this.setState({
      hidePassword: !this.state.hidePassword
    })
  }

  renderTextInputsView = () => {
    if (!this.props.social) {
      return (
        <KeyboardAvoidingView behavior='position' style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TextInputField
            styles={textInputStyle}
            placeholder={I18n.t('firstName')}
            onChangeText={vm.onFirstNameChange}
            error={vm.errors}
            errorMessage={vm.errors.errors ? vm.errors.errors.first_name : ''}
          />
          <TextInputField
            styles={textInputStyle}
            placeholder={I18n.t('lastName')}
            onChangeText={vm.onLastNameChange}
            error={vm.errors}
            errorMessage={vm.errors.errors ? vm.errors.errors.last_name : ''}
          />
          <TextInputField
            styles={[textInputStyle, { height: 28 }]}
            placeholder={I18n.t('mobile')}
            onChangeText={vm.onmMobileChange}
            error={vm.errors}
            errorMessage={vm.errors.errors ? vm.errors.errors.mobile : ''}
            textInputStyle={{ height: 28 }}
            keyboardType='numeric'

          />
          <TextInputField
            styles={textInputStyle}
            placeholder={I18n.t('email')}
            onChangeText={vm.onEmailChange}
            error={vm.errors && !vm.emailMessage ? vm.errors : null}
            errorMessage={vm.errors.errors ? vm.errors.errors.email : '' || vm.errors._message ? vm.errors._message : null}
            validMessage={vm.emailMessage ? vm.emailMessage : null}
          />
          <View style={{flexDirection: I18n.t('direction')}}>
            <TextInputField
              styles={textInputStyle}
              onChangeText={vm.onPasswordChange}
              secureTextEntry={this.state.hidePassword}
              placeholder={I18n.t('passSignup')}
              error={vm.errors}
              errorMessage={vm.customErrors ? vm.customErrors : vm.errors.errors ? vm.errors.errors.password : ''}
            />
            <TouchableOpacity onPress={this.showPassword} style={{ width: 36, height: 36, position: 'absolute', right: 8, bottom: 8 }}>
              <Image source={Images.passwordEye} resizeMode='contain' />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.pickLocationView} onPress={Actions.SelectAddressMapScreen}>
            <Text style={styles.pickLocationText}>
              {vm.address ? vm.address : I18n.t('pickAddress')}
            </Text>
            <View style={{ width: 24, height: 24, position: 'absolute', right: 8, bottom: 0 }}>
              <Image source={Images.pickIcon} resizeMode='contain' />
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )
    } else {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TextInputField
            styles={textInputStyle}
            placeholder={I18n.t('mobileNo')}
            onChangeText={vm.onmMobileChange}
            error={vm.errors}
            errorMessage={vm.errors.errors ? vm.errors.errors.mobile : ''}
            textInputStyle={{ height: 28 }}
            keyboardType='numeric'

          />

          <TouchableOpacity style={styles.pickLocationView} onPress={Actions.SelectAddressMapScreen}>
            <Text style={styles.pickLocationText}>
              {vm.address ? vm.address : I18n.t('pickAddress')}
            </Text>
            <View style={{ width: 24, height: 24, position: 'absolute', right: 8, bottom: 0 }}>
              <Image source={Images.pickIcon} resizeMode='contain' />
            </View>
          </TouchableOpacity>

        </View>
      )
    }
  }

  render () {
    return (
      <View>
        <StatusBar hidden={this.state.hidden} animated={this.state.animated} />
        <TopBar
          leftImage={I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft}
          leftText={I18n.t('Back')}
          title={I18n.t('new-Account')}
        />
        <ScrollView style={styles.container}>

          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 26, marginBottom: 100 }}>
            <View style={{ width: 187, height: 105 }}>
              <Image
                source={Images.blueLogo}
                resizeMode='contain'
              />
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
              {this.renderTextInputsView()}
            </View>
            {
              <Text style={styles.error}>{vm.errors.errors && vm.errors.errors.address ? vm.errors.errors.address : null} </Text>
            }

            <Button
              style={{ marginHorizontal: 60, borderRadius: 4, backgroundColor: '#002FA2', marginTop: 12, height: 32 }}
              onPress={this.props.social ? vm.signUpSocial : vm.signUp}
              loading={vm.isLoading}
              text={I18n.t('submitNow')}
            />

          </View>
        </ScrollView>
      </View>
    )
  }

}

