import Vue from "vue";
import Router from "vue-router";
import {baseUrl, routerMode} from '../config/env'

Vue.use(Router);
// @ is an alias to /src
const index = r => require.ensure([], () => r(require('@/views/star/routerPages/index/index')), 'index');
const mine = r => require.ensure([], () => r(require('@/views/star/routerPages/mine/mine')), 'mine');
const playerList = r => require.ensure([], () => r(require('@/views/star/routerPages/playerList/playerList')), 'playerList');
const reportList = r => require.ensure([], () => r(require('@/views/star/routerPages/reportList/reportList')), 'reportList');
const editPlayer = r => require.ensure([], () => r(require('@/views/star/routerPages/editPlayer/editPlayer')), 'editPlayer');
const enrollPage = r => require.ensure([], () => r(require('@/views/star/routerPages/enrollPage/enrollPage')), 'enrollPage');
const taskInformation = r => require.ensure([], () => r(require('@/views/star/routerPages/taskInformation/taskInformation')), 'taskInformation');
const login = r => require.ensure([], () => r(require('@/views/star/routerPages/login/login')), 'login');
const gameInstroduce = r => require.ensure([], () => r(require('@/views/husky/routerPages/gameInstroduce/gameInstroduce')), 'gameInstroduce');
const taskAssess = r => require.ensure([], () => r(require('@/views/husky/routerPages/taskAssess/taskAssess')), 'taskAssess');
const result = r => require.ensure([], () => r(require('@/views/husky/routerPages/result/result')), 'result');
const report = r => require.ensure([], () => r(require('@/views/husky/routerPages/report/report')), 'report');
const activateCard = r => require.ensure([], () => r(require('@/views/star/routerPages/activateCard/activateCard')), 'activateCard');
const curriculumDetail = r => require.ensure([], () => r(require('@/views/star/routerPages/curriculumDetail/curriculumDetail')), 'curriculumDetail');
const noGame = r => require.ensure([], () => r(require('@/views/star/routerPages/noGame/noGame')), 'noGame');
const matchTask = r => require.ensure([], () => r(require('@/views/husky/routerPages/matchTask/matchTask')), 'matchTask');
const taskReturn = r => require.ensure([], () => r(require('@/views/husky/routerPages/taskReturn/taskReturn')), 'taskReturn');


const routes = [
    //默认路径
    {
        path: '/',
        redirect: '/index'
    },
    /*---------------预备室-------------*/
    //预备室
    {
        path: "/index",
        name: "index",
        component: index,
        meta: {
            showTab: true,
            title: '测评首页',
            fActive: 0,
        }
    },
    //比赛内容
    {
        path: "/gameInstroduce",
        name: "gameInstroduce",
        component: gameInstroduce,
        meta: {
            title: '比赛内容',
        }
    },
    //测评
    {
        path: "/taskAssess",
        name: "taskAssess",
        component: taskAssess,
        meta: {
            title: '测评',
        }
    },
    //测评后退提示
    {
        path: "/taskReturn",
        name: "taskReturn",
        component: taskReturn,
        meta: {
            title: '提示',
        }
    },
    //激活
    {
        path: "/activateCard",
        name: "activateCard",
        component: activateCard,
        meta: {
            title: '激活卡片',
        }
    },
    //激活
    {
        path: "/activateCard",
        name: "activateCard",
        component: activateCard,
        meta: {
            title: 'ceshi',
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
            fActive: 1,
        }
    },
    //选手列表
    {
        path: "/playerList",
        name: "playerList",
        component: playerList,
        meta: {title: '选手'}
    },
    //完善选手信息
    {
        path: "/editPlayer",
        name: "editPlayer",
        component: editPlayer,
        meta: {title: '选手'}
    },
    //确认报名
    {
        path: "/enrollPage",
        name: "enrollPage",
        component: enrollPage,
        meta: {
            title: '确认报名',
        }
    },
    //赛事详情
    {
        path: "/taskInformation",
        name: "taskInformation",
        component: taskInformation,
        meta: {
            title: '赛事详情',
        }
    },
    //比赛空白页面
    {
        path: "/matchTask",
        name: "matchTask",
        component: matchTask,
        meta: {
            title: '比赛内容',
        }
    },
    //测评报告
    {
        path: "/reportList",
        name: "reportList",
        component: reportList,
        meta: {title: '测评报告'}
    },
    //测评结果
    {
        path: "/result",
        name: "result",
        component: result,
        meta: {title: '报告详情'}
    },
    //报告详情
    {
        path: "/report",
        name: "report",
        component: report,
        meta: {title: '报告详情'}
    },
    //课程详情页
    {
        path: "/curriculumDetail",
        name: "curriculumDetail",
        component: curriculumDetail,
        meta: {title: '课程详情页'}
    },
    //无赛事提醒
    {
        path: "/noGame",
        name: "noGame",
        component: noGame,
        meta: {title: '无赛事页'}
    },
    //登录验证
    {
        path: "/login",
        name: "login",
        component: login,
        meta: {
            title: '登录验证',
        }
    },

];
export default new Router({
    mode: routerMode,
    base: baseUrl,
    routes: routes
});
