import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from './Styles/BackgroundImageStyle'

export default class BackgroundImage extends React.Component {

  render () {
    return (
      <Image
        source={this.props.image}
        style={[styles.container, this.props.style]}
        resizeMode={this.props.resizeMode}
      />
    )
  }
}
