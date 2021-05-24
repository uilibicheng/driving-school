<template>
  <view class="header" @click="goToSelect">
    <view class="search-wrap">
      <view class="btn-icon">{{areaData.territoryName}}</view>
      <view class="line"></view>
      <image class="search-icon" src="@/static/home/icon-search.png">
      <input class="search-bar" type="text" placeholder="城市/考场" />
    </view>
  </view>
</template>

<script>
import localM from "@/utils/common/local";
import { LOCAL_KEY } from "@/config/constants";

export default {
  props: {
    areaData: {
      type: Object,
      default: {}
    }
  },

  methods: {
    goToSelect() {
      uni.navigateTo({
        url: "/pages/selectArea/index",
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
    width: 150rpx;
    padding-left: 10rpx;
    text-align: center;
    color: #666;
    font-size: 28rpx;
    overflow: hidden;
    text-overflow: ellipsis;

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