import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: 'red'
  },
  scrollView: {
    paddingVertical: 0
  },
  titleView: {
    justifyContent: 'center',
    marginVertical: 15
  },
  titleText: {
    fontSize: 24,
    color: '#838383',
    textAlign: 'center'
  },
  detailsView: {
    marginHorizontal: 15,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  innerView: {
    borderBottomWidth: 0.33,
    flex: 1,
    marginRight: 20,
    borderBottomColor: '#979797'
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
  },
  modalTitleText: {
    fontSize: 30,
    backgroundColor: Colors.transparent,
    color: 'white'
  },
  modalDescriptionText: {
    marginHorizontal: 20,
    textAlign: 'center',
    color: 'white',
    backgroundColor: Colors.transparent,
    ...Fonts.style.normal,
    maxWidth: 300
  },
  modalIconTitle: {
    ...Fonts.style.normal,
    color: 'white',
    backgroundColor: Colors.transparent,
    textAlign: 'center',
    alignSelf: 'center'
  },
  modalCameraIcon: {
    height: 112,
    width: 112,
    marginHorizontal: 20
  }
})
