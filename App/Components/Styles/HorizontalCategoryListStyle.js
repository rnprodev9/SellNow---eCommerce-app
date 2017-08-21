import { StyleSheet, Platform } from 'react-native'
import { Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  // ...ApplicationStyles.screen,
  container: {
    height: 52,
    // flex:1,
    backgroundColor: Colors.transparent,
    borderBottomWidth: StyleSheet.hairlineWidth, 
    borderBottomColor: '#E4E4E4',
  },
  listContent: {
    flexDirection: 'row',
    marginHorizontal: 2
  },
  itemStyle: {
    width: 104,
    height: 38,
    marginHorizontal: 3,
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BFBFBF',
    backgroundColor: '#FFFFFF',
    elevation:1,
    shadowColor: '#BFBFBF',
    shadowOffset:{width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
  }
})
