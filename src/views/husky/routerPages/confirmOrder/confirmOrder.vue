<template>
    <div class="confirmOrder pageContent">
        <section>
            <order-list-card :order="payOrderList"></order-list-card>
        </section>
        <section class="orderWay">
            <van-cell title="支付方式" is-link :value="payType" @click="orderWay"/>
        </section>
        <section class="orderTip">
            <span>请确认订单，并在24小时内完成支付！</span>
        </section>
        <section class="btnContent" >
            <control-btn :btnActive="true" btnText="立即购买" @click.native="goToPayment()"></control-btn>
        </section>
        <van-popup
                v-model="showOrderWay"
                round
                position="bottom"
                :style="{ height: '50%' }"
        >
            <div class="popTitle">
                支付方式
                <i class="icon iconfont iconguanbi" @click="closePop"></i>
            </div>
            <div class="popContent">
                <div :class="{active: selectPlayType === '在线支付'}" @click="switchPayType('在线支付')">在线支付</div>
                <div :class="{active: selectPlayType === '权益抵扣'}" @click="switchPayType('权益抵扣')">权益抵扣</div>
            </div>
            <div class="popConfirm" @click="confirmPayType">
                <div class="confirmBtn">
                    确定
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import {Cell, Popup} from 'vant';
    import ControlBtn from "../../../../components/common/controlBtn";
    import OrderListCard from "../../../../components/common/orderListCard";
    import {
        goToPayPage,
        getPayOrder,
        getOrderDetails,
        getPerson,
        getParent
    } from '../../../../service/husky/api.js'
    import {getLoginInfo} from "../../../../js/user";

    export default {
        name: "confirmOrder",
        data() {
            return {
                user: {},
                person: {},
                orderId: '',
                showOrderWay: false,
                payType: "在线支付",
                selectPlayType:'在线支付',
                payOrderList: {},
                area: {},
            }
        },
        components: {
            [Cell.name]: Cell,
            [ControlBtn.name]: ControlBtn,
            [OrderListCard.name]: OrderListCard,
            [Popup.name]: Popup,
        },
        created(){
            this.user = getLoginInfo();
            this.orderId = this.$route.query.order;
            this.getUser();
        },
        methods: {
            async getUser(){
                let user_person_id = this.user.person;
                let res = await getPerson(user_person_id);
                this.person = res.data;
                this.getLocation();
            },
            async getLocation(){
                let areaParam = {
                    areaGuid: this.person.location
                };
                let area = await getParent(areaParam);
                this.area = area.data;
                this.toPayOrder();
            },
            async toPayOrder(){
                let res = await getOrderDetails(this.orderId);
                let goods = res.data&&res.data.commodity ? res.data.commodity : '';
                let orderParam;
                orderParam = {
                    "userId": this.user.identifier,
                    "commodityId": goods.id,
                    "quantity": goods.materialAmount,
                    "orderMoney": goods.favorablePrice,
                    "customName": this.user.name,
                    "customPhone": this.person.phone,
                    "fkAreaId": this.person.location,
                    "detailAddress": this.area.areaName,
                }
                let order=await getPayOrder(orderParam);
                this.payOrderList=order.data.order
            },
            orderWay() {
                this.showOrderWay = true
            },

            closePop() {
                this.showOrderWay = false;
            },
            switchPayType(state) {
                if (state === this.selectPlayType) return;
                this.selectPlayType = this.selectPlayType === "在线支付" ? "权益抵扣" : "在线支付";

            },
            confirmPayType(){
                this.payType=this.selectPlayType;
                this.showOrderWay = false;
            },
            goToPayment(){
                // this.$router.push({path:'/paymentStatus'});
                goToPayPage()
            }
        }
    }
</script>

<style lang="less">
    @import "../../../../assets/style/mixin";

    .confirmOrder {
        font-size: 34px;
        text-align: left;
        font-family: PingFang SC;

        .orderWay {
            margin: 20px 0;
            .border-radius(15px);

            .van-cell {
                padding: 10px 10px;
            }
        }

        .orderTip {
            color: @gray-light;
            font-size: 24px;
            padding: 0 20px;
        }

        .btnContent {
            width: 100%;
            padding: 13px 0;
            position: fixed;
            left: 0;
            bottom: 0;
        }

        .van-popup {
            padding: 0 24px;

            .popTitle {
                height: 2.67em;
                font-size: 0.88em;
                font-weight: 400;
                line-height: 2.67em;
                color: @defaultTitleTextColor;
                border-bottom: 1px solid @lightBorderColor;

                i {
                    float: right;
                    font-size: 24px;
                    color: @gray-light;
                }
            }

            .popContent {
                display: flex;
                flex-wrap: wrap;
                padding-top: 1em;

                div {
                    font-size: 0.7em;
                    width: 6.4em;
                    height: 2.08em;
                    margin: 0 0.8em 0.8em 0;
                    line-height: 2.08em;
                    text-align: center;
                    border-radius: 1em;
                    background: @lightBorderColor;
                    border: 1px solid @lightBorderColor;
                    color: @defaultTitleTextColor;
                }

                .active {
                    color: @defaultColor;
                    border-color: @defaultColor;
                    background: @defaultColor-light;
                }
            }

            .popConfirm {
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                bottom: 0;
                left: 0;
                height: 2.9em;
                width: 100%;
                border-top: 1px solid @lightBorderColor;

                .confirmBtn {
                    width: 72%;
                    height: 2.13em;
                    line-height: 2.13em;
                    background: @defaultColor;
                    border-radius: 36px;
                    text-align: center;
                    color: @white;
                }
            }
        }
    }

</style>
