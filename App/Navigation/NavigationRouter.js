import React, { Component } from 'react'
import { Platform } from 'react-native'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import NavigationDrawer from './NavigationDrawer'
import Splash from '../Components/Splash'
// screens identified by the router
import LaunchScreen from '../Containers/LaunchScreen'
import MainLoginScreen from '../Containers/MainLoginScreen' // Arabic Version
import LoginWithEmailScreen from '../Containers/LoginWithEmailScreen' // Arabic Version
import EnableNotification from '../Containers/EnableNotification' // Arabic Version
import EnableCalles from '../Containers/EnableCalles' // Arabic Version
import EnableVerification from '../Containers/EnableVerification' // Arabic Version
import SelectAddressMapScreen from '../Containers/SignUpScreen/SelectAddressMapScreen' // Arabic Version
import ExploreScreen from '../Containers/ExploreScreen'
import SignUpScreen from '../Containers/SignUpScreen/SignUpScreen' // Arabic Version
import ForgetPasswordScreen from '../Containers/ForgotPassword/ForgotPasswordScreen' // Arabic Version
import HorizontalCategoryList from '../Components/HorizontalCategoryList'
import SelectLanguage from '../Containers/SelectLanguage' // Arabic Version
import ProductList from '../Components/ProductList'

import HomeScreen from '../Containers/HomeScreen/'
// import HomeTest from '../Containers/HomeTestScreen'

import ProductDetails from '../Containers/ProductDetails'
import OtherSellerItem from '../Components/OtherSellerItem'
// import Home from '../Containers/HomeScreen'
import AddPost from '../Containers/AddPost' // Arabic Version
import UserProfile from '../Containers/UserProfile'
// import MainLogin from '../Containers/MainLoginScreenScreen'
import EditProfile from '../Containers/EditProfile'
import ChangePassword from '../Containers/EditProfile/ChangePassword'
import Settings from '../Containers/Settings' // Arabic Version
import Following from '../Containers/FollowingScreen'
import Blocked from '../Containers/BlockedScreen'
import NearestLocationMapScreen from '../Containers/Filter/NearestLocationMapScreen'
import Filter from '../Containers/Filter' // Arabic Version
import SelectCategories from '../Containers/AddPost/SelectCategories'
import Terms from '../Containers/Terms-Privacy-Help/Terms'
import Privacy from '../Containers/Terms-Privacy-Help/Privacy'
import Help from '../Containers/Terms-Privacy-Help/Help'
import ContactUs from '../Containers/ContactUs'
import Upgrade from '../Containers/UpgradeSubscribe'
import SellerProfile from '../Containers/SellerProfile'
import OfferList from '../Containers/OffersScreen'
import ReportItem from '../Containers/ReportItem/ReportItem'
import ReasonReport from '../Containers/ReportItem/ReasonReport'
import BankTransfer from '../Containers/UpgradeSubscribe/BankTransfer'
import BasicPackage from '../Containers/UpgradeSubscribe/BasicPackage'
import ChatScreen from '../Containers/Chat/ChatScreen'
import Conversations from '../Containers/ConversationScreen'
import NotificationScreen from '../Containers/NotificationsScreen'
import ContactStatusList from '../Containers/ContactUs/ContactUsList'
import PostStatus from '../Containers/ProductDetails/PostStatus'
import ViewAllList from '../Containers/ViewAllItems/ViewAllItemsList'
/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

