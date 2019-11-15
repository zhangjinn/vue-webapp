<template>
    <div class="task" v-wechat-title="this.title">
        <div class="countDown" v-if="showTime">
            {{minute}}:{{second}}
        </div>
        <div class="topicCount" v-if="showTopicCount">
            <span class="icon iconfont icontimu"></span>
            {{questionIndex+1}}/{{questionCount}}
        </div>
        <template v-if="isTask">
            <task-describe :task-data="task" v-if="taskFlag" v-on:begin="toPart()"></task-describe>
        </template>
        <template v-if="isPart">
            <part-page v-if="partFlag" :part-data="partData" :part-index="partIndex"
                       v-on:stopCountdown="stopCountdown()" v-on:countDownAgain="countDownAgain()"
                       v-on:toTopic="toTopic()"></part-page>
        </template>
        <template v-if="isTopic">
            <topic v-if="topicFlag" :question-index="questionIndex" :question-count="questionCount"
                   :current-data="currenData" :part-index="partIndex"
                   :topic-index="topicIndex"
                   v-on:toLastPart="toLastPart()" v-on:toNextPart="toNextPart()" v-on:questionNO="questionNO"
                   v-on:submit="submitTopic()" v-on:itemIndex="sureIndex"
                   v-on:stopCountdown="stopCountdown()" v-on:countDownAgain="countDownAgain()"></topic>
        </template>
    </div>
