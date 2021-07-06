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
			if (options.query.token) {
				localM.set(LOCAL_KEY.TOKEN, options.query.token);
			}
			if (options.query.userInfo) {
				const userInfo = JSON.parse(options.query.userInfo)
				localM.set(LOCAL_KEY.USER, userInfo);
			}
			if (!localM.get(LOCAL_KEY.TOKEN)) {
				localM.set(LOCAL_KEY.TOKEN, '');
        localM.set(LOCAL_KEY.USER, {});
			}

			// const data = {
			// 	location: '23.08331,2C113.3172',
			// 	key: "OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77",
			// 	get_poi: 1,
			// }
			// console.log('data', data)
			// this.$http.area.getLocation({
			// 	data,
			// 	success: res => {
			// 		let city = res.data.result
			// 		alert(city)
			// 	}
			// })

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

					// jWeixin.ready(() => {
					// 	console.log('ready')
					// 	jWeixin.getLocation({
					// 		type: 'gcj02',
					// 		success: res => {
					// 			console.log('res', res)
					// 			const locationString = res.latitude + "," + res.longitude;
					// 			alert(`获取地址成功${locationString}`)
					// 			const data = {
					// 				"key": "434BZ-NWPWS-JN5OL-6EQQM-2VOCQ-WFFQG",
					// 				"location": locationString
					// 			}
					// 			this.$http.area.getLocation({
					// 				data,
					// 				success: res => {
					// 					let city = res.data.result
					// 					alert(city)
					// 				}
					// 			})
					// 		}
					// 	})
					// })
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
