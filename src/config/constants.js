// import localM from '../common/local'
import common from '../utils/common'

const isDev = process.env.NODE_ENV === 'development' // 判断环境 true 测试环境  false 正式环境
const DEV_APPID = 'wxd3741df9fe2e8a5e'
const PRD_APPID = 'wxd3741df9fe2e8a5e'
const DEV_BASE_URL = 'http://120.79.216.249:8081'
const PRD_BASE_URL = 'https://video-api.fxpjiakao.com'
const DEV_ROOT_URL = 'https://photo.h5.fxpjiakao.com'
const PRD_ROOT_URL = 'https://photo.h5.fxpjiakao.com'

export default {
  BASE_URL: isDev ? DEV_BASE_URL : PRD_BASE_URL,
  APPID: isDev ? DEV_APPID : PRD_APPID,
  ROOT_URL: isDev ? DEV_ROOT_URL : PRD_ROOT_URL,
  SWITCH_TAB_URL: [
    // '/pages/index/index',
    // '/pages/mine/index',
  ]
}

export const LOCAL_KEY = {
  TOKEN: 'token',
  USER: 'user',
  AREA: 'area',
  LOGIN_PARAMS: 'loginParams'
}
console.log(1111, common)
export const USER_INFO = ''

const rootUrl = isDev ? DEV_ROOT_URL : PRD_ROOT_URL
let inviteUrl = `${rootUrl}/#/pages/index/index`
if (USER_INFO && USER_INFO.id) {
  inviteUrl = `${inviteUrl}?recommendId=${USER_INFO.id}`
}
if (USER_INFO && USER_INFO.roleCode) {
  let symbol = inviteUrl.includes('?') ? '&' : '?'
  inviteUrl = `${inviteUrl}${symbol}roleCode=${USER_INFO.roleCode}`
}

export const INVITE_COACH_URL = inviteUrl || ''

export const POSTER_DATA = {
  INVITE_COACH: {
    width: '750rpx',
    height: '1330rpx',
    views: [
      {
        type: 'image',
        src: '../../static/poster/caoach_bg.png',
        css: {
          left: '0rpx',
          top: '0rpx',
          width: '750rpx',
          height: '1330rpx',
          zIndex: 100
        }
      },
      {
        type: 'qrcode',
        text: INVITE_COACH_URL,
        css: {
          left: '170rpx',
          top: '680rpx',
          width: '415rpx',
          height: '415rpx',
          zIndex: 1000
        }
      }
    ]
  }
}