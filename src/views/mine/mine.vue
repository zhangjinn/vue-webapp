<template>
    <div class="myInfo">

        <div class="myCardInfo">
            <div class="myCardContent">
                 <div class="myCardInfoLeft">
                     <div class="myCardInfoPic">
                         <img src="../../assets/images/myHeader.png" alt="">
                     </div>
                     <div class="myCardInfoCount">
                         <p class="myCardName">紫荆爸爸</p>
                         <p class="myCardCount"><span>账号：</span><span class="myCardNum">15001396176</span></p>
                     </div>
                 </div>
                 <div class="myCardInfoArrow"><i class="icon iconfont icongengduo"></i></div>
            </div>
            <div></div>
        </div>
        <div class="itemContent">
            <div class="itemContentInner">
                <van-grid square>
                    <van-grid-item @click="goToPlayer">
                        <span style="color: #63C2E2" class="icon iconfont iconhaizi"></span>
                        <p>选手</p>
                    </van-grid-item>
                    <van-grid-item @click="goToFamily">
                        <span style="color: #FB474B" class="icon iconfont iconzubie"></span>
                        <p>家庭</p>
                    </van-grid-item>
                    <van-grid-item>
                        <span style="color: #FFCD32" class="icon iconfont iconshezhi"></span>
                        <p>设置</p>
                    </van-grid-item>
                    <van-grid-item>
                        <span class="icon iconfont icondingdan"></span>
                        <p>订单</p>
                    </van-grid-item>
                    <van-grid-item>
                        <span style="color: #FFCD32" class="icon iconfont icondingdan"></span>
                        <p>订单</p>
                    </van-grid-item>
                    <van-grid-item>
                        <span class="icon iconfont icondingdan"></span>
                        <p>订单</p>
                    </van-grid-item>
                </van-grid>
            </div>
        </div>
        <div class="systemItem">
            <van-cell-group>
                <van-cell icon="points" title="消息" is-link />
                <van-cell icon="gold-coin-o" title="设置" is-link />
            </van-cell-group>
        </div>

    </div>
</template>

<script>
    import { Row, Col,Grid, GridItem, Cell, CellGroup} from 'vant';
    import { getUserInfo} from '../../service/api.js'
    export default {
        name: "mine",
        data(){
          return{
              userInfo:''
          }
        },
        components:{
            [Row.name]:Row,
            [Col.name]:Col,
            [Grid.name]:Grid,
            [GridItem.name]:GridItem,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
        },
        created(){

        },
        methods:{
            async getUserInfo(){
                let userInfo=await getUserInfo()
                this.userInfo=userInfo;
                console.log(this.userInfo)
            },
            goToPlayer(){
                this.$router.push({ path: '/playerList'})
            },
            goToFamily(){
                this.$router.push({ path: '/myFamily'})
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/style/mixin";
    .icon{
        font-size: 40px;
    }
    .myInfo{
        text-align: left;
        font-size: 28px;
        .myCardInfo{
            .wh(100%,400px);
            color: @white;
            background:linear-gradient(-56deg,@gradientLeftColor 22%,@gradientRightColor 100%);
            //.linear-gradient(-56deg,@gradientRightColor,@gradientLeftColor);
            .myCardContent{
                display: flex;
                padding: 81px 38px 0 64px;
                .myCardInfoLeft{
                    display: flex;
                    flex: 1;
                    .myCardInfoPic{
                        .wh(120px,120px);
                        .border-radius(50%);
                        margin-right: 16px;
                    }
                    .myCardName{
                        font-size: 34px;
                        padding-bottom: 30px;
                    }
                }
                .myCardInfoArrow{
                    display: flex;
                    align-items: center;
                }

            }
        }
        .itemContent{
            margin-top: -80px;
            .itemContentInner{
                margin: 0 auto;
                width:701px;
                background:@defaultBgColor;
                .border-radius(15px);
                overflow: hidden;
                .van-grid-item{
                    p{
                        margin-top: 7px;
                    }
                }

            }
        }
        .systemItem{
            width:701px;
            margin: 18px auto 0;
            .border-radius(15px);
        }
    }

</style>
