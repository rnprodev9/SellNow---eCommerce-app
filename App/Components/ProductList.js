import React from 'react'
import {
  View,
  Text,
  ListView,
  ActivityIndicator,
  Animated,
  Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import HorizontalCategoryList from '../Components/HorizontalCategoryList'
import Button from './FullButton'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import { Images } from '../Themes'
import TobBar from './TopBar'
import I18n from 'react-native-i18n'
var { height, width } = Dimensions.get('window')

// For empty lists
// import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './Styles/ProductListStyle'

import Product from './ProductItem'
import { observer } from 'mobx-react'

@observer class ProductList extends React.Component {
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  dataSource = this.ds.cloneWithRows([])

  constructor (props) {
    super(props)
  }
  componentWillMount () {
    this.updateComponent(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.updateComponent(nextProps)
  }
  updateComponent (props) {
    if (props.items && props.items.length > 0) {
      this.dataSource = this.ds.cloneWithRows(props.items)
    }
  }

  getDefaultImage (images) {
    if (!images || images.length < 1) return null

    for (var i = 0; i < images.length; i++) {
      let image = images[i]
      if (image.default) return image.link
      if (i + 1 == images.length) return image.link
    }
  }

  _renderRow = (product, _, index) => {
    let images = product && product.images && product.images.slice
      ? product.images.slice()
      : []
    let defaultImage = this.getDefaultImage(images)
    return (
      <Product
        productImage={defaultImage}
        itemIndex={index}
        onLikeItem={this.props.onLikeItem}
        currentScreen={this.props.currentScreen}
        userProfile={this.props.userProfile}
        {...product}
      />
    )
  }

  _loadMoreContentAsync = async () => {
    await this.props.onLoadMore()
  }

  render () {
    if (this.props.isloading) return <ActivityIndicator />

    if (
      (!this.props.items && !this.props.isloading) ||
      this.props.items.length < 1
    ) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text>{I18n.t('NoContent')}</Text>
        </View>
      )
    } else {
      return (
        <View style={[styles.container, this.props.style]}>
          {this.props.fullScreen
            ? <TobBar
              leftImage={
                  I18n.locale === 'ar'
                    ? Images.chevronRightWhite
                    : Images.chevronLeft
                }
              leftText={I18n.t('Back')}
              />
            : null}
          <ListView
            renderScrollComponent={props => <InfiniteScrollView {...props} />}
            contentContainerStyle={[
              styles.listContent,
              this.props.listContentStyle
            ]}
            dataSource={this.dataSource}
            renderRow={this._renderRow}
            enableEmptySections
            onScroll={this.props.scrollY}
            pageSize={15}
            canLoadMore={
              !!(this.props.total > this.props.items.length &&
                !this.props.pageLoad)
            }
            onLoadMoreAsync={this._loadMoreContentAsync}
          />
          {this.props.pageLoad
            ? <ActivityIndicator
              size='large'
              style={{
                position: 'absolute',
                bottom: 60,
                alignSelf: 'center',
                minHeight: 60,
                minWidth: 60,
                borderRadius: 20,
                backgroundColor: 'rgba(0,0,0,0.8)'
              }}
              />
            : height > 630 && this.props.items.length == 4
                ? <View style={{ height: 50 }} />
                : null}

        </View>
      )
    }
  }
}

export default ProductList
