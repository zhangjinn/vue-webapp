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
        <template v-if="cardActivated">
            <div class="activateBtn" @click="goToStudy()">
                卡片已激活
            </div>
        </template>
        <template v-else>
            <template v-if="showInput">
                <div class="cardArea">
                    <p>激活卡片之后，才能观看视频哦~</p>
                    <div class="cardInput">
                        <img src="../../../../assets/images/cardId.png" alt="cardId">
                        <input v-model="cardNumber" type="text" placeholder="请输入卡片编号">
                    </div>
                    <div class="border"></div>
                </div>
                <div class="activateBtn" @click="activeCard">
                    激活
                </div>
            </template>
            <template v-else>
                <div class="activateBtn" @click="showInputModule">
                    激活卡片观看视频
                </div>
            </template>
        </template>
    </div>
</template>

<script>
    import {Dialog} from 'vant';
    import {userActivated, cardActivate} from '../../../../service/star/api.js';
    import {getLoginInfo} from '../../../../js/user.js'

    export default {
        name: "activateCardOne",
        data() {
            return {
                title: "激活卡片",
                showVideo: true,
                cardActivated: false,//卡片是否激活
                showInput: false,
                cardNumber: '',//输入卡片编号;
                userInfo: {}
            }
        },
        created() {
            this.userInfo = getLoginInfo();
            this.userActivated(this.userInfo.identifier);
        },

        methods: {
            async userActivated(userId) {
                let userAct = await userActivated(userId);
                this.cardActivated = userAct.data;
            },
            activeCard() {
                let userId = this.userInfo.identifier;
                let cardNumber = this.cardNumber;
                let cardActParam = {
                    "userId": userId,
                    "cardNumber": cardNumber
                };
                cardActivate(cardActParam).then(() => {
                    Dialog.alert({
                        message: '卡片激活成功'
                    }).then(() => {
                        this.cardActivated = true;
                        this.$router.push({path: '/curriculumDetail'})
                    });
                })
            /*    .catch((err) => {
                    Dialog.alert({
                        message: err.response.data.message
                    })
                })*/
            },
            showInputModule() {
                this.showInput = true;
            },
            goToStudy() {
                this.$router.push({path: '/curriculumDetail'})
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
        margin: 53px auto 0;

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
        margin: 80px auto 0;
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
