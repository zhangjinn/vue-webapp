<template>
    <div>
        <p>
            <span>code：</span>{{code}}
        </p>
    </div>
</template>

<script>

    export default {
        name: "index",
        data() {
            return {
                code: '',

            }
        },
        created() {
            let corpId = '';
            let route = this.$route;
            if (route.query.corpId) {
                corpId = route.query.corpId
            }
            this.dingTalkLogin(corpId)
        },
        components: {

        },
        methods: {
            dingTalkLogin(corpId) {
                let _this = this;
                dd.ready(function () {
                    dd.runtime.permission.requestAuthCode({
                        corpId: corpId, // _config.corpId 企业id
                        onSuccess: async function (info) {
                            let code = info.code; // 通过该免登授权码可以获取用户身份
                            _this.code = info;
                        },
                        onFail: function (error) {
                            alert(JSON.stringify(error))
                        }

                    })
                })
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../../../assets/style/mixin";

    .starRoom {
        img {
            width: 100%;
            height: 100%;
        }

        .icon {
            font-size: 48px;
        }

        .adContent {
            height: 400px;

            img {
                height: 400px;
            }
        }

        .playerInfo {
            padding: 0 25px;
            .fj();
            height: 149px;
            align-items: center;

            .playerInfoText {
                font-size: 32px;
            }

            .changePlayer {
                color: @defaultColor;

                .changePlayerText {
                    font-size: 26px;
                    font-weight: 700;
                }
            }

        }

        .playerCard {
            padding: 0 24px;

            text-align: left;

            .playerCardInfo {
                padding: 40px;
                border: 1px solid @white-dark;
                .box-shadow(2px, 2px, 2px, @white-dark);
                .fj();

                .playerDes {
                    font-size: 24px;
                    font-weight: 400;
                    color: @gray-light;

                    .playerIntro {
                        .playerName {
                            font-size: 30px;
                            color: @gray;
                        }

                        .playerSex {
                            font-size: 20px;
                            color: @defaultColor;
                            padding-left: 10px;
                        }
                    }

                    .playerSpace {
                        padding-bottom: 20px;
                    }

                }

                .playerHead {
                    .wh(100px, 100px)
                }
            }
        }

        .playerCheck {
            padding: 82px 0;

            .startBtn {
                margin: 0 auto;
                padding-top: 30px;
                .wh(200px, 200px);
                background: @defaultColor;
                box-shadow: 0 0 20px 4px @defaultColor ;
                .border-radius(50%);

                .checkBtn {
                    margin: 0 auto;
                    padding: 40px 0 0;
                    .wh(140px, 140px);
                    color: @defaultColor;
                    background: @white;
                    .border-radius(50%);

                    .checkName {
                        font-size: 28px;
                    }
                }
            }


        }

    }
</style>
