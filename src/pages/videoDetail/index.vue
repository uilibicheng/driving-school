<template>
  <view class="detail">
    <video class="video-content" :src="detailInfo.videoUrl" />
    <view class="tab">
      <view class="tab-item active">简介</view>
      <!-- <view class="tab-item">线路图</view> -->
    </view>
    <view class="intro">
      <view class="intro-title">{{detailInfo.name}}</view>
      <!-- <view class="video-list">
        <view class="list-item" v-for="item in 3">河源铺前科三2号线（自动挡）最新</view>
      </view> -->
      <view class="view-desc">
        <!-- <view class="desc-title">本合集包括以上所有视频内容</view> -->
        <view class="desc-num">{{detailInfo.playNumber}}次播放</view>
        <view class="desc-price">
          <text class="desc-symbol">￥</text>{{detailInfo.price}}
          <text class="desc-tip">付款后永久有效</text>
        </view>
      </view>
      <!-- <view class="other-class">
        <view class="other-class-title">铺前科三考场其他相关路线，点击下面链接</view>
        <view class="other-class-item" v-for="item in 8">河源铺前科三2号线最新</view>
      </view> -->
      <!-- <view class="intro-desc">河源铺前科三考场，阿萨德咖啡机五色机房问了句法六维空间二分了我解放路卡玩具鳄六维空间额返利网科技返利网科技了外壳及来我家二弗兰克我</view> -->
    </view>
    <!-- <view class="line" v-if="false">
      <view class="line-item" v-for="item in 4">河源铺前2.3.5号线（自动挡）合集2021年新规</view>
    </view> -->
		<view class="buy-btn" v-if="!(detailInfo.map && detailInfo.map.isBuyed)">点击购买课程</view>
  </view>
</template>

<script>
export default {
	data() {
		return {
			detailInfo: {}
		}
	},

  onLoad(option) {
		if (option.id) {
			this.getVideoById(option.id)
		} else {
			uni.switchTab({
				url: '/pages/index/index'
			})
		}
	},

  methods: {
		getVideoById(id) {
			let data = {
				id,
			}
      this.$http.data.getVideoById({
				data,
        success: (res) => {
					console.log('res', res)
					this.detailInfo = res
        },
      });
		},
	},
};
</script>

<style lang="scss" scoped>
.detail {
  padding-bottom: 120rpx;
  .video-content {
    width: 100%;
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
        font-size: 32rpx;
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
      margin-top: 30rpx;
      font-size: 28rpx;
    }
  }

  .line {
    font-size: 28rpx;

    .line-item {
      width: 100%;
      height: 80rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20rpx;
      box-sizing: border-box;
      border-bottom: 2rpx solid #f5f6f8;
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