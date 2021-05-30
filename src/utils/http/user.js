import $http from './request'
import constants from '../../config/constants'

export default {
  getCurrentUser(opts) {
    opts.url = `/api/user/info/${constants.APPID}`
    opts.header = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    $http.post(opts)
  },

  login(opts) {
    opts.url = `/login/${constants.APPID}`
    opts.method = 'POST'
    $http.post(opts)
  },
}