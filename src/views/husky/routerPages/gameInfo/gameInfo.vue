<template>
    <div class="app" v-wechat-title="this.title">
        <div class="article">
            <div class="top">
                <div class="m"></div>
                <div class="imgBox">
                    <img v-if="gameSubject.frontCover" :src="gameSubject.frontCover">
                    <img v-else src="../../../../assets/images/Backgroundpicture.png"/>
                </div>
                <p class="imgBoxClild">
                    <img v-if="gameSubject.frontCover" :src="gameSubject.frontCover">
                    <img v-else src="../../../../assets/images/Backgroundpicture.png"/>
                </p>
            </div>
        </div>
        <div class="particulars">
            <h3> {{ gameSubject.game && gameSubject.game.name ? gameSubject.game.name : "" }} </h3>
            <div class="list">
                <van-row>
                    <van-col span="15">
                        <div>
                            <span>组别 :</span>
                            <span class="gameSubject">{{ gameSubject.name }}</span>
                        </div>
                    </van-col>
                    <van-col span="9">
                        <div class="pull-right">
                            <span>参与：</span>
                            <span>{{ applicantNum }}人</span>
                        </div>
                    </van-col>
                </van-row>

            </div>
            <div class="list">
                <span class="icon iconfont">&#xe637;</span>
                <span>报名时间：</span>
                <span class="listMsg" v-if="gameSubject.applicantStartDate&&gameSubject.applicantEndDate">{{dateFormat(gameSubject.applicantStartDate)}} - {{dateFormat(gameSubject.applicantEndDate)}}</span>
                <span class="listMsg" v-else>未设置</span>
            </div>
            <div class="list">
                <van-icon name="location-o"/>
                <span>地区：</span>
                <span class="listMsg"> {{location.grandpaName}} &nbsp;{{location.parentName}} &nbsp;{{location.areaName}} </span>
            </div>
        </div>
        <div class="tab">
            <van-tabs v-model="active">
                <van-tab title="详情">
                    <div v-if="gameSubject.detail" class="tabContent"
                         v-html="$options.filters.decodeHtml(gameSubject.detail)">

                    </div>
                    <div v-else>
                        <noContent noContentShowText="暂无详情数据"></noContent>
                    </div>
                </van-tab>
                <van-tab title="须知">
                    <div v-if="gameSubject.instructions" class="tabContent"
                         v-html="$options.filters.decodeHtml(gameSubject.instructions)">

                    </div>
                    <div v-else>
                        <noContent noContentShowText="暂无须知数据"></noContent>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <div class="distance">
            <span @click="toApplicant()">立即报名</span>
        </div>
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
        Tab,
        Tabs,
        Dialog
    } from 'vant';

    import {
        gameSubject,
        getNum,
        getLocation
    } from '../../../../service/husky/api.js';

    import noContent from '../../../../components/common/noContent';

    export default {
        name: "gameInfo",
        data() {
            return {
                title: '赛事详情',
                active: 0,
                location: {},
                applicantNum: 0,
                gameSubject: {
                    applicantStartDate: '',
                    applicantEndDate: '',
                    detail: '',

                },
            }
        },
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Dialog.name]: Dialog,
            noContent: noContent
        },
        created() {
            this.getGameInfo();

        },

        methods: {
            toApplicant() { // 去报名
                let gameSubject = this.gameSubject;
                let startDate = new Date(gameSubject.applicantStartDate);
                let endDate = new Date(gameSubject.applicantEndDate);
                let nowDate = new Date();
                if(nowDate - startDate <= 0){
                    Dialog.alert({
                        message:'赛事报名时间未开始'
                    })
                    return;
                }
                if(nowDate - endDate >= 0){
                    Dialog.alert({
                        message:'赛事报名时间已结束'
                    })
                    return;
                }
                if(gameSubject.enable == false){
                    Dialog.alert({
                        message:'赛事暂时不能报名'
                    })
                    return;
                }
                if(gameSubject.open == false){
                    Dialog.alert({
                        message:'赛事已经下架'
                    })
                    return;
                }
                let gameSubjectId = gameSubject.identifier;
                this.$router.push({
                    path: '/applicant',
                    query: {
                        gameSubjectId: gameSubjectId
                    }
                })
                this.$router.push({
                    path: '/applicant',
                    query: {
                        gameSubjectId: gameSubjectId
                    }
                })

            },
            async getGameInfo() { // 获取赛事详情

                let gameSubjectId = this.$route.query.gameSubjectId; // this.$route.query.gameSubjectId  2c9197506deddcce016df13f84690144 每个赛事详情id

                let gameObj = await gameSubject(gameSubjectId);
                this.gameSubject = gameObj.data;
                let location = await getLocation(this.gameSubject.game.identifier);
                this.location = location.data;


                let applicantNum = await getNum({gameSubjectId: gameSubjectId});
                this.applicantNum = applicantNum.data;

            },
            // 格式化时间
            dateFormat: function (time) {
                return new Date(time).format("yyyy/MM/dd");
            },
        },
        // 过滤器
        filters: {
            decodeHtml: function (value) {
                return decodeURIComponent(value);
            }
        }

    }
</script>

<style lang="less">
    @import "../../../../assets/style/mixin.less";

    .app {
        color: @333;
        font-size: 28px;


        .gameSubject {
            margin-left: 12px;
        }

        .tab {
            border-bottom: 1px solid @white-dark;
            padding-bottom: 20px;
            min-height: 550px;
            width: 700px;
            margin: 0 auto;
            margin-top: 20px;
            margin-bottom: 30px;

            .van-tab--active {
                color: @defaultColor;
            }

            .van-tabs__line {
                width: 24px !important;
                background-color: @defaultColor;
                height: 2px;
            }
        }

        .top {
            position: relative;

            .m {
                width: 100%;
                height: 100%;
                background: @black;
                opacity: 0.2;
                position: absolute;
                z-index: 1;
            }

            .van-tab {
                font-size: 32px;
            }


            .imgBoxClild {
                width: 700px;
                height: 380px;
                position: absolute;
                z-index: 10;
                left: 0;
                right: 0;
                top: 148px;
                margin: auto;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 15px;
                }
            }

            .imgBox {
                width: 100%;
                height: 400px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .tabContent {
            min-height: 360px;
            width: 710px;
            margin: 0 auto;
            margin-top: 33px;
            text-align: left;
            padding-bottom: 150px;
            line-height: 1.8;
        }

        .particulars {
            padding-top: 139px;

            h3 {
                font-size: 34px;
                height: 70px;
                line-height: 70px;
                text-align: left;
                padding-left: 25px;
                font-weight: 700;
            }

            .list {
                text-align: left;
                width: 701px;
                margin: 0 auto;
                height: 60px;
                line-height: 60px;

                .pull-right {
                    text-align: right;
                }

                i,
                span.icon {
                    font-size: 32px;
                    color: @defaultColor;
                    margin-right: 10px;
                }

                span.listMsg {
                    margin-left: 10px;
                }
            }
        }

        .distance {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            background: @white;

            span {
                display: block;
                width: 540px;
                height: 72px;
                line-height: 72px;
                background: @defaultColor;
                border-radius: 36px;
                margin: 14px auto;
                color: @white;
                font-size: 34px;
            }

        }
    }

</style>
