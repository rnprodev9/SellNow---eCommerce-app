import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainColor
  },
  swipText: {
    ...Fonts.style.small,
    position: 'absolute',
    backgroundColor: Colors.transparent,
    color: 'white',
    bottom: 92,
    zIndex: 3,
    textAlign: 'center',
    alignSelf: 'center'
  },
  button: {
    position: 'absolute',
    backgroundColor: 'white',
    alignSelf: 'center',
    bottom: 32,
    width: 154,
    borderRadius: 10,
    borderWidth: .33,
    borderColor: '#979797'
  },
  swiper: {
  },
   newView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    width: '100%',
  },
  textCreat: {
    ...Fonts.style.description,
    color: 'white',
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 15,
    backgroundColor: Colors.transparent
  },
  textNew: {
    ...Fonts.style.description,
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
    backgroundColor: Colors.transparent    
  },
})
