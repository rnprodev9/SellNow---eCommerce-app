import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import styles from './Styles/TextInputFieldStyle'
import { Colors } from '../Themes'
import I18n from 'react-native-i18n'
export default class TextInputField extends React.Component {
  static defaultProps = {
    containerStyle: {
      width: 300
    },
    styles: { color: 'white' }
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={{ flexDirection: I18n.t('direction') }}>
          <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
          {this.props.required ?
            <Text style={[styles.title, { color: Colors.green }]}> *</Text>
            : null
          }
        </View>
        <View style={[{ borderBottomColor: '#E9E9E9', borderBottomWidth: StyleSheet.hairlineWidth }, this.props.textInputStyle]}>
          <TextInput
            style={[styles.TextInput, this.props.MultiLines ? { height: 100 } : null, this.props.styles]}
            autoCapitalize='none'
            placeholder={this.props.placeholder}
            placeholderTextColor={Colors.cloud}
            onChangeText={this.props.onChangeText}
            value={this.props.value}
            returnKeyType={this.props.returnKeyType}
            multiline={this.props.MultiLines}
            secureTextEntry={this.props.secureTextEntry}
            underlineColorAndroid={Colors.transparent}
            keyboardType={this.props.keyboardType}
            defaultValue={this.props.defaultValue}
          />

        </View>
        {
          this.props.error  ? <Text style={styles.error}>{this.props.errorMessage}</Text>
            : null
        }
        {this.props.validMessage  ? <Text style={styles.valid}>{this.props.validMessage}</Text> : null}
      </View>
    )
  }
}

// // Prop type warnings
// TextInputField.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// TextInputField.defaultProps = {
//   someSetting: false
// }
