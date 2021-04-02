<template>
  <view class="detail">
		<video class="video-content" />
		<view class="tab">
			<view class="tab-item active">简介</view>
			<view class="tab-item">线路图</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		},
		onLoad() {

		},
		methods: {},
	}
</script>

<style lang="scss" scoped>
.detail {
	.video-content {
		width: 100%;
	}

	.tab {
		width: 100%;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #f2f3f5;

		.tab-item {
			position: relative;
			width: 50%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
		}

		.active::after {
			position: absolute;
			content: '';
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 80rpx;
			height: 5rpx;
			background: #22c359;
		}
	}
}
</style>