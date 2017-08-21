import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView, Modal } from 'react-native'
import styles from './Styles/AddPhotosStyle'
import Swiper from 'react-native-swiper'
import { observable, action } from 'mobx'
import { photoSelector, openCamera, openGallery } from '../Utils/photoSelector'
import { Colors, Images, Metrics } from '../Themes'
import PropTypes from 'prop-types'
import ConfirmPopUp from '../Components/ConfirmationPopUP'
import I18n from 'react-native-i18n'
export default class AddPhotos extends React.Component {
  constructor (props) {
    super(props)
    AddPhotos.propTypes = {
      requiredLength: PropTypes.number,
      getPhotos: PropTypes.func.isRequired
    }

    this.state = {
      photos: [],
      modalVisible: true,
      showUpgradeMessage: false
    }
  }

  static openCamera = async (title) => {
    let image = await openCamera(title)
    return image
  }

  static openGallery = async (title) => {
    let image = await openGallery(title)
    return image
  }

  deletePhoto = (index) => {
    // let photoArray = this.state.photos
    // photoArray.splice(index, 1)
    // this.setState({
    //   photos: photoArray
    // })
    this.props.deletePhoto(index)
  }

  hintUpgrade = () => {
    this.showMessage()
  }

  showMessage = () => {
    this.setState({
      showUpgradeMessage: true
    })
  }

  hideMessage = () => {
    this.setState({
      showUpgradeMessage: false
    })
  }

  renderPhotos = () => {
    let photoWidth = this.props.photos.length > 1 && this.props.photos.length < 3 ? (Metrics.screenWidth / 2) - 10 : this.props.photos.length > 2 ? (Metrics.screenWidth / 2) - 40 : Metrics.screenWidth - 20
    return (
      <ScrollView
        horizontal
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews>
        {
          this.props.photos.map((photo, index) => {
            return (
              <View key={index} style={{ width: photoWidth, height: 180 }}>
                <Image source={{ uri: photo }} style={{ alignSelf: 'stretch', width: (photoWidth - 5), height: 175, margin: 5 }} resizeMode='cover' />
                <TouchableOpacity onPress={() => { this.deletePhoto(index) }} style={{ width: 18, height: 18, position: 'absolute', top: 8, right: 3, zIndex: 10 }}>
                  <Image source={Images.x} style={{ width: 18, height: 18 }} />
                </TouchableOpacity>
              </View>
            )
          })
        }
      </ScrollView >

    )
  }

  render () {
    let requiredLength = this.props.photosLength ? this.props.photosLength : 3
    return (
      <View style={[{ height: 220, alignItems: 'center', justifyContent: 'center' }, this.props.style]}>
        <ConfirmPopUp
          hideCancelBtn
          confirmationTitle='Photos Limit'
          confirmationMessage='Upgrade your subscription to add more photos'
          showConfirmationModal={this.state.showUpgradeMessage}
          closeConfirmationModal={this.hideMessage}
          confirmText='Ok'
          confirmAction={this.hideMessage}
        />

        {this.props.photos.length < 1 ?
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch', zIndex: -5 }}>
            <Text style={{ alignSelf: 'center', fontSize: 20, textAlign: 'center' }}>{I18n.t('clickAdd')}</Text>
          </View> : this.renderPhotos()
        }
        <TouchableOpacity onPress={() => {
          requiredLength == this.props.photos.length ? this.hintUpgrade() : this.props.pickImage()
        }} style={{ position: 'absolute', bottom: 0, alignSelf: 'center', zIndex: 20, height: 60, width: 60, borderRadius: 40, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={Images.addPhoto} resizeMode='contain' style={{ width: 60, height: 60 }} />
        </TouchableOpacity>

      </View>
    )
  }
}

