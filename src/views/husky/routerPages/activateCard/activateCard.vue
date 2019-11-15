<template>
    <div>
        <div v-wechat-title="title"></div>
        <div class="vip" v-if="showVideo">
            <img src="../../../../assets/images/vip.png" alt="vip.png">
        </div>
        <div class="video" v-else>
            <div class="mask"></div>
            <img src="../../../../assets/images/guanggao.png" alt="guanggao">
            <span class="icon iconfont iconbofang"></span>
        </div>
        <div class="cardArea">
            <p>请输入需要激活的卡片编号：</p>
            <div class="cardInput">
                <img src="../../../../assets/images/cardId.png" alt="cardId">
                <input type="text" placeholder="请输入卡片编号">
            </div>
            <div class="border"></div>
        </div>
        <div class="activateBtn">
            激活
        </div>
    </div>
</template>

<script>
    export default {
        name: "activateCardOne",
        data() {
            return {
                title: "激活卡片",
                showVideo: true
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../../../assets/style/mixin.less";

    .vip {
        width: 269px;
        height: 298px;
        margin: 70px auto 0;
    }

    .video {
        position: relative;
        width: 702px;
        height: 304px;
        margin: 25px auto 24px;
        border-radius: 15px;

        .mask {
            position: absolute;
            width: 702px;
            height: 304px;
            background-color: @black;
            opacity: 0.3;
            border-radius: 15px;
        }

        span {
            position: absolute;
            font-size: 57px;
            color: @white;
            top: 152px;
            left: 351px;
            transform: translate(-50%, -50%);
        }
    }

    .cardArea {
        font-family: PingFang SC;
        width: 540px;
        margin: 53px auto 80px;

        p {
            font-size: 34px;
            font-weight: 400;
            color: @defaultColor;
            text-align: left;
        }

        .cardInput {
            height: 56px;
            margin: 30px 0 8px;
            display: flex;
            align-items: center;

            img {
                width: 32px;
                height: 24px;
                margin-right: 13px;
            }

            input {
                width: 495px;
                background-color: transparent;
            }
        }

        .border {
            width: 540px;
            height: 1px;
            background: @defaultColor;
        }
    }

    .activateBtn {
        width: 540px;
        height: 72px;
        margin: 0 auto;
        background: @defaultColor;
        line-height: 72px;
        text-align: center;
        font-size: 34px;
        font-family: PingFang SC;
        font-weight: bold;
        color: @white;
        border-radius: 36px;
    }

    ::-webkit-input-placeholder {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: @placeholderTextColor;
    }
</style>
