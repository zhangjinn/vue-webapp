<template>
	<div class="app applicant" v-cloak>
		<div class="main" v-title data-title="报名入口"></div>
		<van-row>
			<div class="bao">
				<van-col span="12">
					<div class="area">
						<van-icon name="location-o" />
						<span>参赛地区:</span>
						<p>
							<span class="areaBox">{{location.grandpaName}} &nbsp;{{location.parentName}}&nbsp;{{location.areaName}}</span>
						</p>
					</div>
				</van-col>
				<van-col span="12">
					<div class="group">
						<span class="icon iconfont">&#xe617;</span>
						<span>参赛组别:</span>
						<p>
							<span class="groupBox">{{gameSubject.name}}</span>
						</p>
					</div>
				</van-col>

				<div>
					<p id="triggerBtn" @click="myModal()" class="editor clearfix">

							<van-field
									v-model="person.name"
									placeholder="选手姓名"
							>
								<div slot="button" size="small" type="primary">
									<span class="personName" v-if="!person.name">添加</span>
									<span class="personName" v-else>修改</span>
								</div>
							</van-field>

					</p>
				</div>

			</div>

		</van-row>



		<div class="box">
			<span>选手信息</span>
		</div>
		<div class="form">

			<van-cell-group>
				<van-field
						v-model="person.name"
						required
						clearable
						label="选手姓名："
						placeholder="请输入选手姓名"
						:disabled="disabled"
						@click-right-icon="$toast('question')"
						error-message=""
				/>

				<van-field
						v-model="SchoolValue.name"
						type="text"
						label="所在学校："
						placeholder="请选择选手的学校"
						@click="getSchool"
						:disabled="disabled"
						required
				/>

				<van-field
						v-model="gradeValue.name"
						type="text"
						label="所在年级："
						:disabled="disabled"
						placeholder="请选择选手的年级"
						@click="getGrade"
						required
				/>
				<!--  error-message="手机号格式错误" 错误信息 -->
				<van-field
						v-model="person.phone"
						type="text"
						label="选手电话："
						:disabled="disabled"
						placeholder="请输入选手电话"
						maxlength="11"
						error-message=""
				/>
				<!--  error-message="身份证号格式错误" 错误信息 -->
				<van-field
						v-model="person.idCard"
						type="text"
						label="身份证号："
						:disabled="disabled"
						maxlength="18"
						placeholder="请输入选手身份证号码"

				/>

				<van-field
						v-model="classValue"
						type="text"
						label="所在班级："
						placeholder="请选择选手的班级"
						@click="getClass"
						:disabled="disabled"
						required
				/>

				<van-field
						v-model="user_person.phone"
						type="text"
						label="家长电话："
						disabled
						placeholder="请输入家长电话"
						required
				/>

				<van-field
						v-model="user_person.name"
						type="text"
						label="家长姓名："
						placeholder="请输入家长姓名"
						disabled
						required
				/>


			</van-cell-group>


			<!--<div class="item">-->
				<!--<p>选手真实姓名 <i>*</i></p>-->
				<!--<div class="itemInput">-->
					<!--<input type="text"  v-model="person.name" :disabled="disabled" placeholder="请输入选手姓名">-->
				<!--</div>-->
			<!--</div>-->

			<!--<div class="item">-->
				<!--<p>学校 <i>*</i></p>-->
				<!--<div class="itemInput">-->
					<!--<input type="text" @click="getSchool()" :disabled="disabled"  v-model="SchoolValue.name" readonly="readonly" placeholder="请选择选手的学校">-->
				<!--</div>-->
			<!--</div>-->
			<!--<div class="item">-->
				<!--<p>年级 <i>*</i></p>-->
				<!--<div class="itemInput">-->
					<!--<input type="text"  :disabled="disabled"  v-model="gradeValue.name" readonly="readonly" placeholder="请选择选手的年级">-->
				<!--</div>-->
			<!--</div>-->
			<!--<div class="item">-->
				<!--<p>班级 <i>*</i></p>-->
				<!--<div class="itemInput">-->
					<!--<input type="text" @click="getClass()" :disabled="disabled"  v-model="classValue" readonly="readonly" placeholder="请选择选手的班级">-->
				<!--</div>-->
			<!--</div>-->
			<!--<div class="item">-->
				<!--<p>家长联系电话 <i>*</i></p>-->
				<!--<div class="itemInput">-->
					<!--<input type="number" data-mobile="true" v-model="user_person.phone" disabled="true">-->
				<!--</div>-->
			<!--</div>-->

			<!--<div class="item">-->
				<!--<p>家长姓名 <i>*</i></p>-->
				<!--<div class="itemInput">-->
					<!--<input v-model="user_person.name" type="text" disabled="true">-->
				<!--</div>-->
			<!--</div>-->
			<!--<div class="item">-->
				<!--<p>选手联系电话 </p>-->
				<!--<div class="itemInput">-->
					<!--<input type="text" v-model="person.phone" placeholder="请输入选手联系电话">-->
				<!--</div>-->
			<!--</div>-->
			<!--<div class="item">-->
				<!--<p>选手身份证 </p>-->
				<!--<div class="itemInput">-->
					<!--<input type="text" v-model="person.idCard" placeholder="请输入身份证号码">-->
				<!--</div>-->
			<!--</div>-->
			<div class="submit" @click="addApplicant()">
				<span >提交资料</span>
			</div>
		</div>


		<!-- 资料提交成功 -->
		<div class="fix" v-show="issuccess">
			<div class="m"></div>
			<div class="success">
				<p>资料提交成功</p>
				<div class="imgBox">
					<img src="../../assets/images/enrollBg.png" alt="">
				</div>
				<div class="msg">
					<span>
						恭喜你，{{person && person.name ?  person.name : ""}}同学，你已成功报名
						{{game.name}} 希望你能取得好成绩，记得按时完成比赛哦！！！
					</span>
				</div>
				<div class="go" @click.prevent="toReadyRoom()">
					<span>前往预备室，准备比赛</span>
				</div>
			</div>

		</div>

		<div class="van-loading" v-show="loading">
			<van-loading type="spinner" color="#1989fa" />
		</div>

		<!--showSchool 学校-->
		<van-popup v-model="showSchool"  round>
			<!-- 学校 -->
			<div class="my-container searchBox">
				<!-- 学校列表  radio-->
				<div class="search">
					<h3>选择学校</h3>
					<van-search placeholder="请输入搜索的学校" @search="searchSchool" v-model="searchTxt" />
				</div>

				<div class="data">
					<van-radio-group v-model="SchoolValue.name" >
						<van-radio :name="item.name" @click="selectSchool(index)" v-for="(item,index) in schooles" :key="index">
							<span>{{ item.name }}</span>
						</van-radio>
					</van-radio-group>
				</div>


			</div>
		</van-popup>

		<van-popup v-model="show"  round>
			<!-- 年级 -->
			<div class="my-container">
				<!-- 年级列表  radio-->
				<van-radio-group v-model="gradeValue" >
					<van-radio :name="item.name" @click="changeGrade(index)" v-for="(item,index) in grades" :key="index">
						<span>{{ item.name }}</span>
					</van-radio>
				</van-radio-group>
			</div>
		</van-popup>

		<!--班级-->
		<van-popup v-model="showClass"  round>
			<!-- 班级 -->
			<div class="my-container">
				<!-- 年级列表  radio-->
				<van-radio-group v-model="classValue" @change="changeClass">
					<van-radio :name="item" v-for="(item,index) in classes" :key="index">
						<span>{{ item }}</span>
					</van-radio>
				</van-radio-group>

			</div>
		</van-popup>
		<!-- 选手 -->
		<van-popup v-model="showPlayer"  round>
			<!-- 选手 -->
			<div class="showPlayer">
				<div class="header">
					<h2>选择一位选手报名</h2>
					<img src="../../assets/images/topimg.png" alt="">
				</div>

				<!-- 选手列表  radio-->
				<div class="content">
					<van-radio-group v-model="radio" @change="changeStudent">
						<van-radio :name="item" v-for="(item,index) in students" :key="index">
							<span>{{ item.person&&item.person.name ? item.person.name : "" }}</span>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<span>{{ item.grade && item.grade.name ? item.grade.name : ""}}</span>
						</van-radio>

					</van-radio-group>
				</div>

				<div class="btn">
					<span @click="cancel" class="cancel">取消</span>
					<span @click="affirm" class="affirm">确认</span>
				</div>
			</div>
		</van-popup>


	</div>

