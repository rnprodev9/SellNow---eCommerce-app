import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import BaseViewModel from '../../Models/BaseViewModel'
import User from '../../Models/User'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes'
var base64 = require('base-64')

export class EditProfileStore extends BaseViewModel {
  @observable user = User
  @observable newAddress = null
  @observable showPrompt = false
  @observable photo = null
  @observable changePasswordErrors = {
    exist: false,
    oldPasswordErrorMessage: '',
    newPasswordErrorMessage: '',
    confirmPasswordErrorMessage: ''
  }
  onStartUp = async () => {
    try {
      this.isLoading = true
      await this.user.getUserProfile()
      this.isLoading = false
    } catch (e) {
      console.log('ERROR LOADING USER PROFILE => ', e)
      this.errors = e
    }
  }

  onFirstNameChange = t => (this.user.first_name = t)
  onLastNameChange = t => (this.user.last_name = t)
  onMobileChange = t => (this.user.Mobile = t)
  onLocationChange = location => (this.user.newLocation = location)
  onAddressChange = t => {
    console.log('NEW ADDRESS CHANGED => ', t)
    this.user.newAddress = t
    this.newAddress = t
  }

  onAboutChange = t => (this.user.about_seller = t)

  onOldPassChange = p => (this.user.currentPassword = p)
  onNewPassChange = p => (this.user.new_password = p)

  onConfPassChange = p => (this.user.conf_password = p)

  onShowPrompt = () => (this.showPrompt = !this.showPrompt)

  reset = () => {
    this.user.currentPassword = null
    this.user.new_password = null
    this.user.conf_password = null
    this.changePasswordErrors = {
      exist: false,
      oldPasswordErrorMessage: '',
      newPasswordErrorMessage: '',
      confirmPasswordErrorMessage: ''
    }
  }

  checkPasswordError = () => {
    if (!this.user.new_password || this.user.new_password.length < 6) {
      this.changePasswordErrors = {
        exist: true,
        newPasswordErrorMessage: 'password length should not be less than 6 characters'
      }
    }

    if (
      !this.user.conf_password ||
      this.user.conf_password !== this.user.new_password
    ) {
      this.changePasswordErrors = {
        exist: true,
        newPasswordErrorMessage: 'confirmation password does not match new password'
      }
    } else {
      this.changePasswordErrors = {
        exist: false,
        newPasswordErrorMessage: ''
      }
    }

    if (!this.user.currentPassword || this.user.currentPassword.length < 6) {
      this.changePasswordErrors = {
        exist: true,
        oldPasswordErrorMessage: 'wrong password'
      }
    }
    if (!this.changePasswordErrors || !this.changePasswordErrors.exist) {
      this.changePasswordErrors = {
        exist: false,
        oldPasswordErrorMessage: '',
        newPasswordErrorMessage: '',
        confirmPasswordErrorMessage: ''
      }
    }

    console.log(
      '--------------------- CHANGE PASSWORD ERRORS => ',
      this.changePasswordErrors
    )
    if (this.changePasswordErrors.exist == true) {
      return new Promise((_, reject) => reject(this.changePasswordErrors))
    } else {
      Actions.pop()
    }
  }

  updateUserProfile = async ({
    reg_type = this.user.reg_by,
    first_name = this.user.first_name,
    last_name = this.user.last_name,
    mobile = this.user.mobile,
    longitude = this.user.newLocation
      ? this.user.newLocation.longitude
      : this.user.longitude,
    latitude = this.user.newLocation
      ? this.user.newLocation.latitude
      : this.user.latitude,
    address = this.user.newAddress ? this.user.newAddress : this.user.address,
    password = this.user.currentPassword
      ? this.user.currentPassword
      : this.user.password,
    profile_pic = this.photo || this.user.photo,
    about_you = this.user.about_seller,
    social
  }) => {
    if (!password && !social) {
      this.onShowPrompt()
      return
    }
    this.showPrompt = false
    try {
      this.isLoading = true
      let options = {
        reg_type,
        first_name,
        last_name,
        mobile,
        longitude,
        latitude,
        address,
        about_you
      }

      if (!social) options.password = password

      if (profile_pic) {
        // options.profile_pic = {
        //   image: base64.encode(profile_pic.data),
        //   name: profile_pic.fileName
        // }
        options.profile_pic_image = base64.encode(profile_pic.data)
        options.profile_pic_name = profile_pic.fileName
      }

      this.user.new_password
        ? (options.new_password = this.user.new_password)
        : null
      this.user.conf_password
        ? (options.conf_password = this.user.conf_password)
        : null
      let res = await this.user.updateProfile(options)
      res = this.user.getResult(res)
      Actions.UserProfile()
      Snackbar.show({
        title: 'Profile updated successfully',
        length: 3000,
        backgroundColor: Colors.mainColor
      })
      let l = await this.user.login(
        this.user.email,
        options.new_password || options.password
      )
      this.isLoading = false
      return res
    } catch (e) {
      this.isLoading = false
      if (!e.code) {
        Actions.UserProfile()
        Snackbar.show({
          title: 'Profile updated successfully',
          length: 3000,
          backgroundColor: Colors.mainColor
        })
      }
      console.log('UPDATING USER PROFILE ERROR => ', e)
      this.errors = e
    }
  }
}

export default new EditProfileStore()
