import { observable } from 'mobx'
import { Actions } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'
import BaseViewModel from '../../Models/BaseViewModel'
import Categories from '../../Models/Categories'
import Items, { ItemsModel } from '../../Models/Items'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../Themes/index'
import { ItemModel } from '../../Models/Item'
import User from '../../Models/User'

export class HomeStore extends BaseViewModel {
  @observable catIsLoading = false
  @observable categories = []
  @observable subCategories = []
  @observable allItems = []
  @observable featuredItems = []
  @observable currentScreen = 'explore'
  @observable currentCategoryIndex = null
  @observable searchModalOpen = false
  @observable subCategoryLoading = false
  @observable nearestLocation = null
  @observable radius = null
  @observable followingList = []
  @observable pagingLoad = false
  @observable totalAllitems = 0
  @observable totalFeatured = 0
  @observable homeSubCategoryVisible = false
  @observable leafCategory = false
  @observable currentSubCategoryIndex = null
  @observable searchText = ''
  @observable oldSearchText = ''
  // @observable screens = [
  //   {title: 'All'}, {title: 'Feature'}
  // ]

  onLocationChange = location => {
    this.nearestLocation = location
  }
  onRadiusChange = radius => {
    this.radius = radius
  }
  onSearchModalClick = () => {
    this.searchModalOpen = !this.searchModalOpen
  }
  changeCurrentScreen = screen => {
    this.currentScreen = screen
  }
  onSearchTextChange = text => {
    this.searchText = text
  }

  onCurrentCategoryChange = async (categoryIndex, f, s) => {
    this.currentCategoryIndex = categoryIndex
    if (categoryIndex !== -1) {
      await this.loadHomeSubCategories(this.categories[categoryIndex].id, f, s)
      this.allItems = []
      await this.loadAllItemsWithCategory(
        this.categories[categoryIndex].id,
        false
      )
    }
  }
  onCurrentSubCategoryChange = async categoryIndex => {
    this.currentSubCategoryIndex = categoryIndex
    await this.loadAllItemsWithCategory(
      this.subCategories[categoryIndex].id,
      false
    )
  }

  loadHomeCategories = () => {
    this.catIsLoading = true
    this.categories = []
    return Categories.loadCategories()
      .then(cats => {
        this.catIsLoading = false
        cats.map((val, index) => {
          this.categories.push({ ...val, parent: true })
        })
      })
      .catch(e => {
        this.catIsLoading = false
        Items.isDisconnected(e)
      })
  }

  likeItemAction = (itemIndex, action, currentScreem) => {
    let currentItem = this.currentScreen === 'explore'
      ? this.allItems[itemIndex]
      : this.featuredItems[itemIndex]
    let item = new ItemModel(currentItem.id)
    item.likeItemAction(action)
  }

  resetCategories = async foo => {
    await this.loadAllItems()
    this.subCategories = []
    this.homeSubCategoryVisible = false
    this.currentCategoryIndex = -1
    this.currentSubCategoryIndex = -1
    this.leafCategory = false
    foo ? foo() : null
  }

  loadHomeSubCategories = async (parent_category, foo, fromFilter) => {
    this.homeSubCategoryVisible = true
    this.subCategoryLoading = true
    console.log('fromFilter  -- ', foo, fromFilter)
    if (this.leafCategory && !fromFilter) return false
    console.log('PARENT => ', parent_category)
    this.subCategories = []
    return Categories.loadCategories({}, { parent_category })
      .then(cats => {
        this.subCategories = cats
        this.subCategoryLoading = false
        this.homeSubCategoryVisible = true
        this.leafCategory = true
        foo ? foo() : null
      })
      .catch(e => {
        this.subCategoryLoading = false
      })
  }

  loadAllItems = async (loadMore, searchText) => {
    try {
      if (loadMore) {
        this.pagingLoad = true
        let options = {
          page: Items.allItemsPaging.next_page,
          title: searchText || this.searchText
        }

        // searchText ? (options.title = this.searchText) : null
        let items = await Items.loadAllItems(options)
        console.log('itemsLoaded')
        this.allItems = [...this.allItems, ...items]
        this.totalAllitems = Items.allItemsPaging.total
        this.pagingLoad = false
      } else {
        this.searchText = ''
        this.isLoading = true
        let items = await Items.loadAllItems()
        this.totalAllitems = Items.allItemsPaging.total
        this.isLoading = false
        this.allItems = items
      }
    } catch (e) {
      this.isLoading = false
      this.pagingLoad = false
      console.log('loadAllItemsError => ', e)
    }
  }

  loadAllItemsWithCategory = async (category, loadMore, foo) => {
    try {
      if (loadMore) {
        this.pagingLoad = true
        if (!this.leafCategory) {
          let subCategories = await this.loadHomeSubCategories(category)
        }

        let items = await Items.loadAllItems({
          page: Items.allItemsPaging.next_page,
          category,
          title: this.oldSearchText
        })
        this.allItems = [...this.allItems, ...items]
        this.totalAllitems = Items.allItemsPaging.total
        console.log('total --- ', this.totalAllitems)
        this.pagingLoad = false
        foo ? foo() : null
      } else {
        this.searchText = ''
        this.isLoading = true
        if (!this.leafCategory) {
          let subCategories = await this.loadHomeSubCategories(category)
          this.leafCategory = true
          this.currentSubCategoryIndex = -1
        }

        let items = await Items.loadAllItems({ category })
        this.totalAllitems = Items.allItemsPaging.total
        this.isLoading = false
        this.allItems = items
        foo ? foo() : null
      }
    } catch (e) {
      Items.isDisconnected(e)
      this.isLoading = false
      this.pagingLoad = false
      if (e._message === 'No data to show') {
        this.allItems = []
      }
      console.log('loadAllItemsError => ', e)
    }
  }

