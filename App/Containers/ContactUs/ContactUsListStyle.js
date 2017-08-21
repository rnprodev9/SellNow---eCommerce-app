import { StyleSheet } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  row: {
    flex: 1,
    height: 50,
    backgroundColor: '#f8f8f8',
    justifyContent: 'space-between',
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    marginHorizontal: 15,
    color: 'gray'
  },
  checkIcon: {
    color: Colors.mainColor,
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 15
  }
})
