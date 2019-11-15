<template>
    <div class="myInfo" v-wechat-title="this.title">
        <div class="myCardInfo">
            <div class="myCardContent">
                 <div class="myCardInfoLeft">
                     <div class="myCardInfoPic" ref="CardInfo">
                         <img src="../../../../assets/images/myHeader.png" alt="">
                     </div>
                     <div class="myCardInfoCount">
                         <p class="myCardName">{{userInfo.name}}</p>
                         <p class="myCardCount"><span class="myCardNum">{{person.phone}}</span></p>
                     </div>
                 </div>
            </div>
            <div></div>
        </div>
        <div class="itemContent">
            <div class="itemContentInner">
                <van-grid square :column-num="3">
                    <van-grid-item @click="goToPlayer">
                        <span class="icon iconfont iconhaizi yellowColor"></span>
                        <p>选手</p>
                    </van-grid-item>
                    <van-grid-item @click="goToFamily">
                        <span class="icon iconfont iconzubie redColor"></span>
                        <p>家庭</p>
                    </van-grid-item>
                    <van-grid-item @click="goToSet">
                        <span class="icon iconfont iconshezhi yellowColor"></span>
                        <p>设置</p>
                    </van-grid-item>
                    <van-grid-item @click="goToCurriculum">
                        <span class="icon iconfont iconkecheng blueColor"></span>
                        <p>课程</p>
                    </van-grid-item>
                    <van-grid-item @click="goToOrder">
                        <span class="icon iconfont icondingdan redColor"></span>
                        <p>订单</p>
                    </van-grid-item>
                    <van-grid-item @click="goToRight">
                        <span class="icon iconfont iconshezhi blueColor"></span>
                        <p>权益</p>
                    </van-grid-item>
                    <van-grid-item @click="goToCard">
                        <span class="icon iconfont iconqianbao yellowColor"></span>
                        <p>卡包</p>
                    </van-grid-item>
                </van-grid>
            </div>
        </div>

    </div>
</template>

<script>
    import {Row, Col, Grid, GridItem, Cell, CellGroup, Dialog} from 'vant';
    import {getLoginInfo, getPhone} from '../../../../js/user.js'

    export default {
        name: "mine",
        data() {
            return {
                title: '我的',
                userInfo: {},
                person: {}
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
        mounted() {
            /*   this.$refs.CardInfo.ondblclick=function(){
                   alert(3)
               }*/

        },
        methods: {
            getUser() {
                this.userInfo = getLoginInfo();
            },
            goToPlayer() {
                this.$router.push({path: '/playerList'})
            },
            goToFamily(){
                this.dialogPrompt('玩命开发中~')
            },
            goToSet() {
                this.dialogPrompt('玩命开发中~')
            },
            goToCurriculum(){
                this.$router.push({ path: '/curriculum'})

            },
            goToOrder() {
                this.$router.push({path: '/orderList'})
            },
            goToRight() {
                this.$router.push({path: '/rightList'})
            },
            goToCard(){
                this.$router.push({ path: '/myCard'})
            },

            dialogPrompt(content){
                Dialog.alert({
                    message: content
                });
            },

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
            background: linear-gradient(-56deg, @gradientLeftColor 22%, @gradientRightColor 100%);
            //.linear-gradient(-56deg,@gradientRightColor,@gradientLeftColor);
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
