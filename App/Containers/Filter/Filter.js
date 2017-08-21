import React from 'react'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Slider
} from 'react-native'
import TextInput from '../../Components/TextInputField'
// Styles
import styles from './FilterStyle'
import { Images, Colors } from '../../Themes'
import CircleGrid from '../../Components/CircleGrid'
import Button from '../../Components/FullButton'
import vm from './FilterStore'
import { observer } from 'mobx-react'
import { Actions } from 'react-native-router-flux'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import GeoCoder from 'react-native-geocoder'
import I18n from 'react-native-i18n'
@observer
export default class Filter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      address: ''
    }
  }

  onSearchPress = () => {
    this.props.onSearchPress({
      catIndex: vm.currentCategoryId,
      priceMin: vm.minSearchPrice,
      priceMax: vm.maxSearchPrice,
      title: vm.title,
      subCategoryIndex: vm.currentSubCategoryId
    })
  };

  onSavePress = () => {
    this.props.onSearchSave({
      catIndex: vm.currentCategoryId,
      priceMin: vm.minSearchPrice,
      priceMax: vm.maxSearchPrice,
      title: vm.title,
      subCategoryIndex: vm.currentSubCategoryId
    })
  };

  getLocationInfo = async coords => {
    console.log('coords', coords)
    let latLng = {
      lat: coords.latitude,
      lng: coords.longitude
    }
    const curLocation = await GeoCoder.geocodePosition(latLng)
    try {
      if (curLocation.length === 1) {
        vm.address = curLocation[0].formattedAddress
      } else {
        for (i = 0; i < curLocation.length; i++) {
          if (
            curLocation[i].formattedAddress &&
            curLocation[i].formattedAddress !== null
          ) {
            vm.address = curLocation[i].formattedAddress
            break
          }
        }
      }
    } catch (e) {
      console.log('geocoder error message', e)
      throw e
    }
  };

  render () {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.topView}>
          <TouchableOpacity onPress={this.props.closeFilterModal}>
            <Text style={styles.titleTop}>
              {I18n.t('cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onSearchPress}>
            <Text style={styles.titleTop}>
              {I18n.t('search')}
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={styles.textInputView}>
            <TextInput
              onChangeText={vm.onTitleChange}
              styles={styles.textInput}
              containerStyle={styles.textInputStyle}
              value={vm.title}
              keyboardType={'web-search'}
              returnKeyType='search'
              placeholder={I18n.t('searchHere')}
            />
          </View>

          {/* Location View */}
          <TouchableOpacity
            style={styles.locationView}
            activeOpacity={0.8}
            onPress={() => {
              this.props.closeFilterModal()
              Actions.NearestLocationMapScreen({
                closeFilterModal: this.props.closeFilterModal,
                onLocationChange: val => {
                  this.props.onLocationChange(val)
                  this.getLocationInfo(val)
                },
                onRadiusChange: this.props.onRadiusChange,
                getAddress: this.getLocationInfo
              })
            }}
          >
            <Text style={[styles.titleTop, { color: '#9C9C9C' }]}>
              {vm.address ? vm.address : I18n.t('nearestLocation')}
            </Text>
            <Image
              source={
                I18n.locale == 'en' ? Images.chevronRight : Images.chevronAr
              }
              resizeMode='contain'
            />
          </TouchableOpacity>
          {/* title View */}
          <View
            style={{
              marginTop: 20,
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View style={styles.lineView} />
            <Text style={styles.titleText}>
              {I18n.t('price')}
            </Text>
            <View style={styles.lineView} />
          </View>
          {/* Price View */}
          <View style={styles.priceView}>
            <View style={styles.countView}>
              <View style={styles.numView}>
                {/* <Text>
                  {vm.minSearchPrice.toString()}
                </Text> */}
                <TextInput
                  value={vm.minSearchPrice.toString()}
                  keyboardType='numeric'
                  onChangeText={vm.onMinValueChanged}
                  containerStyle={{marginTop: -5}}
                  styles={{color: 'black'}}
                />
              </View>
              <Text
                style={{
                  flex: 1,
                  color: '#9C9C9C',
                  fontSize: 25,
                  textAlign: 'center'
                }}
              >
                {' '}{I18n.t('sar')}{' '}
              </Text>
              <View style={styles.numView}>
                {/* <Text>
                  {vm.maxSearchPrice.toString()}
                </Text> */}

                <TextInput
                  value={vm.maxSearchPrice.toString()}
                  keyboardType='numeric'
                  onChangeText={vm.onMaxValueChanged}
                  containerStyle={{marginTop: -5}}
                  styles={{color: 'black'}}
                />
              </View>
            </View>
            <View
              style={{
                alignSelf: 'center',
                marginHorizontal: 20,
                marginVertical: 20,
                marginBottom: -40,
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,
                maxWidth: 100
              }}
            >
              <MultiSlider
                values={vm.values.slice()}
                onValuesChange={vm.onSliderChange}
                selectedStyle={{
                  backgroundColor: Colors.mainColor
                }}
                unselectedStyle={{
                  backgroundColor: 'silver'
                }}
                trackStyle={{
                  height: 5
                }}
                markerStyle={{
                  backgroundColor: '#EFEFEF',
                  height: 22,
                  width: 22,
                  elevation: 4,
                  margin: 5
                }}
                min={0}
                max={199}
              />
            </View>
          </View>
          <CircleGrid
            buttonIndex={this.props.currentCategory}
            onCirclePress={value => {
              this.props.onCirclePress(value, () => {}, true)
            }}
            title={I18n.t('Categories')}
            categories={this.props.categories}
          />
          <CircleGrid
            buttonIndex={vm.currentSubCategoryId}
            onCirclePress={vm.onSubCategoryPress}
            title={
              this.props.subCategories.length > 0
                ? I18n.t('subCategories')
                : null
            }
            categories={this.props.subCategories}
            loading={this.props.subCategoryLoading}
          />
          <View
            style={{
              flexDirection: I18n.t('direction'),
              height: 40,
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingHorizontal: 10
            }}
          >
            <Button
              onPress={() => {
                vm.onResetPress()
                this.props.onRemoveHighlightedCategory()
              }}
              style={styles.buttonStyle}
              text={I18n.t('reset')}
              styleText={{ color: '#FFFFFF' }}
              // onPress={() => {  }}
            />
            <Button
              style={styles.buttonStyle}
              text={I18n.t('save')}
              styleText={{ color: '#FFFFFF' }}
              onPress={this.onSavePress}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}
