import $http from './request'
import constants from '../../config/constants'

export default {
  getAllArea(opts) {
    opts.url = '/api/video/place/allList'
    $http.post(opts)
  }
}