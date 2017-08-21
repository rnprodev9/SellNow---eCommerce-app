import React from 'react'
import { Text, View, TouchableOpacity, ListView } from 'react-native'
import TopBar from '../../Components/TopBar'
import styles from './PostStatusStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import { Images } from '../../Themes/'
import vm from './ProductDetailsStore'

export default class PostStatus extends React.Component {
  state = {
    select: ''
  }
  _renderRow = (rowData, secId, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ select: rowData })
          vm.onStatusChanged(rowData)
        }}
        style={styles.row}
      >
        <Text style={styles.label}>{rowData}</Text>
        {this.state.select == rowData
          ? <Icon name='check' style={styles.checkIcon} />
          : null}
      </TouchableOpacity>
    )
  }
  render () {
    const ds = new ListView.DataSource({
      rowHasChanged: () => (r1, r2) => r1 !== r2
    })
    const dataSource = ds.cloneWithRows(['Active', 'Deactive', 'Sold'])
    return (
      <View style={styles.container}>
        <TopBar
          leftImage={
            I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft
          }
          leftText={I18n.t('Back')}
          title={I18n.t('PostStatus')}
          rightText={I18n.t('Done')}
          rightAction={Actions.pop}
        />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={dataSource}
          renderRow={this._renderRow}
          enableEmptySections
          pageSize={15}
        />
      </View>
    )
  }
}
