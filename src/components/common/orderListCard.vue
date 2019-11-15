<template>
    <div>
        <div class="cardInfo">
            <van-card
                    :price="order.totalMoney"
                    :thumb="img"
                    class="van-ellipsis"
            >
                <template slot="title">
                    <div class="van-ellipsis">{{order.customName}}</div>
                </template>
            </van-card>
            <div class="orderInfo">
                <span>订单号：</span>
                <span class="orderNum">{{order.orderNo}}</span>
            </div>
            <!--显示待支付或者已支付-->
            <img v-if="order.payState==0" class="payStatus" src="../../assets/images/topay.png" alt="">
            <img v-else-if="order.payState==1" class="payStatus" src="../../assets/images/bepaid.png" alt="">
        </div>
    </div>
</template>

<script>
    import {Card} from 'vant';

    export default {
        name: "orderListCard",
        props: ['order'],
        data(){
          return{
              img:'../../assets/images/bisai.png'
          }
        },
        components: {
            [Card.name]: Card
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/style/mixin";

    .cardInfo {
        .border-radius(15px);
        padding:30px 20px 0;
        background:@white;
        position: relative;
        .van-card{
            background:@white;
            font-size:17px;
            padding: 0;

            .van-card__header {
                text-align: left;
                .van-card__thumb {
                    width: 80px;
                    height: 80px;
                }

                .van-card__content{
                    padding-right: 50px;
                    .van-card__title{
                        line-height: 20px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .van-card__price{
                        margin-top: 28px;
                        color: @red;
                    }

                }

            }
        }

        .orderInfo {
            height: 83px;
            line-height: 83px;
            font-size:28px;
            font-weight:400;
            color:@gray;
            text-align: left;
            border-top:1px solid @gray-lighter;

        }
        .payStatus{
            .wh(159px,159px);
            position: absolute;
            top: -7px;
            right: -7px;
        }
    }
</style>
