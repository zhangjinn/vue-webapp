<template>
    <div class="userReport" v-wechat-title="this.title">
        <div v-if="reportLists.length>0" class="reportList">
            <van-grid :gutter="12" :border="false" :column-num="2">
                <van-grid-item v-for="(report,index) in reportLists" :key="index">
                    <div class="list" @click="toReportDetails(index)">
                        <img v-if="(index+1)%3==1" src="../../../../assets/images/report1.png" class="img" alt="">
                        <img v-else-if="(index+1)%3==0" src="../../../../assets/images/report3.png" class="img" alt="">
                        <img v-else src="../../../../assets/images/report2.png" class="img" alt="">
                        <div class="msg">
                            <div class="gameScoreBox">
                                <template v-if="report.score != null">
                                    <span class="gameScore">{{report.score}}</span>
                                    <span>分</span>
                                </template>
                                <template v-else>
                                    <span>暂无成绩</span>
                                </template>
                            </div>
                            <div class="performance">测评成绩</div>
                            <div class="gameTime">
                                <span>{{report.time}}</span>
                            </div>

                            <div class="gameTitle">
                                <span>{{report.gameName}}</span>
                            </div>
                            <div class="gameGroup">
                                <span>{{report.matchName}}</span>
                            </div>
                            <div class="name">
                                <span>{{report.student&&report.student.person&&report.student.person.name ? report.student.person.name : ''}}</span>
                            </div>
                        </div>
                    </div>

                </van-grid-item>

            </van-grid>
            <!--  没有更多内容了 -->
            <div class="noMoreContent">
                <noMoreContent noMoreContentShowText="没有更多内容了"></noMoreContent>
            </div>
        </div>
        <div class="nodata" v-else>
            <div>
                <img src="../../../../assets/images/noContent.png" alt="">
            </div>
            <p>暂无测评结果~</p>
        </div>

    </div>
</template>

<script>
    import {Row, Col, Grid, GridItem} from 'vant';
    import noMoreContent from "../../../../components/common/noMoreContent";
    import {getLoginInfo} from "../../../../js/user";
    import {getComment} from "../../../../service/husky/api.js";
    export default {
        name: "reportList",
        data() {
            return {
                title: '测评报告列表',
                reportLists: [],
                user: {},
                subjectLists: [],
                matchList: [],
                task: {}
            }
        },
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Grid.name]: Grid,
            [GridItem.name]: GridItem,
            noMoreContent: noMoreContent
        },
        created() {
            this.user = getLoginInfo();
            this.getReportLists();
        },
        methods: {
            async toReportDetails(index) { // 去报告详情页面
                let execute_id = this.reportLists[index].executeId;
                this.$router.push({
                    path: '/report',
                    query: {
                        execute: execute_id,
                    }
                })
            },
            async getReportLists() { // 获取数据
                let data = {
                    userPerson: this.user.person
                };

                let res = await getComment(data);
                for (let j = 0; j < res.data.length; j++) {
                    this.reportLists.push(res.data[j]);
                }
                if (res.data) {
                    this.reportLists = res.data;
                    for (let i = 0; i < this.reportLists.length; i++) {
                        if (this.reportLists[i].time) {
                            this.reportLists[i].time = new Date(this.reportLists[i].time).format('yyyy-MM-dd');
                        } else {
                            this.reportLists[i].time = '未录入';
                        }
                    }
                }

            },

        }
    }
</script>

<style lang="less">
    @import "../../../../assets/style/mixin";

    .userReport {
        .reportList {
            padding: 24px 0 100px 0;
            color: @333;

            .van-grid-item__content {
                padding: 0;
            }

            .noMoreContent {
                margin-top: 20px;
            }

            .list {
                position: relative;
                width: 100%;
                height: 420px;

                .img {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 6;
                }

                .msg {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10;
                    text-align: left;
                    padding: 24px;
                    font-size: 30px;
                    line-height: 43px;

                    .gameScoreBox {
                        color: @priceTextColor;
                        padding-top: 15px;
                        letter-spacing: 5px;
                        margin-bottom: 28px;

                        span {
                            font-size: 24px;
                        }

                        .gameScore {
                            font-size: 60px;
                        }
                    }

                    .performance {
                        font-size: 24px;
                        color: @noContentTextColor;
                        padding-top: 12px;
                    }

                    .gameTime {
                        font-size: 24px;
                        color: @noContentTextColor;
                        padding-top: 12px;
                    }

                    .gameTitle {
                        padding-top: 12px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .gameGroup {
                        padding-top: 12px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .name {
                        padding-top: 12px;
                    }
                }

            }
        }

        .nodata {
            font-size: 28px;

            img {
                width: 580px;
                height: 360px;
                margin-top: 280px;
            }

            p {
                color: #999;
                margin-top: 20px;
            }
        }
    }

</style>
