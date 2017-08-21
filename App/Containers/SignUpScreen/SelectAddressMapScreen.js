import React from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, TouchableOpacity, Platform, Alert, PermissionsAndroid, Linking } from 'react-native'
import I18n from 'react-native-i18n'
import { Colors, Images, Fonts } from '../../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import MapView, { Marker } from 'react-native-maps'
import { Actions } from 'react-native-router-flux'
import TopBar from '../../Components/TopBar'
// Styles
import styles from './SelectAddressMapScreenStyle'
import { observer } from 'mobx-react'
import vm from './SignUpStore'
var { GooglePlacesAutocomplete } = require('react-native-google-places-autocomplete')
import ConfirmPopUp from '../../Components/ConfirmationPopUP'
// import OpenAppSettings from 'react-native-app-settings'
import DeviceSettings from 'react-native-device-settings'

const LATITUDE_DELTA = 0.009
const LONGITUDE_DELTA = 0.009

@observer
export default class SelectAddressMap extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      location: {
        latitude: 24.7136,
        longitude: 46.6753,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
      },
      address: '',
      showConfirmModal: false
    }
    this.requestLocationPermission()
  }

  componentDidMount () {
    if (vm.locationObj.latitude && vm.locationObj.longitude) {
      this.setState({
        location: {
          ...vm.locationObj,
          latitudeDelta: this.state.latitudeDelta,
          longitudeDelta: this.state.longitudeDelta
        }
      })
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          this.setState({
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }
          })
          vm.onLocationObjChange(this.state.location, this.props.onLocationChange, this.props.onAddressChange)
        },
        (error) => this.showPopUp()
        // Alert.alert(I18n.t('gpsAlertTitle'), I18n.t('gpsAlertDescription'),
        //   [
        //     { text: I18n.t('ok'), onPress: () => console.log('OK Pressed!') }
        //   ])
        ,
        // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        { enableHighAccuracy: false, timeout: 5000 }
      )
    }
  }

  requestLocationPermission () {
    if (Platform.OS == 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Enable location ',
          'message': 'Find your current location \o/'
        },
      ).then(granted => {
        if (granted) {
          console.log('You can use the location')
          // this.getLocation()
        } else {
          console.log('Location permission denied')
        }
      }).catch(err => {
        console.warn(err)
      })
    } else {
      // this.getLocation()
    }
  };

  getLocation () {
    var options = {
      enableHighAccuracy: false,
      timeout: 5000
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        this.setState({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        })
        vm.locationObj = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      },
      (error) => this.showPopUp()
      // Alert.alert(I18n.t('gpsAlertTitle'), I18n.t('gpsAlertDescription'),
      //   [
      //     { text: I18n.t('ok'), onPress: () => console.log('OK Pressed!') }
      //   ])
      ,
      options
    )
  }

  onRegionChange = (e) => {
    vm.onLocationObjChange(e.nativeEvent.coordinate, this.props.onLocationChange, this.props.onAddressChange)
    this.setState({
      location: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
        latitudeDelta: this.state.location.latitudeDelta,
        longitudeDelta: this.state.location.longitudeDelta
      }
    })
  }

  onAutocompelteChange = (data, details = null) => { // 'details' is provided when fetchDetails = true
    if (details) {
      let { location, viewport } = details.geometry
      this.setState({
        location: {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: this.state.location.latitudeDelta,
          longitudeDelta: this.state.location.longitudeDelta
        }
      })
      vm.onLocationObjChange({
        latitude: location.lat, longitude: location.lng, latitudeDelta: this.state.location.latitudeDelta,
        longitudeDelta: this.state.location.longitudeDelta
      }, this.props.onLocationChange, this.props.onAddressChange)
    }
  }

  setAddress = (value) => {
    vm.onAddressChange(value)
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
      <View style={{flex: 1}}>
        <KeyboardAvoidingView
          style={{
            flex: 1
          }}>
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
            title={I18n.t('selectAddress')}
            leftImage={I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft}
            leftText={I18n.t('Back')}
          />

          <View style={{ flex: 1, position: 'absolute', top: 58, left: 0, right: 0, zIndex: 2 }}>
            <GooglePlacesAutocomplete
              placeholder={I18n.t('searchAddress')}
              minLength={2} // minimum length of text to search
              autoFocus={false}
              listViewDisplayed='auto'    // true/false/undefined
              fetchDetails
              renderDescription={(row) => row.description || row.vicinity}// custom description render
              onPress={this.onAutocompelteChange.bind(this)}
              getDefaultValue={() => {
                return '' // text input default value
              }}

              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyC6uX2v8UclzdjsFOwsauN__41kxzEOuRs',
                language: 'en', // language of the results
                types: 'geocode' // default: 'geocode'
              }}
              styles={{
                description: {
                  fontWeight: 'bold'
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                  zIndex: 5
                }
              }}
              styles={{
                textInputContainer: {
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  height: 70
                }, textInput: {
                  marginHorizontal: 10,
                  height: 45,
                  color: '#5d5d5d',
                  fontSize: 16,
                  elevation: 4
                },
                listView: {
                  marginTop: -10,
                  backgroundColor: Colors.cloud
                },
                poweredContainer: {
                  marginTop: 100
                }
              }}
              currentLocation // Will add a 'Current location' button at the top of the predefined places list
              currentLocationLabel='Current location'
              nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }}
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                types: 'food'
              }}

              debounce={0} // debounce the requests in ms. Set to 0 to remove debounce. By default 200ms.
            />
          </View>

          <MapView
            style={{
              flex: 1,
              alignSelf: 'stretch'
            }}
            region={vm.locationObj.latitude ? {
              ...vm.locationObj, latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            } : this.state.location}
            showsUserLocation
          >
            <Marker
              title={I18n.t('myLocation')}
              image={Images.mapPin}
              coordinate={{
                latitude: this.state.location.latitude,
                longitude: this.state.location.longitude
              }}
              onDragEnd={this.onRegionChange}
              draggable
            />

          </MapView>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.saveButton} onPress={() => {
          if (this.props.onLocationChange && this.props.onAddressChange) {
            Actions.popTo({ scene: 'editProfile', refresh: { reload: true } })
            return
          } else {
            Actions.pop()
          }
        }}>
          <Text style={styles.saveText}>{I18n.t('save')}</Text>
        </TouchableOpacity>

        <View style={styles.addressContainer}>
          {!vm.address ? <Text style={styles.addressTitle}>Address You Selected Here !</Text> : null}
          <Text style={styles.addressDescription}>{vm.address ? vm.address : I18n.t('GettingLocation')}</Text>
        </View>
      </View>
    )
  }

}

