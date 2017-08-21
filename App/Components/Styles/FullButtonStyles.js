import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    marginVertical: 5,
    backgroundColor: Colors.ember,
    alignSelf: 'stretch',
    // flex: 1,
    // width: Metrics.screenWidth,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    // margin: 18,
    textAlign: 'center',
    color: Colors.snow,
    ...Fonts.style.normal
    // fontFamily: Fonts.type.bold
  }
})
