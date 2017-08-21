import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container:{
    flex:1
  },
  textTitle:{
    color: Colors.snow,
    ...Fonts.style.normal,
    textAlign:'center'    
  },
  textDescription:{
    color: Colors.snow,
    ...Fonts.style.description,
    textAlign:'center'
  }
})
