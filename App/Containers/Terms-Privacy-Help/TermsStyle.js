import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  descriptionText: {
    color: '#A4A4A4',
    ...Fonts.style.description,
    textAlign: 'left'
  },
  Content: {
    flex: 1
  },
  ImageView: {
    alignSelf: 'stretch'
    // backgroundColor: 'red'
  },
  image: {
    width: Metrics.screenWidth,
    alignSelf: 'stretch'
  },
  textTitle: {
    color: Colors.snow,
    ...Fonts.style.normal,
    textAlign: 'center'
  },
  middleView: {
    backgroundColor: '#002FA2',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35
  },
  description: {
    margin: 15
  }
})
