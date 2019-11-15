<template>
    <div class="reportPage" v-wechat-title="this.title">
        <div class="reportList" v-for="(item,index) in report" :key="index">
            <div class="reportTop">
                <div class="reportTitle">{{item.name}} 得分</div>
                <div class="result">
                    <van-row>
                        <van-col span="6">
                            <p><span class="icon iconfont icontimu"></span>考试题数</p>
                            <p class="mTop"><span class="mainColor">{{item.num}}</span>道</p>
                        </van-col>
                        <van-col span="6" offset="12">
                            <p v-if="index == 0"><span class="icon iconfont icondefen"></span>总得分</p>
                            <p v-else><span class="icon iconfont icondefen"></span>得分</p>
                            <p class="mTop"><span class="mainColor">{{item.score}}</span>分</p>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div class="reportBottom" v-if="item.comment != null">
                <p class="comment">
                    {{item.comment}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {Row, Col} from 'vant';
    import {getComment} from '../../../../service/husky/api.js'

    export default {
        data() {
            return {
                title: '测评报告',
                report: [],
            }

        },
        components: {
            [Row.name]: Row,
            [Col.name]: Col
        },
        created() {
            let executeId = this.$route.query.execute;
            this.getData(executeId);
        },
        methods: {
            async getData(executeId) {
                let res = await getComment({}, executeId);
                this.report = res.data;
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../assets/style/mixin";

    .reportPage {
        padding: 24px;
        text-align: left;

        .reportList {
            margin-bottom: 24px;
            border-radius: 16px;
            overflow: hidden;

            .reportTop {
                padding: 0 24px;
                background: @white;

                .reportTitle {
                    height: 88px;
                    font-size: 32px;
                    color: #333;
                    line-height: 88px;
                    border-bottom: 2px solid #eee;
                }

                .result {
                    padding: 20px 0;
                    font-size: 28px;
                    color: #999;
                    text-align: center;

                    .icon {
                        font-size: 32px;
                    }

                    .mTop {
                        margin-top: 12px;
                        height: 60px;
                        line-height: 60px;

                        .mainColor {
                            color: @defaultColor;
                            font-size: 40px;
                        }
                    }

                }
            }

            .reportBottom {
                padding: 24px;
                color: @white;
                font-size: 32px;
                background: @defaultColor;
            }
        }
    }
</style>
