import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../Themes/'
import I18n from 'react-native-i18n'

export default StyleSheet.create({
  blurView: {
    backgroundColor: 'rgba(0,0,0,.4)',
    flex: 1,
    // justifyContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: 20
  },
  newView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    width: '100%',
    marginBottom: 60
  },
  textCreat: {
    ...Fonts.style.description,
    color: 'white',
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 15
  },
  textNew: {
    ...Fonts.style.description,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15
  },
  twoButton: {
    flexDirection: I18n.t('direction'),
    //  flex: 1,
    alignSelf: 'stretch',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    marginHorizontal: 45,
  },
  langBt: {
    width: (Metrics.screenWidth / 2) - 50,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: Colors.transparent,
    borderRadius: 6
  }
})
