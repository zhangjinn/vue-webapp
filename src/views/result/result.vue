<template>
    <div class="resultPage">
        <div class="main" v-title data-title="测评结果"></div>
        <div class="content">
            <img class="userIcon" src="./../../assets/images/gameHeader.png">
         </div>
        <div class="result">
            <h6 >希语盛典年度英语风采大会</h6>
            <span >少儿A组</span>
            <p>{{score}}</p>
            <i>晋级情况：未公布</i>
        </div>
        <div class="bottomButton">
            <button class="examReport" @click="toReportPage()">测评报告</button>
        </div>
    </div>
</template>

<script>

    export default {
        data(){
            return {
                student: {},
                task: {},
                gameSubject: {},
                game: {},
                match: {},
                matchId: "",
                score: 0,
                executeId:""
            }
        },
    }
</script>

<style lang="less" scoped>
    .resultPage{
        .content{
            width:100%;
            height:400px;
            background: transparent url(./../../assets/images/gameSub.png) no-repeat;
            background-size: 100% 100%;
            position: relative;
            margin-bottom: 160px;
            .userIcon{
                position:absolute;
                right:0;
                left:0;
                margin: 0 auto;
                bottom:-25%;
                width:200px;
            }
        }
        .result{
            text-align: center;
            width: 64%;
            margin: auto;
            padding-bottom: 40px;
            background: #fff;
            box-shadow: 0 0 20px 0 #ddd;
            border-radius: 12px;
            h6{
                font-size: 34px;
                color: #333;
                font-weight: 700;
                padding: 40px 0 0;
            }
            span{
                color: #666;
                font-size: 28px;
            }
            p{
                font-size: 40px;
                color: #FB494D;
                height: 120px;
                line-height: 120px;
                font-weight: 700;
            }
            i{
                font-style: normal;
                color: #04AEF2;
            }
        }
        .bottomButton{
            padding: 20px 30px;
            margin: 40px 0 0;
            text-align: center;
            .examReport{
                width: 220px;
                height: 72px;
                color: #fff;
                font-size: 30px;
                border-radius: 36px;
                background: -webkit-linear-gradient(left, #FFCD32 , #FF850F)!important;
                background: -o-linear-gradient(right, #FFCD32, #FF850F)!important;
                background: -moz-linear-gradient(right, #FFCD32, #FF850F)!important;
                background: linear-gradient(to right, #FFCD32 , #FF850F)!important;
            }
        }
    }
</style>