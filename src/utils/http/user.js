import $http from './request'

export default {
  login(opts) {
    opts.url = `/login`
    $http.post(opts)
  },
}