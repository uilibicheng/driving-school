<template>
  <view class="tool">
    <view class="info-wrap">
      <view class="info-box">
        <view class="info-item">
          <image class="item-avatar" :src="userInfo.avatarUrl" />
          <view class="item-desc">
            <view class="item-concat">
              {{coachInfo.nickname}} <text class="info-phone">{{coachInfo.phone}}</text>
            </view>
            <view class="item-belong-wrap" v-if="coachInfo.affiliation">
              <view class="item-belong">
                <image src="@/static/tool/cart.png" />
                <view class="belong-name">
                  {{coachInfo.affiliation}}
                </view>
              </view>
            </view>
          </view>
          <view class="item-modify">
            修改内容
          </view>
        </view>
        <view class="info-item">
          <view class="item-title">练车地址</view>
          <view class="item-intro">{{coachInfo.address}}</view>
        </view>
        <view class="info-item">
          <view class="item-title">个人简介</view>
          <view class="item-intro">{{coachInfo.synopsis}}</view>
        </view>
        <view class="info-item">
          <view class="item-title">个性标签</view>
          <view class="item-intro">
            <view class="label-item" v-for="(item, index) in coachInfo.labelArrays" :key="index">{{item}}</view>
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
        <image src="@/static/tool/add-course.png" />
        <view>课程管理</view>
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

    <swiper v-if="bannerList.length" style="width:100%;height:400rpx" indicator-color="#FFF" indicator-active-color="#9391FD" indicator-dots="true"
		 autoplay="true" interval="4000" circular="true">
			<swiper-item v-for="(banner,index) in bannerList" :key="index">
				<view>
					<image :src="banner.advertisingUrl" mode="aspectFill" style="width: 100%;height:400rpx"></image>
				</view>
			</swiper-item>
		</swiper>

    <bottomBar activeType="tool" />
  </view>
</template>

<script>
import bottomBar from '@/components/common/bottomBar'
import localM from '@/utils/common/local'
import {LOCAL_KEY} from '@/config/constants'

export default {
  components: {
    bottomBar,
  },
  data() {
    return {
      bannerList: [],
      coachInfo: {},
      userInfo: {}
    }
  },

  onLoad() {
    this.userInfo = localM.get(LOCAL_KEY.USER) || {}
    this.getCoachInfo()
    this.getAdList()
  },

  methods: {
    getCoachInfo() {
      const data = {
        userId: this.userInfo.id || '',
        userName: this.userInfo.nickName || '',
      }
      this.$http.user.getCoachInfo({
        data,
        success: res => {
          console.log('res', res)
          this.coachInfo = res
        }
      })
    },

    getAdList() {
      this.$http.data.getAdList({
        success: res => {
          console.log('res', res)
          this.bannerList = res
        }
      })
    },

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
          display: flex;
          flex-direction: column;
          max-width: 350rpx;
          position: relative;
          .item-concat {
            flex-grow: 0;
            font-size: 34rpx;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            .info-phone {
              color: #fff;
              opacity: .8;
              font-size: 28rpx;
              margin-left: 20rpx;
            }
          }
          .item-belong-wrap {
            flex-grow: 0;
            flex-shrink: 1;
            position: absolute;
            top: 45rpx;
            .item-belong {
              min-width: 100rpx;
              max-width: 350rpx;
              width: auto;
              height: 45rpx;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 020rpx;
              margin-top: 22rpx;
              box-sizing: border-box;
              border: 1px solid #E3E3E3;
              border-radius: 18rpx;
              font-size: 22rpx;
              color: #fff;
              opacity: .7;
              image {
                flex-shrink: 0;
                width: 26rpx;
                height: 21rpx;
                margin-right: 10rpx;
                margin-top: 2rpx;
                background: transparent;
                opacity: 1;
              }
              .belong-name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
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