</template>
<script>
    import TaskDescribe from "@/components/content/taskDescribe.vue";
    import PartPage from "@/components/content/partPage.vue";
    import Topic from "@/components/content/topic.vue";
    import bus from '../../../../js/bus';
    import {Dialog, Toast} from 'vant';
    import {removeFirstTime} from '../../../../js/user';
    import {removeStore, getStore, getStringStore, setExamTime} from '../../../../js/common';
    import {
        getMatchTask,
        getMatchTaskPart,
        getExecute,
        postExecute
    } from "../../../../service/husky/api.js";

    export default {
        name: 'taskAssess',
        data() {
            return {
                title: '测评',
                showTime: false,
                showTopicCount: false,
                isTask: true,
                taskFlag: false,
                isPart: false,
                partFlag: false,
                isTopic: false,
                topicFlag: false,
                taskId: '',
                matchId: "",
                person: '',
                task: {},
                match: {},
                partIndex: 0,
                answerIndex: 0,
                partData: {},
                currenData: {},
                minutes: 0,
                seconds: 0,
                questionIndex: -1,
                questionCount: 0,
                countTime: null,
                playStrArr: [],
                turnBack: 0,
                topicIndex: 0
            }
        },
        components: {
            TaskDescribe,
            PartPage,
            Topic,
            [Dialog.Component.name]: Dialog.Component,
            [Toast.name]: Toast
        },
        created() {
            this.taskId = this.$route.query.matchTask;
            this.matchId = this.$route.query.match;
            this.person = this.$route.query.person;
            this.getTask();
            this.getMatch();
        },
        methods: {
            async getTask() {
                let res = await getMatchTask(this.taskId);
                this.task = res.data;
                this.questionCount = this.task.questionCount;
                this.taskFlag = true;
                this.getAccurateTime();
            },
            async getMatch() {
                let data = {
                    matchTask: this.taskId,
                    person: this.person
                }
                let matchData = await getMatchTaskPart(data);
                this.matchData = matchData.data;
                this.setPart();
            },
            setPart() {
                this.partFlag = true;
                this.topicFlag = true;
                this.currenData = this.matchData[this.partIndex];
                this.partData = this.currenData.part;
            },
            toPart() {
                this.isTask = false;
                this.isPart = true;
                this.showTime = true;
                this.CountDowntime();
                if (getStringStore("exam_begin_time" + this.taskId + this.person) == undefined) {
                    setExamTime("exam_begin_time" + this.taskId + this.person, new Date());
                }
            },
            toLastPart() {
                this.isPart = true;
                this.isTopic = false;
                this.showTopicCount = false;
                this.CountDowntime();
            },
            toNextPart() {
                this.isPart = true;
                this.isTopic = false;
                this.showTopicCount = false;
                this.topicIndex = 0;
                this.partIndex += 1;
                this.setPart();
                this.CountDowntime();
            },
            toTopic() {
                this.isPart = false;
                this.isTopic = true;
                this.showTopicCount = true;
                this.questionIndex += 1;
                this.CountDowntime();
            },
            questionNO(val) {
                this.questionIndex = val;
            },
            sureIndex(val) {
                this.topicIndex = val;
            },
            //保证倒数时间是两位 (15:03) / (15:11)
            fotmatNum(num) {
                return num < 10 ? "0" + num : "" + num;
            },
            //倒计时
            CountDowntime() {
                let _this = this;
                window.clearInterval(_this.countTime);
                _this.countTime = window.setInterval(function () {
                    if (_this.seconds === 0 && _this.minutes !== 0) {
                        _this.seconds = 59;
                        _this.minutes -= 1;
                    } else if (_this.minutes === 0 && _this.seconds === 0) {
                        _this.seconds = 0;
                        window.clearInterval(_this.countTime);
                        //超时提交函数
                        _this.outTime();
                    } else {
                        _this.seconds -= 1;
                    }
                }, 1000);
            },
            //停止倒计时
            stopCountdown() {
                window.clearInterval(this.countTime);
            },
            countDownAgain() {
                this.CountDowntime();
            },
            getAccurateTime() {
                let _this = this;
                let beginTime = getStringStore("exam_begin_time" + _this.taskId + _this.person);
                let limitTime = _this.task.limitTime * 60 * 1000;
                if (beginTime != undefined) {
                    let overTime = new Date().getTime() - new Date(beginTime).getTime();
                    let time = limitTime - overTime;
                    if (time < 0) {
                        _this.minutes = parseInt(0);
                        _this.seconds = parseInt(0);
                    } else {
                        let minute = Math.floor(time / 1000 / 60);
                        let second = (time - (minute * 1000 * 60)) / 1000;
                        _this.minutes = parseInt(minute);
                        _this.seconds = parseInt(second);
                    }
                } else {
                    _this.minutes = parseInt(_this.task.limitTime);
                }
            },
            outTime() {
                //超时直接提交试卷
                Toast.fail({
                    message: '答题时间已结束',
                    forbidClick: true
                });
                this.submitCurrentItem();
            },
            async submitTopic() {
                let _this = this;
                let data = {
                    matchTask: _this.taskId,
                    person: _this.person
                }
                this.isTopic = false;
                let execute = await getExecute(data);
                let result = execute.data;
                if (result.score != null) {
                    Toast.fail({
                        message: '已提交过任务,不能重复提交!',
                        forbidClick: true
                    });
                    if (_this.task.type == "EXERCISE") {
                        setTimeout(function () {
                            _this.$router.push({
                                path: '/EvaluationResult',
                                query: {
                                    execute: result.identifier,
                                    match: _this.matchId
                                }
                            })
                        }, 1000);
                    } else {
                        setTimeout(function () {
                            _this.$router.push({
                                path: '/result',
                                query: {
                                    execute: result.identifier,
                                    match: _this.matchId
                                }
                            })
                        }, 1000);
                    }
                } else {
                    this.isTopic = true;
                    this.CountDowntime();
                    Dialog.confirm({
                        message: '确定提交试卷？'
                    }).then(() => {
                        _this.submitCurrentItem();
                    }).catch(() => {

                    });
                }
            },
            async submitCurrentItem() {
                let _this = this;
                let answerData;
                if (getStore("executeItems" + _this.taskId + _this.person) == undefined) {
                    answerData = []
                } else {
                    answerData = getStore("executeItems" + _this.taskId + _this.person);
                    for (let i = 0; i < answerData.length; i++) {
                        if (answerData[i] == null) {
                            answerData[i] = {}
                        }
                    }
                }
                let param = {
                    parts: answerData,
                    person: _this.person,
                    matchTask: _this.task.identifier
                }
                debugger;
                let result = await postExecute(param);
                let execute = result.data;
                removeStore("executeItems" + _this.taskId + _this.person);
                removeStore("exam_begin_time" + _this.taskId + _this.person);
                if (getStore("play_str_" + _this.taskId + _this.person) != undefined) {
                    _this.playStrArr = getStore("play_str_" + _this.taskId + _this.person);
                }
                for (let i = 0; i < _this.playStrArr.length; i++) {
                    removeStore(_this.playStrArr[i]);
                }
                removeStore("play_str_" + _this.taskId + _this.person);
                removeFirstTime();
                Toast.success({
                    message: '提交答案成功,两秒后跳转到结果页',
                    forbidClick: true
                });
                setTimeout(function () {
                    if (_this.task.type == "EXERCISE") {
                        _this.$router.push({
                            path: '/EvaluationResult',
                            query: {
                                execute: execute,
                                match: _this.matchId
                            }
                        })
                    } else {
                        _this.$router.push({
                            path: '/result',
                            query: {
                                execute: execute,
                                match: _this.matchId
                            }
                        })
                    }
                }, 2000);
            },
            backChange() {
                this.$router.push({
                    path: '/taskReturn',
                    query: {
                        matchTask: this.taskId,
                        match: this.matchId,
                        person: this.person,
                    }
                })
            },
            outTask(){
                this.submitCurrentItem();
            }
        },
        watch: {
            second: {
                handler(newVal) {
                    this.fotmatNum(newVal);
                }
            },
            minute: {
                handler(newVal) {
                    this.fotmatNum(newVal);
                }
            }
        },
        //过滤处理属性
        computed: {
            second: function () {
                return this.fotmatNum(this.seconds);
            },
            minute: function () {
                return this.fotmatNum(this.minutes);
            }

        },
        mounted() {
            // 如果支持 popstate 一般移动端都支持了
            if (window.history && window.history.pushState) {
                // 往历史记录里面添加一条新的当前页面的url
                history.pushState(null, null, document.URL);
                // 给 popstate 绑定一个方法 监听页面刷新
                window.addEventListener('popstate', this.backChange, false);//false阻止默认事件
            }
            let _this = this;
            bus.$on('submit', function (val) {
                if (val == 'true') {
                    _this.outTask();
                }
            })
        },
        beforeDestroy() {
            bus.$off("submit");
        },
        destroyed() {
            window.removeEventListener('popstate', this.backChange, false);//false阻止默认事件
        }
    }
</script>
<style lang="less" scoped>
    .task {
        color: #666;

        .countDown {
            position: fixed;
            top: 24px;
            left: 24px;
            z-index: 1112;
        }

        .topicCount {
            position: fixed;
            top: 24px;
            right: 24px;
            z-index: 1112;

            span {
                position: absolute;
                top: 0;
                left: -40px;
                font-size: 40px;
                color: #04AEF2;
            }
        }
    }

</style>
