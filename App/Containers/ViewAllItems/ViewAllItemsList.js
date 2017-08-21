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
import HorizontalCategoryList from '../../Components/HorizontalCategoryList'
import Button from '../../Components/FullButton'
import InfiniteScrollView from 'react-native-infinite-scroll-view'
import { Images } from '../../Themes'
import TobBar from './../../Components/TopBar'
import I18n from 'react-native-i18n'
var { height, width } = Dimensions.get('window')
import { Actions } from 'react-native-router-flux'

// For empty lists
// import AlertMessage from '../Components/AlertMessage'

// Styles
import styles from './ProductListStyle'
import AndroidBackButton from 'react-native-android-back-button'

import Product from './../../Components/ProductItem'
import { observer } from 'mobx-react'
import vm from './ViewAllItemsStore'

@observer class ProductList extends React.Component {
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  dataSource = this.ds.cloneWithRows([])

  constructor (props) {
    super(props)
  }
  async componentWillMount () {
    if (this.props.userId) {
      await vm.loadUserItems(this.props.userId)
    }
  }

  async componentWillReceiveProps (nextProps) {
    if (nextProps.userId) {
      await vm.loadUserItems(nextProps.userId)
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
        onLikeItem={vm.onLikeItem}
        currentScreen={vm.currentScreen}
        userProfile={vm.userProfile}
        {...product}
      />
    )
  }

  _loadMoreContentAsync = async () => {
    await vm.loadMoreItems()
  }

  render () {
    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    let dataSource = ds.cloneWithRows(vm.items.slice())

    return (
      <View style={[styles.container, vm.style]}>
        <AndroidBackButton onPress={() => Actions.pop({refresh: { reload: true }})} />

        <TobBar
          leftImage={
                  I18n.locale === 'ar'
                    ? Images.chevronRightWhite
                    : Images.chevronLeft
                }
          leftText={I18n.t('Back')}
          leftAction={() => Actions.pop({refresh: {reload: true}})}
              />

        <ListView
          renderScrollComponent={props => <InfiniteScrollView {...props} />}
          contentContainerStyle={[
            styles.listContent
          ]}
          dataSource={dataSource}
          renderRow={this._renderRow}
          enableEmptySections
          pageSize={15}
          canLoadMore={
              !!(vm.allCount > vm.items.length &&
                !vm.pageLoad)
            }
          onLoadMoreAsync={this._loadMoreContentAsync}
          />
        {vm.pagingLoad
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
            : height > 630 && vm.items.length == 4
                ? <View style={{ height: 50 }} />
                : null}

      </View>
    )
  }
}

export default ProductList
