import $http from './request'

export default {
  getAllArea(opts) {
    opts.url = '/video/territoryinfo/list'
    $http.post(opts)
  }
}