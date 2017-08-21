import React from 'react'
import {
  AppRegistry,
  ListView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native'
import styles from './Styles/SwipListStyle'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import { Actions } from 'react-native-router-flux'
import { Images } from '../Themes'
var moment = require('moment')
import Snackbar from 'react-native-snackbar'
import { Colors } from '../Themes'
import BackgroundImage from './BackgroundImage'
import Fonts from '../Themes/Fonts'

export default class SwipList extends React.Component {
  constructor (props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      basic: true,
      listViewData: []
    }
  }
  componentWillMount = () => {
    this.setState({ listViewData: this.props.users })
    console.log(' setting users ', this.props.users)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ listViewData: nextProps.users })
    console.log(' setting users ', nextProps.users)
  }

  deleteRow (secId, rowId, rowMap, user) {
    rowMap[`${secId}${rowId}`].closeRow()
    const newData = [...this.state.listViewData]
    newData.splice(rowId, 1)
    this.setState({ listViewData: newData })
    console.log('_user ', user)
    this.props.onDelete(this.props.chat ? user.main_id : user.follower_id || user.blocked_id)
  }

  acceptOffer = id => {
    this.props.acceptOffer(id)
  }

  getDate = date => {
    if (this.props.offers) {
      return 'Joined ' + moment(date).format('DD-MM-YYYY')
    }

    if (this.props.chat) {
      return date
    }

    let _d = new Date(date)
    let joined = moment(_d * 1000).format('DD-MM-YYYY')
    return joined
  }

  render () {
    return (
      <View style={styles.container}>
        <SwipeListView
          dataSource={this.ds.cloneWithRows(this.state.listViewData)}
          enableEmptySections
          renderRow={user => (
            <TouchableHighlight
              onPress={() => {
                if (this.props.blocked) return
                if (!this.props.notification) {
                  if (this.props.chat) {
                    Actions.ChatScreen({
                      user: user.user,
                      seller: user.seller
                    })
                    return
                  }
                  Actions.SellerProfile({ userId: user.follower_id })
                }
              }}
            >
              <View style={styles.rowFront} underlayColor={'#AAA'}>
                <View style={styles.profileImageView}>
                  <Image
                    source={
                      user.follower_picture && user.follower_picture != 'N/A' || user.blocked_picture && user.blocked_picture !== 'N/A'
                        ? { uri: user.follower_picture || user.blocked_picture }
                        : this.props.notification
                          ? Images.notificationIconDark
                          : Images.blueLogo
                    }
                    resizeMode={this.props.notification ? 'contain' : 'cover'}
                    style={
                      !this.props.notification
                        ? styles.profileImage
                        : [styles.profileImage, { borderRadius: 0 }]
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.followName,
                      { marginTop: this.props.offers ? 10 : 20 }
                    ]}
                  >
                    {user.follower || user.user}
                  </Text>
                  <Text
                    style={[
                      styles.followName,
                      this.props.notification
                        ? Fonts.style.normal
                        : Fonts.style.h4,
                      { color: Colors.mainColor, marginTop: -18 }
                    ]}
                  >
                    {user.offer}
                  </Text>
                </View>
                <Text style={styles.date} numberOfLines={1}>
                  {this.props.notification
                    ? null
                    : this.getDate(
                      user.follower_join_date || user.blocked_join_date
                    )}
                </Text>
              </View>
            </TouchableHighlight>
          )}
          renderHiddenRow={(data, secId, rowId, rowMap) => (
            <View style={styles.rowBack}>
              <TouchableOpacity
                style={[
                  styles.backRightBtn,
                  styles.backRightBtnRight,
                  this.props.buttonColor
                ]}
                onPress={_ =>
                  (!this.props.offers
                    ? this.deleteRow(secId, rowId, rowMap, data)
                    : this.acceptOffer(data.main_id))}
              >
                <Text style={styles.backTextWhite}>
                  {this.props.notification
                    ? <Image
                      source={Images.deleteIcon}
                      resizeMode={'contain'}
                      style={[styles.profileImage, { borderRadius: 0 }]}
                    />
                    : this.props.btnText}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          // leftOpenValue={75}
          disableRightSwipe
          rightOpenValue={-170}
        />

      </View>
    )
  }
}
