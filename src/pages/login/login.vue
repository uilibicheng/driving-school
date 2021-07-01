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
    var code = option.code;
    if (code) {
      if (option.url) {
        this.navigateUrl = decodeURIComponent(option.url);
      }
      this.login(code)
    } else {
      // 进入登录页，由于地址规则不正确，需要重新组合，才能拿到code，再去登录
      let urlarr = window.location.href.split('#')
      let index = urlarr[1].indexOf('?')
      let url = `${urlarr[1]}${index > -1 ? '&' : '?'}${urlarr[0].split('?')[1]}`
      location.replace(window.location.origin + '/#' + url)
    }
  },

  methods: {
    login(code) {
      let data = {
        code,
        appId: constants.APPID,
        ...localM.get(LOCAL_KEY.LOGIN_PARAMS)
        // recommendId: localM.get(LOCAL_KEY.LOGIN_PARAMS),
        // roleCode: '', // 角色code 加盟商为league，一级代理为one_level_proxy，二级代理为two_level_proxy
      };
      this.$http.user.login({
        data,
        success: (res) => {
          localM.set(LOCAL_KEY.TOKEN, res.token);
          localM.set(LOCAL_KEY.USER, res.userInfo);
          if (this.navigateUrl) {
            uni.redirectTo({
              url: this.navigateUrl,
            });
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