import React from 'react'
import {
  ScrollView,
  Text,
  Modal,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Animated,
  TextInput,
  StatusBar,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  BackAndroid
} from 'react-native'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { Colors, Images, Metrics, Fonts } from '../../Themes'
import ProductList from '../../Components/ProductList'
import HorizontalCategoryList from '../../Components/HorizontalCategoryList'
import TabBar from '../../Components/TabBar'
import vm from './HomeStore'
import { observer } from 'mobx-react/native'
import FilterScreen from '../../Containers/Filter'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions } from 'react-native-router-flux'
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'react-native-admob'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// Styles
import styles from './HomeScreenStyle'
import FollowingList from '../HomeFollowingList'
import I18n from 'react-native-i18n'
import AndroidBackButton from 'react-native-android-back-button'

@observer class Home extends React.Component {
  constructor () {
    super()
    this.state = {
      screen: 'EXPLORE',
      modalVisible: false,
      searchBarWidth: new Animated.Value(0), // Initial value for opacity: 0
      searching: false,
      hidden: false,
      animated: true,
      searchModal: false,
      tabsHeight: new Animated.Value(0),
      opacity: new Animated.Value(1),
      topTabsHeight: new Animated.Value(Platform.OS == 'android' ? 50 : 80),
      showAd: true
    }
    this.oldScrollPos = 0
  }

  componentWillMount () {
    this.update()
    // BackAndroid.addEventListener('hardwareBackPress', () => {
    //   this.refs._scrollView.scrollTo({
    //     x: 0,
    //     y: undefined,
    //     animated: true
    //   })
    //   return true
    // })
  }

  // componentWillUnmount() {
  //   BackAndroid.removeEventListener('hardwareBackPress', () => {
  //     Actions.pop()
  //     return true
  //   })
  // }

  componentWillReceiveProps (nextProps) {
    if (nextProps.reload && this.state.screen === 'EXPLORE') {
      this.update()
    } else {
      this.refs._scrollView.scrollTo({
        x: 0,
        y: undefined,
        animated: true
      })
    }
  }

  update () {
    vm.homeSubCategoryVisible = false
    vm.loadHomeCategories().then(() => vm.loadAllItems())
    vm.loadFollowedUsers()
  }

  setScreen = scrollPos => {
    vm.oldSearchText = null
    if (scrollPos <= 50 && this.state.screen !== 'EXPLORE') {
      this.setState({
        screen: 'EXPLORE'
      })
      vm.changeCurrentScreen('explore')
      vm.onCurrentCategoryChange(-1)
      this.update()
    } else if (scrollPos <= 50 && this.state.screen == 'EXPLORE' && !vm.isLoading) {
      vm.resetCategories()
      vm.loadAllItems()
    } else if (scrollPos > 100 && scrollPos < 200) {
      this.setState({
        screen: 'FEATURED'
      })
      vm.changeCurrentScreen('featured')
      vm.loadAllFeaturedItems()
    } else if (scrollPos >= 200) {
      this.setState({
        screen: 'FOLLOWING'
      })
      // vm.changeCurrentScreen('explore')
      // vm.loadAllFeaturedItems()
    }
  }

  loadMoreAllItems = () => {
    console.log('currentCategoryIndex', vm.currentCategoryIndex)
    vm.currentCategoryIndex != null && vm.currentCategoryIndex !== -1
      ? vm.loadAllItemsWithCategory(
        vm.categories[vm.currentCategoryIndex].id,
        true
      )
      : vm.loadAllItems(true, vm.oldSearchText)
  }

  loadAllFeaturedItems = () => {
    vm.currentCategoryIndex != null && vm.currentCategoryIndex !== -1
      ? vm.loadAllFeaturedItemsWithCategory(
        vm.categories[vm.currentCategoryIndex].id,
        true
      )
      : vm.loadAllFeaturedItems(true)
  }

  onCategoryPress = () => {
    vm.loadAllFeaturedItemsWithCategory()
    this.hideTabsOnScroll(null, true)
  }

  hideCategoryProducts = () => {
    vm.resetCategories(() => this.setState({}))
    this.hideTabsOnScroll(null, true)
  }

