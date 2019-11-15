<template>
    <div class="find " v-wechat-title="this.title">
        <van-tabs v-model="active">
            <van-tab title="发现">
                <div class="gameSection">
                    <div class="screening">
                        <div class="tabIntem" @click.prevent.stop="alertMsg()">
                            <span>类型</span>
                            <van-icon name="arrow-down"/>
                        </div>
                        <div class="tabIntem" @click.prevent.stop="secletArea()">
                            <template v-if="choose_city.name">
                                <span>{{choose_city.name}}</span>
                            </template>
                            <template v-else>
                                <span id="chooseCityName">地区</span>
                            </template>
                            <van-icon name="arrow-down"/>
                        </div>
                    </div>
                    <!-- 赛事列表 -->
                    <div class="gameContainer" v-if="gameSubjects.length>0">
                        <div class="item" v-for="(item,index) in gameSubjects" :key="index">
                            <div class="banner" @click.prevent="toGameInfo(index)">
                                <span class="competition">
                                    <span class="competitionA">赛事</span>
                                    <span class="competitionCenter"></span>
                                    <span class="competitionB">{{item.name}}</span>
                                </span>

                                <img v-if="item.frontCover" :src="item.frontCover" alt="">
                                <img v-else src="../../../../assets/images/bn.png" alt="">
                            </div>
                            <div class="apply">
                                <i>{{item.game.name}}-{{item.name}}</i>
                                <span @click.prevent="toApplicant(index)">立即报名</span>
                            </div>
                        </div>

                    </div>
                    <div v-else>
                        <!-- 无数据显示提示信息 -->
                        <noContent noContentShowText="暂无赛事"></noContent>
                    </div>
                </div>

                <van-popup v-model="showArea" position="top">
                    <van-area
                            :area-list="areaList"
                            @cancel="showArea = false"
                            @confirm="confirm"/>
                </van-popup>
            </van-tab>
            <van-tab title="商城">
                <!-- 商品列表	-->
                <commodity-list></commodity-list>
            </van-tab>
        </van-tabs>
    </div>

</template>

<script>

    import {
        getUserInfo,
        getPerson,
        getParent,
        listByCity,
        getArea
    } from '../../../../service/husky/api.js';

    import {Row, Col, Tabs, Tab, Area, Dialog, Popup, Icon} from 'vant';
    import {getLoginInfo} from '../../../../js/user.js';
    import noContent from '../../../../components/common/noContent';
    import CommodityList from '../../../../components/content/commodityList';

    export default {
        name: "find",
        data() {
            return {
                active: 1,
                isActive: false,
                title: '发现',
                showArea: false,
                user: null, // 用户信息
                gameSubjects: [], // 赛事数据
                choose_city: { //  城市名称
                    areaName: ''
                }, // 市地区
                province_index: 99999,
                city_index: 99999,
                areaList: {},
            }
        },
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Popup.name]: Popup,
            [Area.name]: Area,
            [Dialog.name]: Dialog,
            [CommodityList.name]: CommodityList,
            noContent: noContent,
            [Tabs.name]: Tabs,
            [Tab.name]: Tab
        },
        created() {
            var _this = this;
            // 获取省地区
            this.getProvince()
            // 获取用户
            this.user = getLoginInfo();
            if (this.user == undefined || this.user == null) {
                // 设置用户信息
                this.getuserInfo();
            } else {
                _this.defalutGameSubject();
            }

        },
        methods: {
            async getuserInfo() {
                let phone = this.user.phone;
                let token = this.user.user.token;
                let data = await getUserInfo({phone: phone, token: token});
                this.user = data.data;
                // 默认获取赛事对象
                this.defalutGameSubject();
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
                this.showArea = true;
            },
            confirm(data) {
                // 保存城市
                var _this = this;
                this.choose_city = data[1];
                this.showArea = false;
                // 根据所选城市编号 搜索城市的 codeId
                let codeId = this.searchCodeId(this.choose_city.code, this.areaList.codeId);
                // 根据城市搜 赛事
                listByCity({city: codeId}).then(function (res) {
                    _this.gameSubjects = res.data;
                })

            },
            // 根据城市编号 搜索城市的 codeId
            searchCodeId(code, codeIds) {
                var codeId = '';
                for (var key in codeIds) {
                    if (code == key) {
                        codeId = codeIds[key];
                        break;
                    }
                }
                return codeId;
            },
            //获取所有省市区
            getProvince() {
                var _this = this;
                getArea({}).then(function (res) {

                    // areaList province_list city_list county_list
                    _this.areaList.city_list = res.cityList;
                    _this.areaList.province_list = res.provinceList;
                    _this.areaList.county_list = res.countyList;
                    _this.areaList.codeId = res.codeId;
                })


            },
            //默認以定位的城市尋找對於的賽事
            async defalutGameSubject() {
                var _this = this;
                if (this.user.person != undefined) {
                    let id = _this.user.person;
                    getPerson(id).then(function (res) {
                        let person = res.data;
                        // 获取 person 所在的地区
                        getParent({areaGuid: person.location}).then(function (res) {
                            let location = res.data; // 112 location.parentGuid
                            // 根据城市获取赛事
                            listByCity({city: location.parentGuid}).then(function (res) {
                                _this.gameSubjects = res.data;
                            })

                        })

                    })
                }
            },
            //跳转到赛事详情
            toGameInfo(index) {
                let gameSubjectId = this.gameSubjects[index].identifier;

                this.$router.push({
                    path: '/gameInfo',
                    query: {
                        gameSubjectId: gameSubjectId
                    }
                })
            },
            //立即报名转跳到报名页
            toApplicant(index) {
                let gameSubjectId = this.gameSubjects[index].identifier;
                this.$router.push({
                    path: '/applicant',
                    query: {
                        gameSubjectId: gameSubjectId
                    }
                })
            },
        }
    }
