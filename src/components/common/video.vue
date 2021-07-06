<template>
	<view class="video-wrap">
		<!-- uniapp这样使用的看的，但不是我想要的效果的，我要js来控制他 -->
		<view class="video-js" ref="video" style="width: 100%;height: 100%;"></view>
	</view>
</template>

<script>
	export default {
		props: {
			videoSrc: {
				type: String,
				default: ''
			},
			posterSrc: {
				type: String,
				default: ''
			},
			canPlay: {
				type: Function,
				default: () => {}
			},
		},
		data() {
			return {
				ons: false,
				player: null,
				isFirstPlay: false,
			}
		},
		mounted() {
			let video = document.createElement('video');
			video.id = 'video';
			video.style = 'width: 100%; height: 100%;';
			video.controls = true;
			video.setAttribute('playsinline', true) //IOS微信浏览器支持小窗内播放
			video.setAttribute('webkit-playsinline', true) //这个bai属性是ios 10中设置可以让视频在小du窗内播放，也就是不是全zhi屏播放的video标签的一个属性
			video.setAttribute('x5-video-player-type', 'h5') //安卓 声明启用同层H5播放器 可以在video上面加东西
			let source = document.createElement('source');
			source.src = this.videoSrc;
			source.type = 'video/mp4';
			source.withCredentials = true,
			video.appendChild(source);
			this.$refs.video.$el.appendChild(video);
			let that = this;
			that.player = videojs('video', {
				poster: this.posterSrc, // 视频封面图地址
				title:'',
				playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
				autoDisable: true,
				preload: 'auto', //auto - 当页面加载后载入整个视频 meta - 当页面加载后只载入元数据 none - 当页面加载后不载入视频
				language: 'zh-CN',
				fluid: true, // 自适应宽高
				muted: false, //  是否静音
				aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
				controls: true, //是否拥有控制条 【默认true】,如果设为false ,那么只能通过api进行控制了。也就是说界面上不会出现任何控制按钮
				autoplay: false, //如果true,浏览器准备好时开始回放。 autoplay: "muted", // //自动播放属性,muted:静音播放
				loop: false, // 导致视频一结束就重新开始。 视频播放结束后，是否循环播放
				techOrder: ["html5", "flash"], //播放顺序
				screenshot:true,
				controlBar: {
					volumePanel: { //声音样式
						inline: false // 不使用水平方式
					},
					timeDivider: true, // 时间分割线
					durationDisplay: true, // 总时间
					progressControl: true, // 进度条
					remainingTimeDisplay: true, //当前以播放时间
					fullscreenToggle: true, //全屏按钮
					pictureInPictureToggle: true, //画中画
				}
			}, function() {
				this.on('loadstart', function(){
					console.log("开始请求数据 ");
					uni.showLoading({
						title: '视频加载中...',
						mask: true
					})
				})
				this.on('error', function() { //请求数据时遇到错误
					console.log("请求数据时遇到错误")
					uni.showToast({
						title: "请求数据时遇到错误，请下拉刷新",
						icon: 'none',
						duration: 3000
					})
				});
				this.on('stalled', function() { // 网速异常
					console.log("网速异常")
					uni.showToast({
						title: "网速异常，请下拉刷新",
						icon: 'none',
						duration: 3000
					})
				});
				this.on('progress', function() {
					console.log('正在请求数据')
				})
				this.on('canplaythrough', function() {
					console.log('视频源数据加载完成')
					let timer = setTimeout(() => {
						uni.hideLoading()
						clearTimeout(timer)
					}, 1500)
				})
				this.on('loadedmetadata', function() {
					console.log('获取资源长度完成')
				})
				this.on('wait', function() {
					console.log('等待数据')
				})
				this.on('play', function() { //开始播放
					console.log("开始播放")
					if (!(that.canPlay && that.canPlay())) {
						this.pause()
					} else {
						if (that.isFirstPlay) return
						that.isFirstPlay = true
						that.$http.course.incrementPlayVideo({
							data: {
								id: that.id,
							}
						});
					}
				});
				this.on('pause', function() { //暂停
					console.log("暂停")
				});
				this.on('timeupdate', function() {
					
					// console.log(this.currentTime())
				})
			});
		},
	}
</script>
