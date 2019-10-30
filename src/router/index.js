import Vue from "vue";
import Router from "vue-router";
import {baseUrl, routerMode} from '../config/env'

Vue.use(Router);

// @ is an alias to /src
const login = r =>require.ensure([],()=>r(require('@/views/login/login')),'login');
const find = r =>require.ensure([],()=>r(require('@/views/find/find')),'find');
const group = r =>require.ensure([],()=>r(require('@/views/group/group')),'group');
const index = r =>require.ensure([],()=>r(require('@/views/index/index')),'index');
const mine = r =>require.ensure([],()=>r(require('@/views/mine/mine')),'mine');
const trends = r =>require.ensure([],()=>r(require('@/views/trends/trends')),'trends');
const playerList = r =>require.ensure([],()=>r(require('@/views/playerList/playerList')),'playerList');
const editPlayer = r =>require.ensure([],()=>r(require('@/views/editPlayer/editPlayer')),'editPlayer');
const applicant = r =>require.ensure([],()=>r(require('@/views/applicant/applicant')),'applicant');
const gameInfo = r =>require.ensure([],()=>r(require('@/views/gameInfo/gameInfo')),'gameInfo');
const myFamily = r => require.ensure([], () => r(require('@/views/myFamily/myFamily')), 'myFamily');
const editFamily = r => require.ensure([], () => r(require('@/views/editFamily/editFamily')), 'editFamily');

const result = r => require.ensure([], () => r(require('@/views/result/result')), 'result');
const report = r => require.ensure([], () => r(require('@/views/report/report')), 'report');
const matchTask = r => require.ensure([], () => r(require('@/views/matchTask/matchTask')), 'matchTask');
const exerciseTaskList = r => require.ensure([], () => r(require('@/views/exerciseTaskList/exerciseTaskList')), 'exerciseTaskList');
const gameInstroduce = r => require.ensure([], () => r(require('@/views/gameInstroduce/gameInstroduce')), 'gameInstroduce');
const completeInformation = r=>require.ensure([], () => r(require('@/views/completeInformation/completeInformation')), 'completeInformation');
const EvaluationResult = r =>require.ensure([], () => r(require('@/views/EvaluationResult/EvaluationResult')), 'EvaluationResult');
const taskAssess = r=>require.ensure([], () => r(require('@/views/taskAssess/taskAssess')), 'taskAssess');


const routes=[
	//默认路径
	{
		path:'/',
		redirect:'/index'
	},
	//发现
	{
		path: "/find",
		name: "find",
		component: find,
		meta: {
			showTab:true,
			title: '发现',
			fActive: 0,
		}
	},
	//动态
	{
		path: "/trends",
		name: "trends",
		component: trends,
		meta: {
			title: '动态',
		}
	},
	//预备室
	{
		path: "/index",
		name: "index",
		component: index,
		meta: {
			showTab:true,
			title: '预备室',
			fActive: 1,
		}
	},
	//小组
	{
		path: "/group",
		name: "group",
		component: group,
		meta: {
			title: '小组',
		}
	},
	//我的
	{
		path: "/mine",
		name: "mine",
		component: mine,
		meta: {
			showTab:true,
			title: '我的',
			fActive: 2,
		}
	},
	//选手列表页
	{
		path: '/playerList',
		name: "playerList",
		component: playerList,
		meta: {title: '选手列表',}
	},
	//测评
	{
		path: '/taskAssess',
		name: "taskAssess",
		component: taskAssess,
		meta: {title: '测评',}
	},
	// 练习结果
	{
		path: '/EvaluationResult',
		name: "EvaluationResult",
		component: EvaluationResult,
		meta: {title: '练习结果',}

	},
	//测评须知
	{
		path: '/gameInstroduce',
		name: "gameInstroduce",
		component: gameInstroduce,
		meta: {title: '测评须知',}
	},
	// 完善参评信息
	{
		path: '/completeInformation',
		name: "completeInformation",
		component: completeInformation,
		meta: {title: '完善参评信息',}
	},
	//练习列表页
	{
		path: '/exerciseTaskList',
		name: "exerciseTaskList",
		component: exerciseTaskList,
		meta: {title: '练习列表',}
	},
	//报名
	{
		path: "/applicant",
		name: "applicant",
		component: applicant,
		meta: {title: '报名',}
	},
	//赛事详情
	{
		path: "/gameInfo",
		name: "gameInfo",
		component: gameInfo,
		meta: {title: '赛事详情',}
	},

	//我的家庭页
	{
		path: '/myFamily',
		name: "myFamily",
		component: myFamily,
		meta: {title: '我的家庭',}

	},

	//修改家庭成员页
	{
		path: '/editFamily',
		name: "editFamily",
		component: editFamily,
		meta: {title: '编辑家庭',}
	},

	//修改选手页
	{
		path: '/editPlayer',
		name: "editPlayer",
		component: editPlayer,
		meta: {title: '编辑选手',}
	},

	//比赛内容
	{
		path: "/matchTask",
		name: "matchTask",
		component: matchTask,
		meta: {title: '比赛内容',}
	},
	//测评结果
	{
		path: "/result",
		name: "result",
		component: result,
		meta: {title: '测评结果',}
	},
	//测评报告
	{
		path: "/report",
		name: "report",
		component: report,
		meta: {title: '测评报告',}
	},

	//登录页
	{
		path: '/login',
		name: "login",
		component: login,
		meta: {title: '登录',}
	},
];
export default new Router({
	mode: routerMode,
	base:baseUrl,
	routes:routes
});
