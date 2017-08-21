import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  row: {
    flex: 1,
    height: 64,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    marginHorizontal: 20,
    color: 'gray',
    ...Fonts.style.h6
  },
  checkIcon: {
    color: Colors.mainColor,
    fontSize:24,
    fontWeight:'bold',
    marginHorizontal:15
  }
})
