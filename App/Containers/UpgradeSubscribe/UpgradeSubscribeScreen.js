import React from 'react'
import { ScrollView, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import { Images, Colors } from '../../Themes/'
import TopBar from '../../Components/TopBar'
import TextInputField from '../../Components/TextInputField'
import Button from '../../Components/FullButton'
import { Actions } from 'react-native-router-flux'
import vm from './UpgradeSubscribeStore'

// Styles
import styles from './UpgradeSubscribeStyle'
import I18n from 'react-native-i18n'
import {observer} from 'mobx-react'

@observer
export default class ContactUs extends React.Component {
  constructor (props) {
    super(props)
    vm.onStartUp()
  }

  render () {
    console.log(vm.isLoading)
    if (vm.isLoading) return <ActivityIndicator style={{ flex: 1 }} size='large' />

    return (
      <View style={styles.container}>
        <TopBar
          leftImage={I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft}
          leftText={I18n.t('Back')}
          title={I18n.t('upgradeSub')}
          rightText={I18n.t('Done')}
        />
        <ScrollView style={styles.container}>

          <View style={[styles.row, { backgroundColor: '#1890C2' }]}>
            <View style={styles.textView}>
              <Text style={styles.smallText}>{I18n.t('CurrentSubscription')}</Text>
              <Text style={styles.largeText}>{I18n.t('Normal')}</Text>
            </View>
            <Image
              source={Images.done}
            />
          </View>

          <View style={[styles.row, { justifyContent: 'center' }]}>
            <Text style={styles.mediumText}>{I18n.t('upgradeSub')}</Text>
          </View>

          <TouchableOpacity style={[styles.row, { backgroundColor: '#C8DD11' }]} onPress={() => { vm.upgradeReq(2) }}>
            <View style={styles.textView}>
              <Text style={styles.smallText}>{I18n.t('Upgradepackage')}</Text>
              <Text style={styles.largeText}>{I18n.t('BASIC')}</Text>
            </View>
            <View style={styles.priceView}>
              <Text style={styles.priceText}>{vm.basicPrice}$</Text>
              <Image
                source={I18n.locale == 'en' ? Images.chevronRightWhite : Images.chevronLeft}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.row, { backgroundColor: '#F9730D' }]} onPress={() => {
            vm.upgradeReq(3)
          }}>
            <View style={styles.textView}>
              <Text style={styles.smallText}>{I18n.t('Upgradepackage')}</Text>
              <Text style={styles.largeText}>{I18n.t('PREMIUM')}</Text>
            </View>
            <Image
              source={Images.prime}
            />
            <View style={styles.priceView}>
              <Text style={styles.priceText}>{vm.premPrice}$</Text>
              <Image
                source={I18n.locale == 'en' ? Images.chevronRightWhite : Images.chevronLeft}
              />
            </View>
          </TouchableOpacity>

        </ScrollView>
      </View>
    )
  }

}