  renderScreen = () => {
    if (this.state.screen == 'EXPLORE') {
      return (
        <View style={{ flex: 1 }}>
          {!vm.homeSubCategoryVisible
            ? <HorizontalCategoryList
              setActive={vm.onCurrentCategoryChange}
              activeItemId={vm.currentCategoryIndex}
              onButtonPress={this.onCategoryPress}
              categories={vm.categories && vm.categories.slice()}
            />
            : <View style={styles.subCategoriesView}>
              <View style={styles.mainCategoryView}>
                <View style={styles.categoryNameView}>
                  <Image source={Images.filtter} resizeMode='cover' />
                  <Text style={styles.categoryNameText}>
                    {vm.categories[vm.currentCategoryIndex] ? vm.categories[vm.currentCategoryIndex].title : ''}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={this.hideCategoryProducts}
                >
                  <Image source={Images.xGray} resizeMode='cover' />
                </TouchableOpacity>
              </View>
              <View>
                <HorizontalCategoryList
                  setActive={vm.onCurrentSubCategoryChange}
                  activeItemId={vm.currentSubCategoryIndex}
                  onButtonPress={() => { }}
                  categories={vm.subCategories && vm.subCategories.slice()}
                />
              </View>
            </View>}
          {vm.isLoading
            ? <ActivityIndicator
              style={{ flex: 1, alignSelf: 'center', marginTop: '40%' }}
              size='large'
            />
            : <ProductList
              isLoading={vm.isLoading}
              onLikeItem={vm.likeItemAction}
              items={vm.allItems && vm.allItems.slice()}
              pageLoad={vm.pagingLoad}
              onLoadMore={this.loadMoreAllItems}
              total={vm.totalAllitems}
              scrollY={this.hideTabsOnScroll}
            />}
        </View>
      )
    } else if (this.state.screen == 'FEATURED') {
      return (
        <View style={{ flex: 1 }}>
          <HorizontalCategoryList
            setActive={vm.onCurrentCategoryChange}
            activeItemId={vm.currentCategoryIndex}
            onButtonPress={vm.loadAllFeaturedItemsWithCategory}
            categories={vm.categories && vm.categories.slice()}
          />
          {vm.isLoading
            ? <ActivityIndicator
              style={{ flex: 1, alignSelf: 'center', marginTop: '30%' }}
              size='large'
            />
            : <ProductList
              isLoading={vm.isLoading}
              onLikeItem={vm.likeItemAction}
              items={vm.featuredItems && vm.featuredItems.slice()}
              pageLoad={vm.pagingLoad}
              onLoadMore={this.loadMoreFeatured}
              total={vm.totalFeatured}
              scrollY={this.hideTabsOnScroll}
            />}
        </View>
      )
    } else if (this.state.screen == 'FOLLOWING') {
      return (
        <View style={{ flex: 1 }}>
          <FollowingList
            followedUsers={
              vm.followingList && vm.followingList.slice
                ? vm.followingList.slice()
                : []
            }
            loadOtherSellerItems={vm.loadOtherSellerItems}
            reRender={() => this.setState({})}
          />
        </View>
      )
    }
  }

  handleScroll = event => {
    this.setScreen(event.nativeEvent.contentOffset.x)
  }
  showSearchBar = () => {
    Animated.timing(
      // Animate over time
      this.state.searchBarWidth, // The animated value to drive
      {
        toValue: Metrics.screenWidth - 130 // Animate to opacity: 1, or fully opaque
      }
    ).start() // Starts the animation
    this.setState({
      searching: true
    })
  }

  hideSearchBar = () => {
    Animated.timing(
      // Animate over time
      this.state.searchBarWidth, // The animated value to drive
      {
        toValue: 0 // Animate to opacity: 1, or fully opaque
      }
    ).start() // Starts the animation
    this.setState({
      searching: false
    })
  }

