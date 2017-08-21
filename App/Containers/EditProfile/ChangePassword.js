import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import TopBar from '../../Components/TopBar'
import TextInputField from '../../Components/TextInputField'
import { Images, Colors } from '../../Themes'
import { Actions } from 'react-native-router-flux'
import vm from './EditProfileStore'
import { observer } from 'mobx-react'
import I18n from 'react-native-i18n'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './ChangePasswordStyle'
const textInputStyle = { color: 'black' }

@observer
class ChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hideOldPassword: true,
      hideNewPassword: true,
      hideConfirmPassword: true
    }
  }

  componentWillMount() {
    vm.reset()
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <TopBar
          leftImage={I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft}
          leftText={I18n.t('Back')}
          rightText={I18n.t('save')}
          title={I18n.t('ChangePassword')}
          rightAction={this.props.checkErrors}
          leftAction={() => {
            vm.reset()
            Actions.pop()
          }}
        />
        <KeyboardAvoidingView behavior='position' style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.inputView}>
            <TextInputField
              onChangeText={this.props.onOldPassChange}
              styles={textInputStyle}
              textInputStyle={{ borderBottomWidth: 0 }}
              // onChangeText={vm.onPasswordChange}
              secureTextEntry={this.state.hideOldPassword}
              placeholder={I18n.t('OldPassword')}
            //error={vm.changePasswordErrors}
            //errorMessage={vm.changePasswordErrors ? vm.changePasswordErrors.oldPasswordErrorMessage : null}
            />
            <TouchableOpacity onPress={() => { this.setState({ hideOldPassword: !this.state.hideOldPassword }) }}
              style={{ width: 36, height: 36, position: 'absolute', right: 8, bottom: 8 }}>
              <Image source={Images.passwordEye} resizeMode='contain' />
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInputField
              onChangeText={this.props.onNewPassChange}
              styles={textInputStyle}
              textInputStyle={{ borderBottomWidth: 0 }}
              // onChangeText={vm.onPasswordChange}
              secureTextEntry={this.state.hideNewPassword}
              placeholder={I18n.t('NewPassword')}
            // error={vm.errors}
            // errorMessage={ vm.customErrors ? vm.customErrors : vm.errors.errors ? vm.errors.errors.password : ''}
            />
            <TouchableOpacity onPress={() => { this.setState({ hideNewPassword: !this.state.hideNewPassword }) }}
              style={{ width: 36, height: 36, position: 'absolute', right: 8, bottom: 8 }}>
              <Image source={Images.passwordEye} resizeMode='contain' />
            </TouchableOpacity>
          </View>
          <View style={styles.inputView}>
            <TextInputField
              onChangeText={this.props.onConfPassChange}
              styles={textInputStyle}
              textInputStyle={{ borderBottomWidth: 0 }}
              // onChangeText={vm.onPasswordChange}
              secureTextEntry={this.state.hideConfirmPassword}
              placeholder={I18n.t('ConfirmPassword')}
            // error={vm.errors}
            // errorMessage={ vm.customErrors ? vm.customErrors : vm.errors.errors ? vm.errors.errors.password : ''}
            />
            <TouchableOpacity onPress={() => { this.setState({ hideConfirmPassword: !this.state.hideConfirmPassword }) }}
              style={{ width: 36, height: 36, position: 'absolute', right: 8, bottom: 8 }}>
              <Image source={Images.passwordEye} resizeMode='contain' />
            </TouchableOpacity>
          </View>
          {
            vm.changePasswordErrors && vm.changePasswordErrors.exist ?

              <View style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 20 }}>
                {
                  vm.changePasswordErrors && vm.changePasswordErrors.oldPasswordErrorMessage ?
                    <View>
                      <Text style={styles.error}>{vm.changePasswordErrors.oldPasswordErrorMessage}</Text>
                    </View>
                    :
                    vm.changePasswordErrors && vm.changePasswordErrors.newPasswordErrorMessage ?
                      <View>
                        <Text style={styles.error}>{vm.changePasswordErrors.newPasswordErrorMessage}</Text>
                      </View>
                      : null
                }
              </View>
              : null}
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }

}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
