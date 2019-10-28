<template>
	<div class="part TaskDescribe">
		<div class="main" v-title data-title="答题"></div>
		<div class="header">
			<span class="title">topic 单选题</span>
			
		</div>

		<div class="videoBox">
			<div v-if="isVideo" class="video">
				<!-- <video id="test_video" poster="../../assets/images/gameAssess.png" x5-playsinline="true" playsinline="true"
				 webkit-playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen=""
				 x5-video-orientation="portraint">
					<source src="http://vd2.bdstatic.com/mda-jjk8t21udbjk3wzt/sc/mda-jjk8t21udbjk3wzt.mp4" type='video/mpeg' />
					<source src="http://vd2.bdstatic.com/mda-jjk8t21udbjk3wzt/sc/mda-jjk8t21udbjk3wzt.mp4" type='video/webm' />
					<source src="http://vd2.bdstatic.com/mda-jjk8t21udbjk3wzt/sc/mda-jjk8t21udbjk3wzt.mp4" type='video/ogg' />
				</video>
				<div class="video-img" @click="playMedia()"></div> -->


				<video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"
				 @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)" @waiting="onPlayerWaiting($event)"
				 @playing="onPlayerPlaying($event)" @loadeddata="onPlayerLoadeddata($event)" @timeupdate="onPlayerTimeupdate($event)"
				 @canplay="onPlayerCanplay($event)" @canplaythrough="onPlayerCanplaythrough($event)" @statechanged="playerStateChanged($event)"
				 @ready="playerReadied">
				</video-player>
				

			</div>
			<div v-else class="audio">
				<audio controls="controls">
					<source src="" type="audio/mp3">
					<source src="" type="audio/ogg">
					<source src="task.resourceLocation" type='audio/mpeg'>
					您的浏览器不支持 audio 元素。
				</audio>
				<div class="audio-img" @click="playMedia(event,'AUDIO')"></div>
			</div>
		</div>

		<div class="profile" v-html="part.description">
			这是介绍描述
		</div>


		<div class="topicBtn">
			<span class="prev">下一题</span>
			<button class="submit">
				<span class="icon iconfont">&#xe64d;</span>
				<span>提交</span>
			</button>			
			<span class="next">下一题</span>
		</div>
	</div>
</template>

<script>
	import {
		videoPlayer
	} from 'vue-video-player';

	export default {
		name: 'topic',
		data() {
			return {
				isVideo: true,
				part: {
					
				},
				playerOptions: {
					playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
					autoplay: false, //如果true,浏览器准备好时开始回放。
					muted: false, // 默认情况下将会消除任何音频。
					loop: false, // 导致视频一结束就重新开始。
					preload: 'auto',
					// 建议浏览器在<video>加载元素后是否应该开始下载视频数据。
					// auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
					language: 'zh-CN',
					aspectRatio: '16:9',
					// 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。
					// 值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
					fluid: true,
					// 当fluid为true时，Video.js player将拥有流体大小。
					// 换句话说，它将按比例缩放以适应其容器。
					sources: [{
						type: "video/mp4",
						src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
						//你的视频地址（必填）
					}],
					poster: "poster.jpg", //你的封面地址
					width: document.documentElement.clientWidth,
					notSupportedMessage: '此视频暂无法播放，请稍后再试',
					//允许覆盖Video.js无法播放媒体源时显示的默认信息。
					controlBar: {
						timeDivider: true,
						durationDisplay: true,
						remainingTimeDisplay: false,
						fullscreenToggle: true //全屏按钮
					}
				}
			}
		},
		components:{
			videoPlayer
		},
		created() {

		},
		methods: {
			
			playMedia() {

			},
			// 去part模块页面
			toTask() {
				this.$router.push({
					name: 'PartPage'
				})
			},
			// 播放事件
			onPlayerPlay() {},
			// 暂停事件
			onPlayerPause() {},
			// 播放结束事件
			onPlayerEnded() {},
			onPlayerWaiting() {},
			onPlayerPlaying() {},
			onPlayerLoadeddata() {},
			onPlayerTimeupdate() {},
			onPlayerTimeupdate() {},
			onPlayerCanplay() {},
			onPlayerCanplaythrough() {},
			playerStateChanged() {},
			playerReadied(player) {
				console.log('the player is readied', player)
				// you can use it to do something...
				// player.[methods]
			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../assets/style/mixin.less";

	.part {
		font-size: 30px;

		.header {
			height: 88px;
			line-height: 88px;
			font-size: 36px;
		}

		.videoBox {
			.video {
				height: 400px;
				width: 100%;

				video {
					height: 400px;
				}
			}
			
		}

		.profile {
			width: 699px;
			margin: 0 auto;
			min-height: 200px;
			margin-top: 23px;
			padding-bottom: 24px;
		}

		.topicBtn{
			position: fixed;
			padding: 10px 40px;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 108px;
			line-height: 88px;
			span,button{
				vertical-align: middle;
				background: #fff;
				font-size: 32px;
				vertical-align: middle;
			}
			.icon{
				font-size: 32px;
				display: inline-block;
				color: @defaultColor;
				margin-right: 10px;
			}
			button{
				color: @defaultColor;
				line-height: 32px;	
			}
			.prev,.next{
				width:160px;
				height:48px;
				line-height: 48px;
				background:rgba(255,102,0,1);
				border-radius:24px;
				color: #fff;
				padding: 0px 24px;
				margin-top: 30px;
			}
			.prev{
				float: left;
			}
			.next{
				float: right;
			}
		}
	}
</style>
