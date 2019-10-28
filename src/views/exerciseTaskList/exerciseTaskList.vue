<template>
	<div>
		<div class="main" v-title data-title="练习列表"></div>
		<div class="mainContainer">
			<!-- 无数据 有数据 -->
			<div class="hasData" v-if="true">
				<div class="cardContent">
					<img src="../../assets/images/exercise.jpg" alt="">
					<p>本期未完成内容 :</p>
					<span>{{ unFinishNum }}</span>
				</div>

				<div class="listBox">
					<div class="listItem" @click="toExercise('task.task.identifier')">
						<p class="noAccomplish">未完成</p>
						<div class="topicItem">
							<span class="icon iconfont blue">&#xe64d;</span>
							<span>希望之星英语练习题</span>
						</div>
						<div class="time">
							<span>8/15 发布</span>
						</div>
						<div class="topic">
							<p class="w">10</p>
							<p class="num">条题</p>
						</div>
					</div>

					<div class="listItem" @click="toExercise('task.task.identifier')">
						<p class="noAccomplish">未完成</p>
						<div class="topicItem">
							<span class="icon iconfont blue">&#xe64d;</span>
							<span>希望之星英语练习题</span>
						</div>
						<div class="time">
							<span>8/15 发布</span>
						</div>
						<div class="topic">
							<p class="w">10</p>
							<p class="num">条题</p>
						</div>
					</div>

					<div class="listItem"  @click="toResult('')">
						<p class="noAccomplish">已完成</p>
						<div class="topicItem">
							<span class="icon iconfont">&#xe64d;</span>
							<span>希望之星英语练习题</span>
						</div>
						<div class="time">
							<span>8/15 发布</span>
						</div>
						<div class="topic">
							<p class="">10</p>
							<p class="num">条题</p>
						</div>
					</div>

					<div class="listItem" @click="toResult('')">
						<p class="noAccomplish">已完成</p>
						<div class="topicItem">
							<span class="icon iconfont">&#xe64d;</span>
							<span>希望之星英语练习题</span>
						</div>
						<div class="time">
							<span>8/15 发布</span>
						</div>
						<div class="topic">
							<p class="">10</p>
							<p class="num">条题</p>
						</div>
					</div>
				</div>

				<div class="bottom">
					<p>
						<span class="line"></span>
						<span>没有更多内容了</span>
						<span class="line"></span>
					</p>
				</div>

			</div>
			<div class="noData" v-else>
				<div>
					<img src="../../assets/images/noContent.png" alt="">
				</div>
				<div>
					<span>暂无练习内容~</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getUser,
		getPhone,
		getToken,
		setUser
	} from '../../js/user.js'
	// import { getQueryString } from '../../js/common.js'
	import {
		getUserInfo,
		getUserLogin,
    getMatchTask,
		getExecute
	} from '../../service/api.js'

	import {
		Row,
		Col
	} from 'vant';

	export default {
		name: "exerciseTaskList",
		data() {
			return {
				unFinishNum:0, // 未完成的题目数量
				tasks:[], // 练习列表数据
				student: {}, // 选手
				match: "", // url 查询参数
			}
		},
		components: {
			[Row.name]: Row,
			[Col.name]: Col
		},
		created() {
      this.getExerciseTaskList()
		},
		methods: {
			//获取练习任务列表
			getExerciseTaskList() {
				let _this = this;
				// _this.student.person.identifier
				let student_person_id = 'null';

				// api.matchTask.getByMatch(_this.match, "EXERCISE", student_person_id).then(function (data) {
				// 	console.log(data);
				// 	_this.tasks = data.data.data;
				// 	//计算未完成练习数量
				// 	for (let i = 0; i < _this.tasks.length; i++) {
				// 		if (!_this.tasks[i].state) {
				// 			_this.unFinishNum++;
				// 		}
				// 	}
				//
				// })

        getMatchTask(_this.match,"EXERCISE",student_person_id).then(function (res) {
          console.log('练习任务列表数据：',res)
        })

			},
      toExercise(task){ // 去练习 (测评)
				// sessionStorage.setItem("returnPage", "view/game/exerciseTaskList?match=" + this.match);
				// view.navigate("view/game/examPaper?matchTask=" + task + "&match=" + this.match+"&person="+this.student.person.identifier);

				this.$router.push({
					name:'TaskDescribe',
					query:{
						matchTask:'',
						match:'',
						person:''
					}
				})

      },
			//去结果页
			toResult(task) {
				let _this = this;
				// api.execute.get("matchTask=" + task.identifier, "person=" + _this.student.person.identifier).then(function (data) {
				// 	let execute = data.data.data;
				// 	sessionStorage.setItem("returnPage", "view/game/readyRoom");
				// 	view.navigate("view/game/exerciseResult?execute=" + execute.identifier +"&match="+_this.match);
				// })
				_this.$router.push({
					name:'EvaluationResult',
					query: {

					}
				})
				// getExecute({matchTask:'',person:''}).then(function (res) {
				// 	console.log('execute参数',res)
				// 	_this.$router.push({
				// 		name:'EvaluationResult',
				// 		query: {
				//
				// 		}
				// 	})
				// })
			},
		}
	}
</script>

<style lang="less" scoped>
	@import "../../assets/style/mixin.less";



	//  noData
	.noData {
		font-size: 28px;
		color: #999999;
		text-align: center;

		img {
			width: 540px;
			height: 366px;
			margin-top: 230px;
		}
	}

	.hasData {
		.cardContent {
			img {
				width: 100%;
				height: 400px;
			}

			p {
				position: absolute;
				left: 24px;
				top: 110px;
				font-size: 36px;
				color: #FFFFFF;
				font-weight: 800;
			}

			span {
				position: absolute;
				left: 0px;
				right: 0;
				margin: 0 auto;
				top: 252px;
				font-size: 72px;
				font-weight: 800;
				color: #fff;
			}
		}

		.listBox {
			width: 702px;
			margin: 0 auto;
			padding: 24px 0;

			.listItem {
				height: 220px;
				text-align: left;
				position: relative;
				font-size: 34px;
				margin-bottom: 25px;
				line-height: 42px;

				span {
					vertical-align: middle;
				}

				.icon {
					font-size: 34px;
					margin: 0 15px;
				}
				.blue{
					color: @defaultColor;
				}
				.w{
					color: #04AEF2;
				}
				.noAccomplish {
					height: 78px;
					line-height: 78px;
					color: #999999;
					padding-left: 14px;
					border-bottom: 1px solid #DEDEDE;
				}

				.topicItem {
					margin-top: 30px;
				}

				.time {
					padding-left: 60px;
					font-size: 28px;
					color: #999999;
				}

				.topic {
					position: absolute;
					right: 26px;
					top: 114px;
					text-align: center;

					.num {
						color: #999;
						font-size: 28px;
						margin-top: 6px;
					}
				}
			}
		}

		.bottom {
			text-align: center;
			font-size: 24px;
			color: #BCBCBC;
			height: 80px;
			line-height: 80px;

			span {
				display: inline-block;
				vertical-align: middle;
			}

			.line {
				width: 60px;
				height: 2px;
				background: #BCBCBC;
				margin: 0 15px;
			}
		}
	}
</style>
