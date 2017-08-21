import React from 'react'
import {
  Image,
  BackAndroid,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView
} from 'react-native'
// import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import TopBar from '../../Components/TopBar'
import { Colors, Images } from '../../Themes'
import StarRating from 'react-native-star-rating'
import Tabs from '../../Components/TabBarWithText'
import ProductList from '../../Components/ProductList'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Actions } from 'react-native-router-flux'
// Styles
import styles from './SellerProfileStyle'
import vm from './SellerProfileStore'
import { observer } from 'mobx-react'
import moment from 'moment'
import TabBar from '../../Components/TabBar'
// var moment = require('moment')
import Button from '../../Components/FullButton'
import I18n from 'react-native-i18n'
import AndroidBackButton from 'react-native-android-back-button'

@observer
export default class SellerProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      starCount: 3,
      modalVisible: false
    }
    vm.loadUserProfile(props.userId)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.reload) {
      vm.loadUserProfile(nextProps.userId)
    } else if (nextProps.userId) {
      vm.loadUserProfile(nextProps.userId)
    }
  }

  // componentWillMount() {
  //   BackAndroid.addEventListener('hardwareBackPress', () => {
  //     Actions.HomeScreen()
  //     return true
  //   })
  // }

  // componentWillUnmount() {
  //   BackAndroid.removeEventListener('hardwareBackPress', () => {
  //     Actions.pop()
  //     return true
  //   })
  // }
  tabs = () => {
    // let itemsList = vm.items.slice()
    // let wishList = vm.wishList.slice()
    // let soldItems = vm.soldItems.slice()

    return (
      <ScrollableTabView
        style={[styles.tapsView, { flex: 1 }]}
        initialPage={0}
        locked
        tabBarPosition={'top'}
        renderTabBar={() => (
          <Tabs
            countList={vm.allCount.toString()}
            countSold={vm.soldCount.toString()}
            titleTabOne={I18n.t('Lists')}
            titleTabTwo={I18n.t('Sold')}
          />
        )}
        textStyle={styles.textStyle}
      >
        <ProductList
          listContentStyle={{ paddingBottom: 60 }}
          currentScreen='all'
          onLikeItem={vm.likeItemAction}
          isLoading={vm.itemsIsLoading}
          style={{ flex: 1 }}
          items={vm.items && vm.items.slice()}
          key='0'
          tabLabel={'Lists'}
        />
        <ProductList
          listContentStyle={{ paddingBottom: 60 }}
          currentScreen='sold'
          onLikeItem={vm.likeItemAction}
          isLoading={vm.isLoading}
          style={{ flex: 1 }}
          items={vm.soldItems && vm.soldItems.slice()}
          key='1'
          tabLabel={'Sold'}
        />
      </ScrollableTabView>
    )
  }

  render () {
    if (vm.isLoading) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator style={{ flex: 1 }} size='large' />
        </View>
      )
    }
    // let _d = new Date(vm.user.join_date)
    // let joined = moment(_d * 1000).format('DD-MM-YYYY')
    // console.log(vm.user.picture)
    return (
      <View style={[styles.container, { flex: 1 }]}>
        <AndroidBackButton onPress={() => Actions.pop({refresh: { reload: true }})} />
        <Modal
          animationType={'slide'}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false })
          }}
          transparent
        >
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              flex: 1,
              alignItems: 'center'
            }}
          >
            <View
              style={{
                borderRadius: 60,
                height: 120,
                width: 120,
                borderWidth: 0.7,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#EEEEEE',
                padding: 5,
                marginTop: 140,
                backgroundColor: '#000000'
              }}
            >
              <Image
                source={
                  vm.user.picture
                    ? { uri: vm.user.picture }
                    : Images.addPhoto
                }
                style={{
                  flex: 1,
                  alignSelf: 'stretch',
                  height: 110,
                  width: 110,
                  borderRadius: 55
                }}
                resizeMode='contain'
              />
            </View>

            <View
              style={{
                marginTop: 5,
                height: undefined,
                width: undefined,
                alignItems: 'center',
                paddingHorizontal: 20
              }}
            >
              <Text style={styles.modalTitleText}>{vm.user.about_seller}</Text>
              <Text
                style={styles.modalUserName}
              >{`${vm.user.first_name} ${vm.user.last_name}`}</Text>
              <Text style={styles.modalDescriptionText}>{vm.user.address}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({ modalVisible: false })
              }}
              style={{ marginTop: 20, height: 29, width: 29 }}
            >
              <Image
                source={Images.xWhite}
                style={{ height: 29, width: 29 }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>

        </Modal>
        <View>
          <View
            style={{
              position: 'absolute'
            }}
          />
          <TopBar
            leftImage={I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft}
            leftText={I18n.t('Back')}
            backgroundColor={Colors.transparent}
            leftAction={() => Actions.pop({refresh: {reload: true}})}
            style={styles.topBar}
          />
        </View>

        {/* Backgrond and image profile View */}
        <View style={styles.bgProfile}>
          <Image source={Images.bgSeller} resizeMode='contain' />
          <View style={styles.profileImageView}>
            <Image
              source={
                vm.user.picture
                  ? { uri: vm.user.picture }
                  : Images.addPhoto
              }
              resizeMode='cover'
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* User details and discription and rating */}
        <View style={styles.details}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ modalVisible: true })
            }}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Text
              style={styles.textName}
            >{`${vm.user.first_name} ${vm.user.last_name}`}</Text>
            <Text style={styles.textDetails} numberOfLines={1}>
              {vm.user.about_seller}
            </Text>
          </TouchableOpacity>
          <View style={{ justifyContent: 'center', width: 100 }}>
            <StarRating
              disabled
              maxStars={5}
              rating={vm.user.userRate}
              starColor={Colors.mainColor}
              starSize={18}
            />
          </View>

          <View style={styles.rateView}>
            <View style={styles.buttonAskView}>
              <Button
                onPress={() => {
                  Actions.ChatScreen({
                    user: {
                      id: vm.user.seller_id,
                      name: vm.user.first_name,
                      avatar: vm.user.picture
                    },
                    seller: {
                      id: vm.currentUser.seller_id
                    }
                  })
                }}
                style={[
                  styles.followBtn,
                  {
                    backgroundColor: true ? Colors.snow : Colors.mainColor
                  }
                ]}
                text={I18n.t('ASKQUESTION')}
                styleText={[
                  styles.textBtn,
                  { color: true ? '#979797' : Colors.snow }
                ]}
              // onPress={vm.followUserAction}
              />
            </View>
            <View style={styles.buttonView}>
              <Button
                onPress={() => vm.followUserAction()}
                style={[
                  styles.followBtn,
                  {
                    backgroundColor: !vm.isFollowing ? Colors.snow : Colors.mainColor
                  }
                ]}
                text={!vm.isFollowing ? I18n.t('FOLLOW') : I18n.t('UNFOLLOW')}
                styleText={[
                  styles.textBtn,
                  { color: !vm.isFollowing ? '#979797' : Colors.snow }
                ]}
              // onPress={vm.followUserAction}
              />
            </View>
          </View>

        </View>

        {/* TabsView */}
        <View style={[styles.tabsView, { flex: 1 }]}>
          {this.tabs()}
          <TabBar
            showFilterModal={() => {
              Actions.popTo({ scene: 'HomeScreen' })
            }}
            goToHome={() => Actions.popTo({ scene: 'HomeScreen' })}
          />
        </View>
      </View>
    )
  }
}
