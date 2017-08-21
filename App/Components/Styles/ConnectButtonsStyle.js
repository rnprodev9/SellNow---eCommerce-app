import { StyleSheet } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'
import I18n from 'react-native-i18n'
export default StyleSheet.create({
  container: {
    paddingTop: Metrics.titlePadding,
    flexDirection: I18n.t('direction'),
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'stretch',
    position: 'absolute',
    bottom: 0
  },
  twoButton: {
    flexDirection: I18n.t('direction'),
    flex: 1,
  },
  offerBtn: {
    height: 50,
    flex: 1,
    backgroundColor: '#086FD5',
    alignItems: 'center',
    justifyContent: 'center'
  },
  chatBtn: {
    height: 50,
    flex: 1,
    backgroundColor: '#204A74',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBtn:{
    fontFamily: 'Helvetica',
    ...Fonts.style.medium,
    color: 'white',
    backgroundColor: Colors.transparent
  },
  imageView: {
    position: 'absolute',
    bottom: 0,
    elevation: 50,
    zIndex: 200,
    backgroundColor: Colors.transparent
  },
  image: {

  }
})
