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
import { POSTER_DATA } from "@/config/constants";

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
    console.log('options', options)
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