import React from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import TopBar from '../../Components/TopBar'
import Button from '../../Components/FullButton'
import { Images } from '../../Themes/'
import styles from './ReportItemStyle'
import Input from '../../Components/TextInputField'
import { Actions } from 'react-native-router-flux'
import vm from './ReportItemStore'
import { observer } from 'mobx-react/native'
import I18n from 'react-native-i18n'
@observer
export default class BasicPackage extends React.Component {
  constructor (props) {
    super(props)
  }

  async componentWillMount () {
    console.log('THIS.ITEMID = > ', this.props.itemId)
    try {
      vm.onStartUp(this.props.itemId)
    } catch (e) {
      console.log('ON START UP ERROR => ', e)
    }
  }

  render () {
    if (vm.isLoading) {
      return <ActivityIndicator style={{ flex: 1 }} size='large' />
    }
    return (
      <View style={styles.container}>
        <TopBar
          leftImage={
            I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft
          }
          leftText={I18n.t('Back')}
          title={I18n.t('ReportThisItem')}
          rightText={I18n.t('Close')}
          rightAction={Actions.pop}
        />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TouchableOpacity
            onPress={() => {
              Actions.ReasonReport({
                direction: 'vertical',
                reasons: vm.reasons.slice()
              })
            }}
            style={styles.SelectView}
          >
            <Text style={styles.titleText}>
              {vm.reasonName ? vm.reasonName : I18n.t('SelectReasonItem')}
            </Text>
            <Image
              source={
                I18n.locale == 'en' ? Images.chevronRight : Images.chevronAr
              }
              resizeMode={'cover'}
            />
          </TouchableOpacity>
          <View style={styles.noteView}>
            <Input
              onChangeText={vm.onNoteChange}
              styles={{ color: '#7B7B7B' }}
              containerStyle={{
                justifyContent: 'flex-start',
                backgroundColor: 'white',
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: '#979797',
                paddingHorizontal: 10,
                borderRadius: 12,
                marginTop: 10
              }}
              MultiLines
              placeholder={I18n.t('NoteHere')}
            />
            <Button
              style={{
                // marginHorizontal: 80,
                width: 185,
                alignSelf: 'center',
                borderRadius: 6,
                backgroundColor: '#002FA2',
                marginVertical: 15,
                height: 32
              }}
              onPress={vm.onSend}
              loading={vm.sendLoading}
              // loading={vm.isLoading}
              text={I18n.t('Send')}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}
