<template>
  <view class="pertol">
    <view class="pertol-info">
      <view class="pertol-info-top">
        <image src="" />
        <view class="pertol-info-concat">
          <view>包小白</view>
          <view class="pertol-info-phone">123****2345</view>
        </view>
        <view class="pertol-message active">
          <image src="@/static/pertol/message.png" />
        </view>
      </view>
      <view class="pertol-info-bottom">
        <view class="bottom-item">
          <view>今日收益</view>
          <view class="bottom-item-price">
            <text class="yuan">￥</text>
            100
          </view>
        </view>
        <view class="bottom-item">
          <view>累计收益</view>
          <view class="bottom-item-price">
            <text class="yuan">￥</text>
            10000.00
          </view>
        </view>
        <view class="bottom-item">
          <view>累计提现</view>
          <view class="bottom-item-price">
            <text class="yuan">￥</text>
            10087987
          </view>
        </view>
      </view>
    </view>

    <view class="income-wrap">
      <view class="income-item">
        <view>直接推广订单</view>
        <view class="item-num">121241</view>
      </view>
      <view class="income-item">
        <view>下级推广订单</view>
        <view class="item-num">121241</view>
      </view>
      <view class="income-item">
        <view>下级代理</view>
        <view><text class="item-num">1000</text>人</view>
      </view>
    </view>

    <view class="content">
      <view class="list"></view>
      <view class="empty">
        <image src="@/static/pertol/empty-text.png" />
        暂无其他内容
      </view>
    </view>

    <bottomBar activeType="tool" />
  </view>
</template>

<script>
import bottomBar from '@/components/common/bottomBar'

export default {
  components: {
    bottomBar,
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.pertol {
  width: 100%;
  padding-bottom: 120rpx;

  .pertol-info {
    width: 100%;
    height: 380rpx;
    background: linear-gradient(-50deg, #3265FF 0%, #45B2FF 100%);
    box-shadow: 0 30rpx 45rpx 0 rgba(0, 132, 255, 0.4);
    border-radius: 0px 0px 0px 120rpx;
    .pertol-info-top {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 40rpx 35rpx 30rpx;
      padding-right: 0;
      box-sizing: border-box;
      image {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        background: #fff;
      }
      .pertol-info-concat {
        flex: 1 0 auto;
        font-size: 34rpx;
        color: #fff;
        margin-left: 35rpx;
        .pertol-info-phone {
          margin-top: 20rpx;
          opacity: .7;
          font-size: 28rpx;
        }
      }
      .pertol-message {
        margin-right: 45rpx;
        position: relative;
        &.active::after {
          content: '';
          width: 10rpx;
          height: 10rpx;
          border-radius: 50%;
          background: #FC5347;
          position: absolute;
          right: -5rpx;
          top: 5rpx;
        }
        image {
          width: 45rpx;
          height: 33rpx;
          border-radius: 0;
          background: transparent;
          background: transparent;
        }
      }
    }

    .pertol-info-bottom {
      width: 100%;
      /* padding: 0 40rpx; */
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      .bottom-item {
        flex: 1 0 33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        color: #EEEEEE;
        box-sizing: border-box;
        &:nth-child(-n+2)::after {
          content: '';
          position: absolute;
          top: 40rpx;
          right: 0;
          width: 1px;
          height: 35rpx;
          background: #62C4FF;
        }
        .bottom-item-price {
          margin-top: 20rpx;
          font-size: 36rpx;
          color: #fff;
          .yuan {
            font-size: 24rpx;
            opacity: .7;
          }
        }
      }
    }
  }

  .income-wrap {
    width: 100%;
    box-sizing: border-box;
    margin-top: 80rpx;
    display: flex;
    justify-content: space-between;
    padding: 0 20rpx;
    .income-item {
      width: 32%;
      height: 120rpx;
      border-radius: 10rpx;
      color: #fff;
      font-size: 30rpx;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .item-num {
        font-size: 42rpx;
      }

      &:nth-child(1) {
        background: linear-gradient(0deg, #02D08F, #3DF6D0);
      }
      &:nth-child(2) {
        background: linear-gradient(0deg, #FF9B2F, #FFD65B);
      }
      &:nth-child(3) {
        background: linear-gradient(0deg, #FF887C, #FC5346);
      }
    }
  }

  .content {
    .list {

    }

    .empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 150rpx;
      color: #666;
      font-size: 24rpx;
      image {
        width: 290rpx;
        height: 223rpx;
      }
    }
  }
}
</style>