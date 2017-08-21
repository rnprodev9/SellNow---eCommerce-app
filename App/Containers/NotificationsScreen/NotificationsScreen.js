import React from 'react'
import { View, ActivityIndicator } from 'react-native'
// import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Actions } from 'react-native-router-flux'
import TopBar from '../../Components/TopBar'
import Tabs from '../../Components/TabBar'
import NotificationList from '../../Components/SwipList'
import vm from './NotificationStore'
import { observer } from 'mobx-react'

// Styles
// import styles from './Styles/BlockedStyle'

@observer
export default class Notification extends React.Component {
  componentWillMount () {
    vm.onStartUp()
  }

  render () {
    if (vm.isLoading) return <ActivityIndicator />

    return (
      <View style={{ flex: 1, paddingBottom: 5 }}>
        <TopBar leftText={'Back'} title={'Notification'} />
        <NotificationList
          users={vm.notifications.slice()}
          buttonColor={{ backgroundColor: '#D0011B' }}
          btnText={'Delete'}
          chat
          notification
          onDelete={vm.deleteChat}
          onChatPress={() => null}
        />
        <Tabs
          showFilterModal={() => {
            Actions.popTo({ scene: 'HomeScreen' })
          }}
          goToHome={() => Actions.popTo({ scene: 'HomeScreen' })}
        />
      </View>
    )
  }
}
