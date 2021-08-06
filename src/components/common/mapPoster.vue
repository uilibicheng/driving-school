<template>
  <view class="big-img-content" v-if="visible">
    <view class="mask" @click="close"></view>
    <Painter
      v-if="!isLoading"
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
    visible: {
      type: Boolean,
      default: false
    }
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
            src: '../../static/map3.jpg',
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
                text: '叶建林 JSON\n联系电话：13554820201',
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
                text: '本人有多年的驾驶经验,是业界的资深教练，教学态度端正，驾驶技术精湛，对学员认真负责，欢迎各位学员找我学',
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
                text: '欢迎',
                css: {
                  position: 'absolute',
                  left: '230rpx',
                  top: '60rpx',
                  width: '70rpx',
                  height: '70rpx',
                }
              }
            ]
          },
        ]
      },
      src: '',
      isLoading: false,
    }
  },

  mounted() {
    uni.showLoading({
      title: '加载中...'
    })
  },

  methods: {
    success(path) {
      this.src = path
      this.isLoading = true
      uni.hideLoading()
      this.$toast('长按图片保存到相册')
    },
    fail() {
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