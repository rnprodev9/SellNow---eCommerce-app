import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'
import I18n from 'react-native-i18n'

export default StyleSheet.create({
  pickLocationView: {
    width: 300,
    minHeight: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#AAAAAA',
    marginTop: 24,
    paddingHorizontal: 2,
    flexDirection: I18n.t('direction')
  },
  pickLocationText: {
    minHeight: 20,
    color: Colors.cloud,
    backgroundColor: Colors.transparent,
    ...Fonts.style.input,
    maxWidth:280,
    textAlign:'left'
  },
    error: {
    ...Fonts.style.small,
    color: Colors.error,
    backgroundColor: Colors.transparent,
    textAlign:'left'
  }
})
