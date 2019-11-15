<template>
    <div class="resultPage" v-wechat-title="this.title">
        <div class="content">
            <img class="userIcon" src="../../../../assets/images/gameHeader.png">
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
            <button @click="toReadyRoom()">返回首页</button>
        </div>
    </div>
</template>

<script>
    import {getExecute} from '../../../../service/husky/api.js'

    export default {

        data() {
            return {
                title: '测评结果',
                student: {},
                task: {},
                gameSubject: {},
                game: {},
                match: {},
                matchId: "",
                score: 0,
                executeId: ""
            }
        },
        created() {
            this.executeId = this.$route.query.execute;
            this.matchId = this.$route.query.match;
            this.getData();
        },
        methods: {
            async getData() {
                let res = await getExecute({}, this.executeId);
                let executeData = res.data;
                let matchTask = executeData.matchTask;
                this.match = matchTask.match;
                this.gameSubject = this.match.gameSubject;
                this.game = this.match.game;
                this.score = executeData.score;
            },
            toReportPage() {
                this.$router.push({
                    path: '/report',
                    query: {
                        execute: this.executeId
                    }
                })
            },
            toReadyRoom() {
                this.$router.push({
                    path: '/index'
                })
            },
            backIndex() {
                this.toReadyRoom();
            }
        },
        mounted() {
            // 如果支持 popstate 一般移动端都支持了
            if (window.history && window.history.pushState) {
                // 往历史记录里面添加一条新的当前页面的url
                history.pushState(null, null, document.URL);
                // 给 popstate 绑定一个方法 监听页面刷新
                window.addEventListener('popstate', this.backIndex, false);//false阻止默认事件
            }
        },
        destroyed() {
            window.removeEventListener('popstate', this.backIndex, false);//false阻止默认事件
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../assets/style/mixin";

    .resultPage {
        .content {
            width: 100%;
            height: 400px;
            background: transparent url(../../../../assets/images/resultBG.png) no-repeat;
            background-size: 100% 100%;
            position: relative;
            margin-bottom: 160px;

            .userIcon {
                position: absolute;
                right: 0;
                left: 0;
                margin: 0 auto;
                bottom: -25%;
                width: 200px;
                height: 200px;
            }
        }

        .result {
            text-align: center;
            width: 64%;
            margin: auto;
            padding-bottom: 40px;
            background: @defaultBgColor;
            box-shadow: 0 0 20px 0 #ddd;
            border-radius: 12px;

            h6 {
                font-size: 34px;
                color: #333;
                font-weight: 700;
                padding: 40px 24px 0;
            }

            span {
                color: #666;
                font-size: 28px;
            }

            p {
                font-size: 40px;
                color: #FB494D;
                height: 120px;
                line-height: 120px;
                font-weight: 700;
            }

            i {
                font-style: normal;
                color: #04AEF2;
            }
        }

        .examReport {
            padding: 20px 30px;
            margin: 40px 0 0;
            text-align: center;

            button {
                width: 220px;
                height: 72px;
                color: @white;
                font-size: 30px;
                border-radius: 36px;
                background: @defaultColor;
            }
        }

        .readyRoom {
            padding: 20px 30px;
            text-align: center;

            button {
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
