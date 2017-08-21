import { StyleSheet, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  tabScrollView: {
    height: Platform.OS == 'android' ? 50 : 80,
    alignSelf: 'center',
    backgroundColor: Colors.mainColor,
    marginHorizontal: 40,
    // width: Metrics.screenWidth,
    // justifyContent: 'center',
    flex: 1
  },
  mainView: {
    justifyContent: 'center',
    flex: 1
  },
  tab: {
    // width: 160,
    height: Platform.OS == 'android' ? 50 : 80,
    backgroundColor: Colors.mainColor,
    // marginHorizontal: 20,
    justifyContent: 'center'
  },
  tabText: {
    ...Fonts.style.h6
  },
  linearGradientSearch: {
    position: 'absolute',
    top: 0,
    zIndex: 0,
    right: 0,
    height: Platform.OS == 'android' ? 50 : 80,
    width: Metrics.screenWidth / 3,
    backgroundColor: Colors.transparent,
    elevation: 6
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    zIndex: 0,
    left: 0,
    width: Metrics.screenWidth / 3,
    height: Platform.OS == 'android' ? 50 : 80,
    backgroundColor: Colors.transparent,
    elevation: 6,
    // padding: 10,
    right: 0
  },
  image: {
    backgroundColor: Colors.mainColor
    // width: 30,
    // height: 50,
    // alignSelf: 'stretch'    // margin: 10
  },
  notifyImage: {
    paddingHorizontal: 10,
    paddingVertical: Platform.OS == 'android' ? 10 : 30,
    width: Metrics.screenWidth / 3,
    alignSelf: 'center',
    justifyContent: 'center'
    // marginBottom:15
  },
  searchImage: {
    paddingHorizontal: 10,
    paddingVertical: Platform.OS == 'android' ? 10 : 30,
    width: Metrics.screenWidth / 3,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  mainCategoryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'rgba(237, 237, 237, 0.85)',
    height: 45  
  },
  categoryNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryNameText: {
    fontSize: 16,
    fontFamily: 'Helvetica-Light',
    color: 'gray',
    marginHorizontal: 10
  }
})
