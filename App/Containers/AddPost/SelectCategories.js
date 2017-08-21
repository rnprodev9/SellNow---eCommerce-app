import React from 'react'
import { observable } from 'mobx'
import {
  View,
  Text,
  ListView,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import CategoryList from './CategoryList'
import styles from './SelectCategoriesStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'
import vm from './AddPostStore'
import { observer } from 'mobx-react/native'
import TobBar from '../../Components/TopBar'
import { Actions } from 'react-native-router-flux'
import I18n from 'react-native-i18n'

@observer
export default class SelectCategories extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      parentIndex: null
    }
  }

  showChildrens = i => {
    if (this.state.parentIndex == i) {
      this.setState({
        parentIndex: null
      })
    } else {
      this.setState({
        parentIndex: i
      })
    }
  }

  _renderRow = (rowData, secId, rowId) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            this.showChildrens(rowData)
            vm.selectCategory(rowData)
          }}
        >
          <Text style={styles.label}>{rowData.title}</Text>
          {vm.selectedCategoryId == rowData.id
            ? <Icon name='check' style={styles.checkIcon} />
            : null}
        </TouchableOpacity>
        {this.state.parentIndex == rowData
          ? <CategoryList
            selectCategory={vm.selectSubCategory}
            currentSelected={vm.selectSubCategoryId}
            />
          : null}
      </View>
    )
  }

  // renderChild = (rowData) => {
  //     if (this.state.parentIndex) {
  //         return (<CategoryList catIndex={this.state.parentIndex} />)
  //     }
  // }

  render () {
    const ds = new ListView.DataSource({
      rowHasChanged: () => (r1, r2) => r1 !== r2
    })
    const dataSource = ds.cloneWithRows(vm.categories.slice())
    return (
      <View style={styles.container}>
        <TobBar
          disableLeftImage
          leftText={I18n.t('Back')}
          rightText={I18n.t('Done')}
          title={I18n.t('selectCategory')}
          leftAction={Actions.pop}
          rightAction={Actions.pop}
        />
        <ScrollView>
          <ListView
            contentContainerStyle={styles.listContent}
            dataSource={dataSource}
            renderRow={this._renderRow}
            enableEmptySections
            pageSize={15}
          />
        </ScrollView>
      </View>
    )
  }
}
