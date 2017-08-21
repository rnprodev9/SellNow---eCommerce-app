import React from 'react'
import { View, Text, ListView } from 'react-native'
import { connect } from 'react-redux'

import styles from './Styles/HomeFollowingListStyle'
import FollowingUser from '../Components/OtherSellerItem'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

@observer
class HomeFollowingList extends React.Component {

  // DataSource configured
  rowHasChanged = (r1, r2) => r1 !== r2
  @observable ds = new ListView.DataSource({ rowHasChanged: this.rowHasChanged })
  @observable dataSource = this.ds.cloneWithRows([])
  @observable items = {}

  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.dataSource = this.ds.cloneWithRows(this.props.followedUsers)
  }

  componentWillReceiveProps (nextProps) {
    this.dataSource = this.ds.cloneWithRows(nextProps.followedUsers)
  }

  loadItems = async user => {
    let items = await this.props.loadOtherSellerItems(user.follower_id)
    this.items[user.id] = items
    this.props.reRender()
  }

  _renderRow = (user) => {
    return (
      <FollowingUser
        userImage={user.follower_picture}
        items={this.items[user.id] || []}
        userItem={user.follower}
        rowStyle={{ marginTop: 10 }}
        onLoad={async () => { await this.loadItems(user) }}
        fullScreen
        userId={user.follower_id}
      />
    )
  }

  _noRowData () {
    return this.dataSource.getRowCount() === 0
  }

  // Render a footer.
  _renderFooter = () => {
    return <Text> - Footer - </Text>
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.dataSource}
          renderRow={this._renderRow}
          enableEmptySections
          pageSize={15}
        />
      </View>
    )
  }
}
export default HomeFollowingList
