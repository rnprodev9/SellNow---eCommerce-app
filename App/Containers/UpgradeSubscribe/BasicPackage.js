import React from 'react'
import { ScrollView, Text, Image, View, StatusBar } from 'react-native'
import TopBar from '../../Components/TopBar'
import Button from '../../Components/FullButton'
import styles from './BasicPackageStyle'
import { Actions } from 'react-native-router-flux'
import vm from './UpgradeSubscribeStore'
import { Images } from '../../Themes'
import I18n from 'react-native-i18n'
export default class BasicPackage extends React.Component {
  static defaultProps = {
    title: 'Details Basic Package',
    points: [
      'all normal registeration features',
      'have one featured items for sale',
      'registration for 6 month only',
      '( with renewal notification)'
    ],
    price: 15,
    accountNum: '758 785 95548 9551'
  }

  render () {
    let {
      title,
      points,
      price,
      accountNum
    } = this.props
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#C8DD11' />
        <TopBar leftImage={I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft}leftText={I18n.t('Back')} title={I18n.t('BasicPackage')} backgroundColor={'#C8DD11'} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>
              {title}
            </Text>
          </View>
          <View style={styles.detailsView}>
            {
              points != '' && points.map && points.map((point, index) => <Text style={styles.detailsText} key={index}> {index.toString() + '- ' + point} </Text>)
            }
          </View>
          <View style={styles.priceView}>
            <Text style={styles.priceText}>
              {price}$
            </Text>
          </View>
          <View style={[styles.titleView, { marginVertical: 50 }]}>
            <Text style={[ styles.detailsText, { color: '#627CBD', textAlign: 'center' } ]}>
              To upgrade to This Backage,
              {'\n'} Please Transfer {price.toString()}$ to the below account:
              {' '}
            </Text>
          </View>
          <View style={styles.titleView}>
            <Text style={[ styles.detailsText, { color: '#7F7F7F', textAlign: 'center' } ]}>
              {' '}Account No.
              {'\n'} {accountNum}
              {' '}
            </Text>
          </View>
          <Button
            onPress={() => Actions.BankTransfer({type_id: this.props.id})}
            style={{ marginHorizontal: 80, borderRadius: 4, backgroundColor: '#002FA2', marginTop: 50, height: 42 }}
            loading={vm.isLoading}
            text={I18n.t('UpgradeNow')} />
        </ScrollView>
      </View>
    )
  }
}
