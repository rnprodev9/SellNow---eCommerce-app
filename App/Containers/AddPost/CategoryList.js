import React from 'react'
import {
  View,
  Text,
  ListView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'
import Icon from 'react-native-vector-icons/MaterialIcons'

// For empty lists
// import AlertMessage from '../Components/AlertMessage'

// Styles

import vm from './AddPostStore'

import { observer } from 'mobx-react/native'

@observer
export default class CategoryList extends React.Component {
  constructor (props) {
    super(props)
  }

  _renderRow = rowData => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({})
          vm.selectSubCategory({ id: rowData.id, title: rowData.title })
        }}
        style={styles.row}
      >
        <Text style={styles.label}>{rowData.title}</Text>
        {vm.selectedSubCategoryId == rowData.id
          ? <Icon name='check' style={styles.checkIcon} />
          : null}
      </TouchableOpacity>
    )
  }

  render () {
    const ds = new ListView.DataSource({
      rowHasChanged: () => (r1, r2) => r1 !== r2
    })
    const dataSource = ds.cloneWithRows(vm.subCategories.slice())
    return (
      <View style={styles.container}>
        {vm.subCategoryLoading
          ? <ActivityIndicator style={{ flex: 1 }} size='large' />
          : <ListView
            contentContainerStyle={styles.listContent}
            dataSource={dataSource}
            renderRow={this._renderRow}
            enableEmptySections
            pageSize={15}
            />}
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'
  },
  row: {
    flex: 1,
    height: 50,
    backgroundColor: '#f8f8f8',
    justifyContent: 'space-between',
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  label: {
    marginHorizontal: 50,
    color: 'gray'
  },
  checkIcon: {
    color: Colors.mainColor,
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 15
  }
}
