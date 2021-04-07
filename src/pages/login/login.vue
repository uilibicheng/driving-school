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
    if (options.url) {
      this.navigateUrl = JSON.parse(decodeURIComponent(options.url));
    }
    var code = option.code;
    if (code) {
      this.login(code)
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