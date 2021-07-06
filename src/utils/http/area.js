import $http from './request'

export default {
  getAllArea(opts) {
    opts.url = '/video/territoryinfo/list'
    $http.post(opts)
  },

  getLocation(opts) {
    opts.url = 'https://apis.map.qq.com/ws/geocoder/v1/'
    $http.post(opts)
  }
}