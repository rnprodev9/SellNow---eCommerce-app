import React from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import TopBar from '../../Components/TopBar'
import Tabs from '../../Components/TabBar'
import FollowList from '../../Components/SwipList'
import vm from './BlockedStore'
import { observer } from 'mobx-react'
import AndroidBackButton from 'react-native-android-back-button'

// Styles
// import styles from './Styles/BlockedStyle'

@observer
export default class Blocked extends React.Component {
  componentWillMount () {
    vm.blockedList = []
    vm.loadBlockedList()
  }

  componentWillReceiveProps (nextProps) {
    vm.loadBlockedList()
  }

  render () {
    if (vm.isLoading) return <ActivityIndicator />

    return (
      <View style={{ flex: 1, paddingBottom: 5 }}>
        <AndroidBackButton onPress={() => Actions.pop({refresh: { reload: true }})} />
        <TopBar
          leftText={'Back'}
          title={'Blocked'}
          leftAction={() =>
            Actions.popTo({ scene: 'UserProfile', refresh: { reload: true } })}
        />
        <FollowList
          users={vm.blockedList.slice()}
          onDelete={vm.unBlockAction}
          buttonColor={{ backgroundColor: '#609A1D' }}
          btnText={'Unblock'}
          blocked
        />
        <Tabs />
      </View>
    )
  }
}
