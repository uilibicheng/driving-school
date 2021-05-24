const isDev = process.env.NODE_ENV === 'development' // 判断环境 true 测试环境  false 正式环境
const DEV_APPID = 'wxd3741df9fe2e8a5e'
const PRD_APPID = 'wxd3741df9fe2e8a5e'
const DEV_BASE_URL = 'http://47.119.138.44:8081'
const PRD_BASE_URL = 'https://photo.h5.fxpjiakao.com'
const DEV_ROOT_URL = 'https://photo.h5.fxpjiakao.com'
const PRD_ROOT_URL = 'https://photo.h5.fxpjiakao.com'

export default {
  BASE_URL: isDev ? DEV_BASE_URL : PRD_BASE_URL,
  APPID: isDev ? DEV_APPID : PRD_APPID,
  ROOT_URL: isDev ? DEV_ROOT_URL : PRD_ROOT_URL,
  SWITCH_TAB_URL: [
    '/pages/index/index',
    '/pages/mine/index',
  ]
}

export const LOCAL_KEY = {
  TOKEN: 'token',
  USER: 'user',
  AREA: 'area',
}