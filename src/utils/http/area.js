import $http from './request'

export default {
  getAllArea(opts) {
    opts.url = '/api/video/place/allList'
    $http.post(opts)
  }
}