<template>
  <view class="content">
		<scroll-view class="left" scroll-y :scroll-with-animation="true" :scroll-into-view="scrollView">
			<view
				:class="['left-item', {'left-active-item': selectIndex === index}]"
				:id="'provice' + index"
				v-for="(provice, index) in list"
				:key="index"
				@click="selectProvice(index)">
				{{provice.territoryName}}
			</view>
		</scroll-view>
    <view class="right">
      <view class="right-list" v-if="list[selectIndex]">
				<view
					class="right-item"
					v-for="(item, index) in list[selectIndex].nextTerritory"
					:key="index"
					@click="selectArea(item, list[selectIndex].territoryName)">
					{{item.territoryName}}
				</view>
			</view>
    </view>
  </view>
</template>

<script>
import localM from '@/utils/common/local'
import {LOCAL_KEY} from '@/config/constants'

export default {
  data() {
    return {
			list: [],
			selectIndex: 0,
			scrollView: '',
			type: '',
		};
	},

  onLoad(options) {
		this.type = options.type
		this.getAllArea()
	},

  methods: {
		getAllArea() {
			this.$http.area.getAllArea({
				success: res => {
					this.list = res
					this.$nextTick(() => {
						this.selectProvice(19)
					})
				}
			})
		},

		selectProvice(index) {
			this.selectIndex = index
			this.scrollView = 'provice' + index
		},

		selectArea(data, provice) {
			if (this.type) {
				uni.redirectTo({
					url: `/pages/addCourse/index?city=${data.territoryName}&province=${provice}`
				})
			} else {
				localM.set(LOCAL_KEY.AREA, data)
				uni.redirectTo({
					url: '/pages/index/index'
				})
			}
		}
	},

  onNavigationBarSearchInputChanged(value) {},
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  background: #f9f9f9;
  height: calc(100vh - 50px);
  font-size: 32rpx;

  .left {
    width: 260rpx;
    background: #ececec;
    padding-top: 5rpx;
    height: calc(100vh - 50px);
    overflow: auto;

    .left-item {
      width: 100%;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
    }

    .left-active-item {
      background: #fff;
      position: relative;

      &::after {
        position: absolute;
        top: 20rpx;
        left: 0;
        content: "";
        width: 7rpx;
        height: 60rpx;
        border-radius: 3rpx;
        background: #22c359;
      }
    }
  }

  .right {
    width: 490rpx;
    padding: 0 30rpx;
    background: #f9f9f9;
    height: 100%;
    overflow: auto;

		.right-list {
			display: flex;
			flex-wrap: wrap;

			.right-item {
				width: 130rpx;
				margin-top: 30rpx;
				margin-right: 30rpx;
				height: 80rpx;
				background: #155cff;
				border-radius: 12rpx;
				color: #fff;
				font-size: 28rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
			}

			.right-item:nth-child(3n) {
				margin-right: 0;
			}
		}
  }
}
</style>
