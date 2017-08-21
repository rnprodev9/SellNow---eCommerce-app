import React from 'react'
import { View, Text, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import TopBar from '../../Components/TopBar'
import Tabs from '../../Components/TabBar'
import FollowList from '../../Components/SwipList'
import vm from './FollowingStore'
import { observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import AndroidBackButton from 'react-native-android-back-button'

// Styles
// import styles from './Styles/FollowingStyle'

@observer
export default class Following extends React.Component {
  componentWillMount () {
    vm.FollowingList = []
    vm.loadFollowingList()
  }

  componentWillReceiveProps (nextProps) {
    vm.loadFollowingList()
  }

  render () {
    if (vm.isLoading) return <ActivityIndicator />
    return (
      <View style={{ flex: 1, paddingBottom: 5 }}>
        <AndroidBackButton onPress={() => Actions.pop({refresh: { reload: true }})} />
        <TopBar leftText={'Back'} title={'Following'} leftAction={() => { Actions.pop({ refresh: { reload: true } }) }} />
        <FollowList onDelete={vm.unFollowAction} users={vm.FollowingList.slice()} btnText={'Unfollow'} />
        <Tabs />
      </View>
    )
  }

}
