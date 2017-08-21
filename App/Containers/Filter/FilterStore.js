import { observable } from 'mobx'
import BaseViewModel from '../../Models/BaseViewModel'
// import { Actions } from 'react-native-router-flux'
// import UserModel from '../../Models/User'
// import Snackbar from 'react-native-snackbar'
// import CategoriesModel from '../../Models/Categories'

export class FilterStore extends BaseViewModel {
  @observable title = '';
  @observable currentCategoryId = -1;
  @observable maxSearchPrice = 20000;
  @observable minSearchPrice = 0;
  @observable minSliderValue = 0;
  @observable maxSliderValue = 80;
  @observable currentSubCategoryId = null;
  @observable address = '';
  @observable searchOptions = {};
  @observable values = [this.minSliderValue, this.maxSliderValue]
  onSliderChange = num => {
    let max = Math.floor(num[1]) * 500
    let min = Math.floor(num[0]) * 500
    this.minSearchPrice = min
    if (max > 99500) this.maxSearchPrice = 9500
    else {
      this.maxSearchPrice = Math.floor(num[1]) * 500
    }
    this.values = num
  }

  onMinValueChanged = text => {
    let num = parseInt(text)
    if ((this.maxSearchPrice - this.minSearchPrice) === 500 && num >= this.maxSearchPrice) return
    num = isNaN(num) ? 0 : num
    this.minSearchPrice = num >= this.maxSearchPrice ? this.maxSearchPrice - 500 : num
    let value = Math.round(num / 500)
    this.minSliderValue = value >= this.maxSliderValue ? this.maxSliderValue - 1 : value
    this.values = [this.minSliderValue, this.maxSliderValue]
  }

  onMaxValueChanged = text => {
    let num = parseInt(text)
    num = isNaN(num) ? 0 : num
    this.maxSearchPrice = num <= -1 ? 0 : num
    let value = Math.round(num / 500)
    this.maxSliderValue = value <= this.minSliderValue ? this.minSliderValue + 1 : num > 99500 ? 199 : value
    this.values = [this.minSliderValue, this.maxSliderValue]
  }

  onTitleChange = text => {
    this.title = text
  };

  onCategoryPress = id => {
    this.currentCategoryId = id
    // this.onSliderChange([this.minSliderValue, this.maxSliderValue])
  };

  onSubCategoryPress = id => {
    this.currentSubCategoryId = id
  };

  onResetPress = () => {
    this.title = ''
    this.currentCategoryId = -1
    this.maxSearchPrice = 20000
    this.minSearchPrice = 0
    this.currentSubCategoryId = -1
    this.searchOptions = {}
  };
}

export default new FilterStore()
