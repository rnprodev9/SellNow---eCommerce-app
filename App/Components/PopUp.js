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
import ConfirmationPopUp from './ConfirmationPopUP'
import I18n from 'react-native-i18n'

export default class PopUp extends React.Component {

  static propTypes = {
    options: PropTypes.array,
    closeDialogModal: PropTypes.func,
    dialogVisible: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      showConfirmation: false,
      index: 0
    }
  }

  onOptionPress = (option, index) => {
    if (option.hasConfirmation) {
      this.props.closeDialogModal()
      this.showConfirmation()
      this.setState({
        index: index
      })
      // this.confirmOption(option)
    } else {
      this.props.closeDialogModal()
      option.func()
    }
  }

  confirmOption = () => {
    this.closeConfirmation()
    this.props.options[this.state.index].func()
  }

  closeConfirmation = () => {
    this.setState({
      showConfirmation: false
    })
  }

  showConfirmation = () => {
    this.setState({
      showConfirmation: true
    })
  }


  render() {
    let currentOption = this.props.options[this.state.index];
    return (
      <View style={{ height: 0 }}>
        {
          this.state.index && currentOption.hasConfirmation ?
            <ConfirmationPopUp showConfirmationModal={this.state.showConfirmation} confirmationTitle={currentOption.confirmationTitle} confirmationMessage={currentOption.confirmationMessage} closeConfirmationModal={this.closeConfirmation} confirmAction={this.confirmOption}
            /> : null
        }
        <Modal
          visible={this.props.dialogVisible}
          animationType='fade'
          transparent
          onRequestClose={this.props.closeDialogModal}
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
                width: Metrics.screenWidth - 60,
                height: Metrics.screenWidth / 2,
                backgroundColor: '#FFFFFF',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >

              {
                this.props.options && this.props.options.map((option, index) => {
                  {/*console.log('pop up oooooooooooption =============================', option)*/ }
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => { this.onOptionPress(option, index) }}
                      style={styles.modalField}
                    >
                      <Text>{option.text}</Text>
                    </TouchableOpacity>
                  )
                })}

              <TouchableOpacity
                onPress={this.props.closeDialogModal}
                style={[styles.modalField, { borderBottomWidth: 0 }]}
              >
                <Text>{I18n.t('cancel')}</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      </View>
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
