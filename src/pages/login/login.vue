<template>
  <view>登录</view>
</template>

<script>
import constants from "../../config/constants";
import {LOCAL_KEY} from '@/config/constants'

export default {
  data() {
    return {
      navigateUrl: "",
    };
  },
  onLoad(option) {
    console.log('login', option)
    if (option.url) {
      this.navigateUrl = JSON.parse(decodeURIComponent(options.url));
    }
    var code = option.code;
    console.log('code', code)
    if (code) {
      this.login(code)
    } else {
      let urlarr = window.location.href.split('#')
      console.log('跳转', urlarr)
      let url = urlarr[1] + '?' + urlarr[0].split('?')[1]
      console.log('url', url)
      uni.reLaunch({
        url,
      })
    }
  },

  methods: {
    login(code) {
      let data = {
        code,
        appid: constants.APPID
      };
      this.$http.user.login({
        data,
        success: (res) => {
          console.log('res', res)
          localM.set(LOCAL_KEY.TOKEN, res.token);
          if (this.navigateUrl) {
            if (constants.SWITCH_TAB_URL.includes(this.navigateUrl)) {
              uni.switchTab({
                url: this.navigateUrl,
              });
            } else {
              uni.redirectTo({
                url: this.navigateUrl,
              });
            }
          } else {
            uni.switchTab({
              url: "/pages/index/index",
            });
          }
        },
      });
    },
  },
};
</script>