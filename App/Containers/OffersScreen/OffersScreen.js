import React from 'react'
import { View, ActivityIndicator } from 'react-native'
// import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'   import { Actions } from 'react-native-router-flux'
import { Actions } from 'react-native-router-flux'
import TopBar from '../../Components/TopBar'
import Tabs from '../../Components/TabBar'
import OffersList from '../../Components/SwipList'
import vm from './OffersStore'
import { observer } from 'mobx-react'
import I18n from 'react-native-i18n'
import { Images } from '../../Themes'
// Styles
// import styles from './Styles/BlockedStyle'

@observer
export default class Offers extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    // vm.loadBlockedList()"06 Jun,2017  05:22PM"
    vm.onStartup(this.props.itemId)
  }

  render () {
    if (vm.isLoading) return <ActivityIndicator />

    return (
      <View style={{ flex: 1, paddingBottom: 5 }}>
        <TopBar
          leftImage={
            I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft
          }
          leftText={I18n.t('Back')}
          title={I18n.t('Offers')}
          rightText={I18n.t('Done')}
          rightAction={Actions.pop}
        />
        <OffersList
          users={vm.offersList.slice()}
          buttonColor={{ backgroundColor: '#609A1D' }}
          offers
          btnText={'ACCEPT OFFER'}
          acceptOffer={vm.acceptOffer}
        />
      </View>
    )
  }
}
