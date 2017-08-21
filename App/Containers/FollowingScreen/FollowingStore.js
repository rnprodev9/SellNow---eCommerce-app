import { observable, action } from 'mobx'
import { Actions } from 'react-native-router-flux'
import BaseViewModel from '../../Models/BaseViewModel'
import UserModel from '../../Models/User'

export class FollowigStore extends BaseViewModel {
  @observable FollowingList = [];

  loadFollowingList = async () => {
    this.FollowingList = []
    try {
      await UserModel.getUserFollowingList()
      this.FollowingList = await UserModel.getUserFollowingList()
      console.log('current users', this.followUserAction.slice())
    } catch (e) {
      console.log('Following LIST ERROR => ', e)
    }
  }

  unFollowAction = async (id) => await UserModel.followUserAction(id, 'unfollow')

}

export default new FollowigStore()
