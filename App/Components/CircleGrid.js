import React from 'react'
import { ActivityIndicator, View, Text, ListView, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../Themes'

// For empty lists
// import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/CircleGridStyle'
import { observer } from 'mobx-react'

// const dataObjects = [
//   { title: 'First Title', description: 'First Description' },
//   { title: 'Second Title', description: 'Second Description' },
//   { title: 'Third Title', description: 'Third Description' },
//   { title: 'Fourth Title', description: 'Fourth Description' },
//   { title: 'Fifth Title', description: 'Fifth Description' },
//   { title: 'Sixth Title', description: 'Sixth Description' },
//   { title: 'Seventh Title', description: 'Seventh Description' }
// ]

export default class CircleGrid extends React.Component {

  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  dataSource = this.ds.cloneWithRows([])
  mounted = false;

  constructor(props) {
    super(props)
    this.dataSource = this.ds.cloneWithRows(props.categories)
  }

  componentWillMount() {
    this.mounted = true
  }
  componentWillUnmount() {
    this.mounted = false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categories && nextProps.categories.length > 0) {
      this.dataSource = this.ds.cloneWithRows(nextProps.categories)
    }
  }

  _renderRow = (rowData, secId, rowId) => {
    return (
      <TouchableOpacity style={[styles.row, {
        backgroundColor: this.props.buttonIndex == rowId ? '#0102BF' : '#F8F8F8',
        borderColor: this.props.buttonIndex == rowId ? 'white' : '#787878'
      }]}
        activeOpacity={0.8} onPress={() => this.props.onCirclePress(rowId)}>
        <View style={[styles.subRow, {
          backgroundColor: this.props.buttonIndex == rowId ? '#0102BF' : '#F8F8F8',
          borderColor: this.props.buttonIndex == rowId ? 'white' : '#F8F8F8'
        }]}>
          <Text style={[styles.label, { color: this.props.buttonIndex == rowId ? 'white' : '#787878' }]}>{rowData.title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  _noRowData() {
    return this.state.dataSource.getRowCount() === 0
  }

  // Render a footer.
  _renderFooter = () => {
    return (
      <View style={styles.row} />
    )
  }

  render() {
    return (
      <View style={styles.container}>

        {/* title View */}
        {this.props.title ?
          <View style={{ marginTop: 5, marginBottom: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#979797' }} />
            <Text style={styles.titleText}>{this.props.title}</Text>
            <View style={{ flex: 1, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#979797' }} />
          </View>
          :
          null}
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

