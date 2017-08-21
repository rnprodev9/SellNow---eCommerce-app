import { StyleSheet } from 'react-native'
import { Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  standalone: {
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: 'red'
  },
  standaloneRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 50
  },
  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: '#8BC645',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  backTextWhite: {
    ...Fonts.style.normal,
    color: '#FFFFFF',
    fontSize: 16
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#B3B3B3',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'space-between',
    height: 65,
    flexDirection: 'row',
    paddingHorizontal: 15
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 170
  },
  backRightBtnRight: {
    backgroundColor: '#D0011B',
    right: 0,
    width: 170
  },
  controls: {
    alignItems: 'center',
    marginBottom: 30
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5
  },
  switch: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 10,
    width: 100
  },
  rofileImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.50
  },
  date: {
    ...Fonts.style.small,
    color: '#4990E2',
    maxWidth: 92
  },
  followName: {
    ...Fonts.style.normal,
    color: '#7B7B7B',
    flex: 1,
    marginHorizontal: 10
  }
})
