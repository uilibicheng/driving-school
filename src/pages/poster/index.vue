<template>
  <view class="index">
    <Painter
      v-if="!isLoading"
      isRenderImage
      :board="posterData"
      @success="success"
      @fail="fail" />
    <view class="image-wrap" v-else>
      <image :style="{width: posterData.width, height: posterData.height}" :src="path" mode="scaleToFill" />
    </view>
  </view>
</template>

<script>
import Painter from '@/components/lime-painter'
import utils from '@/utils/common'

const POSTER_DATA = {
  INVITE_COACH: {
    width: '750rpx',
    height: '1330rpx',
    views: [
      {
        type: 'image',
        src: '../../static/poster/caoach_bg.jpg',
        css: {
          left: '0rpx',
          top: '0rpx',
          width: '750rpx',
          height: '1330rpx',
          zIndex: 100
        }
      },
      {
        type: 'qrcode',
        text: utils.getInviteUrl(),
        css: {
          left: '185rpx',
          top: '695rpx',
          width: '380rpx',
          height: '380rpx',
          zIndex: 1000
        }
      }
    ]
  },
  STUDENT: {
    width: '750rpx',
    height: '1330rpx',
    views: [
      {
        type: 'image',
        src: '../../static/poster/recruit-student.jpg',
        css: {
          left: '0rpx',
          top: '0rpx',
          width: '750rpx',
          height: '1280rpx',
          zIndex: 100
        }
      },
      {
        type: 'qrcode',
        text: utils.getInviteUrl(true),
        css: {
          left: '240rpx',
          top: '705rpx',
          width: '260rpx',
          height: '260rpx',
          zIndex: 1000
        }
      }
    ]
  }
}
export default {
  components: {
    Painter
	},

  data() {
    return {
      posterData: {},
      path: '',
      isLoading: false,
    }
  },

  onLoad(options) {
    if (options.type) {
      uni.showLoading({
        title: '海报加载中...'
      })
      this.posterData = POSTER_DATA[options.type]
    }
  },

  methods: {
    success(path) {
      this.path = path
      this.isLoading = true
      uni.hideLoading()
      this.$toast('长按图片保存海报')
    },
    fail() {
      uni.hideLoading()
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  .image-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .poster {
      width: 100%
    }
  }
}
</style>