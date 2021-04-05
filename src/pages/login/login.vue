<template>
  <view>登录</view>
</template>

<script>
import constants from "../../config/constants";

export default {
  data() {
    return {
      navigateUrl: "",
    };
  },
  onLoad(option) {
    if (options.url) {
      this.navigateUrl = JSON.parse(decodeURIComponent(options.url));
    }
    var code = option.code;
    var url = this.url.getUserInfoByWxOAuthCode + "?code=" + code;
    var that = this;
    if (code) {
      this.login(code)
    }
  },

  methods: {
    login(code) {
      let data = {
        code,
      };
      this.$http.user.login({
        data,
        success: (res) => {
          localM.set(LOCAL_KEY.TOKEN, res);
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