  loadAllFeaturedItems = async loadMore => {
    try {
      if (loadMore) {
        this.pagingLoad = true
        let items = await Items.loadAllFeaturedItems({
          page: Items.allItemsPaging.next_page,
          title: this.oldSearchText
        })
        console.log('itemsLoaded')
        this.allItems = [...this.featuredItems, ...items]
        this.totalFeatured = Items.featuredItemsPaging.total
        this.pagingLoad = false
      } else {
        this.searchText = ''
        this.isLoading = true
        let items = await Items.loadAllFeaturedItems()
        this.totalFeatured = Items.featuredItemsPaging.total
        this.isLoading = false
        this.featuredItems = items
      }
    } catch (e) {
      this.isLoading = false
      this.pagingLoad = false
      console.log('loadAllItemsError => ', e)
    }
  }
  loadAllFeaturedItemsWithCategory = async (category, loadMore) => {
    try {
      if (loadMore) {
        this.pagingLoad = true

        let items = await Items.loadAllFeaturedItems({
          page: Items.allItemsPaging.next_page,
          category,
          title: this.oldSearchText
        })
        console.log('itemsLoaded')
        this.allItems = [...this.featuredItems, ...items]
        this.totalFeatured = Items.featuredItemsPaging.total
        this.pagingLoad = false
      } else {
        this.searchText = ''
        this.isLoading = true
        let items = await Items.loadAllFeaturedItems({ category })
        this.totalFeatured = Items.featuredItemsPaging.total
        this.isLoading = false
        this.featuredItems = items
      }
    } catch (e) {
      this.isLoading = false
      this.pagingLoad = false
      Items.isDisconnected(e)
      console.log('loadAllItemsError => ', e)
    }
  }

  onSearchPress = async ({
    catIndex,
    priceMin,
    priceMax,
    title,
    subCategoryIndex,
    isFeatured
  }) => {
    this.searchModalOpen = false
    this.isLoading = true
    let options = {
      from_price: priceMin,
      to_price: priceMax,
      title: title
    }
    this.currentCategoryIndex && this.currentCategoryIndex != -1
      ? (options.category = this.categories[this.currentCategoryIndex].id)
      : null
    // subCategoryIndex && subCategoryIndex != -1
    //   ? (options.category = this.subCategories[subCategoryIndex].id)
    //   : null
    if (subCategoryIndex && subCategoryIndex != -1) {
      options.category = this.subCategories[subCategoryIndex].id
      this.currentSubCategoryIndex = subCategoryIndex
    }

    if (this.nearestLocation) {
      options.latitude = this.nearestLocation.latitude
      options.longitude = this.nearestLocation.longitude
    }
    if (this.radius) {
      options.radius = this.radius
    }
    this.allItems = []

    let res = false
    try {
      if (isFeatured) {
        res = await Items.loadAllFeaturedItems(options)
        this.featuredItems = Items.featuredItems
      } else {
        res = await Items.loadAllItems(options)
        this.allItems = Items.allItems
      }
      this.oldSearchText = this.searchText
      this.isLoading = false
      return res
    } catch (e) {
      // isFeatured ? (this.allItems = []) : (this.featuredItems = [])
      this.allItems = []
      this.featuredItems = []
      console.log('FILTER ERROR => ', e)
      isFeatured ? (this.allItems = []) : (this.featuredItems = [])
      this.isLoading = false
      Items.isDisconnected(e)
      this.errors = e
      this.oldSearchText = this.searchText
      this.searchText = null
      return res
    }
  }

  onSearchSave = async ({
    catIndex,
    priceMin,
    priceMax,
    title,
    subCategoryIndex,
    isFeatured
  }) => {
    this.onSearchModalClick()
    let options = {
      from_price: priceMin,
      to_price: priceMax,
      title: title
    }
    catIndex && catIndex != -1
      ? (options.category = this.categories[catIndex].id)
      : null
    subCategoryIndex && subCategoryIndex != -1
      ? (options.category = this.subCategories[subCategoryIndex].id)
      : null

    if (this.nearestLocation) {
      options.latitude = this.nearestLocation.latitude
      options.longitude = this.nearestLocation.longitude
    }
    try {
      await Items.saveSearchItem(options)
      Snackbar.show({
        title: 'Filter saved successfully',
        length: 3000,
        backgroundColor: Colors.mainColor
      })
    } catch (e) {
      console.log('FILTER SAVE ERROR => ', e)
      Snackbar.show({
        title: 'There is an error, please try again later',
        length: 3000,
        backgroundColor: Colors.mainColor
      })
      this.errors = e
      Items.isDisconnected(e)
    }
  }

  loadFollowedUsers = async () => {
    try {
      this.isLoading = true
      await User.getUserFollowingList()
      this.followingList = User.followingList
      return this.followingList
    } catch (e) {
      console.log('FOLLOWED LIST ERROR => ', e)
      this.errors = e
    }
  }

  loadOtherSellerItems = async ownerId => {
    try {
      let res = await Items.loadOtherSellerItems(ownerId)
      console.log('otherSllerItems1 => ', res)
      return res
    } catch (e) {
      User.isDisconnected(e)
      console.log('ERROR LOADING OTHER SELLER ITEMS => ', e)
      this.errors = e
    }
  }
}

export default new HomeStore()
