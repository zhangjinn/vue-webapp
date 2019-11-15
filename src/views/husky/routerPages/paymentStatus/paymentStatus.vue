<template>
    <div class="payment pageContent" v-wechat-title="this.title">
        <div class="remind">
            <i class="icon iconfont" :class="{iconchenggong: isSuccess, iconshibai: !isSuccess, success: isSuccess, fail: !isSuccess}"></i>
            <p>{{ this.tip }}</p>
        </div>
        <div class="content">
            <!--支付内容-->
        </div>
        <section class="cardContent">
            <order-list-card
                    v-for="(item, index) in orderList"
                    :key="index"
                    :order="item"
            ></order-list-card>
        </section>
        <div class="btn">
            <div class="successBtn" v-if="isSuccess" @click="goToMall">
                完成
            </div>
            <div class="failBtn" v-else>
                <div class="return"  @click="goToMall">
                    返回商城
                </div>
                <div class="repay" @click="goToConfirmOrder">
                    重新支付
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import OrderListCard from "../../../../components/common/orderListCard";

    export default {
        name: "payment.vue",
        data() {
            return {
                isSuccess: false,
                orderList: [
                    {
                        price: "￥198.00",
                        number: 201910291156,
                        title: "英语听力理解模拟房间爱打定金罚",
                        imgUrl: "https://img.yzcdn.cn/vant/t-thirt.jpg"
                    }
                ],
            }
        },
        components:{
          [OrderListCard.name]:OrderListCard
        },
        computed: {
            title() {
                return this.isSuccess ? "支付成功" : "支付失败";
            },
            tip() {
                return this.isSuccess ? "支付成功!" : "支付失败，请重新支付!";
            },

        },
        methods:{
            goToMall(){
                this.$router.push({path:'/find'})
            },
            goToConfirmOrder(){
                this.$router.push({path:'/confirmOrder'})
            }
        }
    }
</script>

<style lang="less">
    @import "../../../../assets/style/mixin";
    .payment{
        .remind {
            margin: 0 auto 20px;
            width: 702px;
            height: 200px;
            padding-top: 50px;
            background: @white;
            border-radius:15px;
            .success {
                color: @blue;
            }
            .fail {
                color: @priceTextColor;
            }
            i {
                color: @blue;
                font-size: 50px;
                margin: 0 auto;
            }
            p {
                font-size:30px;
                font-family:PingFang SC;
                font-weight:400;
                line-height: 70px;
            }
        }

        .btn {
            font-family:PingFang SC;
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 750px;
            height: 98px;
            background: @white;
            .successBtn {
                width:539px;
                height:72px;
                background: @defaultColor;
                border-radius:36px;
                line-height: 72px;
                text-align: center;
                color: @white;
                font-size: 34px;
                font-weight:bold;
            }
            .failBtn {
                width: 750px;
                display: flex;
                justify-content: center;
                div {
                    width: 320px;
                    height: 72px;
                    border-radius:36px;
                    text-align: center;
                    font-size:34px;
                    line-height: 72px;
                    font-weight: bold;
                }
                .return {
                    color: @defaultColor;
                    border: 1px solid @defaultColor;
                }
                .repay {
                    margin-left: 20px;
                    color: @white;
                    background: @defaultColor;
                }
            }
        }
    }

</style>
