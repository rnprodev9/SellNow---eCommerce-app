import { StyleSheet, Platform } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes/'
import I18n from 'react-native-i18n'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50
  },
  slider: {
    backgroundColor: 'white',
    height: 250
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // left: 0
  },
  sliderContainer: {
    alignItems: 'center',
    backgroundColor: Colors.mainColor
  },
  photoSlider: Platform.select({
    android: {
      shadowColor: 'black',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.14,
      shadowRadius: 6,
      elevation: 6,
      position: 'relative'
    },
    ios: {
      shadowColor: 'black',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.14,
      shadowRadius: 2
    }
  }),
  dotPosition: {
    bottom: 10
  },
  sliderDot: {
    backgroundColor: 'white',
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 2,
    marginRight: 2,
    borderColor: 'white',
    borderWidth: 2
  },
  activeSliderDot: {
    backgroundColor: Colors.mainColor,
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 2,
    marginRight: 2,
    borderColor: 'white',
    borderWidth: 2
  },
  swiper: {
    // flex: 1,
    height: 250
  },
  sellerInfo: {
    // marginTop: 50,
    height: 60,
    flexDirection: I18n.t('direction'),
    justifyContent: 'space-between',
    paddingLeft: 80
    // elevation: 5
  },
  sellerImageView: {
    backgroundColor: 'white',
    position: 'absolute',
    left: I18n.locale == 'en' ? 20 : null,
    right: I18n.locale == 'ar' ? 15 : null,
    bottom: 24,
    elevation: 2,
    borderRadius: 25
  },
  sellerImage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  sellerName: {
    flex: 2,
    justifyContent: 'center',
    alignItems: I18n.locale == 'ar' ? 'flex-end' : 'flex-start'
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  followBtn: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#979797',
    backgroundColor: Colors.snow,
    borderRadius: 6,
    height: 30,
    maxWidth: 150
  },
  textBtn: {
    ...Fonts.style.input,
    color: '#979797'
  },
  textDescription: {
    ...Fonts.style.normal,
    color: '#979797'
  },
  likeView: {
    height: 30,
    backgroundColor: '#003CD5',
    flexDirection: I18n.t('direction'),
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  description: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  descText: {
    fontFamily: 'Helvetica',
    fontSize: 22,
    color: 'black'
  },
  priceView: {
    justifyContent: 'space-between',
    flexDirection: I18n.t('direction'),
    paddingVertical: 15,
    alignItems: 'center'
  },
  priceText: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 22,
    color: Colors.mainColor,
    fontWeight: 'bold'
  },
  mainRow: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    borderColor: Colors.cloud
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  subRow: {
    flexDirection: I18n.t('direction'),
    flex: 1,
    height: 50,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.cloud
  },
  icon: {
    width: 20,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalField: {
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  textTopbar: {
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6
  },
  relatedView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30
  },
  relatedTextView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    alignSelf: 'stretch',
    paddingVertical: 10,
    marginBottom: 10
  },
  relatedText: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    color: Colors.facebook
  },
  instructions: {
    marginTop: 20,
    marginBottom: 20
  },
  shareContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  socialIcon: {
    height: 65,
    width: 65,
    borderRadius: 30,
    margin: 5
  },
  socialShareView: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#979797',
    flex: 1,
    height: Metrics.screenHeight / 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 26
  }
})
