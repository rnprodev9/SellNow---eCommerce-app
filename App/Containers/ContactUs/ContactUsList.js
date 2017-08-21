import React from 'react'
import { Text, View, TouchableOpacity, ListView } from 'react-native'
import TopBar from '../../Components/TopBar'
import styles from './ContactUsListStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Actions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'
import { Images, Colors, Fonts } from '../../Themes/'
import vm from './ContactUsStore'
import { observer } from 'mobx-react'

@observer
export default class PostStatus extends React.Component {

  constructor() {
    super();
    this.state = {
      select: ''
    }
    vm.loadstatusList()
  }

  componentWillMount() {
    vm.selectedContactItem = null
  }


  _renderRow = (rowData, secId, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          vm.selectContactItem(index)
          this.setState({ select: rowData })
        }}
        style={styles.row}
      >
        <Text style={styles.label}>Status {rowData.name}</Text>
        {this.state.select == rowData
          ? <Icon name='check' style={styles.checkIcon} />
          : null}
      </TouchableOpacity>
    )
  }
  render() {
    console.log(vm.statusList && vm.statusList.slice())
    const ds = new ListView.DataSource({
      rowHasChanged: () => (r1, r2) => r1 !== r2
    })
    const dataSource = ds.cloneWithRows(vm.statusList && vm.statusList.slice().length > 0 ? vm.statusList.slice() : [])
    return (
      <View style={styles.container}>
        <TopBar
          leftImage={
            I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft
          }
          leftText={I18n.t('Back')}
          title={I18n.t('ChooseStatus')}
          rightText={I18n.t('Done')}
          rightAction={vm.selectItemSave}
        />
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={dataSource}
          renderRow={this._renderRow}
          enableEmptySections
          pageSize={15}
        />
        {
          vm.selectItemError ? <Text style={{ color: Colors.error, ...Fonts.style.input, alignSelf: 'center', textAlign: 'center', marginBottom: 100 }}>{vm.selectItemError}</Text> : null
        }
      </View>
    )
  }
}
