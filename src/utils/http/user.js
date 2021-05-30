import $http from './request'
import constants from '../../config/constants'

export default {
  getCurrentUser(opts) {
    opts.url = `/video/userInfo/info/${opts.data.uuid}`
    $http.post(opts)
  },

  login(opts) {
    opts.url = `/login`
    $http.post(opts)
  },
}