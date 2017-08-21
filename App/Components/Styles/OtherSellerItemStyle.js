import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  row: {
    // flex: 1,
    width: (Metrics.screenWidth / 2) - 40,
    minHeight: 170,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: Metrics.smallMargin
    // padding: 20,
    // backgroundColor: 'white'
  },
  boldLabel: {
    textAlign: 'left',
    marginBottom: Metrics.smallMargin,
    height: 18,
    ...Fonts.style.small,
    marginHorizontal: 10,
    color: '#777777'
  },
  label: {
    color: '#003CD5',
    textAlign: 'left',
    ...Fonts.style.normal,
    marginHorizontal: 10,
    fontWeight: 'bold'
  },
  listContent: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    height: 190,
    marginTop: -5
  },
  imageView: {
    height: 120,
    backgroundColor: 'white'
  },
  userImageView: {
    margin: 10,
    marginHorizontal: 10,
    height: 34,
    width: 34,
    borderRadius: 20
  },
  itemImage: {
    height: 120,
    width: (Metrics.screenWidth / 2) - 40
  },
  otherSellerItem: {
    ...Fonts.style.normal,
    color: '#4B4B4B'
  }
})
