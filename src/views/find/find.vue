<template>
	<div id="app" v-cloak>
		<div class="main" v-title data-title="发现"></div>
		<div class="tabHeader">
			<a href="javascript:;" data-target="local" class="listA active">
				<span>发现</span>
			</a>
		</div>
		<div class="section">
			<div class="screening">
				<div class="tabIntem" @click.prevent.stop="alertMsg()">
					<span>类型</span>
					<van-icon name="arrow-down" />
				</div>
				<div class="tabIntem" @click.prevent.stop="secletArea()">
					<template v-if="choose_city.name">
						<span>{{choose_city.name}}</span>
					</template>
					<template v-else>
						<span id="chooseCityName">地区</span>
					</template>
					<van-icon name="arrow-down" />
				</div>
			</div>
			<!-- 赛事列表 -->
			<div class="container">
				<div class="item" v-for="(item,index) in gameSubjects">
					<div class="banner" @click.prevent="toGameInfo(index)">
						<span class="competition">
							<span class="competitionA">赛事</span>
							<i></i>
							<span class="competitionB">{{item.name}}</span>
						</span>

						<img v-if="item.frontCover" :src="item.frontCover" alt="">
						<img v-else src="../../assets/images/bn.png" alt="">
					</div>
					<div class="apply">
						<i>{{item.game.name}}-{{item.name}}</i>
						<span @click.prevent="toApplicant(index)">立即报名</span>
					</div>
				</div>

			</div>
		</div>


		<div class="isArea" v-show="isArea">
			<van-area :area-list="areaList" visible-item-count="8" columns-num="2" :columns-placeholder="['请选择', '请选择', '请选择']" title="请选择地区"  @cancel="cancel"
			 @confirm="confirm" />
		</div>

		
	</div>

