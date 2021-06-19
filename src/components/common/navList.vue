<template>
  <view class="nav-list">
    <template v-for="item in navItems">
      <template>
        <view :class="['nav-item', item.className]" :key="item.id" v-if="item.isShow" @click="handleClick(item.id)">
          <image :src="item.icon" />
          <view class="nav-item-right">
            <view class="right-title">{{item.title}}</view>
            <view class="right-sub">{{item.sub}}</view>
          </view>
          <view class="launch-app" v-if="item.id === 3 || item.id === 6">
            <wx-open-launch-weapp :username="username" path="/pages/index/index.html">
              <script type="text/wxtag-template">
                <view></view>
              </script>
            </wx-open-launch-weapp>
          </view>
        </view>
      </template>
    </template>
  </view>
</template>

<script>
import localM from "@/utils/common/local";
import { LOCAL_KEY, ROLE_CODE } from "@/config/constants";

const userInfo = localM.get(LOCAL_KEY.USER)
export default {
  data() {
    return {
      navItems: [
        {
          id: 1,
          icon: require("@/static/home/invite-coach.png"),
          title: "邀请教练",
          sub: 'Invitation',
          className: 'invitation',
          isShow: userInfo.roleCode === ROLE_CODE.ONE_LEVEL_PROXY
        },
        {
          id: 2,
          icon: require("@/static/home/icon-watch.png"),
          title: "学员观看",
          sub: 'Watch',
          className: 'watch',
          isShow: !!userInfo.roleCode
        },
        {
          id: 3,
          icon: require("@/static/home/icon-tool.png"),
          title: "学车工具",
          sub: 'Instructor',
          className: 'instructor',
          isShow: !!userInfo.roleCode
        },
        {
          id: 4,
          icon: require("@/static/home/icon-free.png"),
          title: "申请免费",
          sub: '观看',
          className: 'free',
          isShow: true
        },
        {
          id: 5,
          icon: require("@/static/home/icon-route.png"),
          title: "线路图",
          sub: '下载',
          className: 'map',
          isShow: true
        },
        {
          id: 6,
          icon: require("@/static/home/icon-photo.png"),
          title: "回执拍照",
          sub: 'Shot',
          className: 'photo',
          isShow: true
        }
      ],
      userInfo: {},
      username: ''
    }
  },

  mounted() {
    this.getMiniPhotoPath()
  },

  methods: {
    handleClick(id) {
      switch(id) {
        case 1:
          uni.navigateTo({
            url: `/pages/poster/index?type=INVITE_COACH`
          })
          break
        case 2:
          uni.navigateTo({
            url: `/pages/poster/index?type=STUDENT`
          })
          break
        case 3:
          break
        case 5:
          uni.navigateTo({
            url: `/pages/mapList/index`
          })
          break
        case 6:
          break
        default:
          this.$toast('该功能正在火速开发中...')
      }
    },

    getMiniPhotoPath() {
      const data = {
        photoUrl: window.location.href
      }
      this.$http.user.getMiniPhotoPath({
        data,
        success: res => {
          console.log('res', res)
          console.log('wx', jWeixin)
          this.username = res.username
          jWeixin.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
            appId: res.config.appId, // 必填，公众号的唯一标识
            timestamp: res.config.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.config.nonceStr, // 必填，生成签名的随机串
            signature: res.config.signature,// 必填，签名
            jsApiList: ['chooseImage'], // 必填，需要使用的JS接口列表
            openTagList: ['wx-open-launch-weapp'] // 可选，需要使用的开放标签列表，例如['wx-open-launch-app']
          });
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-list {
  margin-top: 30rpx;
  padding: 0 20rpx;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  .nav-item {
    width: 220rpx;
    height: 110rpx;
    background: #fff;
    border-radius: 10rpx;
    display: flex;
    align-items: center;
    margin-bottom: 24rpx;
    margin-right: 20rpx;
    padding-left: 20rpx;
    box-sizing: border-box;
    font-size: 24rpx;
    color: #fff;
    position: relative;
    .launch-app {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 999;
      opacity: 0;
    }
    image {
      width: 50rpx;
      height: 70rpx;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
    &.invitation {
      background: linear-gradient(-40deg, #4A77FD, #255BFF);
    }
    &.watch {
      background: linear-gradient(128deg, #FFBD23, #FFBA00);
    }
    &.instructor {
      background: linear-gradient(128deg, #01D3B1, #03CDB4);
      image {
        width: 60rpx;
        height: 60rpx;
      }
    }
    &.free {
      background: linear-gradient(128deg, #FC763D, #FE6E48);
      image {
        width: 60rpx;
        height: 50rpx;
      }
    }
    &.map {
      background: linear-gradient(128deg, #9F70FD, #B96FFE);
      image {
        width: 66rpx;
        height: 54rpx;
      }
    }
    &.photo {
      background: linear-gradient(128deg, #F775FF, #FD4ECA);
      image {
        width: 60rpx;
        height: 50rpx;
      }
    }
    .nav-item-right {
      margin-left: 20rpx;
      .right-sub {
        margin-top: 5rpx;
        font-size: 16rpx;
        opacity: .5;
      }
    }
  }
}
</style>