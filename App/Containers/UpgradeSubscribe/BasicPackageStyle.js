import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: 'red'
  },
  scrollView: {
    paddingVertical: 20
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  },
  titleText: {
    fontSize: 24,
    color: '#838383'
  },
  detailsView: {
    marginHorizontal: 15,
    marginBottom: 50
  },
  detailsText: {
    fontSize: 17,
    color: '#B8B8B8'
  },
  priceView: {
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 17,
    width: 115,
    height: 90,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  },
  priceText: {
    fontFamily: 'Helvetica-Bold',
    fontWeight: 'bold',
    fontSize: 48,
    color: '#7F7F7F'
  }
})
