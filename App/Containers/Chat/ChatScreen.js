import React from 'react'
import { View, Text } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { Images } from '../../Themes'
import fire from '../../Utils/firebase'
import map from '../../Utils/mapObject'
import TopBar from '../../Components/TopBar'
import I18n from 'react-native-i18n'
;(function () {
  if (typeof Object.defineProperty === 'function') {
    try {
      Object.defineProperty(Array.prototype, 'sortBy', { value: sb })
    } catch (e) {}
  }
  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb

  function sb (f) {
    for (var i = this.length; i;) {
      var o = this[--i]
      this[i] = [].concat(f.call(o, o, i), o)
    }
    this.sort(function (a, b) {
      for (var i = 0, len = a.length; i < len; ++i) {
        if (a[i] != b[i]) return a[i] < b[i] ? -1 : 1
      }
      return 0
    })
    for (var i = this.length; i;) {
      this[--i] = this[i][this[i].length - 1]
    }
    return this
  }
})()

// const uid1 = 'userId1'
// const uid2 = 'userId2'

export default class Chat extends React.Component {
  state = {}
  database = fire.database().ref()

  constructor (props) {
    super(props)
    let users = [props.user.id, props.seller.id]
    users = users.sortBy(o => o)
    this.chatId = `${users[0]}-${users[1]}`
    this.chatUrl = `chat/${this.chatId}/`
    console.log('SORTED USERS IDS =>', this.chatId)
    this.state = {
      messages: []
    }
  }

  componentWillMount () {
    this.listenOnChatNode()
  }

  componentDidMount () {}

  listenOnChatNode = () => {
    this.database.child(this.chatUrl).on('value', snap => {
      let messages = []
      map(snap.val())((msg, msgId) => {
        messages.push({
          _id: msgId,
          text: msg.text,
          createdAt: msg.createdAt,
          user: {
            _id: msg.senderId,
            name: msg.senderName,
            avatar: msg.senderAvatar
          }
        })
      })
      // messages.sortBy(o => o.createdAt)
      messages.reverse()
      this.setState({ messages })
    })
  }

  onSend (msg) {
    this.database.child(this.chatUrl).push({
      _id: msg._id,
      text: msg.text,
      createdAt: Date.now(),
      senderId: this.props.user.id,
      senderName: this.props.user.name,
      senderAvatar: this.props.user.avatar
    })
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <TopBar
          leftImage={
            I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft
          }
          leftText={I18n.t('Back')}
          // title={this.props.user.name}
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages[0])}
          user={{
            _id: this.props.user.id
          }}
        />
      </View>
    )
  }
}
