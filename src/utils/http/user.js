import $http from './request'
import constants from '../../config/constants'

export default {
  getCurrentUser(opts) {
    opts.url = `/video/userInfo/${opts.data.unionid}`
    $http.post(opts)
  },

  login(opts) {
    opts.url = `/login`
    $http.post(opts)
  },
}