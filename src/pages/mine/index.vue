<template>
  <view class="mine">
    <view class="header">
      <view class="header-bg">
        <image src="@/static/user/setting.png" />
      </view>
      <view class="header-info-wrap">
        <view class="info-top">
          <image class="avatar" :src="user.avatarUrl" />
          <view>{{user.nickName}}</view>
        </view>
        <view class="info-bottom">
          <view class="tool-item" @click="handleToCoach" v-if="user.roleCode">
            <image src="@/static/user/coach.png" />
            教练工具
          </view>
          <view class="tool-item" @click="goToOrder" v-else>
            <image src="@/static/user/order.png" />
            我的订单
          </view>
          <view class="tool-item" @click="handleToDrive">
            <image src="@/static/user/order.png" v-if="user.roleCode" />
            <image src="@/static/user/coach.png" v-if="!user.roleCode" />
            学车工具
            <view class="launch-app" v-if="!isMiniProgram">
              <wx-open-launch-weapp
                username="gh_e2e98df7fd1c"
                path="/pages/packageB/pages/queryZone/queryIndex/queryIndex.html">
                <script type="text/wxtag-template">
                  <style>.box{width: 100%; height: 100%}</style>
                  <div class="box">
                    <div>　　　</div><!-- 中间为占位符 -->
                    <div>　　　</div><!-- 中间为占位符 -->
                    <div>　　　</div><!-- 中间为占位符 -->
                  </div>
                </script>
              </wx-open-launch-weapp>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="function-wrap" v-if="user.roleCode">
      <view class="function-item" @click="handleClick(1)">
        <view class="item-left">
          <image class="video" src="@/static/user/video.png" />
          邀请学员观看
        </view>
        <image class="arrow" src="@/static/user/arrow.png" />
      </view>
      <view class="function-item" @click="handleClick(2)" v-if="isOneLevelProxy">
        <view class="item-left">
          <image class="invite" src="@/static/user/invite.png" />
          邀请代理
        </view>
        <image class="arrow" src="@/static/user/arrow.png" />
      </view>
      <view class="function-item" @click="openQRCode">
        <view class="item-left">
          <image class="cooperation" src="@/static/user/cooperation.png" />
          大客户合作
        </view>
        <image class="arrow" src="@/static/user/arrow.png" />
      </view>
    </view>

    <view class="function-wrap">
      <view class="function-item" @click="followOfficalAccount">
        <view class="item-left">
          <image class="concern" src="@/static/user/concern.png" />
          关注公众号
        </view>
      </view>
      <view class="function-item" @click="openQRCode">
        <view class="item-left">
          <image class="service" src="@/static/user/service.png" />
          联系客服
        </view>
      </view>
    </view>

    <BigImg v-if="visible" :path="imgUrl" :visible.sync="visible" />
    <bottomBar activeType="user" />
  </view>
</template>

<script>
import bottomBar from '@/components/common/bottomBar'
import BigImg from '@/components/common/bigImg'
import localM from '@/utils/common/local'
import {LOCAL_KEY, ROLE_CODE} from '@/config/constants'
import common from '@/utils/common'

const userInfo = localM.get(LOCAL_KEY.USER)
export default {
  components: {
    bottomBar,
    BigImg
  },
  data() {
    return {
      user: {},
      visible: false,
      imgUrl: '',
      isOneLevelProxy: userInfo && userInfo.roleCode === ROLE_CODE.ONE_LEVEL_PROXY,
      isMiniProgram: false,
    }
  },

  onLoad() {
    if (localM.get(LOCAL_KEY.USER) && localM.get(LOCAL_KEY.USER).id) {
      this.user = localM.get(LOCAL_KEY.USER)
      // 判断是否在微信
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        jWeixin.miniProgram.getEnv(res => {
          this.isMiniProgram = res.miniprogram
        })
      }
    } else {
      common.toManage("/pages/login/login")
    }
  },

  methods: {
    goToOrder() {
      uni.navigateTo({
        url: '/pages/mine/order'
      })
    },

    handleClick(id) {
      switch(id) {
        case 1:
          uni.navigateTo({
            url: `/pages/poster/index?type=STUDENT`
          })
          break
        case 2:
          uni.navigateTo({
            url: `/pages/poster/index?type=INVITE_COACH`
          })
          break
      }
    },
    handleToCoach() {
      uni.navigateTo({
        url: `/pages/driverTool/index`
      })
    },

    handleToDrive() {
      // 判断是否在微信
      if (this.isMiniProgram) {
        jWeixin.miniProgram.redirectTo({
          url: `/pages/packageB/pages/queryZone/queryIndex/queryIndex`
        })
      }
    },

    followOfficalAccount() {
      this.visible = true
      this.imgUrl = require('@/static/user/offical-accounts.jpg')
    },
  
    openQRCode() {
      this.visible = true
      this.imgUrl = require('@/static/user/service_customer.png')
    }
  }
};
</script>

<style lang="scss" scoped>
.mine {
  min-height: calc(100vh - 120rpx);
  /* min-height: 100vh; */
  padding-bottom: 120rpx;
  background: #F4F6FA;
  .header {
    width: 100%;
    height: 400rpx;
    position: relative;
    margin-bottom: 110rpx;

    .header-bg {
      width: 100%;
      height: 250rpx;
      background: linear-gradient(-23deg, #1481FF 0%, #4091FF 100%);
      position: relative;
      image {
        position: absolute;
        top: 40rpx;
        right: 32rpx;
        width: 43rpx;
        height: 41rpx;
      }
    }

    .header-info-wrap {
      position: absolute;
      top: 130rpx;
      left: 20rpx;
      width: 710rpx;
      height: 354rpx;
      background: #fff;
      border-radius: 10rpx;
      display: flex;
      .info-top {
        position: absolute;
        padding: 0 15rpx;
        left: 50%;
        top: 0;
        transform: translate(-50%, -30%);
        color: #666;
        font-size: 30rpx;
        text-align: center;
        image {
          width: 150rpx;
          height: 150rpx;
          border-radius: 50%;
          background: gray;
          margin-bottom: 15rpx;
        }
      }
      .info-bottom {
        width: 100%;
        margin: 183rpx 15rpx 0;
        border-top: 1px solid #F4F6FA;
        display: flex;
        align-items: center;
        .tool-item {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 28rpx;
          color: #6B7076;
          position: relative;
          image {
            width: 60rpx;
            height: 60rpx;
            margin-right: 30rpx;
          }
          .launch-app {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            z-index: 999;
            opacity: 0;
            wx-open-launch-weapp {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }

  .function-wrap {
    margin-top: 20rpx;
    width: 100%;
    background: #fff;
    padding: 0 40rpx;
    box-sizing: border-box;
    .function-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 100rpx;
      border-bottom: 1px solid #F4F6FA;
      font-size: 24rpx;
      .item-left {
        display: flex;
        align-items: center;
        image {
          margin-right: 30rpx;
        }
        .video {
          width: 34rpx;
          height: 28rpx;
        }
        .invite {
          width: 36rpx;
          height: 32rpx;
        }
        .cooperation {
          width: 38rpx;
          height: 30rpx;
        }
        .service {
          width: 36rpx;
          height: 38rpx;
        }
        .concern {
          width: 31rpx;
          height: 33rpx;
        }
      }
      .arrow {
        width: 17rpx;
        height: 20rpx;
        margin-right: 0;
      }
      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
