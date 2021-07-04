<template>
	<view class="tabs">
		<!-- 	<video id="video" 
		 playsinline="true" webkit-playsinline="true"
		 x5-video-player-type="h5" preload="auto" controlslist="nodownload" controls style="height: 240px;">
		</video> -->


		<!-- uniapp这样使用的看的，但不是我想要的效果的，我要js来控制他 -->
		<view class="video-js" ref="video" style="width: 100%;height: 100%;"></view>

		<cover-view v-if="ons" class="njd" @click="onckisd"></cover-view>
		<button @click="onckisd">显示蒙层</button>
		<button @click="changeVideo('http://yun-live.oss-cn-shanghai.aliyuncs.com/record/yunlive/record/yunlive/meeting_1070/2020-11-25-09-27-59_2020-11-25-09-35-52.mp4')">切换mp4视频地址</button>
		<button @click="changeVideo('http://yun-live.oss-cn-shanghai.aliyuncs.com/record/yunlive/record/yunlive/meeting_1070/2020-11-25-09-27-59_2020-11-25-09-35-52.m3u8')">切换m3u8视频地址</button>
		<button @click="changeVideo('https://video.admin.pro.fxpjiakao.com/video/fuchengyou/fuchengyou1.mp4')">切换学车视频地址</button>
	</view>
</template>

