<template>
    <div class="curriculumDetail">
        <div class="good">
            <div class="cover">
                <img src="../../../../assets/images/curriculum2.png" alt="cover">
            </div>
            <div class="price">
                <span>¥</span>{{orderDetail.price}}
            </div>
            <div class="title">
                {{orderDetail.name}}
            </div>
        </div>

        <div class="detail">
            <div class="detailTitle">
                <div class="detailTil">
                    <div class="divide"></div>
                    <span>详情</span>
                </div>
            </div>
            <div class="detailImage">
                <img src="../../../../assets/images/gameSub.png" alt="detailImage">
            </div>
            <div class="detailText" v-if="orderType == 'course'">
                课程是指学校学生所应学习的学科总和及其进程与安排。课程是对教育的目标、教学内容、教学活动方式的规划和设计，
                是教学计划、教学大纲等诸多方面实施过程的总和。广义的课程是指学校为实现培养目标而选择的教育内容及其进程的总和，
                它包括学校老师所教授的各门学科和有目的、有计划的教育活动。狭义的课程是指某一门学科。
            </div>
            <div class="detailText" v-else>
                卡片
            </div>
        </div>
        <div class="buyBtn" @click="goToConfirmOrder">
            <p>立即购买</p>
        </div>
    </div>
</template>

<script>
    import {getOrderDetails} from '../../../../service/husky/api';

    export default {
        name: "curriculumDetail",
        data() {
            return {
                orderType: '',
                orderId: '',
                orderDetail: {},
            }
        },
        created() {
            this.orderType = this.$route.query.type;
            this.orderId = this.$route.query.order;
            this.getDetail();
        },
        methods: {
            async getDetail() {
                let res = await getOrderDetails(this.orderId);
                this.orderDetail = res.data.commodity;
                console.log(this.orderDetail)
            },
            goToConfirmOrder() {
                if (this.orderType == 'card') {
                    this.$router.push({
                        path: '/identity',
                        query: {
                            order: this.orderId,
                        }
                    })
                } else {
                    this.$router.push({
                        path: '/confirmOrder',
                        query: {
                            order: this.orderId,
                        }
                    })
                }

            },

        }
    }
</script>

<style scoped lang="less">
    @import "../../../../assets/style/mixin";

    .curriculumDetail {
        padding-bottom: 98px;
        font-family: PingFang SC;

        .good {
            padding-bottom: 14px;

            .cover {
                width: 750px;
                height: 750px;
            }

            .price {
                height: 56px;
                margin-top: 12px;
                line-height: 56px;
                color: @priceTextColor;
                font-size: 36px;
                padding-left: 25px;
                text-align: left;

                span {
                    font-size: 24px;
                }
            }

            .title {
                height: 56px;
                line-height: 56px;
                font-size: 34px;
                font-weight: bold;
                color: @defaultTitleTextColor;
                text-align: left;
                padding-left: 26px;
            }
        }

        .detail {
            margin-top: 21px;
            padding: 10px 25px;

            .detailTitle {
                padding: 13px 0;

                .detailTil {
                    display: flex;
                    height: 30px;
                    line-height: 30px;
                    font-size: 30px;
                    font-weight: 400;
                    color: @defaultTitleTextColor;

                    .divide {
                        width: 3px;
                        height: 30px;
                        margin-right: 9px;
                        background: @defaultColor;
                    }
                }
            }

            .detailImage {
                width: 703px;
                height: 416px;
                margin-top: 10px;
                padding-top: 16px;
                border-top: 1px solid @lightBorderColor;
            }

            .detailText {
                font-size: 28px;
                color: @defaultTitleTextColor;
                text-indent: 2em;
                line-height: 42px;
                text-align: left;
                padding: 11px 0 12px;
            }
        }

        .buyBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            width: 750px;
            height: 98px;
            bottom: 0;
            left: 0;
            border-top: 1px solid @lightBorderColor;
            background-color: @white;

            p {
                width: 539px;
                height: 72px;
                background-color: @defaultColor;
                color: @white;
                font-size: 34px;
                font-weight: bold;
                line-height: 72px;
                border-radius: 36px;
            }
        }
    }

</style>
