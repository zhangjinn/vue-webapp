import Vue from "vue";
import Router from "vue-router";
import {baseUrl, routerMode} from '../config/env'

Vue.use(Router);

// @ is an alias to /src
const home = r =>require.ensure([],()=>r(require('@/views/home/home')),'home');
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
const TaskDescribe = r => require.ensure([], () => r(require('@/views/TaskDescribe/TaskDescribe')), 'TaskDescribe');
const PartPage = r => require.ensure([], () => r(require('@/views/PartPage/PartPage')), 'PartPage');
const topic = r =>require.ensure([], () => r(require('@/views/topic/topic')), 'topic');
const completeInformation = r=>require.ensure([], () => r(require('@/views/completeInformation/completeInformation')), 'completeInformation');
const EvaluationResult = r =>require.ensure([], () => r(require('@/views/EvaluationResult/EvaluationResult')), 'EvaluationResult');
const taskAssess = r=>require.ensure([], () => r(require('@/views/taskAssess/taskAssess')), 'taskAssess');


const routes=[

	{
		//承载子路由的界面
		path: "/",
		name: "home",
		component: home,
		redirect: "index", //子路由默认加载第一个界面
		children: [
			//发现
			{
				path: "/find",
				name: "find",
				component: find,
				meta: {
					title: '发现',
					fActive: 0
				}
			},
			//动态
			{
				path: "/trends",
				name: "trends",
				component: trends,
				meta: {
					title: '动态',
					fActive: 1
				}
			},
			//预备室
			{
				path: "/index",
				name: "index",
				component: index,
				meta: {
					title: '预备室',
					fActive: 1
				}
			},
			//小组
			{
				path: "/group",
				name: "group",
				component: group,
				meta: {
					title: '小组',
					fActive: 3
				}
			},
			//我的
			{
				path: "/mine",
				name: "mine",
				component: mine,
				meta: {
					title: '我的',
					fActive: 2
				}
			},
		]
	},
	//选手列表页
	{
		path: '/playerList',
		name: "playerList",
		component: playerList,
	},
	//测评
	{
		path: '/taskAssess',
		name: "taskAssess",
		component: taskAssess,

	},
	//测评介绍
	{
		path: '/TaskDescribe',
		name: "TaskDescribe",
		component: TaskDescribe,

	},
	//part模块介绍
	{
		path: '/PartPage',
		name: "PartPage",
		component: PartPage,

	},
	// 练习结果
	{
		path: '/EvaluationResult',
		name: "EvaluationResult",
		component: EvaluationResult,

	},

	//topic 答题
	{
		path: '/topic',
		name: "topic",
		component: topic,

	},
	//测评须知
	{
		path: '/gameInstroduce',
		name: "gameInstroduce",
		component: gameInstroduce,
	},
	// 完善参评信息
	{
		path: '/completeInformation',
		name: "completeInformation",
		component: completeInformation,
	},
	//练习列表页
	{
		path: '/exerciseTaskList',
		name: "exerciseTaskList",
		component: exerciseTaskList
	},

	//报名
	{
		path: "/applicant",
		name: "applicant",
		component: applicant
	},
	//赛事详情
	{
		path: "/gameInfo",
		name: "gameInfo",
		component: gameInfo
	},
	//登录页
	{
		path: '/login',
		name: "login",
		component: login,
	},

	//我的家庭页
	{
		path: '/myFamily',
		name: "myFamily",
		component: myFamily,
	},

	//修改家庭成员页
	{
		path: '/editFamily',
		name: "editFamily",
		component: editFamily,
	},

	//修改选手页
	{
		path: '/editPlayer',
		name: "editPlayer",
		component: editPlayer,
	},

            //登录页
            {
                path: '/',
                name: "login",
                component: login,
            },
            //比赛内容
            {
                path: "/matchTask",
                name: "matchTask",
                component: matchTask,
            },
            //测评结果
            {
                path: "/result",
                name: "result",
                component: result,
            },
            //测评报告
            {
                path: "/report",
                name: "report",
                component: report,
            },

]
export default new Router({
    mode: routerMode,
    base:baseUrl,
    routes:routes
});
