<template>
  <view class="big-img-content" v-if="visible">
    <view class="mask" @click="close"></view>
    <view class="img-wrap">
      <image
        :src="path"
        mode="aspectFit"
      />
      <view class="img-tip">长按图片保存到相册</view>
    </view>
  </view>
</template>

<script>
export default {
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

  mounted() {
    console.log(1111, this.path)
  },

  methods: {
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.big-img-content {
  position: absolute;
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
    top: 40%;
    transform: translateY(-50%);
    width: 100%;
    z-index: 1000;
  }
  image {
    width: 100%;
    // background: #000;
  }
  .img-tip {
    color: #fff;
    font-size: 32rpx;
    margin-top: 20rpx;
    text-align: center;
  }
}
</style>