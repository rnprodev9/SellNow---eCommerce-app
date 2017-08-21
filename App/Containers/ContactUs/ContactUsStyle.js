import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
  },
  textInputStyle: {
    flex: 1,
    marginVertical: 10,
    borderBottomColor: '#979797',
    alignSelf: 'stretch',
    // width: Metrics.screenWidth
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch'
  },
  textTitle: {
    color: Colors.coal,
    ...Fonts.style.normal,
    textAlign: 'center'
  },
  textDescription: {
    color: Colors.coal,
    ...Fonts.style.description,
    textAlign: 'center'
  }
})
