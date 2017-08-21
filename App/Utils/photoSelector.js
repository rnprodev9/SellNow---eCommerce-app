import ImageResizer from 'react-native-image-resizer'
const ImagePicker = require('react-native-image-picker')
import { Platform } from 'react-native'
const RNFS = require('react-native-fs')
import { Actions } from 'react-native-router-flux'
import req from '../Models/Items'
import Constants from '../Models/Constants'

const height = 640
const width = 800

export function photoSelector (title, resizeDimensions) {
  if (resizeDimensions) {
    height = resizeDimensions.height
    width = resizeDimensions.width
  }
  const options = {
    title: title ? title : 'Select Product Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  }
  return new Promise((resolve, reject) => {
    let ImageUri
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        console.log('image =>', response)
        resolve(response)
      }
    })
  })
}

function saveNewPhoto (imageUrl) {
  const filePath = Platform.OS == 'android' && imageUrl.replace ? imageUrl.replace('file:/data', '/data')
        : imageUrl
  return RNFS.readFile(filePath, 'base64')
        .then((photoData) => {
          return photoData
        })
}

export function openCamera (title, resizeDimensions) {
  console.log('open camera')
  if (resizeDimensions) {
    height = resizeDimensions.height
    width = resizeDimensions.width
  }
  const options = {
    title: title ? title : 'Select Product Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  }
  return new Promise((resolve, reject) => {
    let ImageUri
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
                // Actions.HomeScreen({ type: 'reset' })
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        resolve(response)
                // ImageResizer.createResizedImage(`data:image/jpeg;base64,${response.data}`, height, width, 'JPEG', 80)
                //     .then((resizedImageUri) => {
                //         // resizeImageUri is the URI of the new image that can now be displayed,
                //         // uploaded...
                //         ImageUri = resizedImageUri
                //         return (resizedImageUri)
                //     }).then(saveNewPhoto).then((result) => {
                //         resolve({ result, ImageUri });
                //     })
                //     .catch((err) => {
                //         // alert('Cannot Upload Photo - ',err);
                //         console.log('PHOTO ERR: ', err);
                //         reject(err)
                //     });
      }
    })
  })
}

export function openGallery (title, resizeDimensions) {
  console.log('open galley')
  if (resizeDimensions) {
    height = resizeDimensions.height
    width = resizeDimensions.width
  }
  const options = {
    title: title ? title : 'Select Product Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  }
  return new Promise((resolve, reject) => {
    let ImageUri
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
                // Actions.HomeScreen({ type: 'reset' })
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        resolve(response)
                // ImageResizer.createResizedImage(`data:image/jpeg;base64,${response.data}`, height, width, 'JPEG', 80)
                //     .then((resizedImageUri) => {
                //         // resizeImageUri is the URI of the new image that can now be displayed,
                //         // uploaded...
                //         ImageUri = resizedImageUri
                //         return (resizedImageUri)
                //     }).then(saveNewPhoto).then((result) => {
                //         console.log(result, ImageUri)
                //         resolve({ result, ImageUri });
                //     })
                //     .catch((err) => {
                //         // alert('Cannot Upload Photo - ',err);
                //         console.log('PHOTO ERR: ', err);
                //         reject(err)
                //     });
      }
    })
  })
}
