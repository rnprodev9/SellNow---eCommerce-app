import React from 'react'
import { Text, View, TouchableOpacity, ListView } from 'react-native'
import TopBar from '../../Components/TopBar'
import styles from './ReasonReportStyle'
import vm from './ReportItemStore'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import { Images } from '../../Themes/'

export default class BasicPackage extends React.Component {
  state = {
    select: ''
  }
  _renderRow = (rowData, secId, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          vm.selectReason(index)
          this.setState({})
        }}
        style={styles.row}
      >
        <Text style={styles.label}>Reason {rowData.name}</Text>
        {vm.selectedReasonId == rowData.id
          ? <Icon name='check' style={styles.checkIcon} />
          : null}
      </TouchableOpacity>
    )
  }
  render () {
    const ds = new ListView.DataSource({
      rowHasChanged: () => (r1, r2) => r1 !== r2
    })
    const dataSource = ds.cloneWithRows(vm.reasons.slice())
    console.log(vm.reasons.slice())
    return (
      <View style={styles.container}>
        <TopBar
          leftImage={
            I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft
          }
          leftText={I18n.t('Back')}
          title={I18n.t('ReasonReport')}
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
