import React from 'react'
import { View, ActivityIndicator } from 'react-native'
// import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Actions } from 'react-native-router-flux'
import TopBar from '../../Components/TopBar'
import Tabs from '../../Components/TabBar'
import ConversationList from '../../Components/SwipList'
import vm from './ConversationStore'
import { observer } from 'mobx-react'
import I18n from 'react-native-i18n'
import { Images } from '../../Themes'
// Styles
// import styles from './Styles/BlockedStyle'

@observer
export default class Conversation extends React.Component {
  componentWillMount () {
    vm.onStartUp()
  }

  render () {
    if (vm.isLoading) return <ActivityIndicator />

    return (
      <View style={{ flex: 1, paddingBottom: 5 }}>
        <TopBar leftText={I18n.t('Back')} title={I18n.t('Conversations')} leftImage={
            I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft
          } />
        <ConversationList
          users={vm.chats.slice()}
          buttonColor={{ backgroundColor: '#D0011B' }}
          btnText={'Delete'}
          chat
          onDelete={vm.deleteChat}
        // onChatPress={() => Actions.ChatScreen()}
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
