import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image } from 'react-native'
import { Images, Colors, Fonts } from '../../Themes'

import TopBar from '../../Components/TopBar'
import TextInputField from '../../Components/TextInputField'
import Button from '../../Components/FullButton'

// Styles
import styles from './ContactUsStyle'
import vm from './ContactUsStore'
import { observer } from 'mobx-react'
import I18n from 'react-native-i18n'
@observer
export default class ContactUs extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hidden: true, animated: true }
  }

  componentWillMount() {
    vm.reset()
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBar
          leftImage={
            I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft
          }
          leftText={I18n.t('Back')}
          title={I18n.t('ContactUs')}
        />
        <ScrollView style={styles.container}>
          <KeyboardAvoidingView
            behavior='position'
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <TextInputField
              styles={{ color: '#7B7B7B' }}
              textInputStyle={styles.textInputStyle}
              placeholder={I18n.t('Subject')}
              onChangeText={vm.onSubjectChange}
              styles={styles.textTitle}
            />
            <TextInputField
              textInputStyle={styles.textInputStyle}
              placeholder={I18n.t("WriteUsMessage")}

              onChangeText={vm.onMessageChange}
              styles={styles.textTitle}
            />

            <Button
              style={{ marginHorizontal: 60, borderRadius: 4, backgroundColor: '#002FA2', marginTop: 120, height: 32 }}
              onPress={vm.sendContactUs}

              loading={vm.isLoading}
              text={I18n.t('SendMessage')}
            />

            {
              vm.isRequiredError ? <Text style={{ color: Colors.error, ...Fonts.style.input, alignSelf: 'center', textAlign: 'center', marginTop: 30 }}>{vm.isRequiredError}</Text> : null
            }
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
  }
}
