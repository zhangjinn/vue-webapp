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
                <span>组别：</span>
                <span class="listMsg">{{ gameSubject.name }}</span>
            </div>
            <div class="list">
                <span>赛区：</span>
                <span class="listMsg">
                    {{location.grandpaName ? location.grandpaName : ''}} &nbsp;
                    {{location.parentName ? location.parentName : ''}} &nbsp;
                    {{location.areaName ? location.areaName : ''}}
                </span>
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
            <span @click="toApplicant()">已阅读</span>
        </div>
    </div>
</template>

<script>
    import {Row, Col, Icon, Tab, Tabs} from 'vant';
    import noContent from '../../../../components/common/noContent';
    import {listByCity, getParent} from '../../../../service/husky/api.js'
    import {getGroup, getGameArea} from '../../../../service/star/api.js'
    import {getStoreStudent} from '../../../../js/user.js';

    export default {
        name: "taskInformation",
        data() {
            return {
                title: '赛事详情',
                active: 0,
                location: {
                    grandpaName: '',
                    parentName: '',
                    areaName: ''
                },
                applicantNum: 0,
                gameSubject: {
                    frontCover: '',
                    detail: '',
                },
                gradeId: '',//年级id
                regionCode: '',//地址编码
                areaId: '', //地址id
                groupList: '', //组别
            }
        },
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            noContent: noContent
        },
        created() {
            let student = getStoreStudent();

            let grade = student.grade.identifier;
            let area = student.person.location;
            if (grade) {
                this.gradeId = grade;
            }
            if (area) {
                this.areaId = area;
            }
            this.getGroup();
        },

        methods: {
            async getParent(id) {
                let areaParam = {
                    areaGuid: id
                };
                let areaStr = await getParent(areaParam);
                this.location = areaStr.data;
            },
            async getGroup() {
                let groupParam = {
                    grade: this.gradeId
                };
                let group = await getGroup(groupParam);
                this.groupList = group.data;
                let cityParam = {
                    regionCode: '',
                    areaGuid: this.areaId,
                    group: this.groupList.identifier,
                };
                // 根据组别和赛区获取赛事
                let game = await listByCity(cityParam);
                if (game.data.length == 0) {
                    this.$router.push({path: "/noGame"})
                } else {
                    this.gameSubject = game.data[0];
                    let gameId = this.gameSubject.game.identifier;
                    let gameRes = await getGameArea(gameId);
                    let gameData = gameRes.data;
                    this.getParent(gameData.location);
                }

            },
            toApplicant() { // 去报名
                this.$router.push({path: "/enrollPage"})
            }
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
            border-bottom: 1px solid #E8E8E8;
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
                background: #90D0DA;
                border-radius: 36px;
                margin: 14px auto;
                color: @white;
                font-size: 34px;
            }

        }
    }

</style>