  animating = false
  barsVisible = true
  hideTabsOnScroll = (event, show) => {
    if (event) {
      if (event.nativeEvent.contentOffset.y > this.oldScrollPos && !this.animating && this.barsVisible && (event.nativeEvent.contentOffset.y > 300)) {
        this.animating = true
        this.barsVisible = false
        Animated.timing(
          // Animate over time
          this.state.tabsHeight, // The animated value to drive
          {
            toValue: -80, // Animate to opacity: 1, or fully opaque
            duration: 100
          }
        ).start() // Starts the animation

        Animated.timing(
          // Animate over time
          this.state.topTabsHeight, // The animated value to drive
          {
            toValue: 0, // Animate to opacity: 1, or fully opaque
            duration: 100
          }
        ).start() // Starts the animation

        Animated.timing(
          this.state.opacity,
          {
            toValue: 0,
            duration: 100
          }
        ).start()
        this.animating = false
      } else if (event.nativeEvent.contentOffset.y < this.oldScrollPos && !this.animating && !this.barsVisible || (event.nativeEvent.contentOffset.y >= 0 && event.nativeEvent.contentOffset.y < 100)) {
        this.animating = true
        this.barsVisible = true
        Animated.timing(
          this.state.tabsHeight,
          {
            toValue: 0,
            duration: 100
          }
        ).start()

        Animated.timing(
          // Animate over time
          this.state.topTabsHeight, // The animated value to drive
          {
            toValue: Platform.OS == 'android' ? 50 : 80, // Animate to opacity: 1, or fully opaque
            duration: 100
          }
        ).start() // Starts the animation

        Animated.timing(
          this.state.opacity,
          {
            toValue: 1,
            duration: 100
          }
        ).start()
        this.animating = false
      }
      this.oldScrollPos = event.nativeEvent.contentOffset.y
    } else if (show) {
      Animated.timing(
        this.state.tabsHeight,
        {
          toValue: 0,
          duration: 100
        }
      ).start()

      Animated.timing(
        // Animate over time
        this.state.topTabsHeight, // The animated value to drive
        {
          toValue: Platform.OS == 'android' ? 50 : 80, // Animate to opacity: 1, or fully opaque
          duration: 100
        }
      ).start() // Starts the animation

      Animated.timing(
        this.state.opacity,
        {
          toValue: 1,
          duration: 250
        }
      ).start()
    }
  }

  bannerError = (e) => {
    console.log('------------------------------------------', e)
  }

  handleAndroidBackButton = () => {
    if (this.state.screen !== 'EXPLORE') {
      this.refs._scrollView.scrollTo({
        x: 0,
        y: undefined,
        animated: true
      })
      return true
    } else {
      return false
    }
  }

