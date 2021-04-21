import $http from './request'
import constants from '../../config/constants'

export default {
  getCurrentUser(opts) {
    opts.url = `/api/user/info/${constants.APPID}`
    $http.post(opts)
  },

  login(opts) {
    opts.url = `/api/user/oauth/get_access_token/${constants.APPID}`
    $http.post(opts)
  },
}