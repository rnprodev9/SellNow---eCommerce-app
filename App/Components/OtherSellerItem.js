import React from 'react'
import {
  View,
  Text,
  ListView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { Actions } from 'react-native-router-flux'
// For empty lists
// import AlertMessage from '../Components/AlertMessage'
import { Images, Metrics } from '../Themes'
// Styles
import styles from './Styles/OtherSellerItemStyle'
import I18n from 'react-native-i18n'

class OtherSellerItem extends React.Component {
  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
  dataSource = this.ds.cloneWithRows([])

  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  async componentWillMount () {
    this.update(this.props)
  }

  async componentWillReceiveProps (nextProps) {
    await this.update(nextProps)
  }

  update = async nextProps => {
    if (nextProps.items && nextProps.items.length > 0) {
      this.dataSource = this.ds.cloneWithRows(nextProps.items)
    }
    if (nextProps.onLoad && this.props.items.length < 1) {
      this.setState({ loading: true })
      try {
        await nextProps.onLoad()
        this.setState({ loading: false })
      } catch (e) {
        this.setState({ loading: false })
      } finally {
        this.setState({ loading: false })
      }
    }
    if (this.state.loading) {
      this.setState({ loading: false })
    }
  }

  getDefaultImage (images) {
    if (!images || images.length < 1) return false

    for (var i = 0; i < images.length; i++) {
      let image = images[i]
      if (image.default) return image.link
      if (i + 1 == images.length) return image.link
    }
  }

  _renderRow = product => {
    let images = product.images.slice()
    let defaultImage = this.getDefaultImage(images)
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          Actions.ProductDetails({ productId: product.id })
        }}
      >
        <View style={styles.imageView}>
          <Image
            source={defaultImage ? { uri: defaultImage } : Images.gallary}
            resizeMode='cover'
            style={styles.itemImage}
          />
        </View>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            minHeight: 50,
            width: Metrics.screenWidth / 2 - 40,
            paddingTop: 5
          }}
        >
          <Text numberOfLines={1} style={styles.boldLabel}>
            {product.title}
          </Text>
          <Text style={styles.label}>{product.price} EGP</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View>
        <View
          style={[
            this.props.rowStyle,
            {
              backgroundColor: '#EEEEEE',
              flexDirection: I18n.t('direction'),
              alignItems: 'center',
              justifyContent: 'space-between'
            }
          ]}
        >
          <View
            style={{
              backgroundColor: '#EEEEEE',
              flexDirection: I18n.t('direction'),
              alignItems: 'center'
            }}
          >
            <View style={styles.userImageView}>
              <Image
                source={
                  this.props.userImage
                    ? { uri: this.props.userImage }
                    : Images.blueLogo
                }
                resizeMode={this.props.userImage ? 'cover' : 'contain'}
                style={{ height: 34, width: 34, borderRadius: 160 }}
              />
            </View>
            <Text style={styles.otherSellerItem}>
              {this.props.userItem
                ? this.props.userItem
                : I18n.t('OtherSellerItem')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Actions.ViewAllList({
                fullScreen: this.props.fullScreen,
                items: this.props.items,
                userId: this.props.userId
                // pageLoad: userVM.pagingLoad,
                // onLoadMore: userVM.loadMoreItems,
                // loadSellerItems: async () => await userVM.loadUserItems(this.props.userId),
                // items: userVM.items && userVM.items.slice(),
              })
            }}
            style={{ marginHorizontal: 10 }}
          >
            <Text style={{ color: '#B5B5B5' }}>
              {I18n.t('ViewAll')}
            </Text>
          </TouchableOpacity>
        </View>

        {this.state.loading
          ? <View
            style={{
              flex: 1,
              backgroundColor: '#EEEEEE',
              paddingBottom: 8,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ActivityIndicator style={{ flex: 1 }} size='large' />
          </View>
          : <ScrollView horizontal style={{ backgroundColor: '#EEEEEE' }}>
            <ListView
              contentContainerStyle={styles.listContent}
              dataSource={this.dataSource}
              renderRow={this._renderRow}
              enableEmptySections
              pageSize={15}
            />
          </ScrollView>}
      </View>
    )
  }
}

export default OtherSellerItem
