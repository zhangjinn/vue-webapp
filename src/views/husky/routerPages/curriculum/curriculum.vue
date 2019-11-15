<template>
    <div>
        <div v-wechat-title="title"></div>
        <div v-if="noContent" class="noContent">
            <div class="content">
                <div class="noContent">
                    <img src="../../../../assets/images/game_empty.png" alt="game"/>
                    <p>没有看过的课程哦~</p>
                    <p>海量课程信息都在发现</p>
                    <a>前往发现</a>
                </div>
                <div class="gameTitle">
                    <div class="before"></div>
                    猜你喜欢
                    <div class="after"></div>
                </div>
                <div class="banner">
                    <img src="../../../../assets/images/bn.png" alt="bn"/>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="curriculum">
                <div class="card" v-for="(item, index) in dataList" :key="index">
                    <img :src="item.src" :alt="item.title">
                    <div>
                        <h5>{{item.title}}</h5>
                        <p>{{item.group}}</p>
                    </div>
                </div>
                <div class="noMore">
                    <div class="before"></div>
                    没有更多内容了
                    <div class="after"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'curriculum',
        data() {
            return {
                title: "我的课程",
                noContent: false,
                dataList: [
                    {
                        src: require("../../../../assets/images/curriculum1.png"),
                        title: "英语听力理解模拟答题技巧解 析大全（含口语听力阅读练习练习练习",
                        group: "全国组委会"
                    },
                    {
                        src: require("../../../../assets/images/curriculum2.png"),
                        title: "英语阅读理解知识点",
                        group: "广东组委会"
                    },
                    {
                        src: require("../../../../assets/images/curriculum1.png"),
                        title: "英语阅读与写作答题技巧",
                        group: "全国组委会"
                    },
                    {
                        src: require("../../../../assets/images/curriculum2.png"),
                        title: "英语语言应用练习题",
                        group: "全国组委会"
                    }
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../../../assets/style/mixin.less";

    .content {
        padding: 24px;
        background: @phoneDefaultBgColor;
        font-family: PingFang SC;

        .noContent {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 702px;
            height: 464px;
            background: @white;
            border-radius: 15px;
            padding-top: 24px;
            box-shadow: 0 12px 20px 0px @boxShadowColor;

            img {
                display: block;
                width: 366px;
                height: 216px;
                margin-bottom: 29px;
            }

            p {
                font-size: 30px;
                font-weight: 400;
                color: @placeholderTextColor;
                line-height: 48px;
            }

            a {
                width: 180px;
                height: 48px;
                background: @defaultColor;
                border-radius: 24px;
                font-size: 28px;
                font-weight: 400;
                color: @white;
                line-height: 48px;
                margin-top: 15px;
            }
        }

        .gameTitle {
            position: relative;
            margin: 25px 0;
            height: 40px;
            text-align: center;
            font-size: 30px;
            color: @defaultColor;

            .before {
                position: absolute;
                top: 20px;
                left: 200px;
                width: 45px;
                height: 3px;
                background: @defaultColor;

                &:after {
                    position: absolute;
                    right: 0;
                    top: -1px;
                    content: "";
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    background: @defaultColor;
                    border-radius: 50%;
                }
            }

            .after {
                position: absolute;
                top: 20px;
                right: 200px;
                width: 45px;
                height: 3px;
                background: @defaultColor;

                &:before {
                    position: absolute;
                    left: 0;
                    top: -1px;
                    content: "";
                    display: inline-block;
                    width: 5px;
                    height: 5px;
                    background: @defaultColor;
                    border-radius: 50%;
                }
            }
        }

        .banner {
            img {
                border-radius: 15px;
            }
        }
    }

    .curriculum {
        padding: 24px;
        background: @phoneDefaultBgColor;
        font-family: PingFang SC;

        .card {
            display: flex;
            height: 220px;
            padding: 20px;
            margin-bottom: 24px;
            background: @white;
            border-radius: 15px;
            box-shadow: 0 12px 20px 0px @boxShadowColor;

            img {
                width: 180px;
                height: 180px;
                border-radius: 10px;
            }

            div {
                text-align: left;
                margin-left: 20px;

                h5 {
                    width: 445px;
                    margin-top: 15px;
                    font-size: 34px;
                    font-weight: 400;
                    color: @defaultTitleTextColor;
                    line-height: 44px;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                p {
                    margin-top: 30px;
                    font-size: 28px;
                    font-weight: 400;
                    color: @defaultColor;
                }
            }
        }

        .noMore {
            color: rgba(188, 188, 188, 1);
            position: relative;
            margin: 25px 0;
            text-align: center;
            font-size: 24px;
            line-height: 40px;
            font-weight: 400;

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
</style>
