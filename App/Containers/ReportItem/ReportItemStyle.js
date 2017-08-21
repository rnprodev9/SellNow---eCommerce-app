import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes'
import I18n from 'react-native-i18n'
export default StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: 'red'
  },
  scrollView: {
    paddingVertical: 0
  },
  SelectView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 65,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    flexDirection: I18n.t('direction')
  },
  titleText: {
    fontSize: 17,
    color: '#7B7B7B'
  },
  noteView: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: '#F8F8F8'
  },
  detailsText: {
    fontSize: 17,
    color: '#B8B8B8'
  },
  priceView: {
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 17,
    width: 115,
    height: 90,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  },
  priceText: {
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    fontSize: 48,
    color: '#7F7F7F'
  }
})
