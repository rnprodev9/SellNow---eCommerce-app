import { StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors } from '../../Themes/'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F1F2',
    },
    buttonStyle: {
        width: 170,
        height: 32,
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#BFBFBF',
        backgroundColor: '#FFFFFF',
    },
    promoteText: {
        color: '#6A6869',
        ...Fonts.style.description,
        backgroundColor: Colors.transparent,
        width: 126,
        alignSelf: 'center',
        marginHorizontal: 10
    },
    listFeatureTitle: {
        fontWeight: 'bold',
        backgroundColor: Colors.transparent,
    },
    listFeatureDescription: {
        ...Fonts.style.small,
        backgroundColor: Colors.transparent,
        maxWidth: Metrics.screenWidth - 110
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
    },
    errorText: {
        ...Fonts.style.error,
        color: Colors.error,
        textAlign: 'left'
    }
})
