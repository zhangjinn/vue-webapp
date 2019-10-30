<template>
	<div>
		<div class="main" v-title data-title="练习列表"></div>
		<div class="mainContainer">
			<!-- 无数据 有数据 -->
			<div class="hasData" v-if="tasks.length > 0">
				<div class="cardContent">
					<img src="../../assets/images/exercise.jpg" alt="">
					<p>本期未完成内容 :</p>
					<span>{{ unFinishNum }}</span>
				</div>

				<div class="listBox" >
					<div class="list" v-for="(task,index) in tasks" :key="index">
						<div v-if="task.state" class="listItem"  @click="toResult(task.task)">
							<p class="noAccomplish">已完成</p>
							<div class="topicItem">
								<span class="icon iconfont">&#xe64d;</span>
									<span class="finish">{{task.task.name}}</span>
							</div>
							<div class="time">
								<span>{{dateFormat(task.task.createTime)}} 发布</span>
							</div>
							<div class="topic">
								<p class="">{{task.num}}</p>
								<p class="num">条题</p>
							</div>
						</div>

						<div  v-else class="listItem" @click="toExercise(task.task.identifier)">
							<p class="noAccomplish">未完成</p>
							<div class="topicItem">
								<span class="icon iconfont blue">&#xe64d;</span>
								<span>{{task.task.name}}</span>
							</div>
							<div class="time">
								<span>{{dateFormat(task.task.createTime)}} 发布</span>
							</div>
							<div class="topic">
								<p class="w"> {{task.num}} </p>
								<p class="num">条题</p>
							</div>
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
			<!-- 无数据列表显示去数据组件 -->
			<div v-else>
				<noCantent noContentShowText="暂无练习内容"></noCantent>
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
	} from '../../js/user.js';

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

	import noCantent from '../../components/common/noContent'

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
			[Col.name]: Col,
			noCantent:noCantent
		},
		created() {
			this.match = this.$route.query.match;

			this.student = JSON.parse(localStorage.getItem("student"));
			console.log('this.student',this.student)
      this.getExerciseTaskList()
		},
		methods: {
			//获取练习任务列表
			getExerciseTaskList() {
				let _this = this;
				// _this.student.person.identifier
				console.log('url参数',this.$route.query.match)

				let student_person_id = _this.student.person.identifier;

        getMatchTask(_this.match,"EXERCISE",student_person_id).then(function (res) {
          console.log('练习任务列表数据：',res)
					_this.tasks = res.data;

					//计算未完成练习数量
					for (let i = 0; i < _this.tasks.length; i++) {
						if (!_this.tasks[i].state) {
							_this.unFinishNum++;
						}
					}

        })

			},
      toExercise(task){ // 去练习 (测评)
				// sessionStorage.setItem("returnPage", "view/game/exerciseTaskList?match=" + this.match);
				// view.navigate("view/game/examPaper?matchTask=" + task + "&match=" + this.match+"&person="+this.student.person.identifier);
				console.log(task)

				this.$router.push({
					name:'taskAssess',
					query:{
						matchTask:task,
						match:this.match,
						person:this.student.person.identifier
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

				console.log('参数：',task.identifier,_this.student.person.identifier)

				getExecute({matchTask:task.identifier,person:_this.student.person.identifier}).then(function (res) {

					 let execute = res.data;
					console.log('execute',execute)

					_this.$router.push({
						name:'EvaluationResult',
						query: {
							execute:execute.identifier,
							match:_this.match
						}
					})
				})
			},
			//格式化时间
			dateFormat: function (time) {
				return new Date(time).format("yyyy-MM-dd");
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
			.list{
				background: @white;
				padding: 24px;
				.border-radius(15px);
				&:not(:first-child){
					margin-top: 24px;
				}
				.listItem {
					height: 220px;
					text-align: left;
					position: relative;
					font-size: 34px;
					margin-bottom: 25px;
					line-height: 42px;

					span {
						vertical-align: middle;
						&.finish{
							color: #999;
						}
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
