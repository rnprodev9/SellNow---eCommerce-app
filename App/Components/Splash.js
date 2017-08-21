import React from 'react'
import { View, Text, Image, Platform, AsyncStorage, StatusBar } from 'react-native'
import styles from './Styles/SplashStyle'
import Swiper from 'react-native-swiper'
import { Images, Colors, Metrics } from '../Themes/'
import Background from './BackgroundImage'
import Button from './FullButton'
import { Actions } from 'react-native-router-flux';
import I18n from 'react-native-i18n'
let photosArray = [
  image0 = {
    src: Images.splash0
  },
  image1 = {
    src: Images.splash1
  },
  image2 = {
    src: Images.splash2
  },
  image3 = {
    src: Images.splash3
  }
]
export default class Splash extends React.Component {

  constructor() {
    super();
    index = 0
    this.state = { hidden: true, animated: true }
  }

  onGotItPress = () => {
    Actions.mainlogin({ type: 'reset' });
    AsyncStorage.setItem('isOpened', 'true');
  }

  activeDotIndex = (i) => {
    this.index = i
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={this.state.hidden} animated={this.state.animated} />
        <Text style={styles.swipText}>{I18n.t('Swipeleft')}</Text>
        <Swiper
          style={styles.swiper}
          dot={<View style={{ backgroundColor: 'white', width: 12, height: 12, borderRadius: 6, marginLeft: 2, marginRight: 2, borderColor: 'white', borderWidth: 2, elevation: 10 }} />}
          activeDot={<View style={{ backgroundColor: Colors.transparent, width: 12, height: 12, borderRadius: 6, marginLeft: 2, marginRight: 2, borderColor: 'white', borderWidth: 2, elevation: 10 }} />}
          paginationStyle={{
            bottom: 75
          }}
          loop={false}
          bounces={true}
          automaticallyAdjustContentInsets={true}
        >
          {photosArray.map((val, index) => {
            return (
              <View key={index} style={{ flex: 1, backgroundColor: '#003CBA' }}>
                {
                  index === 0 ?
                    <View style={{ position: 'absolute', top: 150, alignSelf: 'center', justifyContent:'center', zIndex: 100 }}>
                      <Image source={Images.logo} style={{ width: 220, height: 180, alignSelf:'center' }} resizeMode='contain' />
                      <View style={styles.newView}>
                        <Text style={styles.textCreat}>Welcome To</Text>
                        <Text style={styles.textNew}> SELL NOW</Text>
                        <Text style={styles.textCreat}> World</Text>
                      </View>
                    </View>
                    : null
                }
                <Background
                  key={index}
                  image={val.src}
                  style={{ height: Platform.OS !== 'ios' ? index == 1 || index == 2 ? Metrics.screenHeight - 100 : Metrics.screenHeight : null }}
                />
              </View>
            )
          })}
        </Swiper>
        <Button text={I18n.t('GOTIT')} style={styles.button} styleText={{ color: '#777777' }} onPress={this.onGotItPress} />
      </View>
    )
  }
}

// // Prop type warnings
// Splash.propTypes = {
//   someProperty: React.PropTypes.object,
//   someSetting: React.PropTypes.bool.isRequired
// }
//
// // Defaults for props
// Splash.defaultProps = {
//   someSetting: false
// }
