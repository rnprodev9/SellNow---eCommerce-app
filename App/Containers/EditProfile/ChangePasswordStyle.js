import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Fonts, Colors } from '../../Themes/'
import I18n from 'react-native-i18n'
export default StyleSheet.create({
  container: {
    flex: 1
  },
  inputView: {
    // flex: 1
    // alignSelf: 'stretch',
    backgroundColor: 'rgba(242, 240, 240, 0.44)',
    alignSelf: 'stretch',
    width: Metrics.screenWidth,
    height: 65,
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#979797',
    flexDirection: I18n.t('direction')
  },
  error: {
    ...Fonts.style.error,
    color: Colors.error,
    backgroundColor: Colors.transparent
  }
})
