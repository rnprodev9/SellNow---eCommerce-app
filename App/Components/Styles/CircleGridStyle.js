import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    paddingVertical: 10
    // backgroundColor: Colors.background,
  },
  row: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#F8F8F8',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BFBFBF'
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    ...Fonts.style.small,
    alignSelf: 'center',
    color: '#787878',
    textAlign: 'center',
    backgroundColor: Colors.transparent
  },
  listContent: {
    paddingHorizontal: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  subRow: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: '#F8F8F8',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#BFBFBF'
  },
  titleText: {
    color: '#6A6869',
    ...Fonts.style.description,
    backgroundColor: Colors.transparent,
    // flex: 1,
    alignSelf: 'center',
    marginHorizontal: 10,
    textAlign: 'center'
  }
})
