import $http from './request'
import constants from '../../config/constants'

export default {
  getCourseList(opts) {
    opts.url = `/video/courseinfo/courseList/${opts.data.userId}`
    opts.method = 'POST'
    $http.post(opts)
  },

  getCourseGroup(opts) {
    opts.url = `/video/courseinfo/group/list`
    opts.method = 'POST'
    $http.post(opts)
  },
}