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
import { connect } from 'react-redux'
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
import styles from './UserProfileStyle'
import vm from './UserProfileStore'
import { observer } from 'mobx-react'
import moment from 'moment'
import TabBar from '../../Components/TabBar'
import I18n from 'react-native-i18n'
import AndroidBackButton from 'react-native-android-back-button'

// var moment = require('moment')

@observer
export default class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      starCount: 3,
      modalVisible: false
    }
    vm.loadUserProfile()
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.reload) vm.loadUserProfile()
  }

  // componentWillMount () {
  //   BackAndroid.addEventListener('hardwareBackPress', () => {
  //     Actions.HomeScreen({ type: 'reset'})
  //     return true
  //   })
  // }

  // componentWillUnmount () {
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
            countList={vm.allCount}
            countSold={vm.soldCount}
            countWishlist={vm.wishCount}
            titleTabOne={I18n.t('Lists')}
            titleTabTwo={I18n.t('Sold')}
            titleTabThree={I18n.t('Wishlist')}
          />
        )}
        textStyle={styles.textStyle}
      >
        <ProductList
          userProfile
          listContentStyle={{ paddingBottom: 60 }}
          currentScreen='all'
          onLikeItem={vm.likeItemAction}
          isLoading={vm.itemsIsLoading}
          style={{ flex: 1 }}
          pageLoad={vm.pagingLoad}
          total={vm.allCount}
          onLoadMore={vm.loadMoreItems}
          items={vm.items && vm.items.slice()}
          key='0'
          tabLabel={'Lists'}
        />
        <ProductList
          userProfile
          listContentStyle={{ paddingBottom: 60 }}
          currentScreen='sold'
          onLikeItem={vm.likeItemAction}
          isLoading={vm.isLoading}
          total={vm.soldCount}
          style={{ flex: 1 }}
          items={vm.soldItems && vm.soldItems.slice()}
          pageLoad={vm.pagingLoad}
          onLoadMore={vm.loadMoreSoldItems}
          key='1'
          tabLabel={'Sold'}
        />
        <ProductList
          userProfile
          listContentStyle={{ paddingBottom: 60 }}
          currentScreen='wish'
          onLikeItem={vm.likeItemAction}
          isLoading={vm.wishListIsLoading}
          style={{ flex: 1 }}
          pageLoad={vm.pagingLoad}
          total={vm.wishCount}
          onLoadMore={vm.loadMoreWishedItems}
          items={vm.wishList && vm.wishList.slice()}
          key='2'
          tabLabel={'Wishlist'}
        />
      </ScrollableTabView>
    )
  }

  render() {
    if (vm.isLoading) {
      return (
        <View style={{ flex: 1 }}>
          <AndroidBackButton onPress={() => Actions.HomeScreen({ type: 'reset' })} />
          <ActivityIndicator style={{ flex: 1 }} size='large' />
        </View>
      )
    }
    let _d = new Date(vm.user.join_date)
    let joined = moment(_d * 1000).format('DD-MM-YYYY')
    console.log(vm.user.picture)
    return (
      <View style={[styles.container, { flex: 1 }]}>
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
                  vm.user.picture ? { uri: vm.user.picture } : Images.addPhoto
                }
                style={{
                  height: 110,
                  width: 110,
                  borderRadius: 55
                }}
                resizeMode='cover'
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
              <Text style={styles.modalTitleText}>{I18n.t('ABOUT')}</Text>
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
            leftImage={Images.notificationIcon}
            backgroundColor={Colors.transparent}
            rightImage={Images.setting}
            style={styles.topBar}
            rightAction={() => {
              Actions.Settings({ direction: 'vertical' })
            }}
            leftAction={Actions.NotificationScreen}
          />
        </View>

        {/* Backgrond and image profile View */}
        <View style={styles.bgProfile}>
          <Image source={Images.bgProfile} resizeMode='contain' />
          <View style={styles.profileImageView}>
            <Image
              source={
                vm.user.picture ? { uri: vm.user.picture } : Images.blueLogo
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
          <Text style={styles.textDate}>{I18n.t('Joined')} {joined} </Text>

          <View style={styles.rateView}>
            <TouchableOpacity
              onPress={
                vm.numOfFollowings > 0
                  ? Actions.Following
                  : vm.noFollowinguUsers
              }
              style={styles.followView}
            >
              <Text style={styles.followText}>{I18n.t('following')}</Text>
              <Text
                style={[
                  styles.followText,
                  {
                    color: Colors.mainColor,
                    paddingHorizontal: 6,
                    fontWeight: 'bold'
                  }
                ]}
              >
                {vm.numOfFollowings > 0 ? vm.numOfFollowings.toString() : '0'}
              </Text>
            </TouchableOpacity>

            <View style={{ justifyContent: 'center', width: 100 }}>
              <StarRating
                disabled
                maxStars={5}
                rating={this.state.starCount}
                starColor={Colors.mainColor}
                starSize={18}
              />
            </View>

            <TouchableOpacity
              onPress={
                vm.numOfBlockers > 0 ? Actions.Blocked : vm.noBolckedusers
              }
              style={[
                styles.followView,
                {
                  justifyContent: I18n.locale == 'en'
                    ? 'flex-end'
                    : 'flex-start',
                  paddingRight: 15,
                  paddingLeft: 0
                }
              ]}
            >
              <Text style={styles.followText}>{I18n.t('Blocked')}</Text>
              <Text
                style={[
                  styles.followText,
                  {
                    color: Colors.error,
                    paddingHorizontal: 6,
                    fontWeight: 'bold'
                  }
                ]}
              >
                {vm.numOfBlockers > 0 ? vm.numOfBlockers.toString() : '0'}
              </Text>
            </TouchableOpacity>
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
