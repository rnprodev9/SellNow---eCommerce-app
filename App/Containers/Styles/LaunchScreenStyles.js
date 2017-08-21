import { StyleSheet, Dimensions, Platform } from 'react-native'
import { ApplicationStyles, Metrics, Colors, Fonts } from '../../Themes/'
var {height, width} = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.snow,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'center',
        width: width * 0.8
    }
})
