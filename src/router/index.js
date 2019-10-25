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
const newPlayer = r =>require.ensure([],()=>r(require('@/views/newPlayer/newPlayer')),'newPlayer');

const myFamily = r =>require.ensure([],()=>r(require('@/views/myFamily/myFamily')),'myFamily');
const newFamilyMembers = r =>require.ensure([],()=>r(require('@/views/newFamilyMembers/newFamilyMembers')),'newFamilyMembers');
const editFamilyMembers = r =>require.ensure([],()=>r(require('@/views/editFamilyMembers/editFamilyMembers')),'editFamilyMembers');

const result = r =>require.ensure([],()=>r(require('@/views/result/result')),'result');
const report = r =>require.ensure([],()=>r(require('@/views/report/report')),'report');
const matchTask = r =>require.ensure([],()=>r(require('@/views/matchTask/matchTask')),'matchTask');


const routes=[

            {
                //承载子路由的界面
                path: "/",
                name: "home",
                component: home,
                redirect: "index", //子路由默认加载第一个界面
                children:[
                    //动态
                    {
                        path: "/trends",
                        name: "trends",
                        component: trends,
                        meta: { title: '动态', }
                    },
                    //发现
                    {
                        path: "/find",
                        name: "find",
                        component: find,
                        meta: { title: '发现' ,fActive:0}
                    },
                    //预备室
                    {
                        path: "/index",
                        name: "index",
                        component: index,
                        meta: { title: '预备室' ,fActive:1}
                    },
                    //小组
                    {
                        path: "/group",
                        name: "group",
                        component: group,
                        meta: { title: '小组' ,}
                    },
                    //我的
                    {
                        path: "/mine",
                        name: "mine",
                        component: mine,
                        meta: { title: '我的' ,fActive:2}
                    },
                ]
            },
            //选手列表页
            {
                path: '/playerList',
                name: "playerList",
                component: playerList,
                meta: { title: '选手列表'}
            },
            //添加选手页
            {
                path: '/editPlayer',
                name: "editPlayer",
                component: editPlayer,
            },
            //修改选手页
            {
                path: '/newPlayer',
                name: "newPlayer",
                component: newPlayer,
            },
            //我的家庭页
            {
                path: '/myFamily',
                name: "myFamily",
                component: myFamily,
            },
            //添加家庭成员页
            {
                path: '/newFamilyMembers',
                name: "newFamilyMembers",
                component: newFamilyMembers,
            },
            //修改家庭成员页
            {
                path: '/editFamilyMembers',
                name: "editFamilyMembers",
                component: editFamilyMembers,
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
