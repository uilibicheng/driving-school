<template>
  <view class="detail">
    <view v-if="videoSrc" class="video-content">
      <Video
        ref="videoRef"
        :video-src="videoSrc"
        :poster-src="posterSrc"
        :id="currentVideoInfo.id"
        :can-play="hadBuy"
        :pay-status="!!(+detailInfo.payStatus)"
        :isFree="isFree"
        :freeTime="currentVideoInfo.freeTime" />
    </view>
    <view class="tab">
      <view :class="['tab-item', {active: tabIndex === 1}]" @click="switchTab(1)">简介</view>
      <view :class="['tab-item', {active: tabIndex === 4}]" @click="switchTab(4)" v-if="detailInfo.videoInfoVO && detailInfo.videoInfoVO.length > 1">目录</view>
      <view :class="['tab-item', {active: tabIndex === 2}]" @click="switchTab(2)">进度</view>
      <view :class="['tab-item', {active: tabIndex === 3}]" @click="switchTab(3)">线路图</view>
    </view>
    <!-- 简介 -->
    <view class="intro" v-if="tabIndex === 1">
      <view class="intro-title">{{detailInfo.courseName}}</view>
      <view class="intro-desc">{{detailInfo.courseIntro}}</view>
      <!-- <view class="video-list">
        <view class="list-item" v-for="item in 3">河源铺前科三2号线（自动挡）最新</view>
      </view> -->
      <view class="view-desc">
        <!-- <view class="desc-title">{{detailInfo.courseIntro}}</view> -->
        <view class="desc-num">{{currentVideoInfo ? currentVideoInfo.videoPlayCount : 0}}次播放</view>
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
    <!-- 目录 -->
    <view class="intro" v-if="tabIndex === 4">
      <view class="schedule" v-if="detailInfo.videoInfoVO && detailInfo.videoInfoVO.length">
        <view
          class="schedule-item"
          v-for="(item, index) in detailInfo.videoInfoVO"
          @click="switchVideo(item)"
          :key="index">
          <view :class="['item-name', 'catalog-name', {'catalog-name-active' : item.id === currentVideoInfo.id}]">{{item.videoName}}</view>
        </view>
      </view>
    </view>
    <!-- 进度 -->
    <view class="intro" v-if="tabIndex === 2">
      <view class="schedule" v-if="currentVideoInfo && currentVideoInfo.scheduleInfoVOList.length">
        <view
          class="schedule-item"
          v-for="(item, index) in currentVideoInfo.scheduleInfoVOList"
          @click="skep(item.scheduleTime)"
          :key="index">
          <image :src="item.scheduleUrl" mode="aspectFit" />
          <view class="item-name">{{item.scheduleName}}</view>
        </view>
      </view>
    </view>
    <!-- 线路图 -->
    <view class="intro" v-if="tabIndex === 3">
      <view class="map" v-if="detailInfo.mapInfoVO">
        <image :src="srcPath" mode="widthFit" @click="downloadMap" />
      </view>
      <view class="buy-btn" @click="downloadMap">点击查看大图</view>
    </view>
		<view class="buy-btn copy-btn" v-if="userInfo.roleCode">发给学员</view>
		<view class="buy-btn" v-else-if="!(detailInfo && +detailInfo.payStatus)" @click="buyVideo">点击购买课程</view>

    <MapPoster v-if="visible" :path="srcPath" :visible.sync="visible" :isDraw="false" :userInfo="mapUser" />
    <Painter
      v-if="isDrawLoading"
      isRenderImage
      :board="posterData"
      @success="successDraw"
       @fail="failDraw" />
  </view>
</template>

<script>
import MapPoster from '@/components/common/mapPoster'
import Video from '@/components/common/video'
import localM from '@/utils/common/local'
import constants, {LOCAL_KEY} from '@/config/constants'
import utils from '@/utils/common'
import Clipboard from 'clipboard'
import Painter from '@/components/lime-painter'

