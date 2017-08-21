import React from 'react'

import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import { ItemModel } from '../../Models/Item'
import UserModel from '../../Models/User'
import CategoriesModel from '../../Models/Categories'
import BaseViewModel from '../../Models/BaseViewModel'
import {
  photoSelector,
  openCamera,
  openGallery
} from '../../Utils/photoSelector'
import Constants from '../../Models/Constants'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes'
import { encode } from 'querystring'
import Items from '../../Models/Items'

var base64 = require('base-64')
export class AddPostStore extends BaseViewModel {
  @observable photos = [];
  @observable itemName = '';
  @observable price = null;
  @observable condition = 'new';
  @observable isFeatured = false;
  @observable selectedCategoryId = '';
  @observable selectedSubCategoryId = '';
  @observable selectedCategoryTitle = '';
  @observable categories = [];
  @observable isItemSaved = false;
  @observable description = '';
  @observable modalIsVisible = true;
  @observable cameraIsOpen = false;
  @observable gallaryIsOpen = false;
  @observable isItemSaved = false;
  @observable subCategories = [];
  @observable subCategoryLoading = false;
  @observable description = '';
  @observable itemId = null;
  @observable maxPhotosNum = 3;
  @observable canFeatured = false;
  // @observable update = false;

  clearAllData = () => {
    this.photos = []
    this.itemName = ''
    this.price = null
    this.condition = 'new'
    this.isFeatured = false
    this.selectedCategoryId = ''
    this.selectedSubCategoryId = ''
    this.selectedCategoryTitle = ''
    this.categories = []
    this.isItemSaved = false
    this.description = ''
    this.modalIsVisible = true
    this.cameraIsOpen = false
    this.gallaryIsOpen = false
    this.isItemSaved = false
    this.subCategories = []
    this.subCategoryLoading = false
    this.description = ''
    this.itemId = null
  };

  onImageSelected = async image => {
    let image_code = base64.encode(image.data)
    let image_name = image.fileName

    let res = await Items.simpleApiRequest(Constants.UPLOAD_IMAGE, {image_code, image_name})
    this.photos = [...this.photos.slice(), res.url]
  }

  deletePhoto = index => {
    this.photos.splice(index, 1)
  }

  selectCategory = async ({ title, id }) => {
    this.selectedSubCategoryId = null
    this.selectedCategoryId = id
    this.selectedCategoryTitle = title
    await this.loadSubCategories(id)
  };
  selectSubCategory = ({ title, id }) => {
    this.selectedCategoryId = null
    this.selectedSubCategoryId = id
    this.selectedCategoryTitle = title
  };

  pickImage = () => {
    this.modalIsVisible = true
    this.cameraIsOpen = false
    this.gallaryIsOpen = false
    console.log(this.modalIsVisible)
  };

  closeModal = () => {
    this.modalIsVisible = false
    this.cameraIsOpen = false
    this.gallaryIsOpen = false
  };
  close = () => {
    this.cameraIsOpen = false
    this.gallaryIsOpen = false
  };

  openCamera = () => {
    this.cameraIsOpen = !this.cameraIsOpen
    this.modalIsVisible = false
  };

  openGallary = () => {
    this.gallaryIsOpen = !this.gallaryIsOpens
    this.modalIsVisible = false
  };

  onStartUp = async () => {
    this.clearAllData()
    this.categories = await CategoriesModel.loadCategories()
    console.log('add post categories', this.categories)
    await this.getMaxUserPhotos()
  };

  onItemNameChange = itemName => (this.itemName = itemName);
  onCategorySelect = category => (this.categoryName = category);
  setIsFeatured = () => {
    // alert('You Need To be a premuim user to use this feature')
    Snackbar.show({
      title: 'You Need To be a premuim user to use this feature',
      length: 3000,
      backgroundColor: Colors.mainColor
    })
    // this.isFeatured = !this.setIsFeatured;
  };
  onFeaturedChanged = () => {
    this.isFeatured = !this.isFeatured
    console.log(this.isFeatured)
  }
  onItemNameChange = itemName => (this.itemName = itemName);
  // TODO: need categoriy ID
  onCategorySelect = category => (this.categoryId = category);

  onPriceChange = price => (this.price = price);
  onDescriptionChange = text => (this.description = text);

  loadItemData = async id => {
    this.itemId = id
    let item = new ItemModel(id)
    try {
      let res = await item.getItemDetials()
      this.condition = res.item_condition.toLowerCase()
      this.isFeatured = res.item_featured != 0
      this.itemName = res.title
      this.photos = res.images.map(img => img.link)
      this.price = res.price
      this.description = res.description
      this.selectedCategoryId = res.category_id
      this.categoryName = res.category
      this.selectedCategoryTitle = res.category
      console.log('resssssssss product details', res)
    } catch (e) {
      throw e
    }
  };

  saveItem = async ({
    action_type = 'add',
    category = this.selectedCategoryId || this.selectedSubCategoryId,
    item_condition = this.condition,
    item_featured = this.isFeatured,
    item_status = 'active',
    price = this.price,
    title = this.itemName,
    description = this.description,
    images = this.photos.slice(),
    item_id = this.itemId ? this.itemId : null
  }) => {
    this.isLoading = true
    let _imgs = {}
    let def_images =
      images &&
      images.map((i, index) => {
        _imgs[`images_image_${index}`] = i
        _imgs[`images_name_${index}`] = i
        return index === 0 ? 1 : 0
      })
    this.isFeatured ? (item_featured = 1) : (item_featured = 0)
    let options = {
      action_type,
      category,
      item_condition: item_condition.toLowerCase(),
      item_featured: item_featured,
      item_status: item_status.toLowerCase(),
      price,
      title,
      description,
      def_images,
      ..._imgs
    }
    item_id ? (options.item_id = item_id) : null
    try {
      let item = new ItemModel()
      let res = await item.saveItem(options)
      this.isItemSaved = true
      this.isLoading = false
      this.modalIsVisible = false
      console.log(res)
      Actions.ProductDetails({ productId: res.data.id, fromAddPost: true })
      return res
    } catch (e) {
      this.isLoading = false
      this.errors = e
      console.log('e => ', this.errors)
    }
  };
  loadSubCategories = async parent_category => {
    this.subCategoryLoading = true
    this.subCategories = []
    return CategoriesModel.loadCategories({}, { parent_category })
      .then(cats => {
        this.subCategories = cats
        this.subCategoryLoading = false
      })
      .catch(e => {
        this.subCategoryLoading = false
      })
  };

  addItemPreperation = async () => {
    try {
      let res = await Items.simpleApiRequest(Constants.ITEM_PREPERATION, {})
      return res
    } catch (e) {
      this.errors = e
      console.log('ITEM PREPARATION ERROR =>', e)
    }
  };

  getMaxUserPhotos = async () => {
    let i = new ItemModel()
    let res = await i.simpleApiRequest(Constants.ITEM_PREPERATION)
    console.log('MAX PHOTOS => ', res)
    if (res.data.can_featured) this.maxPhotosNum = res.data.featured_images_num
    else this.maxPhotosNum = res.data.default_images_num

    this.canFeatured = res.data.can_featured === 1 ? true : false
    console.log(this.canFeatured)
  };
}

export default new AddPostStore()
