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

  // 查询课程详情
  getCourseInfo(opts) {
    opts.url = `/video/courseinfo/courseInfo`
    $http.post(opts)
  },

  // 添加课程
  addCourse(opts) {
    opts.url = `/video/courseinfo/addCourse`
    opts.method = 'POST'
    $http.post(opts)
  },

  // 课程支付
  payCourse(opts) {
    opts.url = `/video/pay/coursePay`
    opts.method = 'POST'
    $http.post(opts)
  },

  // 移除课程
  removeCourse(opts) {
    opts.url = `/video/courseinfo/removeCourse`
    opts.method = 'DELETE'
    $http.post(opts)
  },

  getOrderList(opts) {
    opts.url = '/video/pay/coursePay'
    $http.post(opts)
  },

  // 视频下载量增量
  incrementPlayVideo(opts) {
    opts.url = '/video/videoInfo/incrementPlayVideo'
    opts.method = 'POST'
    $http.post(opts)
  },

  // 地图下载量增量
  incrementDownloadMap(opts) {
    opts.url = '/video/mapInfo/incrementDownloadMap'
    opts.method = 'POST'
    $http.post(opts)
  },
}