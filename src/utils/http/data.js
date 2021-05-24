import $http from './request'
import constants from '../../config/constants'

export default {
  getCourseList(opts) {
    opts.url = `/video/courseinfo/courseList/{userId}`
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

  buyVideo(opts) {
    opts.url = '/pay/order/video'
    opts.method = 'POST'
    $http.post(opts)
  },

  createOrder(opts) {
    opts.url = '/pay/createOrder'
    opts.method = 'POST'
    $http.post(opts)
  },
}