var get = {
  method: 'get'
}
var getWithToken = {
  method: 'get',
  useUserToken: true
}
var post = {
  method: 'post'
}
var postWithToken = {
  method: 'post',
  useUserToken: true
}

export default {
  login: {
    ...post,
    url: `login`
  },
  register: {
    ...post,
    url: `register`
  },
  forgetPassword: {
    ...post,
    url: `reset_password`
  },
  checkEmail: {
    ...post,
    url: `check_mail`
  },
  checkPhone: {
    ...post,
    url: `check_phone`
  },
  checkPassword: {
    ...post,
    url: `check_pass`
  },
  logout: {
    ...getWithToken,
    url: `logout`
  },
  resendCode: {
    ...post,
    url: `resend_code`
  },
  mobileVerfication: {
    ...post,
    url: `mobile_verf`
  },

  categories: {
    ...getWithToken,
    url: `categories`
  },
  items: {
    ...postWithToken,
    url: `items`
  },
  item: {
    ...getWithToken,
    url: `item`
  },
  likeItem: {
    ...postWithToken,
    url: `like_item`
  },
  userLikedList: {
    ...getWithToken,
    url: `user_liked_list`
  },
  userWishList: {
    ...getWithToken,
    url: `user_wishlist`
  },
  wishItem: {
    ...postWithToken,
    url: 'wish_item'
  },
  followUser: {
    ...postWithToken,
    url: 'follow_user'
  },
  userFollowingList: {
    ...getWithToken,
    url: 'user_following_list'
  },
  blockUser: {
    ...postWithToken,
    url: 'block_user'
  },
  userBlockingList: {
    ...getWithToken,
    url: 'user_block_list'
  },
  rateUser: {
    ...postWithToken,
    url: 'rate_user'
  },
  getProfile: {
    ...getWithToken,
    url: 'profile'
  },
  updateProfile: {
    ...postWithToken,
    url: 'profile'
  },
  saveSearchItem: {
    ...postWithToken,
    url: 'save_item_search'
  },
  saveItem: {
    ...postWithToken,
    url: 'save_item'
  },
  deleteItem: {
    ...postWithToken,
    url: 'delete_item'
  },
  preprationItem: {
    ...getWithToken,
    url: 'prepration_item_form'
  },
  makeOffer: {
    ...postWithToken,
    url: 'send_offer'
  },
  reportReasons: {
    ...getWithToken,
    url: 'reporting_types'
  },
  reportItem: {
    ...postWithToken,
    url: 'report_item'
  },

  offersList: {
    ...postWithToken,
    url: 'offers_item'
  },
  upgradeReq: {
    ...postWithToken,
    url: 'upgrade_account_req'
  },
  upgradePay: {
    ...postWithToken,
    url: 'upgrade_account_pay'
  },
  conversations: {
    ...getWithToken,
    url: 'my_chats'
  },
  getUrl: {
    ...get,
    url: 'get_url_schema'
  },
  deleteChat: {
    ...postWithToken,
    url: 'delete_chat'
  },
  myNotifications: {
    ...getWithToken,
    url: 'my_notifications'
  },

  deleteNotification: {
    ...getWithToken,
    url: 'delete_notifications'
  },
  deleteNotification2: {
    ...postWithToken,
    url: 'delete_notifications'
  },
  contactUsList: {
    ...getWithToken,
    url: 'list_contactus_status'
  },
  contactUs: {
    ...postWithToken,
    url: 'contactus'
  },
  getUserType: {
    ...postWithToken,
    url: 'get_user_type'
  },
  setUserConfig: {
    ...postWithToken,
    url: 'set_user_config'
  },
  getUserConfig: {
    ...postWithToken,
    url: 'get_user_config'
  },
  uploadImage: {
    ...postWithToken,
    url: 'upload_image'
  }
}