<script>
	// import videojs from 'video.js'
	// import 'videojs-contrib-hls'
	// import "videojs-flash";


	export default {
		data() {
			return {
				ons: false,
				player: null
			}
		},
		onReady() {

			let video = document.createElement('video');
			video.id = 'video';
			video.style = 'width: 100%; height: 100%;';
			video.controls = true;
			video.setAttribute('playsinline', true) //IOS微信浏览器支持小窗内播放
			video.setAttribute('webkit-playsinline', true) //这个bai属性是ios 10中设置可以让视频在小du窗内播放，也就是不是全zhi屏播放的video标签的一个属性
			video.setAttribute('x5-video-player-type', 'h5') //安卓 声明启用同层H5播放器 可以在video上面加东西
			let source = document.createElement('source');
			source.src ='http://yun-live.oss-cn-shanghai.aliyuncs.com/record/yunlive/record/yunlive/meeting_1070/2020-11-25-09-27-59_2020-11-25-09-35-52.m3u8';
			source.type = 'application/x-mpegURL';
			video.appendChild(source);
			this.$refs.video.$el.appendChild(video);
			let that = this;
			that.player = videojs('video', {
				poster: 'https://s.yun-live.com/images/20200715/902844b0f1215ff236ad6b1bd1683555.jpg', // 视频封面图地址
				title:'12334567788999900',
				playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
				autoDisable: true,
				preload: 'none', //auto - 当页面加载后载入整个视频 meta - 当页面加载后只载入元数据 none - 当页面加载后不载入视频
				language: 'zh-CN',
				fluid: true, // 自适应宽高
				muted: false, //  是否静音
				aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
				controls: true, //是否拥有控制条 【默认true】,如果设为false ,那么只能通过api进行控制了。也就是说界面上不会出现任何控制按钮
				autoplay: false, //如果true,浏览器准备好时开始回放。 autoplay: "muted", // //自动播放属性,muted:静音播放
				loop: true, // 导致视频一结束就重新开始。 视频播放结束后，是否循环播放
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
				this.on('error', function() { //请求数据时遇到错误
					console.log("请求数据时遇到错误")
				});
				this.on('stalled', function() { //网速失速
					console.log("网速失速")
				});
				this.on('play', function() { //开始播放
					console.log("开始播放")
				});
				this.on('pause', function() { //暂停
					console.log("暂停")
				});
				this.on('timeupdate', function() {
					// console.log(this.currentTime())
				})



			});





			// <view class="video-js" ref="video"></view>
			// 这个对应上面打开可以使用
			// 		var video = document.createElement('video')
			// 		video.id = 'video'
			// 		video.setAttribute('playsinline',true)
			// 		video.setAttribute('webkit-playsinline',true)
			// 		video.setAttribute('x5-video-player-type','h5')
			// 		video.setAttribute('preload','auto')

			// 		// video.setAttribute('controlslist','nodownload') //controlslist=”nodownload” 去掉下载按钮
			// 		// video.setAttribute('controls','controls')
			// 		video.style = 'width: 600px;height: 350px;'
			// 		video.controls = true
			// 		// video.playsinline =true
			// 		var source = document.createElement('source')
			// 		source.src ='http://yun-live.oss-cn-shanghai.aliyuncs.com/record/yunlive/record/yunlive/meeting_1273/2020-07-16-15-43-01_2020-07-16-18-27-04.m3u8'
			// 		source.type = "application/x-mpegURL"
			// 		video.appendChild(source)
			// 		video.playbackRates= 2
			// 		this.$refs.video.$el.appendChild(video)
			// 		console.log(video)
			// 		videojs('video')


			// 这个是vue可以使用拿过来,在这个框架不行了
			// this.playVideo();




		},
		methods: {
			changeVideo(url) {
				this.player.reset() //重置为它们的默认值
				// this.player.pause()
				// 判断一下视频类型，设置不同的type
				let type = ''
				if (url.indexOf('.mp4') !== -1) {
					type = 'video/mp4'
				} else if (url.indexOf(('.m3u8')) !== -1) {
					type = 'application/x-mpegURL'
				} else {
					type = 'rtmp/hls'
				}
				this.player.src({
					src: url,
					type: type,
					withCredentials: true, //跨域请求设置withCredentials
				})
				let video = document.getElementById('video');
				video.setAttribute('playsinline', true) //IOS微信浏览器支持小窗内播放
				video.setAttribute('webkit-playsinline', true) //这个bai属性是ios 10中设置可以让视频在小du窗内播放，也就是不是全zhi屏播放的video标签的一个属性
				video.setAttribute('x5-video-player-type', 'h5') //安卓 声明启用同层H5播放器 可以在video上面加东西
				this.player.playbackRate(2.0);//设定新的播放速度2倍速度
				 // 动态切换poster 封面
				this.player.posterImage.setSrc('https://s.yun-live.com/images/20200708/73d80639dd17bfdacc45e6cc1a526ab2.jpg');
				this.player.load(url)
				// this.player.play();

			},





			onsda() {
				this.player.volume(0.25);
				var that = this;
				that.player.src({
					withCredentials: false, //跨域请求设置withCredentials
					src: 'https://yun-live.oss-cn-shanghai.aliyuncs.com/video/20200723/X3pcENeMzw.mp4',
					type: "video/mp4"
				});
				that.player.load();
				that.player.play();
				// var video = document.getElementById('video')
				// // var source = document.getElementById('source')
				// console.log(video)
				// // video.src ='https://yun-live.oss-cn-shanghai.aliyuncs.com/video/20200723/X3pcENeMzw.mp4'
				// // video.type = "video/mp4"
				// video.pause()
			},
			playVideo() {
				var that = this;
				// var video = document.createElement('video')
				//初始化视频
				var videoPlayer = videojs(
					"video", {
						sources: [
							// {
							//   src: "https://p2.weizan.cn/11800347/941814099869602690/live.m3u8",
							//   // src: "http://yun-live.oss-cn-shanghai.aliyuncs.com/record/yunlive/record/yunlive/meeting_1273/2020-07-16-15-43-01_2020-07-16-18-27-04.m3u8",
							//   // src: "http://i3.vzan.cc/clip/11800347/853716862/C6497C4C63C6691C.m3u8",
							//   type: "application/x-mpegURL"
							// },
							{
								withCredentials: false, //跨域请求设置withCredentials
								src: "https://yun-live.oss-cn-shanghai.aliyuncs.com/video/20200723/X3pcENeMzw.mp4",
								type: "video/mp4"
							},
							{
								withCredentials: false, //跨域请求设置withCredentials
								src: "rtmp://r2.weizan.cn/v/11800347_941814099869602690",
								type: "rtmp/flv",
								// type: 'rtmp/hls',
							}
						],
						playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
						autoDisable: true,
						preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
						language: 'zh-CN',
						muted: false, //  是否静音
						aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
						controls: true, //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
						autoplay: false, //如果true,浏览器准备好时开始回放。 autoplay: "muted", // //自动播放属性,muted:静音播放
						loop: true, // 导致视频一结束就重新开始。 视频播放结束后，是否循环播放
						techOrder: ["html5", "flash"],
						// width: "400",
						// height: "240",
						controlBar: {
							timeDivider: true,
							durationDisplay: true,
							remainingTimeDisplay: false,
							fullscreenToggle: true //全屏按钮
						}
					},
					function() {
						console.log(this)
						// this.play();
					}
				);

				// var myPlayer = neplayer('my-video', {controlBar:{
				//     'currentTimeDisplay':true,
				//     'timeDivider':true,
				//     'durationDisplay':true,
				//     'remainingTimeDisplay':false
				// }}, function() {
				//     console.log('播放器初始化完成');
				// });
				// var player = videojs(document.getElementById('myVideo'), {
				//   controls: true, // 是否显示控制条
				//   poster: 'xxx', // 视频封面图地址
				//   preload: 'auto',
				//   autoplay: false,
				//   fluid: true, // 自适应宽高
				//   language: 'zh-CN', // 设置语言
				//   muted: false, // 是否静音
				//   inactivityTimeout: false,
				//   controlBar: { // 设置控制条组件
				//     /* 设置控制条里面组件的相关属性及显示与否
				//     'currentTimeDisplay':true,
				//     'timeDivider':true,
				//     'durationDisplay':true,
				//     'remainingTimeDisplay':false,
				//     volumePanel: {
				//       inline: false,
				//     }
				//     */
				//     /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
				//     children: [
				//       {name: 'playToggle'}, // 播放按钮
				//       {name: 'currentTimeDisplay'}, // 当前已播放时间
				//       {name: 'progressControl'}, // 播放进度条
				//       {name: 'durationDisplay'}, // 总时间
				//       { // 倍数播放
				//         name: 'playbackRateMenuButton',
				//         'playbackRates': [0.5, 1, 1.5, 2, 2.5]
				//       },
				//       {
				//         name: 'volumePanel', // 音量控制
				//         inline: false, // 不使用水平方式
				//       },
				//       {name: 'FullscreenToggle'} // 全屏
				//     ]
				//   },
				//   sources:[ // 视频源
				//       {
				//           src: '//vjs.zencdn.net/v/oceans.mp4',
				//           type: 'video/mp4',
				//           poster: '//vjs.zencdn.net/v/oceans.png'
				//       }
				//   ]
				// }, function (){
				//   console.log('视频可以播放了',this);
				// });
			},
			onckisd() {
				this.ons = this.ons ? false : true
				// this.$layer.alert("找不到对象！");

				// this.$layer.confirm('添加成功！', {
				// 	type: 1, //0（信息框，默认）1（页面层）2（iframe层）3（加载层）4（tips层）
				// 	title: '自定义', //弹框的标题
				// 	area: 'auto',
				// 	offset: 'auto',
				// 	icon: -1,
				// 	btn: '确定',
				// 	time: 0,
				// 	shade: true, //是否显示遮罩
				// 	tips: [2, {}], //支持上右下左四个方向，通过1-4进行方向设定,可以设定tips: [1, '#c00']
				// 	tipsMore: false, //是否允许多个tips
				// 	shadeClose: true, //点击遮罩是否关闭
				// });
				// this.$layer.tips('只想提示地精准些', '#id');
				// this.$layer.open({
				// 	type: 0,
				// 	title: '客户信息',
				// 	skin: '#id', // 加上边框
				// 	area: ['470px', '500px'], // 宽高
				// 	content: 'html'
				// })

			},


		}
	}
</script>

<style>

	.njd {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #00FF00;
		top: 0;
		z-index: 9999;
		color: #0000EE;
		font-size: 20px;

	}
	
	
	
</style>
