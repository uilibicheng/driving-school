import constants, {LOCAL_KEY} from '@/config/constants'
import localM from "@/utils/common/local";

let appid = constants.APPID;
let rootUrl = constants.ROOT_URL;

var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var halfamonth = day * 15;
var month = day * 30;

export default {
  toManage: function (redirect_uri) {
    let url = encodeURIComponent(rootUrl + '/#' + redirect_uri)
    location.href = "https:/\/open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&response_type=code&scope=snsapi_userinfo&redirect_uri=" + url + "&state=1#wechat_redirect"
  },

  formatDate: function (value) {
    var dataValue = JSON.parse(value);
    var date = new Date(dataValue * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
  },

  floatNumber: function (val) {
    if (!val) val = 0
    var value = Math.floor(parseFloat(val) * 100) / 100;
    var xsd = value.toString().split(".");
    if (xsd.length == 1) {
      value = value.toString() + ".00";
      return value;
    }
    if (xsd.length > 1) {
      if (xsd[1].length < 2) {
        value = value.toString() + "0";
      }
      return value;
    }
  },

  dateFormat: function (val, fm) { //val时间戳 fm时间格式如yyyy-MM-dd hh:mm:ss
    if (!val) return;
    if (String(val).length < 13) val = val * 1000;
    var date = new Date(val),
      o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(), //day
        "h+": date.getHours(), //hour
        "m+": date.getMinutes(), //minute
        "s+": date.getSeconds(), //second
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        "S": date.getMilliseconds() //millisecond
      },
      format = fm || 'yyyy-MM-dd';
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
          RegExp.$1.length == 1 ? o[k] :
          ("00" + o[k]).substr(("" + o[k]).length));
    return format;
  },

  getDateDiff: function (dateTimeStamp) {
    var result = ''
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
      //若日期不符则弹出窗口告之
      //alert("结束日期不能小于开始日期！");
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
      result = parseInt(monthC) + "个月前";
    } else if (weekC >= 1) {
      result = parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
      result = parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
      result = parseInt(hourC) + "个小时前";
    } else if (minC >= 1) {
      result = parseInt(minC) + "分钟前";
    } else
      result = "刚刚";
    return result;
  },

  setUserInfo: function(info) {
    localM.set(LOCAL_KEY.USER, info);
  },

  getUserInfo: function() {
    let userInfo = localM.get(LOCAL_KEY.USER) || {}
    return userInfo
  },

  setToken: function(token) {
    localM.set(LOCAL_KEY.TOKEN, token);
  },

  getToken: function() {
    return localM.get(LOCAL_KEY.TOKEN) || ''
  },

  getInviteUrl: function(isNormal) {
    const userInfo = this.getUserInfo()
    let inviteUrl = `${constants.ROOT_URL}/#/pages/index/index`
    if (userInfo && userInfo.id) {
      inviteUrl = `${inviteUrl}?recommendId=${userInfo.id}`
    }
    if (!isNormal && userInfo && userInfo.roleCode) {
      let symbol = inviteUrl.includes('?') ? '&' : '?'
      inviteUrl = `${inviteUrl}${symbol}roleCode=${userInfo.roleCode}`
    }
    return inviteUrl
  }

}