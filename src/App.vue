<script>
import common from '@/utils/common'
import localM from "@/utils/common/local";
import { LOCAL_KEY } from "@/config/constants";

export default {
	onLaunch: function(options) {
		console.log('App Launch', options)
		let params = {
			recommendId: options.query.recommendId || '',
			roleCode: options.query.roleCode || '',
		}
		localM.set(LOCAL_KEY.LOGIN_PARAMS, params);
		// 非登录页进行判断是否有登陆
		if (options.path !== 'pages/login/login') {
			if (!localM.get(LOCAL_KEY.TOKEN)) {
				return common.toManage("/pages/login/login")
			}
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
