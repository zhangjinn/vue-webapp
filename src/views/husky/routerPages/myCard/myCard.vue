<template>
    <div class="myCard">
        <div v-wechat-title="title"></div>
        <div class="content">
            <van-collapse v-model="activeName" accordion :border="false">
                <div class="card" v-for="(data, index) in dataList" :key="index">
                    <van-collapse-item :border="false" :name="index">
                        <div slot="title">
                            <h5>{{ data.cardName }}</h5>
                            <p>{{ data.agent }}</p>
                        </div>
                        <div class="equity">
                            <div class="equityTitle">
                                <div class="divide"></div>
                                <span>卡片权益</span>
                            </div>
                            <div :class="{equityContent: true, equityUsed: item.isUsed}" v-for="(item, i) in data.cards"
                                 :key="i">
                                <span>{{ item.name }}</span>
                                <span style="float: right" v-show="item.isUsed">已使用</span>
                            </div>
                        </div>
                    </van-collapse-item>
                </div>
            </van-collapse>
            <div class="noMore">
                <div class="before"></div>
                没有更多内容了
                <div class="after"></div>
            </div>
        </div>
        <div class="activate">
            <div>激活卡片</div>
        </div>
    </div>
</template>

<script>
    import {Collapse, CollapseItem} from 'vant';

    export default {
        name: "myCard",
        data() {
            return {
                title: "我的卡片",
                activeName: -1,
                dataList: [
                    {
                        cardName: "希语联名卡",
                        agent: "六米科技【广东代理】",
                        cards: [
                            {
                                name: "希语提升课12节",
                                isUsed: false
                            },
                            {
                                name: "希语赛事参赛资格",
                                isUsed: true
                            }
                        ]
                    },
                    {
                        cardName: "希语白金卡",
                        agent: "六米科技【杭州代理】",
                        cards: [
                            {
                                name: "希语提升课12节",
                                isUsed: false
                            },
                            {
                                name: "希语赛事参赛资格",
                                isUsed: true
                            }
                        ]
                    },
                    {
                        cardName: "希语白金卡",
                        agent: "六米科技【北京代理】",
                        cards: [
                            {
                                name: "希语提升课12节",
                                isUsed: false
                            },
                            {
                                name: "希语赛事参赛资格",
                                isUsed: true
                            }
                        ]
                    },
                    {
                        cardName: "希语白金卡",
                        agent: "六米科技【上海代理】",
                        cards: [
                            {
                                name: "希语提升课12节",
                                isUsed: false
                            },
                            {
                                name: "希语赛事参赛资格",
                                isUsed: true
                            }
                        ]
                    }
                ]
            }
        },
        components: {
            [Collapse.name]: Collapse,
            [CollapseItem.name]: CollapseItem
        }
    }
</script>

<style lang="less">
    @import "../../../../assets/style/mixin";

    .myCard {
        .content {
            padding: 24px;
            background: @phoneDefaultBgColor;
            font-family: PingFang SC;

            .van-collapse {
                .card {
                    border-radius: 8px;
                    overflow: hidden;
                    margin-bottom: 10px;
                    box-shadow: 0 6px 10px 0px #ddd;

                    .van-collapse-item {
                        background: url("../../../../assets/images/curriculum1.png") no-repeat center/cover;

                        h5 {
                            font-size: 17px;
                            color: @defaultTitleTextColor;
                            margin: 10px 0 10px;
                            font-weight: bold;
                        }

                        p {
                            font-size: 14px;
                            color: @defaultColor;
                        }

                        .equity {
                            .equityTitle {
                                display: flex;
                                height: 15px;
                                line-height: 15px;
                                font-size: 14px;
                                font-weight: 400;
                                color: @defaultTitleTextColor;

                                .divide {
                                    width: 2px;
                                    height: 15px;
                                    margin-right: 5px;
                                    background: @defaultColor;
                                }
                            }

                            .equityContent {
                                height: 34px;
                                margin-top: 10px;
                                padding: 0 10px;
                                background-color: @white;
                                line-height: 34px;
                                font-size: 14px;
                                font-weight: 400;
                                color: @defaultTitleTextColor;
                                text-align: left;
                                border-radius: 5px;
                            }

                            .equityUsed {
                                opacity: 0.6;
                                color: @disabledTextColor;
                            }
                        }

                        .van-cell {
                            height: 90px;
                            background: rgba(255, 255, 255, .6);

                            .van-icon {
                                display: none;
                            }
                        }

                        .van-collapse-item__wrapper {
                            .van-collapse-item__content {
                                box-sizing: content-box;
                                background: rgba(255, 255, 255, .6);
                                padding: 8px 10px 15px;
                            }
                        }
                    }
                }
            }

            .noMore {
                color: @gray;
                position: relative;
                margin: 25px 0;
                text-align: center;
                font-size: 24px;
                line-height: 40px;
                font-weight: 400;
                padding-bottom: 98px;

                .before {
                    position: absolute;
                    top: 20px;
                    left: 232px;
                    width: 30px;
                    height: 1px;
                    background: @gray;
                }

                .after {
                    position: absolute;
                    top: 20px;
                    right: 232px;
                    width: 30px;
                    height: 1px;
                    background: @gray;
                }
            }
        }

        .activate {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            bottom: 0;
            height: 98px;
            width: 100%;
            background-color: @white;
            border-top: 1px solid @lightBorderColor;

            div {
                width: 529px;
                height: 72px;
                background: @defaultColor;
                border-radius: 36px;
                font-size: 34px;
                line-height: 72px;
                text-align: center;
                color: @white;
            }
        }
    }
</style>
