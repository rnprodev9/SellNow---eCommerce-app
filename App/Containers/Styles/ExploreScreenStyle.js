import { StyleSheet, Dimensions, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'
var {height, width} = Dimensions.get('window');
import I18n from 'react-native-i18n'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.transparent
  },

  tapsView: {
    backgroundColor: Colors.transparent,
    flex: 1,
  },
  tabsContainerStyle: {
  },
  textStyle: Platform.select({
    android: {
      fontWeight: "normal",
      color: Colors.snow,
      ...Fonts.style.h5       
    },
    ios: {
      fontWeight: "300",
      color: Colors.snow
    },
  }),
})