</template>

<script>
	import {
		Row,
		Col
	} from 'vant';
	import {
		Icon
	} from 'vant';

	import {
		Popup
	} from 'vant';
	import {
		Loading
	} from 'vant';
	import {
		getGrade,
		getUserInfo,
		getByUser,
		getPerson2,
		getNullDetail,
		getLocation,
		applicantPost,
		getSchools
	} from '../../service/api.js';

	import {
		getLoginInfo,
		getPhone,
		getToken,
		setUser
	} from '../../js/user.js';

	import { Search,Field,CellGroup, Cell,RadioGroup,Radio } from 'vant';



	export default {
		name: "applicant",
		data() {
			return {
				radio: '',
				loading: false,
				showPlayer: false,
				show: false, // 控制弹框显示
				disabled:false, // 控制输入框可用
				issuccess: false, // 控制成功框框显示
				gameSubject: {}, // 赛事详情
				oldValue:'', // 改变之前的值
				game: {

				},
				grades: [], // 年级
				students: [], // 选手列表数据
				StudentValue:{ // 选择的选手
					person: {},
					grade: {
					},
					className:'',
					identifier:'',
					organization:'',
					school:{}
				},// 选中的选手
				student: {
					person: {},
					grade: {},
				},
				student_index: 0,
				user: {

				},
				user_person: {  // 家长数据
				},
				person: { // 选手
					name: "",
					idCard: "", // 身份证号
					location: "",
					phone: "",
				},
				showGrade: false,
				gradeClass: [],
				gradeValue:{},// 选择的年级
				SchoolValue:{},// 选择的学校
				schooles:["学校1","学校2","学校3","学校4"],
				searchTxt:'', // 学校
				showSchool:false, // 控制选择学校弹框显示
				location: {},
				classValue:'', // 选择的班级
				showClass:false, // 控制选择班级弹框显示
				classes:["1班","2班","3班","4班","5班","6班","7班","8班","9班","10班","11班","12班","13班","14班","15班","16班","17班","18班","19班","20班","21班","22班","23班","24班","25班","26班","27班","28班","29班","30班"],
			}
		},
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[Icon.name]: Icon,
			[Popup.name]: Popup,
			[RadioGroup.name]: RadioGroup,
			[Radio.name]: Radio,
			[Loading.name]: Loading,
			[Search.name]: Search,
			[Cell.name]:Cell,
			[CellGroup.name]:CellGroup,
			[Field.name]:Field
		},
		created() {

			var _this = this;

			// 获取用户信息
			this.user = getLoginInfo();
			let token =  getToken();
			let phone = getPhone();
			// console.log(this.$route.query.gameSubjectId,"gameSubjectId-----gameSubjectId",this.user,token,phone)


			if (_this.user == undefined || _this.user == null) {
				getUserInfo({phone: phone,token: token}).then(function (res) { // 获取用户信息
					_this.user = res.data;
					// 根据用户	person id 获取
					getPerson2( _this.user.person).then(function (res) {
						_this.user_person = res.data;
						// console.log(' _this.user_person=', _this.user_person,res)
					});
					setUser(_this.user);// 获取相关的选手列表
					_this.getStudentList();
				})
			} else {

				// 获取选手
				getPerson2( _this.user.person).then(function (res) {
					_this.user_person = res.data;
				});
				// 获取相关的选手列表
				_this.getStudentList();

			}


			this.getGradeList() // 获取可选择年级列表
			//获取赛事详情
			this.getGameSubject();

			// 获取学校
			this.getSchools();
			// console.log('_this.user_person : ', _this.user_person)
		},

		methods: {
			searchSchool(v){ // 搜索学校
				// console.log(v,'vvvvvv')
			},
			// 获取学校数据
			getSchools(){
				let _this = this;

				getSchools({name:this.searchTxt}).then(function (res) {
					_this.schooles = res.data;
					// console.log('学校数据--',_this.schooles)
				})
			},
			// 选择学校
			getSchool(){
				if(this.disabled){
					return false;
				}
				this.showSchool = true;
			},
			selectSchool(index){
				this.SchoolValue = this.schooles[index];
				this.showSchool = false;
			},
			// 选择班级
			getClass(){
				if(this.disabled){
					return false;
				}
					this.showClass = true;
			},
			changeClass(v){
				this.classValue = v;
				this.showClass = false;
			},
			// cancel affirm 选手弹框取消 确认
			cancel() {
				if(this.oldValue == ''){
					this.person = {};
					this.SchoolValue = {};
					this.gradeValue = {};
					this.StudentValue = {};
					this.classValue = '';
				}

				this.showPlayer = false;
			},
			affirm() {
				this.oldValue = {
					person:this.person,
					SchoolValue:this.school,
					gradeValue:this.grade,
					classValue:this.className,
					StudentValue:this.StudentValue
				}
				this.showPlayer = false;
			},
			// 选择的选手
			changeStudent(v){

				// 对先手信息赋值
				this.person = v.person;
				// // 学校
				this.SchoolValue = v.school;
				// // 年级
				this.gradeValue = v.grade;
				// // 班级
				this.classValue = v.className;
				this.StudentValue = v;
				this.disabled = true;

			},
			// 获取赛事详情
			getGameSubject() {
				let _this = this;
				let gameSubjectId = this.$route.query.gameSubjectId;

				if(gameSubjectId == undefined || gameSubjectId == null || gameSubjectId.trim() == ""){
					// 返回到index 页面
				}
				// 根据 gameSubjectId 获取赛事
				getNullDetail(gameSubjectId).then(function (res) {
					_this.gameSubject = res.data;
					// console.log(res,'ressssss',_this.gameSubject)
					_this.game = _this.gameSubject.game;
					// 根据赛事 id 获取赛事地区
					getLocation(_this.game.identifier).then(function (res) {
						_this.location = res.data;
						// console.log(_this.location);
					})
					// console.log(res,'赛事信息')
				})

			},
			// 获取年级
			changeGrade(index){
				this.gradeValue = this.grades[index];
				this.show = false;
			},
			myModal() { // 修改选手
				this.showPlayer = true;
			},
			toReadyRoom() {
				this.$router.push({ name:'index' })
			},
			// 获取年级
			getGrade() {
				if(this.disabled){
					return false;
				}
				this.show = true;
			},
			// 获取所有的年级列表
			async getGradeList() {
				let data = await getGrade()
				this.grades = data.data;
			},
			//获取选手列表
			getStudentList() {
				let _this = this;
				//用户personId
				let user_person_id = _this.user.person;
				getByUser({	user: user_person_id}).then(function (res) {// 如果返回的数据 有null 数据 则页面会报错
					_this.students = res.data.splice(0,19);
				})

			},
			// 提交资料
			addApplicant(){
				let _this = this;

				this.$set(_this.StudentValue,"person",_this.person);
				this.$set(_this.StudentValue,"grade",_this.gradeValue);
				this.$set(_this.StudentValue,"school",_this.SchoolValue);
				this.$set(_this.StudentValue,"className",_this.classValue);

				let param = {
					student:_this.StudentValue, // 选手
					gameSubject:_this.gameSubject, // 赛事信息
					user_person:_this.user_person // 用户
				}


				applicantPost(param).then(function (res) {
					// 显示 成功弹框
					_this.issuccess = true;
				}).catch(function (res) {
					// console.log(res,'错误')
				})
			}

		},
		watch:{
			searchTxt: function () {
				// 获取学校
				this.getSchools();
			}
		}


	}
