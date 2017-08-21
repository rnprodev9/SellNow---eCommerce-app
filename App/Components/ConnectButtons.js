import React from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import styles from './Styles/ConnectButtonsStyle'
import { Images, Colors } from '../Themes/'
import I18n from 'react-native-i18n'
export default class ConnectButtons extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.twoButton}>
          <TouchableOpacity
            onPress={this.props.onChatPress}
            activeOpacity={0.8}
            style={styles.chatBtn}
          >
            <Text style={styles.textBtn}>
              {!this.props.isOwner
                ? I18n.t('Chatwithseller')
                : I18n.t('OpenChat')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={
              this.props.makeOfferFunc ? this.props.makeOfferFunc : () => {}
            }
            activeOpacity={0.8}
            style={styles.offerBtn}
          >
            <Text style={styles.textBtn}>
              {!this.props.isOwner
                ? I18n.t('Makeanoffer')
                : I18n.t('ViewOffers')}
            </Text>
          </TouchableOpacity>
        </View>
        {!this.props.isOwner
          ? <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${this.props.phoneNumber}`)}
            activeOpacity={0.9}
            style={styles.imageView}
            >
            <Image source={Images.callIcon} />
          </TouchableOpacity>
          : null}
      </View>
    )
  }
}

// // Prop type warnings
// ConnectButtons.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// ConnectButtons.defaultProps = {
//   someSetting: false
// }