</template>
<!--  <script type="text/javascript" th:src="@{/husky/plugins/js/citySelect.js}"></script> -->
<script>
	// import citySelect from '';
	import {
		Row,
		Col
	} from 'vant';
	import {
		Icon
	} from 'vant';
	import {
		getFoodTypes,
		getUserInfo,
		getPerson,
		getParent,
		gameSubject,
		listByCity,
		getArea
	} from '../../service/api.js';

	import {
		Area
	} from 'vant';
	import {
		Dialog
	} from 'vant';

	import {
		getLoginInfo
	} from '../../js/user.js';


	export default {
		name: "find",
		data() {
			return {
				isArea: false,
				user:null, // 用户信息
				gameSubjects: [], // 赛事数据
				choose_city: { //  城市名称
					areaName: ''
				}, // 市地区
				province_index: 99999,
				city_index: 99999,
				imgSrc: "http://data.husky.etmcn.com/",
				areaList: {
					province_list: {
						110000: "北京市",
						120000: "天津市"
					},
					city_list: {
						110100: "北京市",
						110200: "县",
						120100: "天津市",
						120200: "县"
					},
					county_list: {
						110101: "东城区",
						110102: "西城区",
						110105: "朝阳区",
						110106: "丰台区",
						120101: "和平区",
						120102: "河东区",
						120103: "河西区",
						120104: "南开区",
					},
					codeId:[]
				}

			}
		},
		components: {
			[Row.name]: Row,
			[Col.name]: Col,
			[Icon.name]: Icon,
			[Area.name]: Area,
			[Dialog.name]: Dialog
		},
		created() {
			var _this = this;
			this.infoGet()
			// 获取省地区
			this.getProvince()
			// 获取用户
			this.user = getLoginInfo();
			
			console.log(this.user, '用户信息')
			if (this.user == undefined || this.user == null) {
				// 设置用户信息
				this.getuserInfo();
			} else {
				_this.defalutGameSubject();
			}

		},
		methods: {
			async infoGet() {
				let aa = await getFoodTypes();
				console.log(aa)

			},
			async getuserInfo(){
				let phone = this.user.phone;
				let token = this.user.user.token;
				
				let data = await getUserInfo({phone:phone,token:token});
				this.user = data.data;
				
				// 设置用户
				
				// 默认获取赛事对象
				this.defalutGameSubject();
				
				console.log(data,'777--------')
			},
			alertMsg() {
				Dialog.alert({
					title: '',
					message: '正在玩命开发中'
				}).then(() => {
					// on close
				});
			},
			secletArea() { // 选择地区
				this.isArea = true;
			},
			cancel() {
				this.isArea = false;
			},
			confirm(data) {
				// 保存城市
				var _this = this;

				this.choose_city = data[1];
				this.isArea = false;
				// console.log('当前选择的城市',data)

				// 根据所选城市编号 搜索城市的 codeId

				let codeId = this.searchCodeId(this.choose_city.code,this.areaList.codeId);
				console.log(codeId,'codeId')
				// 根据城市搜 赛事
				listByCity({city:codeId}).then(function (res) {
					_this.gameSubjects = res.data;
					// console.log(res,'根据所选城市搜索的赛事')
				})

			},
			// 根据城市编号 搜索城市的 codeId
			searchCodeId(code,codeIds){
					var codeId = '';
					for (var key in codeIds)
					{
						if(code == key){
							codeId = codeIds[key];
							break;
						}
					}
					return codeId;
			},
			//获取所有省市区
			getProvince() {
				var _this = this;
				// this.$http.get("http://husky.etmcn.com/game/api" + "/area/provinceAndCity").then(function(data) {
				// 	var data = data.data;
				// 	// console.log(data, '省数据')
				// 	for (var i = 0; i < data.length; i++) {
				//
				// 	}
				// })

				getArea({}).then(function (res) {
					console.log(res,'地区0000')

					// areaList province_list city_list county_list
					_this.areaList.city_list = res.cityList;
					_this.areaList.province_list = res.provinceList;
					_this.areaList.county_list = res.countyList;
					_this.areaList.codeId = res.codeId;
				})


			},
			//根据省获取市
			getCity(index) {
				
			},
			//根据城市获取对应的赛事列表
			gameSubjectByCity(city) {
				
			},
			//默認以定位的城市尋找對於的賽事
			async defalutGameSubject() {
				
				var _this = this;
				console.log('_this.user----' , _this.user,'_this.user.user.person')
				
				if (this.user.user.person != undefined) {
					
					let id = _this.user.user.person;

					
					getPerson(id).then(function(res){
							let person = res.data;
						// 获取 person 所在的地区
						getParent({areaGuid:person.location}).then(function (res) {
							let location = res.data; // 112 location.parentGuid
								// 根据城市获取赛事
							listByCity({city:location.parentGuid}).then(function (res) {
								_this.gameSubjects = res.data;
								console.log(res,'9999999999')
							})

						})

					})
					

					console.log('person----787888889999999',_this.user,id)
					
				}
				

			},
			//选择城市获取对应的赛事列表
			chooseCity(index) {
				
			},
			//跳转到赛事详情
			toGameInfo(index) {
				let gameSubjectId = this.gameSubjects[index].identifier;

				this.$router.push({
					name: 'gameInfo',
					query: {
						gameSubjectId: gameSubjectId
					}
				})
			},
			//立即报名转跳到报名页
			toApplicant(index) {
				let gameSubjectId = this.gameSubjects[index].identifier;
				this.$router.push({
					name: 'applicant',
					query: {
						gameSubjectId: gameSubjectId
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.active {
		color: #FF6600;
		transition: 1s all;
	}

	.tabHeader {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 2;
		font-size: 28px;
		background: #fff;
		width: 100%;
		padding-left: 0.3rem;
		height: 88px;
		line-height: 88px;
		.active;
		font-size: 36px;
		text-align: left;

		.listA {
			display: inline-block;
			text-align: center;
			margin-left: 23px;

			span {
				font-weight: 700 !important;
			}
		}
	}

	.section {
		font-size: 28px;
		color: #333333;
		padding-top: 176px;

		.screening {
			position: fixed;
			left: 0;
			top: 88px;
			width: 100%;
			z-index: 3;
			background: #fff;
			border-bottom: solid 0.01rem #d3d3d3;
			display: flex;
			width: 100%;
			height: 88px;
			line-height: 88px;

			.tabIntem {
				width: 50%;

				span,
				i {
					vertical-align: middle;
					margin-left: 3px;
				}
			}
		}
	}


	.isArea {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 10;
	}

	.container {
		padding: 24px;

		.item {
			width: 702px;
			height: 426px;
			margin: 0 auto;
			background: #fff;
			position: relative;
			margin-bottom: 24px;
			box-shadow: 0 0px 0.2rem 0px #d1d1d1;

			.banner {
				width: 702px;
				height: 320px;
				margin: 0 auto;
				position: relative;

				img {
					width: 100%;
					height: 100%;
					border-radius: 15px 15px 0 0;
				}

				.competition {
					position: absolute;
					left: 8px;
					top: -4px;
					height: 48px;
					background: transparent;
					color: #fff;
					line-height: 48px;

					.competitionA{
						background-color: #E7BC78;
						display: inline-block;
						padding-left: 8px;
						border-radius: 15px 0 0px 0;
						vertical-align: middle;
					}
					i{
						display: inline-block;
						width: 0px;
						height: 0;
						border-color: #E7BC78 #ff6600 #ff6600 #E7BC78;
						border-width: 24px  12px 24px 12px;
						border-style: solid;
						vertical-align: middle;
					}
					.competitionB{
						background-color: #FF6600;
						display: inline-block;
						vertical-align: middle;
						padding-right: 8px;
						border-radius: 0 0 15px 0;

					}
				}
			}

			.apply {
				width: 702px;
				margin: 0 auto;
				height: 88px;
				line-height: 88px;
				text-align: left;
				position: relative;

				i {
					margin-left: 6px;
					display: inline-block;
					width: 480px;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				span {
					position: absolute;
					right: 16px;
					top: 20px;
					width: 180px;
					height: 48px;
					text-align: center;
					line-height: 48px;
					background: #FF6600;
					border-radius: 48px;
					color: #fff;
				}
			}
		}
	}
</style>
