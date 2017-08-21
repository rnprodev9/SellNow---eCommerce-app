import React from 'react'
import { ScrollView, Text, StyleSheet, View, StatusBar, TouchableOpacity, Modal, Image } from 'react-native'
import TopBar from '../../Components/TopBar'
import Button from '../../Components/FullButton'
import styles from './BankTransferStyle'
import Input from '../../Components/TextInputField'
import { Images } from '../../Themes'
import I18n from 'react-native-i18n'
import { photoSelector, openCamera, openGallery } from '../../Utils/photoSelector'
import vm from './UpgradeSubscribeStore'
import {observer} from 'mobx-react'

@observer
export default class BankTransfer extends React.Component {
  constructor () {
    super()
    this.state = {
      modalVisible: false
    }
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    })
  }

  closeModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  openCamera = async () => {
    this.closeModal()
    let image = await openCamera('TITLE')
    vm.imageBase64 = image
  }

  openGallery = async () => {
    this.closeModal()
    let image = await openGallery('TITLE')
    vm.imageBase64 = image
  }

  render () {
    return (
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.closeModal}
          >

          <Image
            source={Images.addPostBg}
            resizeMode='cover'
            style={{ alignSelf: 'center' }}
            >
            <View
              style={{ alignItems: 'center', flex: 1, alignSelf: 'center' }}
              >
              <TouchableOpacity
                onPress={this.closeModal}
                style={{ marginTop: 40, height: 29, width: 29 }}
                >
                <Image
                  source={Images.xWhite}
                  style={{ height: 29, width: 29 }}
                  resizeMode='contain'
                  />
              </TouchableOpacity>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  height: 180
                }}
                >
                <Text style={styles.modalDescriptionText}>
                  {I18n.t('addPostDes')}
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  height: 160,
                  width: 350,
                  alignItems: 'center'
                }}
                >
                <TouchableOpacity onPress={this.openGallery}>
                  <Image
                    source={Images.gallary}
                    style={styles.modalCameraIcon}
                    resizeMode='contain'
                    />
                  <Text style={styles.modalIconTitle}>
                    {I18n.t('photos')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.openCamera}>
                  <Image
                    source={Images.camara}
                    style={[styles.modalCameraIcon, {marginTop: 50}]}
                    resizeMode='contain'
                    />
                  <Text style={styles.modalIconTitle}>
                    {I18n.t('camera')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Image>
        </Modal>
        <StatusBar barStyle='light-content' backgroundColor='#C8DD11' />
        <TopBar
          leftImage={I18n.locale === 'ar' ? Images.chevronRightWhite : Images.chevronLeft}
          leftText={I18n.t('Back')}
          title={I18n.t('BankTransfer')}
          backgroundColor={'#C8DD11'}
        />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}> {I18n.t('BankTransfer')} </Text>
          </View>
          <View style={styles.detailsView}>
            <View style={styles.innerView}>
              <Text style={styles.detailsText}>
                { !vm.imageBase64 ? I18n.t('UploadBankTransferPhoto') : I18n.t('PhotoUploadedSuccessFully')}
              </Text>
            </View>
            <Button
              style={{
                borderRadius: 4,
                backgroundColor: '#7F7F7F',
                height: 42,
                width: 100
              }}
              onPress={this.showModal}
              // loading={vm.isLoading}
              text={I18n.t('Upload')}
            />
          </View>
          <View
            style={{
              justifyContent: 'flex-start',
              backgroundColor: 'white',
              borderBottomWidth: 0.33,
              borderColor: '#979797',
              paddingHorizontal: 10,
              borderRadius: 12,
              marginTop: 10
            }}
          >
            <Text style={{backgroundColor: 'transparent'}} > {vm.user.unique_id} </Text>
          </View>
          <Button
            style={{
              marginHorizontal: 80,
              borderRadius: 4,
              backgroundColor: '#002FA2',
              marginTop: 150,
              height: 42
            }}
            onPress={() => vm.upgradePay(this.props.type_id)}
            // loading={vm.isLoading}
            text={I18n.t('UpgradeNow')}
          />
        </ScrollView>
      </View>
    )
  }
}
