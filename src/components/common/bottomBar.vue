<template>
  <view class="bottom-bar">
    <view class="bottom-bar-wrap">
      <view :class="['bottom-bar-item', {'bar-item': !isShow}]" @click="click('home')">
        <view class="bottom-bar-icon bar-icon-home" :class="{active: activeType === 'home'}"></view>
        <view class="bottom-bar-text" :class="{active: activeType === 'home'}">首页</view>
      </view>
      <view class="bottom-bar-item" @click="click('tool')" v-if="isShow">
        <view class="bottom-bar-icon bar-icon-tool" :class="{active: activeType === 'tool'}"></view>
        <view class="bottom-bar-text" :class="{active: activeType === 'tool'}">教练工具</view>
      </view>
      <view class="bottom-bar-item" @click="click('pertol')" v-if="isShow">
        <view class="bottom-bar-icon bar-icon-pertol" :class="{active: activeType === 'pertol'}"></view>
        <view class="bottom-bar-text" :class="{active: activeType === 'pertol'}">加油站</view>
      </view>
      <view :class="['bottom-bar-item', {'bar-item': !isShow}]" @click="click('user')">
        <view class="bottom-bar-icon bar-icon-user" :class="{active: activeType === 'user'}" ></view>
        <view class="bottom-bar-text" :class="{active: activeType === 'user'}">个人中心</view>
      </view>
    </view>
  </view>
</template>

<script>
import localM from '@/utils/common/local'
import {LOCAL_KEY} from '@/config/constants'

export default {
  name: 'BottomBar',
  props: {
    activeType: String
  },
  data() {
    return {
      isShow: false
    }
  },
  created() {
    let user = localM.get(LOCAL_KEY.USER)
    this.isShow = user.roleCode
  },
  methods: {
    click(type) {
      switch (type) {
        case 'home':
          uni.redirectTo({
            url: '/',
          })
          break
        case 'tool':
          uni.redirectTo({
            url: '/pages/driverTool/index',
          })
          break
        case 'pertol':
          uni.redirectTo({
            url: '/pages/pertolStation/index',
          })
          break
        case 'user':
          uni.redirectTo({
            url: '/pages/mine/index',
          })
          break
        default:
          uni.redirectTo({
            url: '/',
          })
      }
    }
  },
}
</script>

<style scoped lang="scss">
.bottom-bar {
  .bottom-bar-wrap {
    z-index: 9999;
    overflow: hidden;
    position: fixed;
		bottom: 0;
		left: 0;
    width: 100%;
    box-sizing:border-box;
		padding: 15rpx 15rpx 13rpx;
    border-top: 1rpx solid rgba(153, 153, 153, 0.2);
    background: white;
  }
  .bottom-bar-item {
    position: relative;
    display: inline-block;
		width: 25%;
    text-align: center;
    &.bar-item {
      width: 50%
    }
    .bottom-bar-icon {
      display: inline-block;
			width: 40rpx;
			height: 40rpx;
      background-size: 100% 100%;
      &.bar-icon-home {
        background-image: url("../../static/home_unseleted.png");
				&.active {
          background-image: url("../../static/home_seleted.png");
        }
      }
      &.bar-icon-tool {
        background-image: url("../../static/tool_unselected.png");
				&.active {
          background-image: url("../../static/tool_selected.png");
        }
      }
      &.bar-icon-pertol {
        background-image: url("../../static/pertol_unselected.png");
				&.active {
          background-image: url("../../static/pertol_selected.png");
        }
      }
			&.bar-icon-user {
        background-image: url("../../static/mine_unselected.png");
				&.active {
          background-image: url("../../static/mine_selected.png");
        }
      }
    }
    .bottom-bar-text {
      margin-top: 2rpx;
      font-size: 22rpx;
      color: #333;
    }
  }
}
</style>
