import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors } from '../../Themes/'
import I18n from 'react-native-i18n'

export default StyleSheet.create({
  addressTitle: {
    ...Fonts.style.h6,
    textAlign: I18n.t('textAlign'),
    color: Colors.coal
  },
  addressDescription: {
    ...Fonts.style.input,
    textAlign: I18n.t('textAlign'),
    marginTop: 20
  },
  addressContainer: {
    justifyContent: 'center',
    height: 86,
    width: undefined,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical:20
  },
  textInput: {
    height: 50,
    position: 'absolute',
    backgroundColor: 'white',
    left: 10,
    right: 10,
    top: 60,
    zIndex: 1,
    elevation: 3,
  },
  saveButton: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: Colors.mainColor,
    position: 'absolute',
    right: 36,
    bottom: 55,
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },saveText:{
    ...Fonts.style.input,
    color:'white'
  }
})
