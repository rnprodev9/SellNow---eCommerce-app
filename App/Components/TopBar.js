import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import I18n from 'react-native-i18n'
import { Actions } from 'react-native-router-flux'
import styles from './Styles/TopBarStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Metrics, Fonts, Colors, Images } from '../Themes'


export default class TopBar extends React.Component {

  render() {
    return (
      <View style={[styles.container, this.props.style, { backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : Colors.mainColor }]}>
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <View style={{ flexDirection: I18n.t('direction'), justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity style={styles.backImageView} onPress={this.props.leftAction || Actions.pop} >
              <Image source={this.props.leftImage ? this.props.leftImage : this.props.disableLeftImage ? null : Images.chevronLeft} style={styles.imageStyle} resizeMode="contain" />
              <Text style={[{ ...Fonts.style.normal, color: 'white', marginHorizontal: 5 }, this.props.leftTextStyle]}>{this.props.leftText}</Text>
            </TouchableOpacity>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
              <Text style={{ ...Fonts.style.normal, color: 'white', textAlign: 'center' }}>
                {this.props.title}
              </Text>
            </View>

            <TouchableOpacity onPress={this.props.rightAction} style={[styles.backImageView, { justifyContent: 'flex-end' }]} >
              {
                this.props.rightImage ?
                  <Image source={this.props.rightImage} style={styles.imageRight} resizeMode="contain" />
                  :
                  <Text style={{ ...Fonts.style.normal, color: 'white', marginHorizontal: 5 }}>{this.props.rightText}</Text>
              }
            </TouchableOpacity>

          </View>

        </View>
      </View>
    )
  }
}

// // Prop type warnings
// TopBar.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// TopBar.defaultProps = {
//   someSetting: false
// }
