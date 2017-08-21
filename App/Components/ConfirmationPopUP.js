import React, { PropTypes } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Platform,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Modal
} from 'react-native'
import { Colors, Images, Metrics, Fonts } from '../Themes/'
import I18n from 'react-native-i18n'
export default class ConfirmationPopUp extends React.Component {

    static propTypes = {
        confirmationTitle: PropTypes.string,
        confirmationMessage: PropTypes.string,
        closeConfirmationModal: PropTypes.func,
        confirmAction: PropTypes.func,
        showConfirmationModal: PropTypes.bool,
        hideCancelBtn: PropTypes.bool,
    }

    constructor(props) {
        super(props)
    }


    render() {
        return (
            <Modal
                visible={this.props.showConfirmationModal}
                animationType='fade'
                transparent
                onRequestClose={this.props.closeConfirmationModal}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.8)'
                    }}
                >
                    <View
                        style={{
                            width: Metrics.screenWidth - 40,
                            minHeight: Metrics.screenWidth / 2,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 8,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >

                        <View style={[styles.modalField, { borderBottomWidth: 0 }]}>
                            <Text>{this.props.confirmationTitle}</Text>
                        </View>
                        <View style={styles.modalField}>
                            <Text style={{ ...Fonts.style.input }}>
                                {this.props.confirmationMessage}
                            </Text>
                        </View>
                        <View
                            style={[
                                styles.modalField,
                                { flexDirection: I18n.t('direction'), borderBottomWidth: 0 }
                            ]}
                        >
                            {this.props.hideCancelBtn ?
                                null :
                                <TouchableOpacity
                                    onPress={this.props.closeConfirmationModal}
                                    style={[
                                        styles.modalField,
                                        { borderBottomWidth: 0, borderRightWidth: I18n.locale === 'en' ? 1 : 0, borderLeftWidth: I18n.locale === 'ar' ? 1 : 0 }
                                    ]}
                                >
                                    <Text>{I18n.t('cancel')}</Text>
                                </TouchableOpacity>}
                            <TouchableOpacity
                                onPress={this.props.confirmAction}
                                style={[styles.modalField, { borderBottomWidth: 0, justifyContent: 'flex-start' }]}
                            >
                                <Text style={{...Fonts.style.input}}>{this.props.confirmText ? this.props.confirmText : I18n.t('yes')}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalField: {
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: 10
    }
})
