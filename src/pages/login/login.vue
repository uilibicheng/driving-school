<template>
  <view></view>
</template>

<script>
import constants from "../../config/constants";
import localM from "@/utils/common/local";
import {LOCAL_KEY} from '@/config/constants'

export default {
  data() {
    return {
      navigateUrl: "",
    };
  },
  onLoad(option) {
    if (option.url) {
      this.navigateUrl = JSON.parse(decodeURIComponent(options.url));
    }
    var code = option.code;
    if (code) {
      // this.login(code)
      console.log(code)
      console.log(constants.APPID)
    } else {
      let urlarr = window.location.href.split('#')
      let url = urlarr[1] + '?' + urlarr[0].split('?')[1]
      location.replace(window.location.origin + '/#' + url)
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
          localM.set(LOCAL_KEY.TOKEN, res.token);
          localM.set(LOCAL_KEY.USER, res.userInfo);
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