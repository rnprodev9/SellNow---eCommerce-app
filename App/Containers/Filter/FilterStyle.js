import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Colors, Metrics, Fonts } from '../../Themes/'
import I18n from 'react-native-i18n'
export default StyleSheet.create({
  topView: {
    height: 55,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: I18n.t('direction'),
    backgroundColor: Colors.mainColor,
    paddingHorizontal: 20,
    paddingTop: Platform.OS == 'ios' ? 15 : 0,
  },
  titleTop: {
    fontFamily: 'Helvetica-Light',
    fontSize: 16,
    color: 'white'
  },
  textInputView: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderBottomColor: '#979797',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  textInputStyle: {
    backgroundColor: '#F1F1F1',
    height: 40,
    flex: 1,
    alignSelf: 'stretch',
    borderBottomWidth: 0,
    borderRadius: 7,
    marginHorizontal: 20
    // justifyContent: 'flex',
    // alignItems: 'center'
  },
  textInput: {
    color: '#A4A4A4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: Platform.OS == 'ios' ? 10 : 1,
    paddingHorizontal: 5
  },
  locationView: {
    flexDirection: I18n.t('direction'),
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomColor: '#979797',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  titleText: {
    color: '#6A6869',
    ...Fonts.style.description,
    backgroundColor: Colors.transparent,
    // flex: 1,
    alignSelf: 'center',
    marginHorizontal: 10,
    textAlign: 'center'
  },
  lineView: {
    flex: 1,
    // height: 0.1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#979797'
  },
  priceView: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'stretch',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#979797'
  },
  countView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  numView: {
    // flex: 1,
    alignSelf: 'stretch',
    height: 40,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#979797'
  },
  buttonStyle: {
    width: 170,
    // flex: 1,
    alignSelf: 'stretch',
    height: 40,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BFBFBF',
    backgroundColor: '#002FA2'
  }

})
