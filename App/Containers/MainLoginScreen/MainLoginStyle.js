import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'
import I18n from 'react-native-i18n'

export default StyleSheet.create({
  blurView: {
    backgroundColor: 'rgba(0,0,0,.6)',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  loginFb: {
    marginHorizontal: 60,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: Colors.transparent,
    borderRadius: 6,
  },
  splitView: {
    // marginTop: 10, 
    // backgroundColor: 'red', 
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textPassword: {
    ...Fonts.style.description,
    color: 'white',
    textAlign: I18n.t('textAlignError'),
    flex: 1,
    alignSelf: 'stretch',
    fontWeight: '300',
    marginVertical: 5,
    backgroundColor: Colors.transparent
  },
  newView: {
    flexDirection: I18n.t('direction'),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%'
  },
  textCreat: {
    ...Fonts.style.description,
    color: 'white',
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 15,
    backgroundColor: Colors.transparent
  },
  textNew: {
    ...Fonts.style.description,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
    backgroundColor: Colors.transparent
    // alignSelf: 'center'
  }
})
