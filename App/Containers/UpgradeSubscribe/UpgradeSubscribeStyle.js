import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes'
import I18n from 'react-native-i18n'
export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red'
  },
  scrollView: {
    flex: 1,
    alignSelf: 'stretch'
  },
  row: {
    height: 85,
    // backgroundColor: 'pink',
    // marginVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    flexDirection: I18n.t('direction'),

  },
  smallText: {
    ...Fonts.style.description,
    color: Colors.snow,
    fontSize: 14
  },
  largeText: {
    color: Colors.snow,
    fontSize: 30,
    fontFamily: 'Helvetica'
  },
  mediumText: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    color: '#838383'
  },
  textView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceView: {
    flexDirection: I18n.t('direction'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.snow,
    marginHorizontal: 20
  }
})
