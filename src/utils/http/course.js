import $http from './request'
import constants from '../../config/constants'

export default {
  // 根据用户ID查询对应的课程列表
  getCourseList(opts) {
    opts.url = `/video/courseinfo/courseList`
    $http.post(opts)
  },

  // 查询课程列表（按照考场分组）
  getCourseGroup(opts) {
    opts.url = `/video/courseinfo/group/list`
    $http.post(opts)
  },

  // 添加课程
  addCourse(opts) {
    opts.url = `/video/courseinfo/addCourse`
    opts.method = 'POST'
    $http.post(opts)
  },
}