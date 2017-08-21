import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  topBar: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    elevation: 4,
    zIndex: 20,
    // paddingTop: 0,
    justifyContent: 'center'
  },
  bgProfile: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20
    // backgroundColor: 'red',
  },
  profileImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 51.35
  },
  profileImage: {
    width: 102.70,
    height: 102.70,
    borderRadius: 51.35
  },
  details: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  textName: {
    fontFamily: 'Helvetica',
    color: 'gray',
    fontSize: 20
  },
  textDetails: {
    marginVertical: 6,
    fontFamily: 'Helvetica',
    color: 'silver',
    fontSize: 15,
    paddingHorizontal: 20
  },
  textDate: {
    fontFamily: 'Helvetica',
    color: Colors.mainColor,
    ...Fonts.style.small
  },
  rateView: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C5C5C5'
  },
  followView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingLeft: 15
  },
  followText: {
    color: '#C5C5C5',
    ...Fonts.style.medium,
    fontFamily: 'Helvetica'
  },
  tabsView: {
    // flex: 1,
    height: 50,
    paddingBottom: 0,
    // backgroundColor: 'red',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C5C5C5'
  },
  textStyle: {
    backgroundColor: Colors.bloodOrange
  },
  modalTitleText: {
    fontSize: 30,
    color: 'white'
  },
  modalUserName: {
    marginTop: 0,
    marginHorizontal: 20,
    textAlign: 'center',
    color: 'white',
    ...Fonts.style.input
  },
  modalDescriptionText: {
    marginTop: 10,
    marginHorizontal: 20,
    textAlign: 'center',
    color: 'white',
    ...Fonts.style.input
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 10
  },
  buttonAskView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 10
  },
  followBtn: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#979797',
    backgroundColor: Colors.snow,
    borderRadius: 6,
    height: 30
  },
  textBtn: {
    ...Fonts.style.small,
    color: '#979797'
  }
})