</script>

<style  lang="less">
	@import "../../assets/style/mixin.less";


	.app.applicant {
		/*padding: 0 24px;*/
		font-size: 28px;
		background: #fff;
		color: @333;
		.searchBox{
			position: relative;
			height: 600px !important;
			padding-bottom: 40px;
			.search{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100px;
				z-index: 3000;
				background-color: @white;

				h3{
					height: 60px;
					line-height: 60px;
				}
			}
			.data{
				padding-top: 140px;
				padding-bottom: 15px;
				overflow-y: scroll;
				height: 100%;
			}
		}
		.my-container {
			width: 640px;
			height: 480px;
			background: @white;
			overflow-y: scroll;
			border-radius: 15px;
			padding: 20px 20px 20px 50px;
			.van-radio{
				line-height: 40px;
				height: 40px;
			}
			li {
				padding: 20px 0;
				font-size: 30px;
				border-bottom: 1px solid @EEEEEE;
			}
		}
		.bao{
			height: 365px;
			background-image: url("../../assets/images/bao.png");
			background-repeat: no-repeat;
			background-size: 100%;
			padding: 0 24px;
		}
		.area{
			text-align: left;
			/*height: 88px;*/
			line-height: 88px;
			color: @white;
			font-size: 32px;

			i {
				color: #ff6600;
				font-size: 32px;
				margin-right: 4px;
				vertical-align: middle;
			}

			span {
				vertical-align: middle;
			}

			.areaBox {
				margin-left: 12px;
				color: @defaultColor;
			}
		}

		.group {
			text-align: right;
			/*height: 88px;*/
			line-height: 88px;
			color: #fff;
			font-size: 32px;
			.groupBox {
				margin-left: 12px;
				color: @defaultColor;
			}

			.icon {
				margin-right: 4px;
				font-size: 32px;
				color: @defaultColor;
			}
		}

		#triggerBtn {
			width: 701px;
			margin: 0 auto;
			height: 120px;
			line-height: 120px;
			text-align: left;
			padding: 0 20px;
			color: #999;
			.personName{
				color: @blue;
			}
			a {
				display: block;
				text-align: right;
			}
		}

		.box {
			text-align: left;
			height: 88px;
			line-height: 98px;
			font-size: 32px;
			text-align: center;
			span {
				vertical-align: middle;
			}
		}

		.form {
			padding: 24px 25px 24px;

			.item {
				margin-bottom: 30px;

				p {
					width: 100%;
					height: 80px;
					line-height: 80px;
					text-align: left;

					i {
						color: @defaultColor;
					}
				}

				input {
					display: block;
					width: 100%;
					height: 52px;
					line-height: 52px;
					border-bottom: 1px solid @EEEEEE;
					background: @white;
					color: @333;
					font-size: 28px;
				}
			}
		}

		.submit {
			width: 540px;
			height: 72px;
			line-height: 72px;
			border-radius: 72px;
			text-align: center;
			background: @defaultColor;
			color: @white;
			margin: 0 auto;
			margin-top: 80px;
			margin-bottom: 80px;
			font-size: 34px;
		}

		// 提交资料成功 fix success
		.fix {
			position: fixed;
			left: 0px;
			top: 0;
			width: 100%;
			height: 100%;

			.m {
				position: absolute;
				left: 0px;
				top: 0;
				width: 100%;
				height: 100%;
				background: @black;
				opacity: 0.3;
			}

			.success {
				width: 702px;
				height: 748px;
				padding: 23px;
				background: @white;
				border-radius: 15px;
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				z-index: 10;

				.imgBox {
					width: 656px;
					height: 353px;
					margin: 0 auto;

					img {
						width: 100%;
						height: 100%;
					}
				}

				p {
					line-height: 97px;
					font-size: 34px;
				}

				.msg {
					font-size: 32px;
					color: @666;
					height: 117px;
					line-height: 43px;
					text-align: left;
					margin-top: 30px;
				}

				.go {
					width: 540px;
					height: 72px;
					line-height: 72px;
					background: @defaultColor;
					color: #fff;
					font-size: 34px;
					margin: 0 auto;
					margin-top: 30px;
					border-radius: 72px;
				}
			}
		}

		// 选手弹框
		.showPlayer {
			width: 700px;
			min-height: 300px;
			max-height: 700px;
			overflow-y: scroll;
			position: relative;
			z-index: 3200;
			padding: 0 30px;
			padding-top: 100px;
			padding-bottom: 100px;
			.header{
				height: 100px;
				position: fixed;
				left: 0;
				top: 0;
				width: 100%;
				z-index: 100;
				background-color: #fff;
				img {
					position: absolute;
					right: -10px;
					top: 5px;
					width: 200px;
					height: 141px;
					z-index: 120000000;
				}

				h2 {
					height: 100px;
					line-height: 100px;
				}
			}

			.content{
				.van-radio__label{
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding-right: 25px;
				}
			}
			.van-radio {
				height: 34px;
			}

			// cancel affirm
			.btn {
				margin-top: 30px;
				padding-bottom: 30px;
				position: fixed;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 100px;
				background-color: #fff;
			}

			.cancel,
			.affirm {
				display: inline-block;
				.wh(184px, 72px);
				line-height: 72px;
				.border-radius(72px);
				background: @defaultColor;
				color: @white;
				margin-right: 20px;
			}

			.cancel {
				background: @B0B0B0;
			}

		}

		//van-loading
		.van-loading {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			z-index: 2;

			.van-loading__spinner {
				top: 300px;
			}
		}
	}

</style>
