<template>
  <view class="detail">
    <view class="video-content">
      <!-- 缩略图 -->
      <image class="content-thumb" :src="detailInfo.courseThumbUrl" mode="widthFix" />
    </view>
    <view class="tab">
      <view :class="['tab-item', {active: tabIndex === 1}]" @click="switchTab(1)">简介</view>
      <view :class="['tab-item', {active: tabIndex === 2}]" @click="switchTab(2)">目录</view>
    </view>
    <!-- 简介 -->
    <view class="intro" v-if="tabIndex === 1">
      <view class="intro-title">{{detailInfo.courseName}}</view>
      <view class="intro-desc">{{detailInfo.courseIntro}}</view>
      <view class="view-desc">
        <view class="desc-num">{{currentVideoInfo ? currentVideoInfo.videoPlayCount : 0}}次播放</view>
        <view class="desc-price">
          <text class="desc-symbol">￥</text>{{detailInfo.coursePrice}}
          <text class="desc-tip">付款后永久有效</text>
        </view>
      </view>
    </view>
    <!-- 目录 -->
    <view class="intro" v-if="tabIndex === 2">
      <view class="schedule" v-if="detailInfo.videoInfoVO && detailInfo.videoInfoVO.length">
        <view
          class="schedule-item"
          v-for="(item, index) in detailInfo.videoInfoVO"
          @click="jumpToDtail(item)"
          :key="index">
          <view :class="['item-name', 'catalog-name', {'catalog-name-active' : item.id === currentVideoInfo.id}]">{{item.videoName}}</view>
        </view>
      </view>
    </view>
		<view class="buy-btn copy-btn" v-if="userInfo.roleCode">发给学员</view>
		<view class="buy-btn" v-else-if="!(detailInfo && +detailInfo.payStatus)" @click="buyVideo">点击购买课程</view>
  </view>
</template>

<script>
import localM from '@/utils/common/local'
import constants, {LOCAL_KEY} from '@/config/constants'
import utils from '@/utils/common'
import Clipboard from 'clipboard'

export default {
  components: {},

	data() {
		return {
			detailInfo: {},
      id: '',
      userInfo: {},
      tabIndex: 1, 
      currentVideoInfo: {},
      currentVideoId: '',
      isFree: false,
		}
	},

  onLoad(option) {
    this.userInfo = localM.get(LOCAL_KEY.USER)
    this.currentVideoId = option.videoId || ''
		if (option.id) {
      this.id = option.id
      // this.getVideoById()
		} else {
      uni.redirectTo({
        url: '/pages/index/index'
			})
		}
    if (option.isFree) {
      this.isFree = option.isFree === '1'
    }
    if (this.userInfo.roleCode) {
      this.$nextTick(() => {
        var clipboard = new Clipboard('.copy-btn', {
          text: () => {
            return utils.getInviteUrl(true)
          }
        })
        clipboard.on('success', e => {
          this.$toast('复制成功，快把链接分享给学员吧')
        })
      })
    }
	},

  onShow() {
    if (this.id) {
      this.getVideoById()
    }
  },

  methods: {
		getVideoById() {
			let data = {
				courseId: this.id,
			}
      if (this.userInfo.pid) {
        data.parentId = this.userInfo.pid
      }
      this.$http.course.getCourseInfo({
				data,
        success: (data) => {
          const list = data.list
          this.mapUser = data.userInfo
          if (list && list[0]) {
            const infoList = list[0].courseInfoVOList
            this.detailInfo = infoList && infoList[0] ? infoList[0] : {}
            this.currentVideoInfo = this.currentVideoId ? this.detailInfo.videoInfoVO && this.detailInfo.videoInfoVO.filter(item => {
              return item.id === this.currentVideoId
            }) : this.detailInfo.videoInfoVO[0]
            console.log(111, this.currentVideoInfo)
          } else {
            uni.redirectTo({
              url: '/pages/index/index'
            })
          }
        },
      });
		},

    switchTab(index) {
      this.tabIndex = index
    },

    // 跳转视频详情
    jumpToDtail(data) {
      if (!this.hadBuy()) return
      uni.navigateTo({
        url: `/pages/videoDetail/index?id=${this.id}&videoId=${data.id}`,
      })
    },

    hadBuy() {
      if (this.userInfo.roleCode) return true
      if (this.isFree) return true
      if (!(this.detailInfo && +this.detailInfo.payStatus)) {
        this.$toast('需要购买该课程才能查看')
        return false
      }
      return true
    },

    buyVideo() {
      // 判断是否在微信
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        // ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
        jWeixin.miniProgram.getEnv(res => {
          // 支付参数
          const data = {
            courseId: this.detailInfo.id,
            price: String(this.detailInfo.coursePrice) || '',
            dealPrice: String(this.detailInfo.coursePrice) || '',
            recommendUserId: '',
          }
          if (res.miniprogram) {
            // 在小程序里
            data.userId = localM.get(LOCAL_KEY.USER).id
            let options = ''
            Object.keys(data).forEach(key => {
              options = options + `&${key}=${data[key]}`
            })
            jWeixin.miniProgram.redirectTo({
              url: `/pages/packageB/pages/queryZone/coursePay/coursePay?${options}`
            })
          } else {
            // 不在小程序里
            data.token = localM.get(LOCAL_KEY.TOKEN)
            data.appid = constants.APPID
            this.wxPay(data)
          }
        })
      }
    },

    wxPay(data) {
      if (typeof WeixinJSBridge === 'undefined') {
        uni.showToast({
          title: "支付失败，请在微信浏览器中打开",
          icon: 'none',
          duration: 3000
        })
        return
      }
      this.$http.course.payCourse({
        data,
        success: res => {
          //支付
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
                this.getVideoById()
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
        fail: err => {
          this.$toast(`获取支付失败${err}`)
        }
      });
    },
	},

  onPullDownRefresh() {
    window.location.reload();
  },
};
</script>

<style lang="scss" scoped>
.detail {
  padding-bottom: 120rpx;
  .video-content {
    width: 100%;

    .content-thumb {
      width: 100%;
    }
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
        font-size: 28rpx;
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
      margin-top: 15rpx;
      font-size: 28rpx;
    }
  }

  .schedule {
    font-size: 28rpx;

    .schedule-item {
      width: 100%;
      height: 100rpx;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 2rpx solid #f5f6f8;
      margin-bottom: 20rpx;
      image {
        flex-shrink: 0;
        width: 150rpx;
        height: 100rpx;
        margin-right: 15px;
        // background: #656565;
      }
      .item-name {
        flex-grow: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .catalog-name {
        color: #595959;
      }
      .catalog-name-active {
        color: #101010;
      }
    }
  }

  .map {
    image {
      width: 100%;
      /* height: 700rpx; */
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