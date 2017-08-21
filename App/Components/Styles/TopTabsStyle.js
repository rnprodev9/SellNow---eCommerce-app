import { StyleSheet, Platform } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'ios' ? 20 : null,
    // paddingTop: 20,
    backgroundColor: Colors.mainColor,
  },
  tapsView: {
    backgroundColor: 'red',
    flex: 1,
  },
  tabsContainerStyle: {
    backgroundColor: 'white',
    padding: 20,
  },
  tabbar: {
    paddingHorizontal: 100,
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
    // alignItems: 'center'
  },
  tab: {
    width: 140,
    height: 50,
    backgroundColor: Colors.mainColor,
    justifyContent: 'center'
  },
  indicator: {
    backgroundColor: Colors.mainColor
  },
  label: {
    fontFamily: 'Helvetica-Light',
    fontSize: 20,
    color: Colors.snow,
    // fontWeight: '400'
  },
  topBar: {
    backgroundColor: Colors.transparent,
    height: 50,
    alignItems: 'stretch',
    paddingHorizontal: 16,
    paddingTop: 28
  },
  image: {
    backgroundColor: Colors.mainColor,
    // width: 30,
    // height: 50,
    // alignSelf: 'stretch'    // margin: 10
  },
  notifyImage: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: Metrics.screenWidth / 3,
    alignSelf: 'center',
    justifyContent: 'center',
    // marginBottom:15
  },
  searchImage: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: Metrics.screenWidth / 3,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  linearGradientSearch: {
    position: 'absolute',
    top: 8,
    zIndex: 1000,
    right: 0,
    // left: 0,
    width: Metrics.screenWidth / 3,
    backgroundColor: Colors.transparent,
    elevation: 6,
  },
  linearGradient: {
    position: 'absolute',
    top: 8,
    zIndex: 1000,
    left: 0,
    width: Metrics.screenWidth / 3,
    backgroundColor: Colors.transparent,
    elevation: 6,
    // padding: 10,
    right: 0,

    // rght: 100,
    // backgroundColor: 'red'
    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 5
  },
})
