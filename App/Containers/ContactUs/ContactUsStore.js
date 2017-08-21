import { observable } from 'mobx'
// import { Actions } from 'react-native-router-flux'
import { ItemModel } from '../../Models/Item'
import { Actions } from 'react-native-router-flux'
import BaseViewModel from '../../Models/BaseViewModel'
import Items from '../../Models/Items'
import { Colors } from '../../Themes/index'
import Snackbar from 'react-native-snackbar'
import Constants from '../../Models/Constants'
import I18n from 'react-native-i18n'

export class ContactUsStore extends BaseViewModel {
    @observable statusList = []
    @observable reasonName = ''
    @observable selectedContactItem = null
    @observable subject = ''
    @observable message = ''
    @observable isRequiredError = ''
    @observable selectItemError = ''

  reset = () => {
    this.reasonName = ''
    this.subject = ''
    this.message = ''
    this.isRequiredError = ''
  }

  loadstatusList = async () => {
    this.isLoading = true
    let res = await Items.simpleApiRequest(Constants.CONTACT_US_LIST)
    this.statusList = res
    this.isLoading = false
    return this.statusList
  }

  selectItemSave = () => {
    if (!this.selectedContactItem) {
      this.selectItemError = I18n.t('SelectStatusError')
    } else {
      Actions.ContactUs()
    }
  }

  sendContactUs = async () => {
    this.isRequiredError = ''
    if (!this.subject || !this.message) {
      this.isRequiredError = I18n.t('FillFullFields')
    }
    this.isLoading = true
    try {
      await Items.simpleApiRequest(Constants.CONTACT_US, {
        subject: this.subject,
        contact_status: this.selectedContactItem,
        content: this.message
      })
      Snackbar.show({
        title: I18n.t('FeedBackSentSuccessfully'),
        length: 10000,
        backgroundColor: Colors.mainColor
      })
      Actions.popTo({ scene: 'UserProfile' })
    } catch (e) {
      console.log(e)
      this.isLoading = false
    }
    this.isLoading = false
  }

  selectContactItem = index => {
    this.selectedContactItem = this.statusList[index].id
    this.reasonName = this.statusList[index].name
  }

  onSubjectChange = val => (this.subject = val)
  onMessageChange = val => (this.message = val)

}

export default new ContactUsStore()
