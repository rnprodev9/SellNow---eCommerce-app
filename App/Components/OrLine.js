import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/OrLineStyle'
import I18n from 'react-native-i18n'
export default class OrLine extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.lineview, this.props.style]} />
        <View style={styles.circle}>
          <Text style={styles.circleText}>{I18n.t('OR')}</Text>
        </View>
      </View>
    )
  }
}

// // Prop type warnings
// OrLine.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// OrLine.defaultProps = {
//   someSetting: false
// }
