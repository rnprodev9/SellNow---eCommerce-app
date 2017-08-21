import React from 'react'
import { ScrollView, Text, StatusBar, View, Image } from 'react-native'
import { Images, Fonts, Colors } from '../../Themes'
import BackGround from '../../Components/BackgroundImage'
import TopBar from '../../Components/TopBar'
import TextInputField from '../../Components/TextInputField'
import Button from '../../Components/FullButton'

// Styles
import styles from './ForgotPasswordScreenStyle'
import vm from './ForgotPasswordStore'
import { observer } from 'mobx-react'
import I18n from 'react-native-i18n'

@observer
export default class ForgotPassword extends React.Component {

  constructor(props) {
    super(props)
    this.state = { hidden: true, animated: true }
  }

  componentWillMount() {
    vm.errors = {};
    vm.email = '';
  }

  render() {

    return (
      <View style={styles.container}>
        <StatusBar hidden={this.state.hidden} animated={this.state.animated} />
        <BackGround
          image={Images.forgotPasswordBackground}
        />
        <ScrollView>
          <TopBar
            leftImage={I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft}
            leftText={I18n.t('Back')}
            backgroundColor={Colors.transparent}
          />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: 236, height: 129, marginTop: 12 }}>
              <Image
                source={Images.logo}
              />
            </View>
            <View style={{ backgroundColor: Colors.transparent, alignItems: 'center', justifyContent: 'center', marginTop: 32, width: 294 }}>
              <Text style={styles.textTitle}>{I18n.t('resetPass')}</Text>
              <Text style={styles.textDescription}>{I18n.t('resetDesc')}</Text>
              <Text style={[styles.textDescription, { marginTop: 10 }]}>{I18n.t('note')}</Text>
              <Text style={styles.textDescription}>{I18n.t('noteDesc')}</Text>
            </View>
            <TextInputField
              textInputStyle={{ borderBottomColor: Colors.cloud, borderBottomWidth: 0.7 }}
              containerStyle={{ marginHorizontal: 40, marginTop: 30 }}
              placeholder={I18n.t('email')}
              onChangeText={vm.onEmailChanged}
              error={vm.errors}
              errorMessage={vm.errors ? vm.errors._message : ''}
            />
            <Button
              style={{ marginTop: 32, backgroundColor: Colors.snow, marginHorizontal: 60, borderRadius: 8 }}
              text={I18n.t('resetPass')}
              onPress={vm.resetPassword}
              styleText={{ color: '#2A2722' }}
            />
          </View>
        </ScrollView>
      </View>
    )
  }

}

