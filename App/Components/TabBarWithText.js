import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, Fonts } from '../Themes'
import I18n from 'react-native-i18n'

class AndroidTabBar extends React.Component {
  tabIcons= [];

  static propTypes = {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array
  };


  getTitle (index) {
    switch (index) {
      case 0 :
        return this.props.titleTabOne
      case 1 :
        return this.props.titleTabTwo
      case 2 :
        return this.props.titleTabThree
      case 3 :
        return this.props.titleTabFour
      case 4 :
        return this.props.titleTabFive
      case 5 :
        return this.props.titleTabSix
      default:
        return ''
    }
  }

  getCount (index) {
    switch (index) {
      case 0 :
        return this.props.countList
      case 1 :
        return this.props.countSold
      case 2 :
        return this.props.countWishlist
      default:
        return ''
    }
  }

  render () {
    return (
      <View style={[styles.tabs]}>
        {this.props.tabs.map((tab, i) => {
          const color = this.props.activeTab === i ? Colors.mainColor : '#AFAFAF'
          const borderColor = this.props.activeTab === i ? Colors.mainColor : 'white'
          return (
            <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={[styles.tab, {borderBottomColor: borderColor} ]}>
              <View style={styles.tabContainer}>
                <Text style={[styles.title, {color: color}]}>{this.getTitle(i)} {this.getCount(i).toString()}</Text>
              </View>
            </TouchableOpacity>)
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    // width: 150
    // marginHorizontal: 20,
    // backgroundColor: 'red',
    marginHorizontal: 15,
    borderBottomWidth: 4,
    borderBottomColor: 'white'
  },
  tabs: {
    height: 50,
    // flexDirection: I18n.locale == 'ar' ? 'row-reverse' : 'row',
    flexDirection: I18n.t('direction'),
    paddingTop: 5,
    // backgroundColor: Colors.mainColor,
    // shadowColor: 'black',
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.19,
    // shadowRadius: 6,
    // elevation: 2,
    // paddingLeft: 80,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C5C5C5'
  },
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: I18n.t('direction')
  },
  image: {
    height: 25,
    width: 25
  },
  title: {
    ...Fonts.style.input
  },
  count: {
    ...Fonts.style.small,
    paddingRight: I18n.locale === 'ar' ? 5 : null,
    paddingLeft: I18n.locale === 'en' ? 5 : null
  }
})

export default AndroidTabBar
