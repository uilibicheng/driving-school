<template>
  <view class="big-img-content" v-if="visible">
    <view class="mask" @click="close"></view>
    <view v-if="!isDraw">
      <view class="img-wrap">
        <image
          :src="path"
          mode="aspectFit"
        />
        <view class="img-tip">长按图片保存到相册</view>
      </view>
    </view>
    <view v-else>
      <Painter
        v-if="isLoading"
        isRenderImage
        :board="posterData"
        @success="success"
        @fail="fail" />
      <view class="img-wrap" v-else>
        <image
          :src="src"
          mode="aspectFit"
        />
        <view class="img-tip">长按图片保存到相册</view>
      </view>
    </view>
  </view>
</template>

<script>
import Painter from '@/components/lime-painter'

export default {
  components: {
    Painter
	},
  props: {
    path: {
      type: String,
      default: ''
    },
    courseId: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    isDraw: {
      type: Boolean,
      default: true
    },
    userInfo: {
      type: Object,
      default: {}
    },
  },

  data() {
    return {
      posterData: {
        position: 'absolute',
        height: '750rpx',
        width: '910rpx',
        top: '0rpx',
        left: '0rpx',
        views: [
          {
            type: 'image',
            src: this.path,
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
                text: `${this.userInfo.nickName}\n联系电话：${this.userInfo.phone}`,
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
                text: this.userInfo.synopsis,
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
                text: `https://photo.h5.fxpjiakao.com/#/pages/videoDetail/index?id=${this.courseId}`,
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
                text: `掌上考场：${this.userInfo.nickName}\n联系电话：${this.userInfo.phone}`,
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
                text: `掌上考场：${this.userInfo.nickName}\n联系电话：${this.userInfo.phone}`,
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
      },
      src: '',
      isLoading: false,
    }
  },

  mounted() {
    if (this.isDraw) {
      this.isLoading = true
      uni.showLoading({
        title: '加载中...'
      })
    }
  },

  methods: {
    success(path) {
      this.src = path
      this.isLoading = false
      uni.hideLoading()
      this.$toast('长按图片保存到相册')
    },
    fail() {
      this.isLoading = false
      uni.hideLoading()
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.big-img-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
  }

  .img-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -45%);
    width: 100%;
    z-index: 1000;
    image {
      height: 750rpx;
      width: 910rpx;
      transform: rotate(90deg);
      margin-left: -80rpx;
    }
  }
  .img-tip {
    color: #fff;
    font-size: 32rpx;
    margin-top: 90rpx;
    text-align: center;
  }
}
</style>