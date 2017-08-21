import React from 'react'
import {
  View, Text, Image, StyleSheet, Platform, ScrollView, ActivityIndicator, TouchableOpacity, Modal, TextInput, Clipboard, ToastAndroid, TouchableWithoutFeedback,
  AlertIOS
} from 'react-native'
import StarRating from 'react-native-star-rating'
import styles from './ProductDetailsStyle'
import { observer } from 'mobx-react/native'
import AndroidBackButton from 'react-native-android-back-button'
import TopBar from '../../Components/TopBar'
import { Colors, Images, Metrics, Fonts } from '../../Themes/'
import Btn from '../../Components/FullButton'
import Swiper from 'react-native-swiper'
import Background from '../../Components/BackgroundImage'
import OtherSellerList from '../../Components/OtherSellerItem'
import ConnectButton from '../../Components/ConnectButtons'
import ProductList from '../../Components/ProductList'
import vm from './ProductDetailsStore'
import PhotoSwiper from '../../Components/PhotoSlider'
import { Actions } from 'react-native-router-flux'
import PopUp from '../../Components/PopUp'
import I18n from 'react-native-i18n'
import BaseModel from '../../Models/BaseModel'
import Share, { ShareSheet, Button } from 'react-native-share'
@observer
export default class ProductDetails extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      starCount: -1,
      inWishList: false,
      like: false,
      follow: false,
      showOptions: false,
      confirmModal: false,
      editing: false,
      deleting: false,
      normalUserOptionsVisible: false,
      showPopUpDialog: false,
      visible: false,
      blockBtn: true
    }

    vm.loadItemData(props.productId)
    // vm.loadOtherSellerItemss(vm.item.owner_id)
  }
  componentWillMount () {
    if (this.props.productId) {
      vm.loadItemData(this.props.productId)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.productId != nextProps.productId) {
      vm.loadItemData(nextProps.productId)
    }
  }

  onStarRatingPress (rating) {
    this.setState({
      starCount: rating
    })
  }

  addRemoveWish = () => {
    this.setState({
      inWishList: !this.state.inWishList
    })
  }

  likeUnlike = (i) => {
    vm.likeItemAction(i)
    this.props.itemComponentOnLike(i)
  }

  showOptions = () => {
    this.setState({
      showOptions: !this.state.showOptions
    })
  }

  onUserImagePress = () => Actions.SellerProfile({ userId: this.props.owner_id })

  showNormalUserOptions = () => this.setState({ normalUserOptionsVisible: !this.state.normalUserOptionsVisible })

  onReportItemPress = () => {
    Actions.ReportItem({ itemId: vm.item.id, direction: 'vertical' })
    // this.showNormalUserOptions()
  }

  onUserImagePress = () => Actions.SellerProfile({ userId: this.props.owner_id })

  showPopUp = () => {
    this.setState({
      showPopUpDialog: true
    })
  }

  hidePopUp = () => {
    this.setState({
      showPopUpDialog: false
    })
  }

  // share open and cancel
  onCancel = () => {
    this.setState({ visible: false })
  }
  onOpen = () => {
    this.setState({ visible: true })
  }

  render () {
    if (vm.isLoading) return <ActivityIndicator style={{ flex: 1 }} size='large' />
    let popUpOptions = [
      report = {
        text: I18n.t('ReportThisItem'),
        func: this.onReportItemPress
      },
      this.state.blockBtn ? block = {
        text: I18n.t('BlockSeller'),
        hasConfirmation: true,
        confirmationTitle: I18n.t('BlockSeller'),
        confirmationMessage: I18n.t('Doblock') + vm.item.owner,
        func: () => { vm.blockUser(vm.item.owner_id); Actions.popTo({ scene: 'HomeScreen', refresh: { reload: true } }) }
      } : null
    ]
    let Base = new BaseModel()
    let splitUrl = Base.baseUrl.split('api_system/')[0]
    let shareOptions = {
      title: vm.slug,
      message: 'SellNow',
      url: splitUrl + vm.slug,
      subject: 'Sell Now Product' //  for email
    }

    return (
      <View style={styles.container}>
        <AndroidBackButton onPress={() => Actions.pop({refresh: { reload: true }})} />
        <Modal
          visible={this.state.visible}
          onRequestClose={this.onCancel.bind(this)}
          transparent
          animationType='slide'
        >
          <TouchableWithoutFeedback onPress={this.onCancel}>
            <View style={{ flex: 1, backgroundColor: Colors.transparent }} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.socialShareView}>
              <TouchableOpacity
                onPress={() => {
                  this.onCancel()
                  setTimeout(() => {
                    Share.shareSingle(Object.assign(shareOptions, {
                      'social': 'twitter'
                    }))
                  }, 300)
                }} >
                <Image
                  resizeMode='contain'
                  style={styles.socialIcon}
                  source={Images.twitter}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.onCancel()
                  setTimeout(() => {
                    Share.shareSingle(Object.assign(shareOptions, {
                      'social': 'facebook'
                    }))
                  }, 300)
                }}>
                <Image source={Images.facebook} style={styles.socialIcon}
                  resizeMode='contain'
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.onCancel()
                  setTimeout(() => {
                    Share.shareSingle(Object.assign(shareOptions, {
                      'social': 'whatsapp'
                    }))
                  }, 300)
                }}
              >
                <Image source={Images.whatsapp} style={styles.socialIcon}
                  resizeMode='contain'
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.onCancel()
                  setTimeout(() => {
                    Share.shareSingle(Object.assign(shareOptions, {
                      'social': 'email'
                    }))
                  }, 300)
                }}
              >
                <Image source={Images.email} style={styles.socialIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.onCancel()
                  setTimeout(() => {
                    if (typeof shareOptions['url'] !== undefined) {
                      Clipboard.setString(shareOptions['url'])
                      if (Platform.OS === 'android') {
                        ToastAndroid.show('Link Has Been Copied to Clipboard', ToastAndroid.SHORT)
                      } else if (Platform.OS === 'ios') {
                        AlertIOS.alert('Link Has Been Copied to Clipboard')
                      }
                    }
                  }, 300)
                }}
              >
                <Image source={Images.mail} style={styles.socialIcon}
                  resizeMode='contain'
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.onCancel()
                  setTimeout(() => {
                    Share.open(shareOptions)
                  }, 300)
                }}><Text style={{ ...Fonts.style.h5 }} >... More</Text></TouchableOpacity>

              <TouchableOpacity onPress={this.onCancel} style={{ position: 'absolute', bottom: 30, left: 0, right: 0, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={Images.xGray} style={{ height: 30, width: 30 }}
                  resizeMode='contain'
                />
              </TouchableOpacity>

            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <PopUp options={popUpOptions} dialogVisible={this.state.showPopUpDialog} closeDialogModal={this.hidePopUp} />
        {/* Show Options Modal */}

        <Modal
          visible={this.state.showOptions}
          animationType='fade'
          transparent
          onRequestClose={this.showOptions}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <View style={{ width: Metrics.screenWidth - 60, height: Metrics.screenWidth / 2, backgroundColor: '#FFFFFF', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>

              <TouchableOpacity onPress={() => {
                vm.edit()
                this.showOptions()
              }} style={styles.modalField}>
                <Text>{I18n.t('Edit')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                vm.delete()
                this.showOptions()
              }}
                style={styles.modalField} >
                <Text>{I18n.t('Delete')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalField} onPress={() => {
                Actions.PostStatus()
                this.showOptions()
                { /* this.setState({showPop}) */ }
              }}>
                <Text>{I18n.t('PostStatus')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.showOptions} style={[styles.modalField, { borderBottomWidth: 0 }]}>
                <Text>{I18n.t('cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Show Normal Options Modal */}
        {/* <Modal
          visible={this.state.normalUserOptionsVisible}
          animationType='fade'
          transparent
          onRequestClose={this.showNormalUserOptions}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <View style={{ width: Metrics.screenWidth - 60, height: Metrics.screenWidth / 2, backgroundColor: '#FFFFFF', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>

              <TouchableOpacity onPress={this.onReportItemPress} style={styles.modalField}>
                <Text>Report This Item</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.showNormalUserOptions} style={[styles.modalField, { borderBottomWidth: 0 }]}>
                <Text>Cancel</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal> */}

        {/* Confirmation Modal */}

        <Modal
          visible={vm.editing || vm.deleting}
          animationType='fade'
          transparent
          onRequestClose={vm.cancelEditDelete}
        >
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <View style={{ width: Metrics.screenWidth - 40, height: Metrics.screenWidth / 3, backgroundColor: '#FFFFFF', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>

              <View style={[styles.modalField, { borderBottomWidth: 0 }]}>
                <Text>{I18n.t('AreYouSure')}</Text>
              </View>
              <View style={styles.modalField}>
                <Text>{I18n.t('YouWant')} {vm.editing ? I18n.t('EditThisPost') : vm.deleting ? I18n.t('DeleteThisPost') : null}</Text>
              </View>
              <View style={[styles.modalField, { flexDirection: 'row', borderBottomWidth: 0 }]}>
                <TouchableOpacity onPress={vm.cancelEditDelete} style={[styles.modalField, { borderBottomWidth: 0, borderRightWidth: 1 }]}>
                  <Text>{I18n.t('cancel')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={vm.confirmEditDelete} style={[styles.modalField, { borderBottomWidth: 0 }]}>
                  <Text>{I18n.t('yes')}</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>

        <Modal
          visible={vm.makingOffer}
          animationType='fade'
          transparent
          onRequestClose={vm.cancelMakeOffer}
        >
          <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#010101' }}>
            <TouchableOpacity onPress={vm.cancelMakeOffer} style={{ marginTop: 76, marginBottom: -76, width: 32, height: 32 }}>
              <Image source={Images.xWhite} style={{ alignSelf: 'stretch' }} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: Metrics.screenWidth - 60, height: Metrics.screenWidth / 2, backgroundColor: '#FFFFFF', borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}>

                <TouchableOpacity onPress={() => {

                }} style={[styles.modalField, { borderBottomWidth: 0, marginTop: 20, marginBottom: 10 }]}>
                  <Text style={{ ...Fonts.style.h6, fontWeight: 'bold', color: '#434343' }}>{I18n.t('YOUROFFER')}</Text>
                  <Text style={{ marginTop: 10 }} >{I18n.t('SendOfferToSeller')}</Text>
                </TouchableOpacity>

                <View style={[styles.modalField]}>
                  <TextInput
                    keyboardType='numeric'
                    style={{ alignSelf: 'stretch', marginHorizontal: 24, backgroundColor: '#F4F4F4', borderRadius: 12, marginBottom: 10, textAlign: 'center' }}
                    underlineColorAndroid={Colors.transparent}
                    placeholder={I18n.t('YourOfferHere')}
                    onChangeText={vm.onChangeOfferValue}
                  />
                </View>

                <TouchableOpacity onPress={() => { vm.makeOffer(vm.offerValue) }} style={[styles.modalField, { borderBottomWidth: 0 }]}>
                  {
                    vm.isLoading ?
                      <ActivityIndicator />
                      :
                      <Text style={{ ...Fonts.style.normal, color: '#434343' }}>{I18n.t('YES')}</Text>
                  }
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </Modal>

        <TopBar
          leftImage={I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft}
          leftText={I18n.t('Back')}
          backgroundColor={Colors.transparent}
          style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, elevation: 4, zIndex: 20 }}
          rightAction={vm.isOwner ? this.showOptions : this.showPopUp}
          rightImage={Images.threeDots}
          leftTextStyle={styles.textTopbar}
          leftAction={this.props.userProfile ? () => Actions.popTo({ scene: 'UserProfile', refresh: { reload: true } }) : this.props.fromAddPost ? () => Actions.popTo({ scene: 'HomeScreen' }) : this.props.fromShare ? () => Actions.HomeScreen({ type: 'reset' }) : () => Actions.pop({ refresh: { reload: true } })}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>

            {/* Slider */}
            <View>
              <PhotoSwiper
                style={styles.photoSlider}
                height={250}
                photoHeight={{ height: 250 }}
                slides={vm.item.images.slice()}
                dotPosition={styles.dotPosition}
                dot={<View style={styles.sliderDot} />}
                activeDot={<View style={styles.activeSliderDot} />}
                paginationStyle={{
                  bottom: Platform.OS === 'ios' ? 5 : 15,
                  backgroundColor: 'red'

                }}
              />
            </View>
            {!vm.isOwner ?
              <TouchableOpacity onPress={this.onUserImagePress} style={styles.sellerImageView}>
                <Image
                  source={vm.item.owner_image && vm.item.owner_image !== 'N/A' ? { uri: vm.item.owner_image } : Images.blueLogo}
                  style={styles.sellerImage}
                  resizeMode={vm.item.owner_image && vm.item.owner_image !== 'N/A' ? 'cover' : 'contain'}
                />
              </TouchableOpacity>
              : null}
            {/* Seller Information */}
            {!vm.isOwner ?
              <View style={styles.sellerInfo}>
                <View style={styles.sellerName}>
                  <Text style={styles.textBtn}>{vm.item.owner}</Text>
                  <View style={{ width: 100 }}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={vm.item.owner_rate || 0}
                      selectedStar={vm.onUserRateChange}
                      starColor={Colors.mainColor}
                      starSize={18}
                    />
                  </View>
                </View>
                <View style={styles.buttonView}>
                  <Btn
                    style={[styles.followBtn, { backgroundColor: !vm.isFollowing ? Colors.snow : Colors.mainColor }]}
                    text={!vm.isFollowing ? I18n.t('FOLLOW') : I18n.t('UNFOLLOW')}
                    styleText={[styles.textBtn, { color: !vm.isFollowing ? '#979797' : Colors.snow }]} onPress={vm.followUserAction} />
                </View>
              </View>
              :
              null
            }
          </View>

          {/* Date and Likes View */}
          <View style={styles.likeView}>
            <Text style={[styles.textBtn, { color: 'white' }]}>{vm.item.created_date}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Image source={Images.likeWhite} resizeMode='contain' />
              <Text style={[styles.textBtn, { color: 'white', marginHorizontal: 3 }]}> {vm.item.total_likes.toString()} {I18n.t('Likes')}</Text>
            </View>
          </View>

          {/* The Discription View */}
          <View style={styles.description}>
            <Text style={styles.descText}>{vm.item.title}</Text>
            <Text style={[styles.textDescription, { marginVertical: 10 }]}>{vm.item.description}</Text>

            {/* The Price View */}
            <View style={styles.priceView}>
              <Text style={styles.priceText}> {vm.item.price} EGP</Text>
              <Text style={[styles.textBtn, { ...Fonts.style.input }]}>{vm.status}</Text>
            </View>

          </View>
          {/* Condition and add to wishlist and like share item View */}
          <View style={styles.mainRow}>
            <View style={styles.row}>
              <View style={[styles.subRow, { borderLeftWidth: 0 }]}>
                <Text style={{ color: '#4D4D4D' }}>{I18n.t('Condition')}</Text>
                <Text style={{ fontWeight: 'bold', color: '#4D4D4D' }}> {vm.item.item_condition} </Text>
              </View>
              <TouchableOpacity onPress={vm.wishItemAction} activeOpacity={0.8} style={styles.subRow}>
                <View style={[styles.icon, { width: 22 }]}>
                  <Image resizeMode='contain' source={vm.wishlist ? Images.wishActive : Images.wishUnactive} />
                </View>
                <Text style={{ color: '#4D4D4D' }}>{I18n.t('AddWishList')}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity onPress={this.likeUnlike} activeOpacity={0.8} style={[styles.subRow, { borderBottomWidth: 1, borderLeftWidth: 0 }]}>
                <View style={styles.icon}>
                  <Image resizeMode='contain' source={vm.like ? Images.likeBlue1 : Images.likeWhite1} />
                </View>
                <Text> {I18n.t('Like')} </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onOpen.bind(this)} activeOpacity={0.8} style={[styles.subRow, { borderBottomWidth: 1 }]}>
                <View style={styles.icon}>
                  <Image source={Images.share} />
                </View>
                <Text style={{ color: '#4D4D4D' }}> {I18n.t('ShareItem')} </Text>
              </TouchableOpacity>
            </View>
          </View>
          {!vm.isOwner ? <View>
            {
              vm.otherSellerItemsIsLoading ? <ActivityIndicator />
                : <OtherSellerList userId={vm.ownerId} fullScreen userImage={vm.item.owner_image} userItem={vm.item.owner} items={vm.otherSellerItems.slice()} />
            }
          </View> :
            null
          }

          {/* Related itemes */}
          <View style={styles.relatedView}>
            <View style={styles.relatedTextView}>
              <Text style={styles.relatedText}>{I18n.t('RelatedItems')}</Text>
            </View>
            <ProductList style={{ flex: 1 }} items={vm.relatedItems && vm.relatedItems.slice()} onLikeItem={this.props.itemComponentOnLike} onLoadMore={vm.loadRelatedItemsWithCategory(null, true)} />
          </View>
        </ScrollView>
        <ConnectButton onChatPress={() => {
          if (vm.isOwner) {
            Actions.Conversations()
          } else {
            Actions.ChatScreen({
              user: {
                id: vm.user.seller_id,
                name: vm.user.first_name,
                avatar: vm.user.picture
              },
              seller: {
                id: vm.ownerId
              }
            })
          }
        }} isOwner={vm.isOwner || vm.owner_enable_call != 1} makeOfferFunc={vm.showMakeOffer}
          phoneNumber={vm.owner_mobile}
        />

      </View >
    )
  }
}

