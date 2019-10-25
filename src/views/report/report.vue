<template>
    <div class="reportPage">
        <div class="main" v-title data-title="测评报告"></div>
        <div class="reportList">
            <div class="reportTop">
                <div class="reportTitle">测评总体 得分</div>
                <div class="result">
                    <van-row>
                        <van-col span="6">
                            <p><span class="icon iconfont icontimu"></span>考试题数</p>
                            <p class="mTop"><span class="mainColor">20</span>道</p>
                        </van-col>
                        <van-col span="6" offset="12">
                            <p><span class="icon iconfont icondefen"></span>总得分</p>
                            <p class="mTop"><span class="mainColor">28</span>分</p>
                        </van-col>
                    </van-row>
                </div>
            </div>
            <div class="reportBottom">
                <p class="comment">
                    Congratulations! What an excellent result. You already speak and understand English very well.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import { Row, Col } from 'vant';
    export default {
        data(){
            return {

            }

        },
        components:{
            [Row.name]: Row,
            [Col.name]: Col
        },
    }
</script>

<style lang="less" scoped>
    .reportPage{
        padding: 24px;
        background:#f9f9f9;
        text-align:left;
        .reportList{
            margin-bottom: 24px;
            border-radius: 16px;
            overflow: hidden;
            .reportTop{
                padding: 0 24px;
                background: #fff;
                .reportTitle{
                    height: 88px;
                    font-size: 32px;
                    color: #333;
                    line-height: 88px;
                    border-bottom: 2px solid #eee;
                }
                .result{
                    padding: 20px 0;
                    font-size: 28px;
                    color: #999;
                    text-align: center;
                    .icon{
                        font-size:32px;
                    }
                    .mTop{
                        margin-top:12px;
                        height:60px;
                        line-height:60px;
                        .mainColor{
                            color:#ff6600;
                            font-size:40px;
                        }
                    }

                }
            }
            .reportBottom{
                padding: 24px;
                color: #fff;
                font-size: 32px;
                background: -webkit-linear-gradient(left, #FFCD32 , #FF850F)!important;
                background: -o-linear-gradient(right, #FFCD32, #FF850F)!important;
                background: -moz-linear-gradient(right, #FFCD32, #FF850F)!important;
                background: linear-gradient(to right, #FFCD32 , #FF850F)!important;
            }
        }
    }
</style>