import $http from './request'
import constants from '../../config/constants'

export default {
  getMapList(opts) {
    opts.url = '/video/mapInfo/mapListByUserId'
    $http.post(opts)
  },

  getAdList(opts) {
    opts.url = '/video/advertising/bannerAdvertising'
    $http.post(opts)
  },
}