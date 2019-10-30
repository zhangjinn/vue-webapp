<template>
    <div class="task">
        <div class="main" v-title data-title="测评"></div>
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
            <part-page v-if="partFlag" :part-data="partData" :part-index="partIndex" v-on:stopCountdown="stopCountdown()" v-on:countDownAgain="countDownAgain()"
            v-on:toTopic="toTopic()"></part-page>
        </template>
        <template v-if="isTopic">
            <topic v-if="topicFlag" :question-index="questionIndex" :question-count="questionCount" :current-data="currenData" :part-index="partIndex"
            v-on:toLastPart="toLastPart()" v-on:toNextPart="toNextPart()" v-on:questionNO="questionNO" v-on:submit="submitTopic()"
            v-on:stopCountdown="stopCountdown()" v-on:countDownAgain="countDownAgain()"></topic>
        </template>
    </div>
</template>
<script>
    import TaskDescribe from "@/components/content/TaskDescribe.vue";
    import PartPage from "@/components/content/PartPage.vue";
    import Topic from "@/components/content/topic.vue";
    import { Dialog,Toast } from 'vant';
    import { getMatchTask, getMatchTaskPart, getExecute, postExecute } from "../../service/api.js";
    export default {
        data() {
            return {
                showTime:false,
                showTopicCount:false,
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
                partIndex:0,
                answerIndex:0,
                partData:{},
                currenData:{},
                minutes:0,
                seconds:0,
                questionIndex:-1,
                questionCount:0,
                countTime:null,
                playStrArr:[],
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
            setPart(){
                this.partFlag = true;
                this.topicFlag = true;
                this.currenData = this.matchData[this.partIndex];
                this.partData = this.currenData.part;
            },
            toPart(){
                this.isTask = false;
                this.isPart = true;
                this.showTime = true;
                this.CountDowntime();
                if(localStorage.getItem("exam_begin_time"+this.taskId+this.person) == undefined){
                    localStorage.setItem("exam_begin_time"+this.taskId+this.person,new Date());
                }
            },
            toLastPart(){
                this.isPart = true;
                this.isTopic = false;
                this.showTopicCount = false;
            },
            toNextPart(){
                this.isPart = true;
                this.isTopic = false;
                this.showTopicCount = false;
                this.partIndex += 1;
                this.setPart();
            },
            toTopic(){
                this.isPart = false;
                this.isTopic = true;
                this.showTopicCount = true;
                this.questionIndex += 1;
            },
            questionNO(val){
              this.questionIndex = val;
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
            stopCountdown(){
                window.clearInterval(this.countTime);
            },
            countDownAgain(){
                this.CountDowntime();
            },
            getAccurateTime(){
                let _this = this;
                let beginTime = localStorage.getItem("exam_begin_time"+_this.taskId+_this.person);
                let limitTime = _this.task.limitTime*60*1000;
                if(beginTime != undefined){
                    let overTime = new Date().getTime() - new Date(beginTime).getTime();
                    let time = limitTime - overTime;
                    if(time < 0){
                        _this.minutes = parseInt(0);
                        _this.seconds = parseInt(0);
                    }else{
                        let minute = Math.floor(time/1000/60);
                        let second = (time - (minute*1000*60))/1000;
                        _this.minutes = parseInt(minute);
                        _this.seconds = parseInt(second);
                    }
                }else{
                    _this.minutes = parseInt(_this.task.limitTime);
                }
            },
            outTime(){
                let _this = this;
                //超时直接提交试卷
                Toast.fail({
                    message: '答题时间已结束',
                    forbidClick: true
                });
                _this.submitCurrentItem();
            },
            async submitTopic(){
                let _this = this;
                let data = {
                    matchTask: _this.taskId,
                    person: _this.person
                }
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
                                path:'/EvaluationResult',
                                query:{
                                    execute:result.identifier,
                                    match:_this.matchId
                                }
                            })
                        }, 1000);
                    } else {
                        setTimeout(function () {
                            _this.$router.push({
                                path:'/result',
                                query:{
                                    execute:result.identifier,
                                    match:_this.matchId
                                }
                            })
                        }, 1000);
                    }
                } else {
                    Dialog.confirm({
                        message: '确定提交试卷？'
                    }).then(() => {
                        _this.submitCurrentItem();
                    }).catch(() => {

                    });
                }
            },
            async submitCurrentItem(){
                let _this = this;
                let answerData;
                if(localStorage.getItem("executeItems"+_this.taskId+_this.person)==undefined){
                    answerData = []
                }else{
                    answerData = JSON.parse(localStorage.getItem("executeItems"+_this.taskId+_this.person))
                    for(let i=0;i<answerData.length;i++){
                        if(answerData[i]==null){
                            answerData[i] = {}
                        }
                    }
                }
                let param = {
                    parts: answerData,
                    person: _this.person,
                    matchTask: _this.task.identifier
                }
                let result = await postExecute(param);
                let execute = result.data;
                localStorage.removeItem("executeItems"+_this.taskId+_this.person);
                localStorage.removeItem("exam_begin_time"+_this.taskId+_this.person);
                if(localStorage.getItem("play_str_"+_this.taskId+_this.person)!=undefined){
                    _this.playStrArr = JSON.parse(localStorage.getItem("play_str_"+_this.taskId+_this.person));
                }
                for(let i=0;i<_this.playStrArr.length;i++){
                    localStorage.removeItem(_this.playStrArr[i]);
                }
                localStorage.removeItem("play_str_"+_this.taskId+_this.person);
                Toast.success({
                    message: '提交答案成功,两秒后跳转到结果页',
                    forbidClick: true
                });
                setTimeout(function () {
                    if (_this.task.type == "EXERCISE") {
                        _this.$router.push({
                            path:'/EvaluationResult',
                            query:{
                                execute:execute,
                                match:_this.matchId
                            }
                        })
                    } else {
                        _this.$router.push({
                            path:'/result',
                            query:{
                                execute:execute,
                                match:_this.matchId
                            }
                        })
                    }
                }, 2000);
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
    }
</script>
<style lang="less" scoped>
    .task{
        color: #666;
        .countDown{
            position: fixed;
            top: 24px;
            left: 24px;
            z-index: 1112;
        }
        .topicCount{
            position: fixed;
            top: 24px;
            right: 24px;
            z-index: 1112;
            span{
                position: absolute;
                top: 0;
                left: -40px;
                font-size: 40px;
                color: #04AEF2;
            }
        }
    }

</style>