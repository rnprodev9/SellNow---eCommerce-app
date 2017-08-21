import React from 'react'
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Actions } from 'react-native-router-flux'
import styles from './Styles/ProductItemStyle'
import { Images, Colors } from '../Themes/'
import { observer } from 'mobx-react'
import I18n from 'react-native-i18n'
import UserModel from '../Models/User'

@observer
export default class ProductItem extends React.Component {
  constructor (props) {
    super(props)

    let { like, total_likes } = props
    this.state = {
      like: like,
      total_likes: total_likes
    }
  }

  onLikeItem = () => {
    this.state.like
      ? this.setState({
        total_likes: this.state.total_likes - 1,
        like: !this.state.like
      })
      : this.setState({
        total_likes: this.state.total_likes + 1,
        like: !this.state.like
      })
    setTimeout(() => {
      this.props.onLikeItem(
        this.props.itemIndex,
        this.state.like,
        this.props.currentScreen
      )
    }, 0)
  };

  itemComponentOnLike = () => {
    this.state.like
      ? this.setState({
        total_likes: this.state.total_likes - 1,
        like: !this.state.like
      })
      : this.setState({
        total_likes: this.state.total_likes + 1,
        like: !this.state.like
      })
    setTimeout(() => {
      this.props.onLikeItem(
        this.props.itemIndex,
        this.state.like,
        this.props.currentScreen
      )
    }, 0)
  };

  onUserImagePress = () => {
    if (UserModel.seller_id == this.props.owner_id) {
      return Actions.UserProfile()
    } else {
      Actions.SellerProfile({ userId: this.props.owner_id })
    }
  }

  render () {
    let {
      productImage,
      owner,
      price,
      title,
      total_likes,
      id,
      like,
      onLikeItem,
      owner_image,
      item,
      item_id,
      status,
      owner_id
    } = this.props
    let img = productImage ? { uri: productImage } : Images.gallary
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.productImage}>
          <TouchableWithoutFeedback
            onPress={() =>
              Actions.ProductDetails({
                productId: item_id || id,
                itemComponentOnLike: this.itemComponentOnLike,
                userProfile: this.props.userProfile,
                owner_id: owner_id
              })}
          >
            <Image source={img} style={styles.image} resizeMode='cover' />
          </TouchableWithoutFeedback>
        </View>
        {status == 'sold'
          ? <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: 60,
              width: 60,
              backgroundColor: Colors.transparent
            }}
            >
            <Image
              source={Images.sold}
              style={{ width: 60, height: 60 }}
              resizeMode='cover'
              />
          </View>
          : null}
        {this.props.item_featured
          ? <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: 60,
              width: 60,
              backgroundColor: Colors.transparent
            }}
            >
            <Image
              source={Images.featured}
              style={{ width: 60, height: 60 }}
              resizeMode='cover'
              />
          </View>
          : null}
        <TouchableOpacity
          onPress={this.onUserImagePress}
          style={styles.ownerImageView}
        >
          <Image
            source={
              !owner_image || owner_image != 'N/A'
                ? { uri: owner_image }
                : Images.blueLogo
            }
            style={styles.ownerImage}
            resizeMode={
              !owner_image || owner_image != 'N/A' ? 'cover' : 'contain'
            }
          />
        </TouchableOpacity>
        <View style={styles.ownerView}>
          <Text numberOfLines={1} style={styles.nameText}>
            {owner}
          </Text>
          <Text numberOfLines={1} style={styles.priceText}>
            {price} EGP
          </Text>
        </View>
        <TouchableOpacity
          style={styles.tilteView}
          onPress={() =>
            Actions.ProductDetails({
              productId: item_id || id,
              itemComponentOnLike: this.itemComponentOnLike
            })}
          activeOpacity={0.6}
        >
          <Text numberOfLines={1} style={styles.titleText}>
            {title || item || ' '}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => onLikeItem(this.props.index)} style={styles.likesView}> */}
        <TouchableOpacity onPress={this.onLikeItem} style={styles.likesView}>
          <Image
            source={this.state.like ? Images.likeBlue1 : Images.likeWhite1}
            // style={styles.ownerImage}
            resizeMode='cover'
          />
          <Text
            style={[
              styles.likeText,
              { color: this.state.like ? Colors.mainColor : '#979797' }
            ]}
          >
            {' '}{this.state.total_likes.toString()} {I18n.t('Likes')}{' '}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

// // Prop type warnings
// LogoImage.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// LogoImage.defaultProps = {
//   someSetting: false
// }
