import { StyleSheet, Platform, Dimensions } from 'react-native'
import { Metrics, Colors, Fonts } from '../../Themes/'
var { height, width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 225,
    width: (width / 2) - 10,
    // alignSelf: 'center',
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#B3B3B3',
    marginVertical: 5,
    marginHorizontal: 5
  },
  productImage: {
    height: 130,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    overflow: 'hidden'
  },
  image: {
    width: width / 2,
    height: 130,
    alignSelf: 'stretch',
    borderTopLeftRadius: Platform.OS == 'android' ? 6 : 0,
    borderTopRightRadius: Platform.OS == 'android' ? 6 : 0,
  },
  ownerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    minHeight: 30,
    paddingLeft: 50,
    paddingRight: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#B3B3B3',
  },
  ownerImageView: {
    position: 'absolute',
    top: 110,
    left: 5,
    zIndex: 200,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 2
  },
  ownerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  nameText: {
    flex: 1,
    fontFamily: 'Helvetica-Light',
    ...Fonts.style.tiny,
    fontSize: 10,
    textAlign: 'left',
    color: '#BFBFBF'
  },
  priceText: {
    flex: 1,
    color: '#5A8FCC',
    fontFamily: 'Helvetica-bold',
    ...Fonts.style.small,
    textAlign: 'right',
    fontWeight: 'bold'
  },
  tilteView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 33,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#B3B3B3'
  },
  titleText: {
    flex: 1,
    color: 'gray',
    fontFamily: 'Helvetica',
    fontSize: 12,
    textAlign: 'center'
  },
  likesView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    height: 30,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  likeText: {
    color: '#076FD4',
    textAlign: 'center',
    fontSize: 14
  }

})
