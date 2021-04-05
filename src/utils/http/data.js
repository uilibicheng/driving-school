import $http from './request'
import constants from '../../config/constants'

export default {
  getCourseList(opts) {
    opts.url = '/api/video/byPlaceIdQuery'
    $http.post(opts)
  },

  getVideoById(opts) {
    opts.url = '/api/video/queryById'
    $http.post(opts)
  },

  getOrderList(opts) {
    opts.url = '/api/video/getBuyeds'
    $http.post(opts)
  },
}