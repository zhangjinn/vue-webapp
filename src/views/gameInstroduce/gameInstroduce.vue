<template>
	<div>
		<div class="main" v-title data-title="测评须知"></div>
		<div class="mainContainer" v-html="gameSubject.instructions">

		</div>
	</div>
</template>

<script>
	
	import {
		gameSubject
	} from '../../service/api.js';
	
	export default {
		name: "gameInstroduce",
		data() {
			return {
				gameSubject: {
					instructions: "",
				},
				gameSubjectId: "",
			}
		},
		components: {
			
		},
		created() {
			this.gameSubjectId = '2c9197506deddcce016df13f84690144'; // 测试先写死
			this.init();
		},
		methods: {
			returnPage() {
				
			},
			async init() {
				let _this = this;
				
				let data = await gameSubject(this.gameSubjectId);
				this.gameSubject = data.data;
				this.gameSubject.instructions = decodeURIComponent(this.gameSubject.instructions);
				
				// console.log(data,this.gameSubject,this.gameSubject.instructions)
				
			}
		}
	}
</script>

<style lang="less" scoped>
	.mainContainer {
		padding: 24px 24px 40px 24px;
		text-align: left;
		line-height: 1.5;
		font-size: 28px;
	}
</style>
