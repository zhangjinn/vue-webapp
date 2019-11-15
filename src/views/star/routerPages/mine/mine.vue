<template>
    <div class="myInfo" v-wechat-title="this.title">
        <div class="myCardInfo">
            <div class="myCardContent">
                <div class="myCardInfoLeft">
                    <div class="myCardInfoPic" ref="CardInfo" @click="insideClearStor">
                        <img src="../../../../assets/images/myHeader.png" alt="">
                    </div>
                    <div class="myCardInfoCount">
                        <p class="myCardName">{{userInfo.name}}</p>
                        <p class="myCardCount"><span class="myCardNum">{{person.phone}}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="itemContent">
            <div class="itemContentInner">
                <van-grid square :column-num="3">
                    <van-grid-item @click="goToPlayer">
                        <span class="icon iconfont iconhaizi blueColor"></span>
                        <p>选手</p>
                    </van-grid-item>
                    <van-grid-item @click="goToEvaReport">
                        <span class="icon iconfont iconzubie redColor"></span>
                        <p>测评报告</p>
                    </van-grid-item>
                    <van-grid-item @click="goToPromotion">
                        <span class="icon iconfont iconshezhi yellowColor"></span>
                        <p>晋级报名</p>
                    </van-grid-item>
                </van-grid>
            </div>
        </div>

    </div>
</template>

<script>
    import {Row, Col, Grid, GridItem, Cell, CellGroup, Dialog} from 'vant';
    import {getLoginInfo, getPhone} from '../../../../js/user.js'
    import {clearStore, clearSession} from '../../../../js/common.js'

    export default {
        name: "mine",
        data() {
            return {
                title: '我的',
                userInfo: {},
                person: {},
                count: 0
            }
        },
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Grid.name]: Grid,
            [GridItem.name]: GridItem,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Dialog.name]: Dialog,
        },
        created() {
            this.getUser();
            this.person.phone = getPhone();
        },

        methods: {
            getUser() {
                this.userInfo = getLoginInfo();
            },
            goToPlayer() {
                this.$router.push({path: '/playerList'})
            },
            goToEvaReport() {
                this.$router.push({path: '/reportList'})
            },
            goToPromotion() {
                this.dialogPrompt('玩命开发中~')
            },
            dialogPrompt(content) {
                Dialog.alert({
                    message: content
                });
            },
            insideClearStor(){
                if(this.count==9){
                    Dialog.confirm({
                        message:'是否清除缓存'
                    }).then(()=>{
                        clearStore();
                        clearSession();
                        this.count=0;
                    }).catch(() => {
                        this.count=0;
                        return false;
                    });

                }else{
                    this.count++
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../../../assets/style/mixin";

    .icon {
        font-size: 40px;
    }

    .myInfo {
        text-align: left;
        font-size: 28px;

        .myCardInfo {
            .wh(100%, 400px);
            color: @white;
            background: #90D0DA;

            .myCardContent {
                display: flex;
                padding: 81px 38px 0 64px;

                .myCardInfoLeft {
                    display: flex;
                    flex: 1;

                    .myCardInfoPic {
                        .wh(120px, 120px);
                        .border-radius(50%);
                        margin-right: 16px;
                    }

                    .myCardName {
                        font-size: 34px;
                        padding-bottom: 30px;
                    }
                }

                .myCardInfoArrow {
                    display: flex;
                    align-items: center;

                    .icon {
                        font-size: 58px;
                    }
                }

            }
        }

        .itemContent {
            margin-top: -80px;

            .itemContentInner {
                margin: 0 auto;
                width: 701px;
                background: @defaultBgColor;
                .border-radius(15px);
                overflow: hidden;

                .van-grid-item {
                    p {
                        margin-top: 7px;
                    }
                }
            }
        }

        .systemItem {
            width: 701px;
            margin: 18px auto 0;
            .border-radius(15px);
        }
    }

</style>
