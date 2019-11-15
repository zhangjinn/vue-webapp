import Vue from "vue";
import Router from "vue-router";
import {baseUrl, routerMode} from '../config/env'

Vue.use(Router);

// @ is an alias to /src
const login = r => require.ensure([], () => r(require('@/views/husky/routerPages/login/login')), 'login');
const find = r => require.ensure([], () => r(require('@/views/husky/routerPages/find/find')), 'find');
const group = r => require.ensure([], () => r(require('@/views/husky/routerPages/group/group')), 'group');
const index = r => require.ensure([], () => r(require('@/views/husky/routerPages/index/index')), 'index');
const mine = r => require.ensure([], () => r(require('@/views/husky/routerPages/mine/mine')), 'mine');
const trends = r => require.ensure([], () => r(require('@/views/husky/routerPages/trends/trends')), 'trends');
const playerList = r => require.ensure([], () => r(require('@/views/husky/routerPages/playerList/playerList')), 'playerList');
const editPlayer = r => require.ensure([], () => r(require('@/views/husky/routerPages/editPlayer/editPlayer')), 'editPlayer');
const applicant = r => require.ensure([], () => r(require('@/views/husky/routerPages/applicant/applicant')), 'applicant');
const gameInfo = r => require.ensure([], () => r(require('@/views/husky/routerPages/gameInfo/gameInfo')), 'gameInfo');
const myFamily = r => require.ensure([], () => r(require('@/views/husky/routerPages/myFamily/myFamily')), 'myFamily');
const editFamily = r => require.ensure([], () => r(require('@/views/husky/routerPages/editFamily/editFamily')), 'editFamily');
const result = r => require.ensure([], () => r(require('@/views/husky/routerPages/result/result')), 'result');
const report = r => require.ensure([], () => r(require('@/views/husky/routerPages/report/report')), 'report');
const matchTask = r => require.ensure([], () => r(require('@/views/husky/routerPages/matchTask/matchTask')), 'matchTask');
const exerciseTaskList = r => require.ensure([], () => r(require('@/views/husky/routerPages/exerciseTaskList/exerciseTaskList')), 'exerciseTaskList');
const gameInstroduce = r => require.ensure([], () => r(require('@/views/husky/routerPages/gameInstroduce/gameInstroduce')), 'gameInstroduce');
const completeInformation = r=>require.ensure([], () => r(require('@/views/husky/routerPages/completeInformation/completeInformation')), 'completeInformation');
const EvaluationResult = r =>require.ensure([], () => r(require('@/views/husky/routerPages/EvaluationResult/EvaluationResult')), 'EvaluationResult');
const taskAssess = r=>require.ensure([], () => r(require('@/views/husky/routerPages/taskAssess/taskAssess')), 'taskAssess');
const curriculum = r=>require.ensure([], () => r(require('@/views/husky/routerPages/curriculum/curriculum')), 'curriculum');
const myCard = r=>require.ensure([], () => r(require('@/views/husky/routerPages/myCard/myCard')), 'myCard');
const activateCard = r=>require.ensure([], () => r(require('@/views/husky/routerPages/activateCard/activateCard')), 'activateCard');
const orderList = r=>require.ensure([], () => r(require('@/views/husky/routerPages/orderList/orderList')), 'orderList');
const curriculumDetail = r=>require.ensure([], () => r(require('@/views/husky/routerPages/curriculumDetail/curriculumDetail')), 'curriculumDetail');
const paymentStatus = r=>require.ensure([], () => r(require('@/views/husky/routerPages/paymentStatus/paymentStatus')), 'paymentStatus');
const confirmOrder = r=>require.ensure([], () => r(require('@/views/husky/routerPages/confirmOrder/confirmOrder')), 'confirmOrder');
const rightList = r=>require.ensure([], () => r(require('@/views/husky/routerPages/rightList/rightList')), 'rightList');
const identity = r=>require.ensure([], () => r(require('@/views/husky/routerPages/identity/identity')), 'identity');

const routes=[
	//默认路径
	{
		path:'/',
		redirect:'/index'
	},
	/*---------------发现页-------------*/
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
	//确认订单
	{
		path: "/confirmOrder",
		name: "confirmOrder",
		component: confirmOrder,
		meta: {title: '确认订单',}
	},
	//课程详情
	{
		path: "/curriculumDetail",
		name: "curriculumDetail",
		component: curriculumDetail,
		meta: {title: '课程详情',}
	},
	//填写身份信息
	{
		path: "/identity",
		name: "identity",
		component: identity,
		meta: {title: '填写身份信息',}
	},
	//支付页面
	{
		path: "/paymentStatus",
		name: "paymentStatus",
		component: paymentStatus,
		meta: {
			title: "支付页面"
		}
	},
	/*---------------动态-------------*/
	//动态
	{
		path: "/trends",
		name: "trends",
		component: trends,
		meta: {
			title: '动态',
		}
	},
	/*---------------预备室-------------*/
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

    /*---------------小组-------------*/
    //小组
    {
        path: "/group",
        name: "group",
        component: group,
        meta: {
            title: '小组',
        }
    },
    /*---------------我的-------------*/
    //我的
    {
        path: "/mine",
        name: "mine",
        component: mine,
        meta: {
            showTab: true,
            title: '我的',
            fActive: 2,
        }
    },
    //选手列表页
    {
        path: '/playerList',
        name: "playerList",
        component: playerList,
        meta: {title: '选手',}
    },
    //我的家庭页
    {
        path: '/myFamily',
        name: "myFamily",
        component: myFamily,
        meta: {title: '我的家庭',}
	},
	//修改选手页
	{
		path: '/editPlayer',
		name: "editPlayer",
		component: editPlayer,
		meta: {title: '选手',}
	},
	//修改家庭成员页
	{
		path: '/editFamily',
		name: "editFamily",
		component: editFamily,
		meta: {title: '编辑家庭',}
	},

	//我的课程
	{
		path: "/curriculum",
		name: "curriculum",
		component: curriculum,
		meta: {
			title: "我的课程"
		}
	},
	//订单
	{
		path: '/orderList',
		name: "orderList",
		component: orderList,
		meta: {title: '我的订单',}
	},
	//权益
	{
		path: '/rightList',
		name: "rightList",
		component: rightList,
		meta: {title: '我的权益',}
	},
	//我的卡片
	{
		path: "/myCard",
		name: "myCard",
		component: myCard,
		meta: {
			title: "我的卡片"
		}
	},
	/*---------------登录页-------------*/
	//登录页
	{
		path: '/login',
		name: "login",
		component: login,
		meta: {title: '登录',}
	},

	//激活卡片
	{
		path: '/activateCard',
		name: "activateCard",
		component: activateCard,
		meta: {title: '激活卡片',}
	},

];
export default new Router({
    mode: routerMode,
    base: baseUrl,
    routes: routes
});
