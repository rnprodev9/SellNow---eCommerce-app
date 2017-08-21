import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Modal
} from 'react-native'
import StarRating from 'react-native-star-rating'
import styles from './AddPostScreenStyle'

import { Actions } from 'react-native-router-flux'
import { observer } from 'mobx-react/native'

import TopBar from '../../Components/TopBar'
import { Colors, Images, Metrics } from '../../Themes/'
import Button from '../../Components/FullButton'
import Swiper from 'react-native-swiper'
import Background from '../../Components/BackgroundImage'
import vm from './AddPostStore'
import AddPhotos from '../../Components/AddPhotos'
import TextInputField from '../../Components/TextInputField'
import { Switch } from '../../Components/Switch'
import ConfirmationPopUp from '../../Components/ConfirmationPopUP'
import I18n from 'react-native-i18n'
const textInputStyle = { color: 'black', marginBottom: 10 }

@observer
export default class AddPostScreen extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      modalVisible: false,
      openCamera: false,
      openGallery: false,
      isFeaturedPopUpHint: false
    }
    vm.onStartUp()
  }
  componentWillMount () {
    if (this.props.edit && this.props.id) {
      vm.loadItemData(this.props.id)
    }
  }

  componentDidMount () {
    vm.errors = {}
    if (this.props.edit) {
      this.setState({
        modalVisible: false
      })
    } else {
      this.setState({
        modalVisible: true
      })
    }
  }

  getPhotos = photos => {
    vm.photos = photos
  }

  buttonClick = condition => {
    this.setState({
      openCamera: false,
      openGallery: false
    })
    if (condition == 'new') {
      vm.condition = 'new'
    } else if (condition == 'used') {
      vm.condition = 'used'
    }
  }

  pickImage = () => {
    this.setState({
      modalVisible: true,
      openCamera: false,
      openGallery: false
    })
  }
  addingPost = false
  closeModal = () => {
    if (!this.addingPost) {
      Actions.pop()
    }
    this.setState({
      modalVisible: false,
      openCamera: false,
      openGallery: false
    })
  }

  openCamera = async () => {
    this.addingPost = true
    let image = await AddPhotos.openCamera('TITLE')
    vm.onImageSelected(image)
    this.setState({
      modalVisible: false
    })
  }

  openGallery = async () => {
    this.addingPost = true
    let image = await AddPhotos.openGallery('TITLE')
    vm.onImageSelected(image)
    this.setState({
      modalVisible: false
    })
  }

  postItem = async () => {
    vm.saveItem({
      title: vm.itemName,
      description: vm.description,
      price: vm.price,
      images: vm.photos.slice(),
      category: vm.selectedCategoryId || vm.selectedSubCategoryId,
      item_condition: vm.condition,
      isFeatured: vm.isFeatured,
      item_id: this.props.id ? this.props.id : null,
      action_type: this.props.id ? 'update' : 'add'
    })
  }

  close = () => {
    this.setState({
      openGallery: false,
      openCamera: false
    })
  }

  showPopUp = () => {
    this.setState({
      isFeaturedPopUpHint: true
    })
  }

  hidePopUp = () => {
    this.setState({
      isFeaturedPopUpHint: false
    })
  }

  onImageSelected = () => {
  }

  render () {
    if (vm.isLoading) return <ActivityIndicator style={{ flex: 1 }} size='large' />

    return (
      <View style={styles.container}>
        <ConfirmationPopUp
          showConfirmationModal={this.state.isFeaturedPopUpHint}
          confirmationTitle={I18n.t('upgrade')}
          confirmationMessage={I18n.t('confirmUpgrade')}
          closeConfirmationModal={this.hidePopUp}
          confirmAction={() => {
            this.hidePopUp()
            Actions.Upgrade()
          }}
        />
        <TopBar
          disableLeftImage
          leftText={I18n.t('cancel')}
          rightText={I18n.t('post')}
          rightAction={this.postItem}
        />
        <ScrollView>
          {/* add photos componenet */}
          <AddPhotos
            close={this.close}
            pickImage={this.pickImage}
            openCamera={this.state.openCamera}
            openGallery={this.state.openGallery}
            getPhotos={this.getPhotos}
            openImagePicker
            photosLength={vm.maxPhotosNum}
            photos={vm.photos.slice()}
            style={{ backgroundColor: '#F3F1F2' }}
            onImageSelected={this.onImageSelected}
            deletePhoto={vm.deletePhoto}
          />
          {/* text inputs */}

          {vm.errors && vm.errors.errors && vm.errors.errors.images
            ? <View style={{ marginHorizontal: 20 }}>
              <Text style={[styles.errorText, { textAlign: 'center' }]}>
                {vm.errors.errors.images}
              </Text>
            </View>
            : null}

          <View>
            <TextInputField
              styles={textInputStyle}
              placeholder={I18n.t('whatSelling')}
              onChangeText={vm.onItemNameChange}
              containerStyle={{
                borderRadius: 8,
                marginHorizontal: 10,
                height: 32,
                backgroundColor: 'white',
                justifyContent: 'center',
                marginVertical: 5
              }}
              value={vm.itemName}
            />

            {vm.errors && vm.errors.errors && vm.errors.errors.title
              ? <View style={{ marginHorizontal: 20 }}>
                <Text style={[styles.errorText, { textAlign: 'left' }]}>
                  {vm.errors.errors.title}
                </Text>
              </View>
              : null}

            <TouchableOpacity
              onPress={Actions.SelectCategories}
              style={{
                height: 32,
                backgroundColor: 'white',
                borderRadius: 8,
                flexDirection: I18n.t('direction'),
                paddingHorizontal: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                marginVertical: 5
              }}
            >
              <Text
                style={{
                  color: Colors.cloud,
                  backgroundColor: Colors.transparent
                }}
              >
                {' '}{vm.selectedCategoryTitle || I18n.t('selectCategory')}{' '}
              </Text>
              <Image
                source={
                  I18n.locale == 'en' ? Images.arrowRight : Images.chevronAr
                }
                style={{ height: 20, width: 20 }}
                resizeMode='contain'
              />
            </TouchableOpacity>

            {vm.errors && vm.errors.errors && vm.errors.errors.category
              ? <View style={{ marginHorizontal: 20 }}>
                <Text style={[styles.errorText, { textAlign: 'left' }]}>
                  {vm.errors.errors.category}
                </Text>
              </View>
              : null}

            <TextInputField
              onChangeText={vm.onDescriptionChange}
              styles={[textInputStyle]}
              placeholder={I18n.t('describeIt')}
              MultiLines
              containerStyle={{
                borderRadius: 8,
                marginHorizontal: 10,
                height: 100,
                backgroundColor: 'white',
                marginVertical: 5
              }}
              value={vm.description}
            />

            {vm.errors && vm.errors.errors && vm.errors.errors.description
              ? <View style={{ marginHorizontal: 20 }}>
                <Text style={[styles.errorText, { textAlign: 'left' }]}>
                  {vm.errors.errors.description}
                </Text>
              </View>
              : null}
            {/* buttons container */}

            <View
              style={{
                flexDirection: I18n.t('direction'),
                height: 40,
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingHorizontal: 10
              }}
            >
              <Button
                style={[
                  styles.buttonStyle,
                  {
                    backgroundColor: vm.condition == 'new'
                      ? '#003CD2'
                      : '#FFFFFF'
                  }
                ]}
                text={I18n.t('new')}
                styleText={{
                  color: vm.condition == 'new' ? '#FFFFFF' : '#BFBFBF'
                }}
                onPress={() => {
                  this.buttonClick('new')
                }}
              />
              <Button
                style={[
                  styles.buttonStyle,
                  {
                    backgroundColor: vm.condition == 'used'
                      ? '#003CD2'
                      : '#FFFFFF'
                  }
                ]}
                text={I18n.t('used')}
                styleText={{
                  color: vm.condition == 'used' ? '#FFFFFF' : '#BFBFBF'
                }}
                onPress={() => {
                  this.buttonClick('used')
                }}
              />
            </View>

            <View
              style={{
                flexDirection: I18n.t('direction'),
                justifyContent: 'flex-end',
                paddingHorizontal: 20,
                paddingVertical: 10
              }}
            >
              <View
                style={{
                  minHeight: 40,
                  flexDirection: I18n.t('direction'),
                  alignItems: 'center'
                }}
              >
                <Text> {I18n.t('price')} : </Text>
                <TextInput
                  onChangeText={vm.onPriceChange}
                  underlineColorAndroid={Colors.transparent}
                  style={{
                    width: 100,
                    height: 32,
                    borderRadius: 8,
                    padding: 5,
                    backgroundColor: 'white'
                  }}
                  value={vm.price}
                  keyboardType='numeric'
                />
              </View>

            </View>
            {vm.errors && vm.errors.errors && vm.errors.errors.price
              ? <View style={{ marginHorizontal: 20 }}>
                <Text style={[styles.errorText, { textAlign: 'right' }]}>
                  {vm.errors.errors.price}
                </Text>
              </View>
              : null}

            {/* promote your item View */}
            <View
              style={{
                marginTop: 30,
                marginBottom: 20,
                flexDirection: I18n.t('direction'),
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 1,
                  borderWidth: 0.5,
                  borderColor: '#6A6869'
                }}
              />
              <Text style={styles.promoteText}>{I18n.t('promoteItem')}</Text>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  borderWidth: 0.5,
                  borderColor: '#6A6869'
                }}
              />
            </View>
            {/* List Feature View */}
            <View
              style={{
                flexDirection: I18n.t('direction'),
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                marginBottom: 50
              }}
            >
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={Images.listFeatureIcon}
                    style={{ width: 32, height: 32, marginHorizontal: 5 }}
                    resizeMode='contain'
                  />
                  <View>
                    <Text style={styles.listFeatureTitle}>
                      {I18n.t('listFeature')}
                    </Text>
                    <Text>{I18n.t('ava')}</Text>
                  </View>
                </View>
                <Text style={styles.listFeatureDescription}>
                  {I18n.t('your')}
                </Text>
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {
                  !vm.canFeatured ?
                    <TouchableOpacity
                      onPress={this.showPopUp}
                      style={{ alignItems: 'center', justifyContent: 'center' }}
                  >
                      <Switch
                        value={vm.isFeatured}
                        onValueChange={() => { }}
                        disabled
                        activeText={''}
                        inActiveText={''}
                        backgroundActive={Colors.silver}
                        backgroundInactive={Colors.silver}
                        circleActiveColor={Colors.darkGray}
                        circleInActiveColor={Colors.steel}
                    />
                      <View
                        style={{
                          zIndex: 1,
                          position: 'absolute',
                          width: 80,
                          height: 50
                        }}
                    />
                    </TouchableOpacity> : null
                }

              </View>
              {
                vm.canFeatured ? <Switch
                  value={vm.isFeatured}
                  onValueChange={vm.onFeaturedChanged}
                  activeText={''}
                  inActiveText={''}
                  backgroundActive={Colors.silver}
                  backgroundInactive={Colors.silver}
                  circleActiveColor={Colors.darkGray}
                  circleInActiveColor={Colors.steel}
                    /> : null
              }
            </View>
          </View>
          {/* Modal Section */}
          <Modal
            animationType={'slide'}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={this.closeModal}
          >

            <Image
              source={Images.addPostBg}
              resizeMode='cover'
              style={{ alignSelf: 'center' }}
            >
              <View
                style={{ alignItems: 'center', flex: 1, alignSelf: 'center' }}
              >
                <TouchableOpacity
                  onPress={this.closeModal}
                  style={{ marginTop: 40, height: 29, width: 29 }}
                >
                  <Image
                    source={Images.xWhite}
                    style={{ height: 29, width: 29 }}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    height: 180,
                    paddingTop: 40
                  }}
                >
                  <Text style={styles.modalTitleText}>
                    {I18n.t('addPost')}
                  </Text>
                  <Text style={styles.modalDescriptionText}>
                    {I18n.t('addPostDes')}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 40,
                    justifyContent: 'center',
                    height: 160,
                    width: 350
                  }}
                >
                  <TouchableOpacity onPress={this.openCamera}>
                    <Image
                      source={Images.camara}
                      style={styles.modalCameraIcon}
                      resizeMode='contain'
                    />
                    <Text style={styles.modalIconTitle}>
                      {I18n.t('camera')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.openGallery}>
                    <Image
                      source={Images.gallary}
                      style={styles.modalCameraIcon}
                      resizeMode='contain'
                    />
                    <Text style={styles.modalIconTitle}>
                      {I18n.t('photos')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Image>
          </Modal>
        </ScrollView>
      </View>
    )
  }
}
