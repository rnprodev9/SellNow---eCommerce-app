import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { Images, Colors } from '../Themes'
import Button from '../Components/FullButton'
import TextInput from '../Components/TextInputField'
import styles from './Styles/NotificationComponentStyle'
import I18n from 'react-native-i18n'

export default class NotificationComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      EnabledNotification: false,
      EnabledVerification: false,
      EnabledCalles: false
    }
  }

  renderContent = () => {
    let colorNotification = '#002FA2'
    let colorVerification = '#002FA2'
    let colorCalles = '#002FA2'

    if (this.state.EnabledNotification) {
      colorNotification = 'red'
    }
    if (this.state.EnabledVerification) {
      colorVerification = 'red'
    }
    if (this.state.EnabledCalles) {
      colorCalles = 'red'
    }

    if (this.props.notificaion) {
      return (
        <View style={{ alignItems: 'center' }}>
          <View>
            <Text style={styles.getMessage}>
              {I18n.t('getMess')}
            </Text>
            <Text style={styles.Message}>
              {I18n.t('enableNoti')}
            </Text>
          </View>
          <Image
            source={Images.notificaion}
            style={{ height: 116, width: 116, marginTop: 30 }}
          />

          <Button
            text={
              this.state.EnabledNotification
                ? I18n.t('Enabled')
                : I18n.t('enableNotification')
            }
            style={{
              borderRadius: 8,
              backgroundColor: colorNotification,
              marginTop: 30
            }}
            styleText={{ color: 'white' }}
            onPress={() => {
              this.props.EnableNotifications()
              this.setState({
                EnabledNotification: !this.state.EnabledNotification
              })
            }}
          />
        </View>
      )
    } else if (this.props.Verification) {
      console.log('ERROR MESSAGE => ', this.props.errorMessage)
      return (
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={styles.getMessage}>
            {I18n.t('verifyMobile')}
          </Text>
          <Text style={styles.Message}>
            {I18n.t('verifyDesc')}
          </Text>
          <TextInput
            placeholder={I18n.t('verifyCode')}
            onChangeText={this.props.onVerfCodeChange}
            styles={{
              textAlign: 'center',
              marginTop: 25,
              height: 30,
              color: '#00339b'
            }}
            containerStyle={{ flex: 1, marginHorizontal: 30, height: 50 }}
            error={this.props.errorMessage}
            errorMessage={this.props.errorMessage}
            keyboardType='numeric'
          />

          <Button
            text={
              this.state.EnabledVerification
                ? I18n.t('submit')
                : I18n.t('submitNow')
            }
            style={{
              borderRadius: 8,
              backgroundColor: colorVerification,
              marginTop: 40
            }}
            styleText={{ color: 'white' }}
            onPress={this.props.Submit}
          />
          <Button
            text={I18n.t('resendCode')}
            style={{
              borderRadius: 8,
              backgroundColor: Colors.transparent,
              marginTop: 15
            }}
            styleText={{ color: '#4990E2' }}
            loading={this.props.verifyLoading}
            onPress={this.props.ResendVerification}
          />

        </View>
      )
    } else if (this.props.Calles) {
      return (
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={styles.getMessage}>
            {I18n.t('getCall')}
          </Text>
          <Text style={styles.Message}>
            {I18n.t('getCallDesc')}
          </Text>

          <Image
            source={Images.call}
            style={{ height: 123, width: 123, marginTop: 30 }}
          />

          <Button
            text={
              this.state.EnabledCalles
                ? I18n.t('Enabled')
                : I18n.t('enableCall')
            }
            style={{
              borderRadius: 8,
              backgroundColor: colorCalles,
              marginTop: 40
            }}
            styleText={{ color: 'white' }}
            onPress={() => {
              this.props.EnableCalls(!this.state.EnabledCalles)
              this.setState({
                EnabledCalles: !this.state.EnabledCalles
              })
            }}
          />

        </View>
      )
    }
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={Images.blueLogo}
            style={{ height: 105, width: 187, marginTop: 30 }}
          />
          {this.renderContent()}
        </View>
      </ScrollView>
    )
  }
}
