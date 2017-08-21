import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors } from '../../Themes/'
import I18n from 'react-native-i18n'

export default StyleSheet.create({
  addressTitle: {
    ...Fonts.style.normal,
    textAlign: I18n.t('textAlign'),
    color: Colors.coal
  },
  addressDescription: {
    ...Fonts.style.small,
    textAlign: I18n.t('textAlign')
  },
  saveText: {
    ...Fonts.style.normal,
    color: 'white'
  }
})
