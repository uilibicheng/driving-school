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
      this.login(code)
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
        // code: '041iball2nIM774Y5Ukl2hTsuL2ibalw',
        appId: constants.APPID,
        ...localM.get(LOCAL_KEY.LOGIN_PARAMS)
        // recommendId: localM.get(LOCAL_KEY.LOGIN_PARAMS),
        // roleCode: '', // 角色code 加盟商为league，一级代理为one_level_proxy，二级代理为two_level_proxy
      };
      this.$http.user.login({
        data,
        success: (res) => {
          console.log('login', res)
          localM.set(LOCAL_KEY.TOKEN, res.token);
          localM.set(LOCAL_KEY.USER, res.userInfo);
          if (this.navigateUrl) {
            if (constants.SWITCH_TAB_URL.includes(this.navigateUrl)) {
              uni.redirectTo({
                url: this.navigateUrl,
              });
            } else {
              uni.redirectTo({
                url: this.navigateUrl,
              });
            }
          } else {
            uni.redirectTo({
              url: "/pages/index/index",
            });
          }
        },
      });
    },
  },
};
</script>