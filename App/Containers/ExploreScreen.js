import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, TouchableOpacity } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import {Images} from '../Themes'
import MainLoginScreen from './MainLoginScreen'
import LoginWithEmailScreen from './LoginWithEmailScreen'
import EnableNotification from './EnableNotification'
import EnableCalles from './EnableCalles'
import EnableVerification from './EnableVerification'
import TabBar from '../Components/TabBar'
import TopTabs from '../Components/TopTabs'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ExploreScreenStyle'

export default class Explore extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <TopTabs  />
        <TabBar />
      </View>
    )
  }

}
