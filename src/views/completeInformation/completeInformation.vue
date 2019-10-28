<template>
	<div class="completeInformation">
		<div class="main" v-title data-title="完善参评信息"></div>
		<div class="header">
			<span class="icon iconfont">&#xe61b;</span>
			<span>完善参评信息</span>
		</div>

		<div class="content">
			<div class="list">
				<p>选手参赛地区:</p>
				<div class="item">
					<span v-if="true" class="value default" @click="showArea()">请选择参赛地区</span>
					<span v-else class="value"> 78778 </span>
					<p class="areaTip"><span class="red">*</span>根据参赛地区，为你推荐更适合的考核内容</p>
				</div>
			</div>
			<div class="list">
				<p>参赛组别:</p>
				<div class="item">
					<span v-if="!group.length" @click="showGroup()" class="value  default">请选择参赛组别</span>
					<span v-else class="value  default" @click="showGroup()">
						<div v-show="true" class="value ">
							<span class="item_list" v-for="(item,index) in group" :key="index">
								{{ item }}
								<span class="icon iconfont close" @click.stop="remove(index)">&#xe63a;</span>
							</span>
						</div>
					</span>

				</div>
			</div>

			
		</div>

		<div class="saveBtn">
			<span>完成</span>
		</div>



		<van-popup v-model="show">
			<div class="selectGroup">
				<h4><span>请选择参赛组别（可多选）</span></h4>

				<div class="box">
					<van-checkbox-group @change="changeItem" v-model="result">
						<div class="groupList" v-for="(item,index) in result1">
							<van-checkbox :name="item" v-model="checkd"> {{item}} </van-checkbox>
						</div>
					</van-checkbox-group>
				</div>
				<div class="btn">
					<span @click="hidePopup()">取消</span>
					<span @click="savePopup()">确定</span>
				</div>
			</div>
		</van-popup>

	<van-area :area-list="areaList" :columns-num="2" title="标题" />
	
	</div>
</template>

<script>
	import {
		Popup
	} from 'vant';
	import {
		Checkbox,
		CheckboxGroup
	} from 'vant';
	import {
		Area
	} from 'vant';

	export default {
		name: 'completeInformation',
		data() {
			return {
				show: false,
				checkd: false,
				result: [],
				result1: ['初中组1', '初中组2', '初中组3', '初中组4', '初中组5', '初中组6'],
				group: [],
				areaList: {
					province_list: {
						110000: '北京市',
						120000: '天津市'
					},
					city_list: {
						110100: '北京市',
						110200: '县',
						120100: '天津市',
						120200: '县'
					},
					county_list: {
						110101: '东城区',
						110102: '西城区',
						110105: '朝阳区',
						110106: '丰台区',
						120101: '和平区',
						120102: '河东区',
						120103: '河西区',
						120104: '南开区',
						120105: '河北区',
					}
				}
			}
		},
		components: {
			[Popup.name]: Popup,
			[Checkbox.name]: Checkbox,
			[CheckboxGroup.name]: CheckboxGroup,
			[Area.name]: Area
		},
		created() {

		},
		methods: {
			// 删除组别
			remove(index) {
				this.group.splice(index, 1);
				this.result.splice(index, 1);
			},
			hidePopup() {
				this.show = false;
			},
			savePopup() {
				this.show = false;
			},
			changeItem(v) {
				this.group = v;
			},
			// 显示选择组别弹框
			showGroup() {
				this.show = true;
			},
			// 选择地区
			showArea() {

			}
		}
	}
</script>

<style scoped lang="less">
	@import "../../assets/style/mixin.less";

	.completeInformation {
		color: #333333;

		.header {
			height: 88px;
			line-height: 88px;
			font-size: 36px;
			border-bottom: 1px solid #E8E8E8;
			margin-bottom: 45px;

			.icon {
				position: absolute;
				left: 24px;
				top: 0;
				font-size: 46px;
			}
		}

		.content {
			width: 702px;
			margin: 0 auto;
			text-align: left;

			.list {
				margin-bottom: 40px;

				.item {
					font-size: 28px;
					color: #333333;

					.default {
						color: #999999;
					}

					.item_list {
						display: inline-block;
						border-radius: 5px;
						padding: 1px 46px 1px 10px;
						background: rgba(253, 234, 190, 1);
						position: relative;
						line-height: 40px;
						height: 40px;
						margin: 0 10px 10px 0;

						.close {
							position: absolute;
							right: 5px;
							top: 0;
							width: 33px;
							text-align: center;
						}

					}

					.value {
						display: block;
						min-height: 60px;
						line-height: 60px;
						border-bottom: 1px solid #E8E8E8;
						padding-left: 20px;
					}

					.value2 {
						border-bottom: 1px solid #fff;
					}

					p {
						height: 60px;
						line-height: 60px;
						font-size: 32px;
					}

					.red {
						color: @defaultColor;
					}

					.areaTip {
						font-size: 24px;
						color: #999999;
						height: 48px;
						line-height: 48px;
					}
				}
			}

		}

		.selectGroup {
			width: 640px;
			padding-bottom: 80px;
			padding-top: 90px;
			position: relative;

			h4 {
				height: 80px;
				line-height: 80px;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				background: #fff;
				z-index: 120;
			}

			.box {
				position: relative;
				max-height: 540px;
				overflow-y: scroll;

				.groupList {
					height: 80px;
					line-height: 80px;
					padding-top: 20px;
					padding-left: 40px;
					font-size: 28px;
				}
			}

			.btn {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 80px;
				line-height: 80px;

				span {
					display: inline-block;
					width: 120px;
					text-align: center;
					background: #fff;
					margin-right: 20px;
					color: @defaultColor;
				}
			}

		}

		.saveBtn {
			margin-top: 260px;

			span {
				display: block;
				width: 540px;
				height: 72px;
				border-radius: 72px;
				line-height: 72px;
				background: @defaultColor;
				color: #fff;
				font-size: 34px;
				margin: 0 auto;
			}
		}
	}
</style>
