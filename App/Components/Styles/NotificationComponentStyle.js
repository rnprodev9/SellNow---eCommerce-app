import { StyleSheet } from 'react-native'
import I18n from 'react-native-i18n'
import { Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    marginHorizontal : 25,
    alignItems: 'center'
  },
  getMessage:{
    ...Fonts.style.input,
    color: '#003CD5',
    marginTop: 40,
    textAlign: 'center'
  },
  Message:{
    ...Fonts.style.input,
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: 10,

  }

})
