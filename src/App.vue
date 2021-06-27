<script>
import common from '@/utils/common'
import localM from "@/utils/common/local";
import { LOCAL_KEY } from "@/config/constants";

export default {
	onLaunch: function(options) {
		// 非登录页进行判断是否有登陆
		if (options.path !== 'pages/login/login') {
			let params = {}
			if (options.query.recommendId) {
				params.recommendId = options.query.recommendId
			}
			if (options.query.roleCode) {
				params.roleCode = options.query.roleCode
			}
			localM.set(LOCAL_KEY.LOGIN_PARAMS, params);
			if (!localM.get(LOCAL_KEY.TOKEN)) {
				// return common.toManage("/pages/login/login")
				localM.set(LOCAL_KEY.TOKEN, '');
        localM.set(LOCAL_KEY.USER, {});
			}

      this.$http.user.getMiniPhotoPath({
        data: {
					photoUrl: window.location.href
				},
        success: res => {
          jWeixin.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
            appId: res.config.appId, // 必填，公众号的唯一标识
            timestamp: res.config.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.config.nonceStr, // 必填，生成签名的随机串
            signature: res.config.signature,// 必填，签名
            jsApiList: ['chooseImage', 'chooseWXPay'], // 必填，需要使用的JS接口列表
            openTagList: ['wx-open-launch-weapp'] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
          });
        }
      })
		}
	},
	onLoad: function(options) {
		console.log('App onLoad', options)
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style>
	/*每个页面公共css */
	body {
		width: 100%;
	}
	body uni-page-body {
		height: 100%;
		background: #fff;
	}
</style>
