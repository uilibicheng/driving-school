<template>
  <view class="header">
    <view class="search-wrap">
      <view class="btn-icon" v-if="isSelect" @click="goToSelect">{{areaData.territoryName}}</view>
      <view class="line"></view>
      <image class="search-icon" src="@/static/home/icon-search.png">
      <input class="search-bar" type="text" placeholder="城市/考场" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    areaData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: '',
    },
    isSelect: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    goToSelect() {
      let url = '/pages/selectArea/index'
      if (this.type) {
        url = `${url}?type=${this.type}`
      }
      uni.navigateTo({
        url,
      })
    },
  },
  
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 20rpx 20rpx;
  width: 100%;
  box-sizing: border-box;

  .search-wrap {
    width: 100%;
    height: 80rpx;
    border: 1px solid #DFDFDF;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
  }

  .btn-icon {
    min-width: 150rpx;
    max-width: 200rpx;
    padding-left: 10rpx;
    // padding-right: 20px;
    box-sizing: border-box;
    text-align: center;
    color: #666;
    font-size: 28rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &::after {
      display: inline-block;
      font-family: unibtn;
      content: "\e601";
      margin-left: 2px;
      transform: rotate(-90deg) scale(0.8);
    }
  }
  .line {
    width: 1px;
    height: 30rpx;
    background: rgba(155, 155, 155, .4);
  }
  .search-icon {
    margin-left: 30rpx;
    width: 30rpx;
    height: 30rpx;
  }

  .search-bar {
    margin-left: 20rpx;
    flex: 1 0 auto;
    padding: 0;
    text-align: left;
    color: #999;
    font-size: 24rpx;
  }
}
</style>