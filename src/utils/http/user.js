import $http from './request'

export default {
  login(opts) {
    opts.url = `/login`
    $http.post(opts)
  },

  getCoachInfo(opts) {
    opts.url = `/video/resumeinfo/info`
    $http.post(opts)
  }
}