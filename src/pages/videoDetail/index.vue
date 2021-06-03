<template>
  <view class="detail">
    <video class="video-content" :src="detailInfo.videoInfoVO && detailInfo.videoInfoVO.videoUrl" />
    <view class="tab">
      <view class="tab-item active">简介</view>
      <!-- <view class="tab-item">线路图</view> -->
    </view>
    <view class="intro">
      <view class="intro-title">{{detailInfo.name}}</view>
      <!-- <view class="video-list">
        <view class="list-item" v-for="item in 3">河源铺前科三2号线（自动挡）最新</view>
      </view> -->
      <view class="view-desc">
        <!-- <view class="desc-title">本合集包括以上所有视频内容</view> -->
        <view class="desc-num">{{detailInfo.videoInfoVO ? detailInfo.videoInfoVO.videoPlayCount : 0}}次播放</view>
        <view class="desc-price">
          <text class="desc-symbol">￥</text>{{detailInfo.coursePrice}}
          <text class="desc-tip">付款后永久有效</text>
        </view>
      </view>
      <!-- <view class="other-class">
        <view class="other-class-title">铺前科三考场其他相关路线，点击下面链接</view>
        <view class="other-class-item" v-for="item in 8">河源铺前科三2号线最新</view>
      </view> -->
      <!-- <view class="intro-desc">河源铺前科三考场，阿萨德咖啡机五色机房问了句法六维空间二分了我解放路卡玩具鳄六维空间额返利网科技返利网科技了外壳及来我家二弗兰克我</view> -->
    </view>
    <!-- <view class="line" v-if="false">
      <view class="line-item" v-for="item in 4">河源铺前2.3.5号线（自动挡）合集2021年新规</view>
    </view> -->
		<view class="buy-btn" v-if="userInfo.roleCode" @click="sendToStudent">发给学员</view>
		<view class="buy-btn" v-else @click="buyVideo">点击购买课程</view>
  </view>
</template>

<script>
import localM from '@/utils/common/local'
import {LOCAL_KEY} from '@/config/constants'

export default {
	data() {
		return {
			detailInfo: {},
      id: '',
      userInfo: {}
		}
	},

  onLoad(option) {
    this.userInfo = localM.get(LOCAL_KEY.USER)
		if (option.id) {
      this.id = option.id
			this.getVideoById()
		} else {
			uni.switchTab({
				url: '/pages/index/index'
			})
		}
	},

  methods: {
		getVideoById() {
			let data = {
				courseId: this.id,
			}
      this.$http.course.getCourseInfo({
				data,
        success: (data) => {
          Object.keys(data)
          if (Object.keys(data)[0]) {
            this.detailInfo = data[Object.keys(data)[0]] ? data[Object.keys(data)[0]][0] : {}
          }
        },
      });
		},

    sendToStudent() {
      this.$toast('该功能开发中。。。')
    },

    buyVideo() {
      if (typeof WeixinJSBridge === 'undefined') {
        uni.showToast({
          title: "支付失败，请在微信浏览器中打开",
          icon: 'none',
          duration: 3000
        })
        return
      }

      const params = {
        courseId: this.detailInfo.id,
        price: String(this.detailInfo.coursePrice),
        dealPrice: String(this.detailInfo.coursePrice),
        recommendUserId: '',
        token: localM.get(LOCAL_KEY.TOKEN)
      }
      console.log('params', params)
      this.wxPay(params)
    },

    wxPay(data) {
      this.$http.course.payCourse({
        data: data,
        success: res => {
          //支付
          console.log('pay', res)
          try {
            WeixinJSBridge.invoke(
              "getBrandWCPayRequest",
              {
                appId: res.appId, //公众号名称，由商户传入
                timeStamp: res.timeStamp, //时间戳，自1970年以来的秒数
                nonceStr: res.nonceStr, //随机串
                package: res.packageValue,
                signType: res.signType, //微信签名方式：
                paySign: res.paySign //微信签名
              },
              function(res1) {
                console.log('res1', res1)
                if (res1.err_msg == "get_brand_wcpay_request:ok") {
                  this.getVideoById()
                  uni.showToast({
                    title: "支付成功",
                    duration: 3000
                  })
                }
                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              }
            );
          } catch (err) {
            this.$toast(JSON.stringify(err))
          }
        },
      });
    },
	},
};
</script>

<style lang="scss" scoped>
.detail {
  padding-bottom: 120rpx;
  .video-content {
    width: 100%;
  }

  .tab {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f3f5;
    font-size: 32rpx;

    .tab-item {
      position: relative;
      width: 200rpx;
      height: 90rpx;
      line-height: 90rpx;
      text-align: center;
    }

    .active::after {
      position: absolute;
      content: "";
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80rpx;
      height: 5rpx;
      background: #22c359;
    }
  }

  .intro {
    padding: 15rpx 20rpx;
    font-size: 32rpx;

    .intro-title {
      font-size: 36rpx;
    }

    .video-list {
      font-size: 28rpx;
      color: #1a40e1;

      .list-item {
        margin-top: 20rpx;
      }
    }

    .view-desc {
      margin-top: 30rpx;
      font-size: 28rpx;

      .desc-title {
        font-size: 32rpx;
        margin-bottom: 15rpx;
      }

      .desc-num {
        color: #363636;
        font-size: 28rpx;
      }

      .desc-price {
        font-size: 36rpx;
        color: #fd8e0b;
        margin-top: 20rpx;

        .desc-symbol {
          font-size: 24rpx;
        }

        .desc-tip {
          font-size: 28rpx;
          margin-left: 30rpx;
          color: #656565;
        }
      }
    }

    .other-class {
      margin-top: 25rpx;
      font-size: 32rpx;

      .other-class-item {
        margin-top: 15rpx;
        color: #22c359;
        font-size: 28rpx;
      }
    }

    .intro-desc {
      margin-top: 30rpx;
      font-size: 28rpx;
    }
  }

  .line {
    font-size: 28rpx;

    .line-item {
      width: 100%;
      height: 80rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20rpx;
      box-sizing: border-box;
      border-bottom: 2rpx solid #f5f6f8;
    }
  }

	.buy-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		background: #fd8e0b;
		font-size: 34rpx;
		color: #fff;
		text-align: center;
	}
}
</style>