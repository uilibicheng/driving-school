<template>
  <view class="bottom-bar">
    <view class="bottom-bar-wrap">
      <view class="bottom-bar-item" @click="click('home')">
        <view class="bottom-bar-icon bar-icon-home" :class="{active: activeType === 'home'}"></view>
        <view class="bottom-bar-text" :class="{active: activeType === 'home'}">首页</view>
      </view>
      <view class="bottom-bar-item" @click="click('tool')">
        <view class="bottom-bar-icon bar-icon-tool" :class="{active: activeType === 'tool'}"></view>
        <view class="bottom-bar-text" :class="{active: activeType === 'tool'}">学车工具</view>
      </view>
      <view class="bottom-bar-item" @click="click('pertol')">
        <view class="bottom-bar-icon bar-icon-pertol" :class="{active: activeType === 'pertol'}"></view>
        <view class="bottom-bar-text" :class="{active: activeType === 'pertol'}">加油站</view>
      </view>
      <view class="bottom-bar-item" @click="click('user')">
        <view class="bottom-bar-icon bar-icon-user" :class="{active: activeType === 'user'}" ></view>
        <view class="bottom-bar-text" :class="{active: activeType === 'user'}">个人中心</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'BottomBar',
  props: {
    activeType: String
  },
  methods: {
    click(type) {
      switch (type) {
        case 'home':
          uni.navigateTo({
            url: '/',
          })
          break
        case 'tool':
          uni.navigateTo({
            url: '/pages/driverTool/index',
          })
          break
        case 'pertol':
          uni.navigateTo({
            url: '/pages/pertolStation/index',
          })
          break
        case 'user':
          uni.navigateTo({
            url: '/pages/mine/index',
          })
          break
        default:
          uni.navigateTo({
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
