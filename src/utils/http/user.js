import $http from './request'
import constants from '../../config/constants'

export default {
  getCurrentUser(opts) {
    opts.url = `/api/user/info/${constants.APPID}`
    $http.post(opts)
  },

  login(opts) {
    // opts.header = {
    //   Authorization: constants.BASIC_AUTHORIZATION,
    // }
    opts.url = `/api/user/login/${constants.APPID}`
    $http.post(opts)
  },

  getUserAuthCode(opts) {
    opts.url = `${constants.USER_INFO_AUTH_URL}?code=${opts.code}`
    opts.method = 'GET'
    $http.post(opts)
  },
}