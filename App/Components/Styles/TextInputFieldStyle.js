import { StyleSheet, Platform } from 'react-native'
import { Metrics, Fonts } from '../../Themes/'
import { Colors } from '../../Themes'
import I18n from 'react-native-i18n'

export default StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: Metrics.titlePadding,
    margin: 6,
    alignSelf: 'stretch',
    // backgroundColor: 'silver'

  },
  title: {
    ...Fonts.style.small,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: Colors.transparent
  },
  TextInput: {
    height: 25,
    paddingTop: -5,
    paddingBottom: -5,
    color: 'white',
    backgroundColor: Colors.transparent,
    ...Fonts.style.input,
    textAlign: I18n.t('textAlign')
  },
  error: {
    ...Fonts.style.error,
    color: Colors.error,
    backgroundColor: Colors.transparent
  }, valid: {
    ...Fonts.style.error,
    color: "green",
    backgroundColor: Colors.transparent
  }
})
