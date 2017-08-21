import React from 'react'
import {
  View,
  Image,
  Text,
  Modal,
  TouchableOpacity
} from 'react-native'
import styles from './Styles/PhotoSliderStyle'
import Swiper from 'react-native-swiper'
import { Metrics } from '../Themes'
import ImageViewer from 'react-native-image-zoom-viewer'

export default class PhotoSlider extends React.Component {

  static defaultProps = {
    slides: []
  };
  constructor (props) {
    super(props)
    this.state = {
      zoomImage: false
    }
    this.ImagesUrl = []
    this.index = 0
  }

  getIndex = (i) => {
    this.index = i
  }

  closeModal = () => {
    this.setState({
      zoomImage: false
    })
  }

  render () {
    if (!this.props.slides.map) {
      return <View />
    }
    let Urls = []
    this.props.slides.map((slide) => {
      Urls.push({
        url: slide.link
      })
    })
    return (
      <View>
        <Swiper
          style={[styles.wrapper, this.props.style]}
          height={this.props.height}
          width={this.props.width}
          dot={this.props.dot}
          activeDot={this.props.activeDot}
          paginationStyle={this.props.dotPosition}
        >
          {
            this.props.slides.map((slide, index) => (
              <TouchableOpacity style={styles.slide1} key={slide} onPress={() => {
                this.getIndex(index)
                this.setState({ zoomImage: true })
              }}>
                <Image
                  source={{ uri: slide.link }}
                  resizeMode={'cover'}
                  style={[{ height: 170, width: Metrics.screenWidth }, this.props.photoHeight]}
                />
                {
                  slide.title ? <View style={styles.titleView} >
                    <Text style={styles.title} >{slide.title}</Text>
                  </View>
                    : null
                }
              </TouchableOpacity>
            ))
          }
        </Swiper>
        <Modal
          visible={this.state.zoomImage}
          onPress={this.closeModal}
          onRequestClose={this.closeModal}>
          <ImageViewer
            imageUrls={Urls}
            onClick={this.closeModal}
            index={this.index} />
        </Modal>
      </View>

    )
  }
}

