<template>
    <div class="resultPage">
        <div class="main" v-title data-title="测评结果"></div>
        <div class="content">
            <img class="userIcon" src="./../../assets/images/gameHeader.png">
        </div>
        <div class="result">
            <h6 v-if="gameSubject.name&&game.name">{{game.name}}</h6>
            <span v-if="match.name">{{gameSubject.name}}</span>
            <p>{{score}}</p>
            <i>晋级情况：未公布</i>
        </div>
        <div class="examReport">
            <button @click="toReportPage()">测评报告</button>
        </div>
        <div class="readyRoom">
            <button @click="toReadyRoom()">预备室</button>
        </div>
    </div>
</template>

<script>
    import { getExecute } from '../../service/api.js'
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
        created() {
            this.executeId = this.$route.query.execute;
            this.matchId = this.$route.query.match;
            this.getData();
        },
        methods:{
            async getData() {
                let res = await getExecute({},this.executeId);
                let executeData = res.data;
                let matchTask = executeData.matchTask;
                this.match = matchTask.match;
                this.gameSubject = this.match.gameSubject;
                this.game = this.match.game;
                this.score = executeData.score;
            },
            toReportPage(){
                this.$router.push({
                    name: 'report',
                    query:{
                        execute: this.executeId
                    }
                })
            },
            toReadyRoom() {
                this.$router.push({
                    name: 'index'
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/mixin";
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
                height: 200px;
            }
        }
        .result{
            text-align: center;
            width: 64%;
            margin: auto;
            padding-bottom: 40px;
            background: @defaultBgColor;
            box-shadow: 0 0 20px 0 #ddd;
            border-radius: 12px;
            h6{
                font-size: 34px;
                color: #333;
                font-weight: 700;
                padding: 40px 24px 0;
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
        .examReport{
            padding: 20px 30px;
            margin: 40px 0 0;
            text-align: center;
            button{
                width: 220px;
                height: 72px;
                color: @white;
                font-size: 30px;
                border-radius: 36px;
                background: @defaultColor;
            }
        }
        .readyRoom{
            padding: 20px 30px;
            text-align: center;
            button{
                width: 220px;
                height: 72px;
                color: @white;
                font-size: 30px;
                border-radius: 36px;
                background: @defaultColor;
            }
        }
    }
</style>