import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts, Metrics } from '../../Themes/'
import I18n from 'react-native-i18n'

export default StyleSheet.create({
  pickLocationView: {
    width: Metrics.screenWidth,
    paddingHorizontal: 15,
    minHeight: 25,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#AAAAAA',
    alignSelf: 'stretch',
    paddingBottom: 35
  },
  pickLocationText: {
    minHeight: 20,
    color: '#7B7B7B',
    backgroundColor: Colors.transparent,
    fontFamily: 'Helvetica',
    ...Fonts.style.input,
    maxWidth: 280,
    textAlign: 'left'
  },
  error: {
    ...Fonts.style.tiny,
    fontWeight: 'bold',
    color: Colors.error,
    backgroundColor: Colors.transparent,
    textAlign: 'left'
  },
  profileImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingBottom: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#979797'
  },
  profileImage: {
    width: 102.70,
    height: 102.70,
    borderRadius: 51.35
  },
  changePasswordView: { 
    height: 60,
    flexDirection: I18n.t('direction'),
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    marginHorizontal: 20
  },
  imageStyle: {
    marginLeft:5
  },
  profileInfo: {
    height: 40,
    alignSelf: 'stretch',
    backgroundColor: Colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1
  },
  textInput: {
    alignSelf: 'stretch',
    width: Metrics.screenWidth,
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#979797'

  },
  titleInputText: {
    fontFamily: 'Helvetica',
    fontSize: 17,
    color: '#CBCACA',
    fontWeight: '100'
  }
})
