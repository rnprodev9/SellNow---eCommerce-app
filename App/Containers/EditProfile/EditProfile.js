import React from 'react'
import { ScrollView, ActivityIndicator, Text, KeyboardAvoidingView, Image, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Images, Colors } from '../../Themes'
import TopBar from '../../Components/TopBar'
import TextInputField from '../../Components/TextInputField'
import Button from '../../Components/FullButton'
import { Actions } from 'react-native-router-flux'
import { photoSelector } from '../../Utils/photoSelector'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './EditProfileStyle'
import { observer } from 'mobx-react'
import vm from './EditProfileStore'
import Prompt from 'react-native-prompt'
import I18n from 'react-native-i18n'
const textInputStyle = { color: '#7B7B7B' }

@observer
export default class EditProfile extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    vm.onStartUp()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.reload) this.setState({})
  }

  renderTextInputsView = () => {
    if (vm.isLoading) return <View style={{ flex: 1 }}><ActivityIndicator style={{ flex: 1 }} size='large' /></View>
    console.log(vm.user.newAddress)
    return (
      <KeyboardAvoidingView behavior='position' style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch' }}>
        <TextInputField
          onChangeText={vm.onFirstNameChange}
          styles={textInputStyle}
          title={I18n.t('firstName')}
          titleStyle={styles.titleInputText}
          containerStyle={styles.textInput}
          textInputStyle={{ borderBottomWidth: 0 }}
          defaultValue={vm.user.first_name}
        // onChangeText={vm.onFirstNameChange}
        // error={vm.errors}
        // errorMessage={vm.errors.errors ? vm.errors.errors.first_name : ''}
        />
        <TextInputField
          onChangeText={vm.onLastNameChange}
          styles={textInputStyle}
          title={I18n.t('lastName')}
          titleStyle={styles.titleInputText}
          containerStyle={styles.textInput}
          textInputStyle={{ borderBottomWidth: 0 }}
          defaultValue={vm.user.last_name}
        // onChangeText={vm.onLastNameChange}
        // error={vm.errors}
        // errorMessage={vm.errors.errors ? vm.errors.errors.last_name : ''}
        />
        <TextInputField
          onChangeText={vm.onMobileChange}
          styles={[textInputStyle, { height: 28 }]}
          title={I18n.t('mobileNo')}
          titleStyle={styles.titleInputText}
          containerStyle={styles.textInput}
          textInputStyle={{ borderBottomWidth: 0, height: 28 }}
          defaultValue={vm.user.mobile}
          // onChangeText={vm.onmMobileChange}
          // error={vm.errors}
          // errorMessage={vm.errors.errors ? vm.errors.errors.mobile : ''}
          keyboardType='numeric'
        />
        <TouchableOpacity style={styles.pickLocationView} onPress={() => Actions.SelectAddressMapScreen({ onLocationChange: vm.onLocationChange, onAddressChange: vm.onAddressChange })}>
          <Text style={styles.pickLocationText}>
            {vm.user.newAddress ? vm.user.newAddress : vm.user.address}
          </Text>
          <View style={{ width: 24, height: 24, position: 'absolute', right: 8, bottom: 0 }}>
            <Image source={Images.pickIcon} resizeMode='contain' />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

  openPhotoSelect = () => {
    photoSelector()
      .then((image) => {
        vm.photo = image
      })
  }

  render() {
    let pic = null
    if (vm.photo && vm.photo.uri) pic = { uri: vm.photo.uri }
    else if (vm.user.picture) pic = { uri: vm.user.picture }
    else pic = Images.addPhoto

    return (
      <View>
        <TopBar
          leftImage={I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft}
          leftText={I18n.t('Back')}
          title={I18n.t('editProfile')}
          rightText={I18n.t('save')}
          rightAction={() => vm.updateUserProfile({ social: vm.user.reg_by != 'google' && vm.user.reg_by != 'facebook' ? false : true })}
          leftAction={Actions.UserProfile}
        />
        <ScrollView style={styles.container}>
          {/* Image profile */}
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 150 }}>
            <TouchableOpacity onPress={this.openPhotoSelect} style={styles.profileImageView}>
              <Image
                source={pic || Images.addPhoto}
                resizeMode='cover'
                style={styles.profileImage}
              />
            </TouchableOpacity>
            {/* Change Password */}
            {
              vm.user.reg_by != 'google' && vm.user.reg_by != 'facebook' ?
                <TouchableOpacity style={styles.changePasswordView} onPress={() => {
                  Actions.ChangePassword({
                    onOldPassChange: vm.onOldPassChange,
                    onNewPassChange: vm.onNewPassChange,
                    onConfPassChange: vm.onConfPassChange,
                    checkErrors: vm.checkPasswordError,
                  })
                }} >
                  <Text style={{ color: '#7B7B7B', fontSize: 17 }}>{I18n.t('ChangePassword')}</Text>
                  <Image source={Images.chevronRight} style={styles.imageStyle} resizeMode='contain' />
                </TouchableOpacity> : null
            }

            <View style={styles.profileInfo}>
              <Text style={{ color: 'white', fontSize: 17 }}> {I18n.t('ProfileInfo')} </Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch' }}>
              {this.renderTextInputsView()}
            </View>
            {
              // <Text style={styles.error}>{vm.errors.errors && vm.errors.errors.address ? vm.errors.errors.address : null} </Text>
            }

            {!vm.isLoading ? <TextInputField
              onChangeText={vm.onAboutChange}
              styles={textInputStyle}
              containerStyle={{ borderWidth: StyleSheet.hairlineWidth, borderColor: '#979797', paddingHorizontal: 10, borderRadius: 12, marginTop: 20 }}
              MultiLines
              placeholder={I18n.t('Aboutyou')}
              defaultValue={vm.user.about_seller}
            /> : null}

          </View>
        </ScrollView>
        <Prompt
          title={I18n.t('Pleasecontinue')}
          placeholder={I18n.t('password')}
          defaultValue=''
          visible={vm.user.reg_by != 'google' && vm.user.reg_by != 'facebook' && vm.showPrompt}
          onCancel={vm.onShowPrompt}
          onSubmit={(value) => vm.updateUserProfile({ password: value })} />
      </View>
    )
  }

}

