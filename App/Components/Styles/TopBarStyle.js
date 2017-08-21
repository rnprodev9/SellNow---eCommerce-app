import { StyleSheet, Platform } from 'react-native'
import { Metrics, Fonts } from '../../Themes/'
import I18n from 'react-native-i18n'

export default StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 60 : 50,
    paddingTop: Platform.OS === 'ios' ? 15 : 5,
    // paddingTop:10
  },
  backImageView: { 
    height: 40, 
    width: 60,
    flexDirection: I18n.t('direction'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    marginLeft:5,
  },
  imageRight: {
    marginRight: I18n.locale == 'en' ? 10 : 0,
    marginLeft: I18n.locale == 'ar' ? 10 : 0,
  }
})
