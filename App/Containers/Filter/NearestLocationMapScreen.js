import React from 'react'
import {
  ScrollView,
  PermissionsAndroid,
  Text,
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  Slider
} from 'react-native'
import I18n from 'react-native-i18n'
import { Colors, Images, Fonts } from '../../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../../Redux/YourRedux'
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps'
import { Actions } from 'react-native-router-flux'
import TopBar from '../../Components/TopBar'
// Styles
import styles from './NearestLocationScreenStyle'
import { observer } from 'mobx-react'
import ConfirmPopUp from '../../Components/ConfirmationPopUP'
// import OpenAppSettings from 'react-native-app-settings'
import DeviceSettings from 'react-native-device-settings'

var {
  GooglePlacesAutocomplete
} = require('react-native-google-places-autocomplete')

const LATITUDE_DELTA = 2
const LONGITUDE_DELTA = 2

@observer
export default class SelectAddressMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      location: {
        latitude: 30.0566,
        longitude: 31.3301,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      address: '',
      radius: 46000,
      showConfirmModal: false
    }
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position)
        this.setState({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        })
      },
      error => this.showPopUp(),
      // Alert.alert(I18n.t('gpsAlertTitle'), I18n.t('gpsAlertDescription'),
      //   [
      //     { text: I18n.t('ok'), onPress: () => console.log('OK Pressed!') }
      //   ])
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      { enableHighAccuracy: false, timeout: 5000 }
    )
  }

  componentWillMount () {
    this.requestLocationPermission()
  }

  requestLocationPermission () {
    if (Platform.OS == 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Enable location ',
          message: 'Find your current location \o/'
        }
      )
        .then(granted => {
          if (granted) {
            console.log('You can use the location')
            this.getLocation()
          } else {
            console.log('Location permission denied')
          }
        })
        .catch(err => {
          console.warn(err)
        })
    } else {
      this.getLocation()
    }
  }

  getLocation () {
    var options = {
      enableHighAccuracy: false,
      timeout: 5000
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        // console.log(position);
        let location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
        this.setState({ location })
        // this.props.getAddress(location)
        this.props.onLocationChange(location)
      },
      error => this.showPopUp(),
      //  Alert.alert(I18n.t('gpsAlertTitle'), I18n.t('gpsAlertDescription'),
      //   [
      //     { text: I18n.t('ok'), onPress: () => console.log('OK Pressed!') }
      //   ])
      options
    )
  }

  onRegionChange (e) {
    let location = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }

    this.setState({ location })
    // this.props.getAddress(location)
    this.props.onLocationChange(location)
  }

  onAutocompelteChange = (data, details = null) => {
    // 'details' is provided when fetchDetails = true
    if (details) {
      let { location, viewport } = details.geometry
      this.setState({
        location: {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      })
    }
  }

  setAddress = value => {}

  sliderChange = value => {
    this.setState({
      radius: value
    })
  }
  showPopUp = () => {
    this.setState({
      showConfirmModal: true
    })
  }

  hidePopUp = () => {
    this.setState({
      showConfirmModal: false
    })
  }

  render () {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1
        }}
      >
        <ConfirmPopUp
          confirmationTitle={I18n.t('gpsAlertTitle')}
          confirmationMessage={I18n.t('gpsAlertDescription')}
          showConfirmationModal={this.state.showConfirmModal}
          closeConfirmationModal={this.hidePopUp}
          confirmText={I18n.t('Settings')}
          confirmAction={() => {
            this.hidePopUp()
            DeviceSettings.open()
          }}
        />
        <TopBar
          title={I18n.t('nearestLocation')}
          leftImage={
            I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft
          }
          leftText={I18n.t('Back')}
          rightText={I18n.t('Done')}
          rightAction={() => {
            Actions.pop()
            this.props.onRadiusChange(this.state.radius)
            this.props.closeFilterModal()
          }}
          leftAction={() => {
            Actions.pop()
            this.props.closeFilterModal()
          }}
        />

        <MapView
          style={{
            flex: 1,
            alignSelf: 'stretch'
          }}
          region={this.state.location}
          showsUserLocation
        >
          <Marker
            title={I18n.t('myLocation')}
            image={Images.mapPin}
            coordinate={{
              latitude: this.state.location.latitude,
              longitude: this.state.location.longitude
            }}
            onDragEnd={this.onRegionChange.bind(this)}
            draggable
            style={{ width: 30, height: 30 }}
          />
          <Circle
            center={this.state.location}
            radius={this.state.radius}
            fillColor='rgba(0, 0, 0,0.3)'
          />

        </MapView>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: 100,
            width: undefined,
            justifyContent: 'center',
            paddingBottom: 20
          }}
        >
          <View
            style={{
              flexDirection: I18n.t('direction'),
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: '#9C9C9C',
                ...Fonts.style.input
              }}
            >
              {I18n.t('Within')}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#297EF9',
                fontSize: 20
              }}
            >
              {' '}{Math.round(this.state.radius / 1000)} km{' '}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#9C9C9C',
                ...Fonts.style.input
              }}
            >
              {' '}{I18n.t('ofyou')}
            </Text>
          </View>
          <Slider
            value={this.state.radius}
            onValueChange={this.sliderChange}
            maximumValue={100000}
            minimumValue={1000}
            style={{ marginHorizontal: 20, transform: [{ rotate: '-180deg' }] }}
            thumbTintColor='#EFEFEF'
            minimumTrackTintColor='#E5E5E5'
            maximumTrackTintColor='#0002BF'
          />
        </View>

      </KeyboardAvoidingView>
    )
  }
}
