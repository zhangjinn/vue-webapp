<template>
	<div class="TaskDescribe">
		<div class="main" v-title data-title="测评"></div>
		<div class="header">
			<span class="title">测评介绍</span>
		</div>
		<div class="mediaBox">
			<div v-if="isVideo" class="video">
				<video poster="../../assets/images/gameAssess.png">
					<source :src="task.resourceLocation" type='video/mpeg' />
					<source :src="task.resourceLocation" type='video/webm' />
					<source :src="task.resourceLocation" type='video/ogg' />
				</video>
				<div class="videoImg" @click="playMedia($event,'VIDEO')">
					<span class="icon iconfont iconbofang"></span>
				</div>
			</div>
			<div v-if="isAudio" class="audio">
				<audio controls="controls">
					<source :src="task.resourceLocation" type="audio/mp3">
					<source :src="task.resourceLocation" type="audio/ogg">
					<source :src="task.resourceLocation" type='audio/mpeg'>
					您的浏览器不支持 audio 元素。
				</audio>
				<div class="audioImg" @click="playMedia($event,'AUDIO')"></div>
			</div>
		</div>

		<div class="profile">
			<div v-html="task.description"></div>
			<p>点击“NEXT”正式开始您的测评。</p>
		</div>

		<div class="next" @click="toPart()">
			<span>NEXT</span>
		</div>
	</div>
</template>

<script>
	import { Notify } from 'vant';
	import posterImg from "../../assets/images/gameAssess.png";
	export default {
		name: 'TaskDescribe',
		data() {
			return {
				isVideo:false, //视频显示
				isAudio:false, //音频显示
				task:{},
				taskId:'',
				matchId:"",
				person:'',
				playCount: 0, //视频播放次数
				playStrArr:[]
			}
		},
		component: {
			[Notify.name]: Notify,
		},
		props:["taskData"],
		created() {
			this.taskId = this.$route.query.matchTask;
			this.matchId = this.$route.query.match;
			this.person = this.$route.query.person;
			this.task = this.taskData;
			this.showDescribe(this.task);
		},
		methods: {
			// 去part模块页面
			toPart(){
				this.$emit("begin",true);
			},
			showDescribe(data){
				let taskData = data;
				if(taskData.resourceType == "VIDEO"){
					this.isVideo = true;
					this.isAudio = false;
				}else if(taskData.resourceType == "AUDIO"){
					this.isVideo = false;
					this.isAudio = true;
				}
				this.task.description = decodeURIComponent(this.task.description);
			},
			playMedia(event,type){
				let _this = this;
				let dom = event.currentTarget;
				let str;
				let flag = false;
				let typeText;
				if(type == "VIDEO"){
					str = "fv_describe"+_this.taskId+_this.person;
					typeText = "视频";
				}else{
					str = "fa_describe"+_this.taskId+_this.person;
					typeText = "音频";
				}
				let playLimit = _this.task.playLimit;
				if(localStorage.getItem(str)!=undefined){
					_this.playCount = parseInt(localStorage.getItem(str));
				}else{
					_this.playCount = 0;
				}
				if(localStorage.getItem("play_str_"+_this.taskId+_this.person)!=undefined){
					_this.playStrArr = JSON.parse(localStorage.getItem("play_str_"+_this.taskId+_this.person));
				}else{
					_this.playStrArr = [];
				}
				for(let i=0;i<_this.playStrArr.length;i++){
					if(_this.playStrArr[i] == str){
						flag = true
					}
				}
				if(flag == false){
					_this.playStrArr.push(str)
				}
				localStorage.setItem("play_str_"+_this.taskId+_this.person,JSON.stringify(_this.playStrArr));
				let media = dom.previousElementSibling;
				if(media.paused){
					if(_this.playCount < playLimit){
						media.play();
						if(type == "VIDEO"){
							dom.firstChild.style.display = "none";
						}
						let playCount = _this.playCount;
						media.addEventListener("timeupdate",function(){
							if(_this.playCount == playCount){
								_this.playCount += 1;
								localStorage.setItem(str,_this.playCount);
							}
							media.addEventListener("pause",function(){
								if(type == "VIDEO"){
									if(!media.ended){
										media.play();
										Notify({
											message: typeText+"不能暂停!",
											color: '#333',
											background: '#fff',
											duration: 500
										});
									}
								}
							})
							if(type == "VIDEO"){
								media.addEventListener('ended',function(){
									dom.firstChild.style.display = "block";
									media.remove();
									var video = document.createElement("video");
									video.poster = posterImg;
									video.style.width = "100%";
									video.style.height = "100%";
									let html = '<source src="'+_this.task.resourceLocation+'" type=\'video/mpeg\' />' +
											'<source src="'+_this.task.resourceLocation+'" type=\'video/webm\' />' +
											'<source src="'+_this.task.resourceLocation+'" type=\'video/ogg\' />'
									video.innerHTML = html;
									if(dom.parentNode.querySelector("video") == null){
										dom.parentNode.insertBefore(video,dom)
									}
								})
							}

						})
					}else{
						Notify({
							message: "该"+typeText+"只能播放"+playLimit+"次!",
							color: '#333',
							background: '#fff',
							duration: 500
						});
						_this.playCount = 0;
					}
				}else{
					Notify({
						message: typeText+"不能暂停!",
						color: '#333',
						background: '#fff',
						duration: 500
					});
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	@import "../../assets/style/mixin.less";

	.TaskDescribe {
		padding: 88px 0;
		font-size: 30px;
		color: #333333;
		text-align: left;
		.header {
			position: fixed;
			top: 0;
			left: 0;
			.wh(100%,88px);
			line-height: 88px;
			font-size: 34px;
			text-align: center;
			background: @white;
		}

		.mediaBox {
			.video {
				.wh(100%,400px);
				position: relative;
				video {
					.wh(100%,100%);
				}
				.videoImg{
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					z-index: 999;
					background: transparent;
					span{
						position: absolute;
						top: 0;
						bottom: 0;
						left: 0;
						right: 0;
						margin: auto;
						.wh(100px,100px);
						display: inline-block;
						font-size: 100px;
						color: #fff;
					}
				}
			}
			.audio{
				.wh(100%,100px);
				position: relative;
				audio{
					.wh(100%,100%);
				}
				.audioImg{
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					z-index: 999;
					background: transparent;
				}
			}
		}
		.profile{
			width: 699px;
			margin: 0 auto;
			margin-top: 23px;
			padding-bottom: 24px;
			line-height: 1.5;
			p{
				color:#04AEF2;
			}
		}

		.next {
			position: fixed;
			left: 0;
			bottom: 0;
			text-align: center;
			height: 88px;
			width: 100%;
			line-height: 88px;
			font-size: 34px;
			color: #fff;
			.linear-gradient(left,#FFCD32,#FF850F);
		}
	}
</style>
