import $http from './request'

export default {
  login(opts) {
    opts.url = `/login`
    $http.post(opts)
  },

  getCoachInfo(opts) {
    opts.url = `/video/resumeinfo/info`
    $http.post(opts)
  },

  getCoursePay(opts) {
    opts.url = `/video/pay/coursePay`
    $http.post(opts)
  },

  getUserReport(opts) {
    opts.url = `/video/userInfo/report`
    $http.post(opts)
  },

  getMiniPhotoPath(opts) {
    // opts.url = `http://47.114.97.144:50/api/wx/navigate/to/mini/photo`
    opts.url = `/api/wx/navigate/to/mini/photo`
    $http.post(opts)
  },
}