const SceneWrapper = props =>
  Platform.OS === 'android'
    ? <Scene {...props} panHandlers={null} />
    : <Scene {...props} />

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <SceneWrapper key='drawer' component={NavigationDrawer} open={false}>
          <SceneWrapper
            key='drawerChildrenWrapper'
            navigationBarStyle={Styles.navBar}
            titleStyle={Styles.title}
            leftButtonIconStyle={Styles.leftButton}
            rightButtonTextStyle={Styles.rightButton}
          >
            <SceneWrapper
              initial
              key='launchScreen'
              component={LaunchScreen}
              title='LaunchScreen'
              hideNavBar
            />
            <SceneWrapper
              key='selectlanguage'
              component={SelectLanguage}
              title='SelectLanguage'
              hideNavBar
            />
            <SceneWrapper
              key='splash'
              component={Splash}
              title='Splash'
              hideNavBar
            />
            <SceneWrapper
              key='mainlogin'
              component={MainLoginScreen}
              title='MainLogin'
              hideNavBar
            />
            <SceneWrapper
              key='LoginWithEmailScreen'
              component={LoginWithEmailScreen}
              title='LoginWithEmailScreen'
              hideNavBar
            />
            <SceneWrapper
              key='enablenotification'
              component={EnableNotification}
              title='EnableNotification'
              hideNavBar
            />
            <SceneWrapper
              key='enablecalles'
              component={EnableCalles}
              title='EnableCalles'
              hideNavBar
            />
            <SceneWrapper
              key='enableverification'
              component={EnableVerification}
              title='EnableVerification'
              hideNavBar
            />
            <SceneWrapper
              key='SelectAddressMapScreen'
              component={SelectAddressMapScreen}
              title='SelectAddressMapScreen'
              hideNavBar
            />
            <SceneWrapper
              key='ExploreScreen'
              component={ExploreScreen}
              title='ExploreScreen'
              hideNavBar
            />
            <SceneWrapper
              key='SignUpScreen'
              component={SignUpScreen}
              title='SignUpScreen'
              hideNavBar
            />
            <SceneWrapper
              key='ForgetPasswordScreen'
              component={ForgetPasswordScreen}
              title='ForgetPasswordScreen'
              hideNavBar
            />
            <SceneWrapper
              key='ProductList'
              component={ProductList}
              title='ProductList'
              hideNavBar
            />
            <SceneWrapper
              key='HomeScreen'
              component={HomeScreen}
              title='HomeScreen'
              hideNavBar
            />
            <SceneWrapper
              key='ProductDetails'
              component={ProductDetails}
              title='ProductDetails'
              hideNavBar
            />
            <SceneWrapper
              key='AddPost'
              component={AddPost}
              title='AddPost'
              hideNavBar
            />
            <SceneWrapper
              key='UserProfile'
              component={UserProfile}
              title='UserProfile'
              hideNavBar
            />
            <SceneWrapper
              key='editProfile'
              component={EditProfile}
              title='EditProfile'
              hideNavBar
            />
            <SceneWrapper
              key='ChangePassword'
              component={ChangePassword}
              title='ChangePassword'
              hideNavBar
            />
            <SceneWrapper
              key='Settings'
              component={Settings}
              title='Settings'
              hideNavBar
            />
            <SceneWrapper
              key='Following'
              component={Following}
              title='Following'
              hideNavBar
            />
            <SceneWrapper
              key='Blocked'
              component={Blocked}
              title='Blocked'
              hideNavBar
            />
            <SceneWrapper
              key='NearestLocationMapScreen'
              component={NearestLocationMapScreen}
              title='NearestLocationMapScreen'
              hideNavBar
            />
            <SceneWrapper
              key='Filter'
              component={Filter}
              title='Filter'
              hideNavBar
            />
            <SceneWrapper
              key='SelectCategories'
              component={SelectCategories}
              title='SelectCategories'
              hideNavBar
            />
            <SceneWrapper
              key='Terms'
              component={Terms}
              title='Terms'
              hideNavBar
            />
            <SceneWrapper
              key='Privacy'
              component={Privacy}
              title='Privacy'
              hideNavBar
            />
            <SceneWrapper key='Help' component={Help} title='Help' hideNavBar />
            <SceneWrapper
              key='ContactUs'
              component={ContactUs}
              title='ContactUs'
              hideNavBar
            />
            <SceneWrapper
              key='Upgrade'
              component={Upgrade}
              title='Upgrade'
              hideNavBar
            />
            <SceneWrapper
              key='SellerProfile'
              component={SellerProfile}
              title='SellerProfile'
              hideNavBar
            />
            <SceneWrapper
              key='OfferList'
              component={OfferList}
              title='OfferList'
              hideNavBar
            />
            <SceneWrapper
              key='ReportItem'
              component={ReportItem}
              title='ReportItem'
              hideNavBar
            />
            <SceneWrapper
              key='ReasonReport'
              component={ReasonReport}
              title='ReasonReport'
              hideNavBar
            />
            <SceneWrapper
              key='BankTransfer'
              component={BankTransfer}
              title='BankTransfer'
              hideNavBar
            />
            <SceneWrapper
              key='BasicPackage'
              component={BasicPackage}
              title='BasicPackage'
              hideNavBar
            />
            <SceneWrapper
              key='ChatScreen'
              component={ChatScreen}
              title='ChatScreen'
              hideNavBar
            />
            <SceneWrapper
              key='Conversations'
              component={Conversations}
              title='Conversations'
              hideNavBar
            />
            <SceneWrapper
              key='NotificationScreen'
              component={NotificationScreen}
              title='NotificationScreen'
              hideNavBar
            />
            <SceneWrapper
              key='ContactStatusList'
              component={ContactStatusList}
              title='ContactStatusList'
              hideNavBar
            />
            <SceneWrapper
              key='PostStatus'
              component={PostStatus}
              title='PostStatus'
              hideNavBar
            />
            <SceneWrapper
              key='ViewAllList'
              component={ViewAllList}
              title='ViewAllList'
              hideNavBar
            />

          </SceneWrapper>
        </SceneWrapper>
      </Router>
    )
  }
}

export default NavigationRouter
