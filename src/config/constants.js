const isDev = true // 判断环境 true 测试环境  false 正式环境
const DEV_APPID = 'wx55ea3d8eb10dd1dc'
const PRD_APPID = 'wx55ea3d8eb10dd1dc'
const DEV_BASE_URL = 'http://47.114.97.144:50'
const PRD_BASE_URL = 'http://47.114.97.144:50'
const DEV_ROOT_URL = 'http://localhost:8080/'
const PRD_ROOT_URL = 'http://advertiser-prd-h5-ad.1pluslive.com/'

export default {
  BASE_URL: isDev ? DEV_BASE_URL : PRD_BASE_URL,
  APPID: isDev ? DEV_APPID : PRD_APPID,
  ROOT_URL: isDev ? DEV_ROOT_URL : PRD_ROOT_URL,
  BASIC_AUTHORIZATION: 'Basic YWR2ZXJ0aXNpbmctY2xpZW50OmFkdmVydGlzaW5nLXNlY3JldA==',
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