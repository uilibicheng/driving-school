<template>
	<view class="content">
		<view class="left">
			<view class="left-item left-active-item">广东省</view>
			<view class="left-item" v-for="item in 20">广东省</view>
		</view>
		<view class="right">
			<view class="right-item" v-for="item in 25">
				<view class="right-item-top">粤A <view class="circle"></view></view>
				<view class="right-item-bottom">广州市</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {

		},

		onNavigationBarSearchInputChanged(value) {
			console.log(1111, value)
		}
	}
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	background: #F9F9F9;
	height: calc(100vh - 50px);
	font-size: 32rpx;

	.left {
		width: 260rpx;
		background: #ECECEC;
		padding-top: 5rpx;
		height: 100%;
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
				content: '';
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
		background: #F9F9F9;
		height: 100%;
		overflow: auto;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.right-item {
			width: 130rpx;
			margin-top: 30rpx;

			.right-item-top  {
				width: 100%;
				height: 90rpx;
				background: #155cff;
				border-radius: 12rpx;
				color: #fff;
				font-size: 42rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.circle {
					width: 10rpx;
					height: 10rpx;
					border-radius: 5rpx;
					background: #fff;
					margin-left: 5rpx;
				}
			}

			.right-item-bottom {
				margin-top: 10rpx;
				font-size: 28rpx;
				text-align: center;
			}
		}
	}
}
</style>
