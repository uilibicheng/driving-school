<template>
  <view class="mine">
    <view class="header">
      <view class="header-bg"></view>
      <view class="info">
        <view class="avatar">
          <image src="" />
        </view>
        <view class="nickname">bC</view>
        <view class="user-num">NO.344534534</view>
      </view>
    </view>

    <view class="content">
      <view class="item" @click="goToOrder">
        <view class="logo">
          <image src="../../static/order.png" />
        </view>我的订单
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {},
  onLoad() {
    this.getCurrentUser()
  },

  methods: {
    getCurrentUser() {
      this.$http.user.getCurrentUser({
        success: res => {
          console.log(111, res)
        }
      })
    },

    goToOrder() {
      uni.navigateTo({
        url: '/pages/mine/order'
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.mine {
  height: 100vh;

  .header {
    width: 100%;
    position: relative;

    .header-bg {
      position: absolute;
      top: 0;
      left: 50%;
      width: 1200rpx;
      height: 1200rpx;
      border-radius: 50%;
      background: linear-gradient(to right, #42deb9, #27c768);
      transform: translate(-50%, -75%);
      z-index: -1000;
    }

    .info {
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        width: 150rpx;
        height: 150rpx;
        border-radius: 75rpx;
        margin-top: 220rpx;

        image {
          width: 100%;
          height: 100%;
          border-radius: 75rpx;
          background: #fff;
        }
      }

      .nickname {
        margin-top: 10rpx;
      }

      .user-num {
        margin-top: 20rpx;
        color: #656565;
        font-size: 36rpx;
      }
    }
  }

  .content {
    margin-top: 80rpx;
    padding: 0 40rpx;

    .item {
      width: 100%;
      height: 110rpx;
      padding-left: 20rpx;
      line-height: 110rpx;
      background: #fff;
      font-weight: normal;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .logo {
        width: 70rpx;
        height: 70rpx;
        border-radius: 35rpx;
        background: #23c65b;
        margin-right: 30rpx;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
