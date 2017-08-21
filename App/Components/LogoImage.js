import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './Styles/LogoImageStyle'
import { Images } from '../Themes/'
export default class LogoImage extends React.Component {

  render () {
    return (
      <View style={[styles.container, this.props.style]}>
        <Image
          source={Images.logo}
          resizeMode='center'
        />
      </View>
    )
  }
}

// // Prop type warnings
// LogoImage.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// LogoImage.defaultProps = {
//   someSetting: false
// }
