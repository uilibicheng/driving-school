<template>
  <view class="tool">
    <view class="info-wrap">
      <view class="info-box">
        <view class="info-item">
          <image class="item-avatar" src="" />
          <view class="item-desc">
            <view class="item-concat">
              宝小白 <text class="info-phone">123123123123</text>
            </view>
            <view class="item-belong">
              <image src="" />所属驾校
            </view>
          </view>
          <view class="item-modify">
            修改内容
          </view>
        </view>
        <view class="info-item">
          <view class="item-title">练车地址</view>
          <view class="item-intro">龙华区xx街道</view>
        </view>
        <view class="info-item">
          <view class="item-title">个人简介</view>
          <view class="item-intro">本人有多年的驾驶经验，是业界的资深教练，教学态度端正，驾驶技术精湛,</view>
        </view>
        <view class="info-item">
          <view class="item-title">个性标签</view>
          <view class="item-intro">
            <view class="label-item" v-for="(item, index) in labelList" :key="index">{{item}}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="divider"></view>
    
    <view class="tool-box">
      <view class="tool-item">
        <image src="@/static/tool/poster.png" />
        <view>招生海报</view>
      </view>
      <view class="tool-item" @click="handleAddCourse">
        <image src="@/static/tool/poster.png" />
        <view>添加课程</view>
      </view>
      <view class="tool-item">
        <image src="@/static/tool/name-card.png" />
        <view>我的名片</view>
      </view>
      <view class="tool-item">
        <image src="@/static/tool/introduction.png" />
        <view>个人简介</view>
      </view>
    </view>

    <view class="divider"></view>

    <swiper style="width:100%;height:160rpx" indicator-color="#FFF" indicator-active-color="#9391FD" indicator-dots="true"
		 autoplay="true" interval="4000" circular="true">
			<swiper-item v-for="(banner,index) in bannerList" :key="index">
				<view>
					<image src="@/static/tool/banner.png" style="width:300rpx;height:160rpx"></image>
				</view>
			</swiper-item>
		</swiper>

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
      labelList: ['脾气好', '合格率高', '拿证快', '效率高'],
      bannerList: [{url: '342343'}, {url: '232525'}]
    }
  },

  methods: {
    handleAddCourse() {
      uni.navigateTo({
        url: "/pages/selectArea/index?type=addCourse",
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tool {
  width: 100%;
  padding-bottom: 120rpx;

  .info-wrap {
    width: 100%;
    padding: 20rpx 20rpx;
    box-sizing: border-box;
    .info-box {
      width: 100%;
      background: linear-gradient(-50deg, #3265FF 0%, #45B2FF 100%);
      border-radius: 10rpx;
      padding-left: 45rpx;
      padding-bottom: 40rpx;
      box-sizing: border-box;
      .info-item {
        padding-top: 30rpx;
        display: flex;
        position: relative;
        color: #fff;
        image {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
          background: #fff;
        }
        .item-desc {
          margin-left: 15rpx;
          .item-concat {
            font-size: 34rpx;
            color: #fff;
            .info-phone {
              color: #fff;
              opacity: .8;
              font-size: 28rpx;
              margin-left: 20rpx;
            }
          }
          .item-belong {
            width: 170rpx;
            height: 35rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 22rpx;
            border: 1px solid #E3E3E3;
            border-radius: 18rpx;
            font-size: 22rpx;
            color: #fff;
            opacity: .7;
            image {
              width: 25rpx;
              height: 20rpx;
              margin-right: 5rpx;
            }
          }
        }
        .item-modify {
          position: absolute;
          right: 0;
          top: 50rpx;
          width: 160rpx;
          height: 65rpx;
          line-height: 65rpx;
          text-align: center;
          background: linear-gradient(90deg, #FFF26E, #FFD025);
          border-radius: 32rpx 0 0 32rpx;
          color: #CA9300;
          font-size: 24rpx;
        }

        .item-title {
          flex: 0 0 auto;
          font-size: 28rpx;
          margin-right: 35rpx;
        }
        .item-intro {
          width: 100%;
          padding-right: 60rpx;
          padding-top: 5rpx;
          font-size: 24rpx;
          font-weight: 300;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .label-item {
            height: 40rpx;
            line-height: 40rpx;
            padding: 0 30rpx;
            margin-bottom: 10rpx;
            text-align: center;
            border-radius: 20rpx;
            background: linear-gradient(0deg, #01D3B1, #03CDB4);
            font-size: 24rpx;
            color: #fff;
          }
        }
      }
    }
  }

  .divider {
    width: 740rpx;
    height: 15rpx;
    background: #F4F6FA;
    margin: 0 auto;
  }

  .tool-box {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .tool-item {
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 32rpx;
      color: #5E6677;
      padding: 40rpx 0;
      image {
        width: 52rpx;
        height: 48rpx;
        margin-bottom: 20rpx;
      }
    }
  }
}
</style>