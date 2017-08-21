import { observable } from 'mobx'
// import { Actions } from 'react-native-router-flux'
import { ItemModel } from '../../Models/Item'
import { Actions } from 'react-native-router-flux'
import UserModel from '../../Models/User'
import BaseViewModel from '../../Models/BaseViewModel'
import Items from '../../Models/Items'
import { Colors } from '../../Themes/index'
import Snackbar from 'react-native-snackbar'
import Constants from '../../Models/Constants'
import BaseModel from '../../Models/BaseModel'

export class ReportItemStore extends BaseViewModel {
  @observable reasons = []
  @observable reasonName = ''
  @observable selectedReasonId = null
  @observable note = ''

  @observable itemId = null
  @observable isLoading = false
  @observable sendLoading = false
  @observable reasonsLoading = true
  // @observable reasons = []
  @observable item = new ItemModel()

  reset = () => {
    this.reasons = []
    this.reasonName = ''
    this.selectedReasonId = null
    this.note = ''
    this.isLoading = false
    this.reasonsLoading = true
    this.item = new ItemModel(this.itemId)
  }

  onStartUp = async itemId => {
    this.itemId = itemId
    this.reset()
    try {
      await this.loadReasons()
    } catch (e) {
      console.log('GETTING REASONS ERROR => ', e)
      this.isLoading = false
    }
  }

  loadReasons = async () => {
    this.isLoading = true
    let res = await this.item.getReasons()
    this.reasons = res
    this.isLoading = false
    return this.reasons
  }

  selectReason = index => {
    this.selectedReasonId = this.reasons[index].id
    this.reasonName = this.reasons[index].name
  }

  onNoteChange = val => (this.note = val)

  onSend = async () => {
    if (!this.selectedReasonId) {
      Snackbar.show({
        title: 'Please select a reason first',
        length: 3000,
        backgroundColor: Colors.error
      })
      return
    }
    this.sendLoading = true
    try {
      let optoins = {
        item_id: this.itemId,
        report_type: this.selectedReasonId,
        content: this.note
      }
      let res = await this.item.simpleApiRequest(Constants.REPORT_ITEM, optoins)
      res.message &&
        Snackbar.show({
          title: res.message,
          length: 3000,
          backgroundColor: Colors.mainColor
        })

      Actions.HomeScreen({ type: 'reset' })
    } catch (e) {
      console.log('REPORT ITEM ERROR', e)

      Snackbar.show({
        title: 'Something bad happend!, try agin later ',
        length: 3000,
        backgroundColor: Colors.mainColor
      })
    } finally {
      this.sendLoading = false
    }
  }
}

export default new ReportItemStore()