export default {
  components: {
    MapPoster,
    Video,
    Painter
  },

	data() {
		return {
			detailInfo: {},
      id: '',
      userInfo: {},
      tabIndex: 1, 
      visible: false,
      srcPath: '',
      isFullscreen: false,
      currentVideoInfo: {},
      currentVideoId: '',
      videoSrc: '',
      posterSrc: '',
      isFree: false,
      mapUser: {},
      isDrawLoading: false,
      posterData: {}
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
            this.currentVideoInfo = this.currentVideoId ? this.detailInfo.videoInfoVO && this.detailInfo.videoInfoVO.find(item => {
              return item.id === this.currentVideoId
            }) : this.detailInfo.videoInfoVO[0]
            this.videoSrc = this.currentVideoInfo.videoUrl
            this.posterSrc = this.currentVideoInfo.videoThumbUrl
          } else {
            uni.redirectTo({
              url: '/pages/index/index'
            })
          }
        },
      });
		},

    switchTab(index) {
      if (index !== 1) {
        if (!this.hadBuy()) return
      }
      if (index === 3) {
        this.drawMapImage()
      }
      this.tabIndex = index
    },

    // 绘画
    drawMapImage() {
      if (this.srcPath) return
      const currentMapInfo = this.detailInfo.mapInfoVO && this.detailInfo.mapInfoVO.find(item => {
        return item.courseId === this.id
      })
      this.posterData = {
        position: 'absolute',
        height: '750rpx',
        width: '910rpx',
        top: '0rpx',
        left: '0rpx',
        views: [
          {
            type: 'image',
            src: currentMapInfo ? currentMapInfo.mapUrl : '',
            css: {
              position: 'absolute',
              left: '0',
              top: '0',
              height: '750rpx',
              width: '910rpx',
              objectFit: 'contain'
            }
          },
          {
            type: 'view',
            css: {
              position: 'absolute',
              left: '0rpx',
              top: '0rpx',
              width: '310rpx',
              height: '140rpx',
              background: '#fff',
            },
            views: [
              {
                type: 'text',
                text: `${this.mapUser.nickName}\n联系电话：${this.mapUser.phone}`,
                css: {
                  left: '10rpx',
                  top: '10rpx',
                  width: '220rpx',
                  height: '40rpx',
                  color: 'blue',
                  fontSize: '12rpx',
                  position: 'absolute',
                }
              },
              {
                type: 'text',
                text: this.mapUser.synopsis,
                css: {
                  left: '10rpx',
                  top: '46rpx',
                  width: '210rpx',
                  height: '80rpx',
                  color: 'black',
                  fontSize: '12rpx',
                }
              },
              {
                type: 'text',
                text: '扫二维码，观看高清实景视频',
                css: {
                  left: '10rpx',
                  top: '110rpx',
                  width: '160rpx',
                  height: '100rpx',
                  color: 'red',
                  fontSize: '12rpx',
                }
              },
              {
                type: 'qrcode',
                text: `https://photo.h5.fxpjiakao.com/#/pages/videoDetail/index?id=${this.id}`,
                css: {
                  position: 'absolute',
                  left: '230rpx',
                  top: '60rpx',
                  width: '70rpx',
                  height: '70rpx',
                }
              },
              {
                type: 'text',
                text: `掌上考场：${this.mapUser.nickName}\n联系电话：${this.mapUser.phone}`,
                css: {
                  left: '460rpx',
                  top: '100rpx',
                  width: '400rpx',
                  height: '100rpx',
                  fontSize: '32rpx',
                  position: 'absolute',
                  color: '#bd1f0b',
                  fontWeight: 'bold',
                  opacity: '0.1',
                  zIndex: '-1000'
                }
              },
              {
                type: 'text',
                text: `掌上考场：${this.mapUser.nickName}\n联系电话：${this.mapUser.phone}`,
                css: {
                  left: '160rpx',
                  top: '620rpx',
                  width: '400rpx',
                  height: '100rpx',
                  fontSize: '32rpx',
                  position: 'absolute',
                  color: '#bd1f0b',
                  fontWeight: 'bold',
                  opacity: '0.1',
                  zIndex: '-1000'
                }
              },
            ]
          },
        ]
      }
      this.isDrawLoading = true
      uni.showLoading({
        title: '加载中...'
      })
    },

    successDraw(path) {
      this.srcPath = path
      this.isDrawLoading = false
      uni.hideLoading()
    },

    failDraw() {
      this.isDrawLoading = false
      uni.hideLoading()
    },

    // 目录切换
    switchVideo(data) {
      if (this.currentVideoInfo.id === data.id) return
      this.currentVideoInfo = data
      this.videoSrc = data.videoUrl
      this.posterSrc = data.videoThumbUrl

      let player = this.$refs['videoRef'].player
      player.reset() // 重置为它们的默认值
      player.src({
        src: data.videoUrl,
        type: 'video/mp4',
      })
      player.posterImage.setSrc(data.videoThumbUrl)
      player.load(data.videoUrl)
    },

    // 学员端功能
    playVideo() {
      if (!this.hadBuy()) return
      // 视频点击播放增加播放量
      this.$http.course.incrementPlayVideo({
				data: {
          id: this.currentVideoInfo.id,
        }
      });
    },

    // 视频加载
    completeLoad() {
      uni.hideLoading();
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

    // 控制进度
    skep(position) {
      if (position) {
        let player = this.$refs['videoRef'].player
        player.currentTime(position)
      }
    },

    // 下载线路图
    downloadMap() {
      this.visible = true
      // 视频点击播放增加播放量
      this.$http.course.incrementDownloadMap({
				data: {
          id: this.detailInfo.mapInfoVO.id,
        }
      });
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

  beforeDestroy() {
    this.videoSrc = ''
    this.$refs['videoRef'].player.dispose()
  }
};
</script>

<style lang="scss" scoped>
.detail {
  padding-bottom: 120rpx;
  .video-content {
    width: 100%;
  }

  .fullscreen-video-content {
    width: 100vh;
    height: 100vw;
    transform: rotate(-90deg);
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