import React from 'react'
import { View, Text, ListView, StyleSheet, ScrollView } from 'react-native'
import { Colors } from '../Themes'
import Button from './FullButton'
import ProductList from '../Components/ProductList'

// For empty lists
// import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/HorizontalCategoryListStyle'

export default class HorizontalCategoryList extends React.Component {

  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  dataSource = this.ds.cloneWithRows([])

  constructor (props) {
    super(props)

    this.state = {
      activeItemId: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.categories && nextProps.categories.length > 0) {
      this.dataSource = this.ds.cloneWithRows(nextProps.categories)
    }
  }

  setActive = (itemId) => {
    this.setState({
      activeItemId: itemId
    })
  }

  _renderRow = (cat, secId, rowId) => (
    <Button
      style={[styles.itemStyle, { backgroundColor: this.props.activeItemId == rowId ? '#003CD2' : '#FFFFFF' }]}
      text={cat.title}
      numberOfLines={1}
      styleText={{ color: this.props.activeItemId == rowId ? '#FFFFFF' : '#BFBFBF' }}
      onPress={() => {
        this.props.setActive(rowId)
        this.props.onButtonPress(cat.id)
      }}
    />
  )

  render () {
    // const dataSource = ds.cloneWithRows(['1', '2', '2', '2', '2'])
    return (
      <View style={[styles.container, this.props.style]}>
        <ListView
          contentContainerStyle={styles.listContent}
          dataSource={this.dataSource}
          renderRow={this._renderRow}
          enableEmptySections
          pageSize={15}
          horizontal
        />
        {this.props.children}
      </View>
    )
  }
}
