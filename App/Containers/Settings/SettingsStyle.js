import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts } from '../../Themes/'
import I18n from 'react-native-i18n'

export default StyleSheet.create({
  rowView: {
    height: 65,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    flexDirection: I18n.t('direction'),
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#BFBFBF',
  },
  text: {
    ...Fonts.style.normal,
    color: '#7B7B7B'
  }
})