</script>

<style lang="less">

    @import "../../../../assets/style/mixin.less";

    .find {
        .wh(100%,100%);
        .van-tabs{
            .wh(100%,100%);
            .van-tabs__wrap {
                position: fixed;
                z-index: 20;
                width: 100%;
                height: 44px;
                line-height: 44px;

                .van-tabs__nav {
                    display: block;
                    text-align: left;
                    padding-left: 15px;
                }

                [class*='van-hairline']::after {
                    border: none !important;
                    display: none;
                }

                .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
                    border-width: 0;
                    display: none;
                }

                .van-tab {
                    font-size: 18px;
                    display: inline-block;
                    margin-right: 20px;
                    color: @aaa;
                    font-weight: 800;
                }

                .van-tab--active {
                    color: @defaultColor;
                    font-size: 18px;
                }

                .van-tabs__line {
                    display: none;
                }
            }
            .van-tabs__content{
                position: absolute;
                z-index: 1;
                top: 44px;
                left: 0;
                bottom: 0;
                width: 100%;
                .van-tab__pane{
                   .wh(100%,100%)
                }
            }
        }

        .gameSection {
            font-size: 28px;
            color: @333;
            padding-top: 88px;
            .screening {
                position: fixed;
                left: 0;
                top: 88px;
                width: 100%;
                z-index: 3;
                background: @white;
                border-bottom: solid 0.01rem @d3d3d3;
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
            .gameContainer {
                padding: 24px;
                .item {
                    width: 702px;
                    height: 426px;
                    margin: 0 auto;
                    background: @white;
                    position: relative;
                    margin-bottom: 24px;
                    box-shadow: 0 0px 0.2rem 0px @d1d1d1;
                    .border-radius(15px);

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
                            top: -2px;
                            height: 48px;
                            background: transparent;
                            color: #fff;
                            line-height: 48px;

                            .competitionA {
                                background-color: #E7BC78;
                                display: inline-block;
                                padding-left: 8px;
                                padding-right: 12px;
                                line-height: 48px;
                                border-radius: 15px 0 0px 0;
                                vertical-align: middle;
                            }

                            .competitionCenter {
                                position: absolute;
                                top: 1px;
                                left: 64px;
                                display: inline-block;
                                width: 0px;
                                height: 0;
                                border-color: #E7BC78 @defaultColor @defaultColor #E7BC78;
                                border-width: 24px 12px 24px 12px;
                                border-style: solid;
                                vertical-align: middle;
                            }

                            .competitionB {
                                background-color: @defaultColor;
                                display: inline-block;
                                vertical-align: middle;
                                line-height: 48px;
                                padding-right: 8px;
                                padding-left: 12px;
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
                            background: @defaultColor;
                            border-radius: 48px;
                            color: @white;
                        }
                    }
                }
            }
        }


        .active {
            color: @defaultColor;
            transition: 1s all;
        }
        .tabHeader {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            z-index: 2;
            font-size: 28px;
            background: @white;
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
        .isArea {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: @white;
            z-index: 30;
        }

    }
</style>
