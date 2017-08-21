import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    marginTop: 20,
    height: 60,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  lineview: {
    height: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  circleText: {
    fontFamily: 'Helvetica-Light',
    ...Fonts.style.h6,
    backgroundColor: 'transparent',
    color: '#1E1E1E'
  }
})