  render () {
    return (
      <View style={styles.mainView}>
        <AndroidBackButton onPress={this.handleAndroidBackButton} />
        <StatusBar hidden={this.state.hidden} animated={this.state.animated} />
        <Modal
          animationType={'slide'}
          visible={vm.searchModalOpen}
          onRequestClose={vm.onSearchModalClick}
          transparent
        >
          <View style={{ flex: 1, backgroundColor: 'white', zIndex: 0 }}>
            <FilterScreen
              onSearchPress={async data => {
                await vm.onSearchPress(data)
                this.setState({})
              }}
              onSearchSave={vm.onSearchSave}
              categories={vm.categories.slice()}
              subCategories={vm.subCategories.slice()}
              currentCategory={vm.currentCategoryIndex}
              onCirclePress={vm.onCurrentCategoryChange}
              closeFilterModal={vm.onSearchModalClick}
              subCategoryLoading={vm.subCategoryLoading}
              onLocationChange={vm.onLocationChange}
              onRadiusChange={vm.onRadiusChange}
              onRemoveHighlightedCategory={() => {
                vm.onCurrentCategoryChange(-1)
              }}
            />
          </View>
        </Modal>

        <Animated.View
          style={{
            position: 'absolute',
            right: Metrics.screenWidth / 4 - 18,
            top: Platform.OS == 'android' ? 10 : 30,
            width: this.state.searchBarWidth,
            height: 30,
            borderRadius: 30,
            backgroundColor: 'white',
            elevation: 1,
            zIndex: Platform.OS == 'ios' ? 100 : undefined,
            flexDirection: 'row'
          }}
        >
          <TextInput
            onChangeText={vm.onSearchTextChange}
            style={{ flex: 1, paddingLeft: 35, padding: 5, color: 'black' }}
            onSubmitEditing={() => {
              vm.onSearchPress({ title: vm.searchText })
              this.hideSearchBar()
            }}
            value={vm.searchText}
            underlineColorAndroid='transparent'
            placeholder='Search Here ...'
            returnKeyType={'search'}
            onEndEditing={() => this.hideSearchBar()}
            ref='searchInput'
          />

          <TouchableOpacity
            style={{
              position: 'absolute',
              left: 5,
              backgroundColor: 'transparent'
            }}
            onPress={() => vm.onSearchPress({ title: vm.searchText })}
          >
            <Icon name='search' style={{ fontSize: 28 }} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={{ height: this.state.topTabsHeight, opacity: this.state.opacity }}>
          <View
            style={{
              height: Platform.OS == 'android' ? 50 : 80,
              flexDirection: 'row',
              backgroundColor: Colors.mainColor
            }}
          >
            <LinearGradient
              colors={[
                Colors.mainColor,
                Colors.mainColor,
                Colors.topTransparent
              ]}
              start={{ x: 0.0, y: 1.0 }}
              end={{ x: 1.0, y: 1.0 }}
              locations={[0, 0.50, 1]}
              style={styles.linearGradient}
            >
              <TouchableOpacity style={styles.notifyImage} onPress={Actions.NotificationScreen}>
                <Image
                  source={Images.notificationIcon}
                  style={styles.image}
                  resizeMode='cover'
                />
              </TouchableOpacity>
            </LinearGradient>
            {/* pagingEnabled={true} */}
            <ScrollView
              removeClippedSubviews
              onScroll={this.handleScroll}
              horizontal
              showsHorizontalScrollIndicator={false}
              overScrollMode='never'
              scrollEventThrottle={16}
              style={styles.tabScrollView}
              ref='_scrollView'
            >
              <View
                style={[
                  styles.tab,
                  {
                    marginHorizontal: 0,
                    marginLeft: Metrics.screenWidth / 3 - 40,
                    width: Metrics.screenWidth / 3
                  }
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: 'white',
                      textAlign: 'center'
                    }
                  ]}
                >
                  {I18n.t('explore')}
                </Text>
              </View>
              <View
                style={[
                  styles.tab,
                  { marginHorizontal: 0, width: Metrics.screenWidth / 3 }
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: 'white',
                      textAlign: 'center'
                    }
                  ]}
                >
                  {I18n.t('featured')}
                </Text>
              </View>
              <View
                style={[
                  styles.tab,
                  {
                    marginRight: Metrics.screenWidth / 3 - 40,
                    width: Metrics.screenWidth / 3
                  }
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: 'white',
                      textAlign: 'center'
                      // backgroundColor: 'red'
                    }
                  ]}
                >
                  {I18n.t('following')}
                </Text>
              </View>
            </ScrollView>
            <LinearGradient
              colors={[
                Colors.mainColor,
                Colors.mainColor,
                Colors.topTransparent
              ]}
              start={{ x: 1.0, y: 1.0 }}
              end={{ x: 0.0, y: 1.0 }}
              locations={[0, 0.50, 1]}
              style={styles.linearGradientSearch}
            >
              <View style={styles.searchImage}>
                {!this.state.searching
                  ? <TouchableOpacity
                    onPress={() => {
                      this.refs.searchInput.focus()
                      !this.state.searching
                        ? this.showSearchBar()
                        : this.hideSearchBar()
                    }}
                  >
                    <Image
                      source={Images.searchIcon}
                      style={styles.image}
                      resizeMode='cover'
                    />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity
                    onPress={() => {
                      this.hideSearchBar()
                    }}
                  >
                    <Text
                      style={{
                        ...Fonts.style.input,
                        color: Colors.snow,
                        marginTop: Platform.OS == 'android' ? 5 : 5
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                }
              </View>
            </LinearGradient>
          </View>
        </Animated.View >
        <View style={{ flex: 1 }}>
          {this.renderScreen()}
        </View>
        <Animated.View style={{ height: 70, flex: 1, position: 'absolute', bottom: this.state.tabsHeight, left: 0, right: 0, backgroundColor: 'transparent', opacity: this.state.opacity }}>
          <TabBar
            showFilterModal={vm.onSearchModalClick}
            goToHome={() => {
              this.refs._scrollView.scrollTo({
                x: 0,
                y: undefined,
                animated: true
              })
              this.setScreen(1)
            }}
          />
        </Animated.View>
        {/* {

          !this.state.showAd ? null :
            <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0 }}>
              <TouchableOpacity style={{ alignItems: 'flex-end', backgroundColor: Colors.transparent }} onPress={() => { this.setState({ showAd: false }) }}>
                <Image source={Images.xGray} style={{ width: 26, height: 26, marginRight: 10, marginBottom: 3 }} />
              </TouchableOpacity>
              <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-6103465668711511/9136489785"
                testDeviceID="CCF7C4B2DB8811DD5EB23D8966AFB3B5"
                didFailToReceiveAdWithError={this.bannerError}
                requestAd={true}
              />
            </View>
        } */}
      </View>
    )
  }
}

export default Home
