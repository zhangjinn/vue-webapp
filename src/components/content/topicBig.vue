<template>
    <div class="topicBig">
        <div class="stem">
            <h4>第{{questionIndex+1}}题</h4>
            <div vlass="mediaBox">
                <div class="audio" v-if="ItemAudio">
                    <audio controls="controls">
                        <source :src="itemData.resourceLocation" type='audio/mp3'>
                        <source :src="itemData.resourceLocation" type='audio/wav'>
                        <source :src="itemData.resourceLocation" type='audio/ogg'>
                    </audio>
                    <div class="audioImg" @click="playMedia(event,'AUDIO')"></div>
                </div>
                <div class="video" v-if="ItemVideo">
                    <video poster="../../assets/images/gameAssess.png">
                        <source :src="itemData.resourceLocation" type='video/mp4'/>
                        <source :src="itemData.resourceLocation" type='video/webm'/>
                        <source :src="itemData.resourceLocation" type='video/ogg'/>
                    </video>
                    <div class="videoImg" @click="playMedia($event,'VIDEO')">
                        <span class="icon iconfont iconbofang"></span>
                    </div>
                </div>
            </div>
            <!--    主题干   -->
            <div class="textTopic" v-html="itemData.content">

            </div>
        </div>
        <div class="question">
            <div class="questionTop">
                <div class="touchUp" @touchstart="draw($event)">
                    <img class="touchImg" src="../../assets/images/drawIcon.png"/>
                </div>

            </div>
            <div class="questionBottom">
                <div class="questionCount">
                    {{childIndex+1}}/{{childLength}}小题
                </div>
                <div class="questionMain">
                    <!--  小题题干    -->
                    <div v-html="childData.content">

                    </div>
                    <!--   选择题      -->
                    <ul class="selectUl" v-if="currentItemType=='RADIO'||currentItemType=='MULTIPLE'">
                        <button v-for="(option,index) in options" :key="index"
                                @click.prevent="chooseOption($event)"
                                :class="answer.length>0&&answer.indexOf(option)>-1 ? 'blue' : ''">
                            {{option.toLowerCase()}}
                        </button>
                    </ul>
                    <!--   是判断题    -->
                    <ul class="selectUl judgeBtn" v-if="currentItemType=='JUDGEMENT'">
                        <button @click.prevent="chooseOption($event)" value="true">√</button>
                        <button @click.prevent="chooseOption($event)" value="false">×</button>
                    </ul>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Notify } from 'vant';
    import posterImg from "../../assets/images/gameAssess.png";
    export default {
        data(){
            return {
                taskId:'',
                matchId:'',
                person:'',
                currentItemType:'',
                ItemVideo:false,
                ItemAudio:false,
                itemData:{},
                childData:{},
                options:[],
                answer:[],
                matchTask:{
                    matchTaskPart:'',
                    items:[]
                },
                parts:[],
                playCount:0,
                childLength:0
            }
        },
        props:['currentItem','partIndex','answerIndex','itemIndex','id','childIndex','questionIndex'],
        components:{
            [Notify.name]: Notify,
        },
        created(){
            this.taskId = this.$route.query.matchTask;
            this.matchId = this.$route.query.match;
            this.person = this.$route.query.person;
            this.setItem();
        },
        methods:{
            setItem(){
                this.itemData = this.currentItem.father;
                this.childData = this.currentItem.son[this.childIndex];
                this.currentItemType = this.childData.type;
                this.childLength = this.currentItem.son.length;
                if(this.itemData.content != null){
                    this.itemData.content = decodeURIComponent(this.itemData.content);
                }
                if(this.childData.content != null){
                    this.childData.content = decodeURIComponent(this.childData.content);
                }
                this.options = this.childData.option.split(",");
                this.setMedia();
                this.getAnswer();
            },
            setMedia(){
                if(this.itemData.resourceType == "VIDEO"){
                    this.ItemVideo = true;
                    this.ItemAudio = false;
                }else if(this.itemData.resourceType == "AUDIO"){
                    this.ItemAudio = true;
                    this.ItemVideo = false;
                }
            },
            draw(e) {
                e.stopPropagation();
                let oBox = document.getElementsByClassName("question")[0];
                let img = document.getElementsByClassName("touchImg")[0];
                let oBoxH = oBox.offsetHeight;
                let touch01 = e.targetTouches[0];
                let y = touch01.clientY;
                document.ontouchmove = e => {
                    let touch02 = e.targetTouches[0];
                    let boxH = y - touch02.clientY;
                    oBox.style.height = (oBoxH + boxH) + 'px';
                    if (oBox.offsetHeight >= 500) {
                        img.style.transform = "rotate(180deg)";
                    }
                    if (oBox.offsetHeight <= 80) {
                        img.style.transform = "rotate(0deg)";
                    }
                }
                document.ontouchend = () => [document.ontouchmove, document.ontouchend] = [null, null]
                e.preventDefault && e.preventDefault()
            },
            getAnswer(){
                let executeItems = JSON.parse(localStorage.getItem("executeItems"+this.taskId+this.person));
                if (executeItems != undefined && executeItems.length > 0
                    && executeItems[this.partIndex] != undefined
                    && executeItems[this.partIndex].items.length > 0
                    &&executeItems[this.partIndex].items[this.answerIndex]) {
                    let answer = executeItems[this.partIndex].items[this.answerIndex].answer;
                    this.answer = [];
                    this.answer.push(...answer.split(","));
                }else{
                    this.answer = [];
                }
            },
            saveAnswer(){
                let _this = this;
                let executeItem = {
                    answer: _this.answer.join(","),
                    matchTaskItem: _this.childData.identifier,
                };
                let answers = JSON.parse(localStorage.getItem("executeItems"+_this.taskId+_this.person));
                if(answers&&answers[_this.partIndex]&&answers[_this.partIndex].items&&answers[_this.partIndex].items[_this.answerIndex]!=undefined){
                    answers[_this.partIndex].items[_this.answerIndex] = executeItem;
                    _this.parts = answers;
                }else{
                    if(answers&&answers[_this.partIndex]){
                        _this.matchTask = answers[_this.partIndex];
                        _this.matchTask.items[_this.answerIndex] = executeItem;
                    }else{
                        _this.matchTask.matchTaskPart = _this.id;
                        _this.matchTask.items[_this.answerIndex] = executeItem;
                    }
                    if(answers != undefined){
                        _this.parts = JSON.parse(JSON.stringify(answers));
                    }
                    _this.parts[_this.partIndex] = JSON.parse(JSON.stringify(_this.matchTask));
                }
                let executeItems = _this.parts;
                localStorage.setItem("executeItems"+_this.taskId+_this.person, JSON.stringify(executeItems));
            },
            chooseOption(event){
                let _this = this;
                let optionBtn = event.currentTarget;
                let option = optionBtn.innerText.trim();
                if (_this.currentItemType == "RADIO") {
                    //单选
                    _this.answer[0] = option.toUpperCase();
                    optionBtn.parentNode.children.forEach(function(item){
                        item.classList.remove("blue");
                    })
                    optionBtn.classList.add("blue");
                } else if (_this.currentItemType == "MULTIPLE") {
                    //多选
                    //避免重复点击
                    if(optionBtn.className&&optionBtn.className.indexOf("blue")!=-1){
                        for (let i = 0; i < _this.answer.length; i++) {
                            if (_this.answer[i] == option.toUpperCase()) {
                                _this.answer.splice(i, 1);
                                break;
                            }
                        }
                        optionBtn.classList.remove("blue");
                    }else {
                        _this.answer.push(option.toUpperCase());
                        optionBtn.classList.add("blue");
                    }
                } else if (_this.currentItemType == "JUDGEMENT") {
                    //判断
                    let answerO = optionBtn.val();
                    _this.answer[0] = answerO;
                    optionBtn.parentNode.children.forEach(function(item){
                        item.classList.remove("blue");
                    })
                    optionBtn.classList.add("blue");
                }
                this.saveAnswer();
            },
            playMedia(event,type){
                let _this = this;
                let dom = event.currentTarget;
                let str,flag = false;
                let typeText;
                if(type == "VIDEO"){
                    str = "v_part"+_this.partIndex+"_item"+_this.itemIndex+_this.taskId+_this.person;
                    typeText = "视频";
                }else{
                    str = "a_part"+_this.partIndex+"_item"+_this.itemIndex+_this.taskId+_this.person;
                    typeText = "音频";
                }
                let playLimit = _this.itemData.playLimit;
                let stopCountTime = _this.itemData.suspendExam;
                if(localStorage.getItem(str)!=undefined){
                    _this.playCount = parseInt(localStorage.getItem(str));
                }else{
                    _this.playCount = 0;
                }
                if(localStorage.getItem("play_str_"+_this.taskId+_this.person)!=undefined){
                    _this.playStrArr = JSON.parse(localStorage.getItem("play_str_"+_this.taskId+_this.person));
                }else{
                    _this.playStrArr = [];
                }
                for(let i=0;i<_this.playStrArr.length;i++){
                    if(_this.playStrArr[i] == str){
                        flag = true
                    }
                }
                if(flag == false){
                    _this.playStrArr.push(str)
                }
                localStorage.setItem("play_str_"+_this.taskId+_this.person,JSON.stringify(_this.playStrArr));
                let media = dom.previousElementSibling;
                if(media.paused){
                    if(_this.playCount < playLimit){
                        media.play();
                        if(type == "VIDEO"){
                            dom.firstChild.style.display = "none";
                        }
                        let playCount = _this.playCount;
                        media.addEventListener("timeupdate",function(){
                            if(_this.playCount == playCount){
                                _this.playCount += 1;
                                localStorage.setItem(str,_this.playCount);
                                if(stopCountTime == true){
                                    _this.$emit("stopCountdown");
                                    let time = media.duration*1000;
                                    let delayTime;
                                    let beginTime = localStorage.getItem("exam_begin_time"+_this.taskId+_this.person);
                                    if(beginTime != undefined){
                                        let miTime = new Date(beginTime).getTime() + time;
                                        delayTime = new Date(miTime);
                                    }
                                    localStorage.setItem("exam_begin_time"+_this.taskId+_this.person,delayTime);
                                    media.addEventListener('ended',function(){
                                        _this.$emit("countDownAgain");
                                    })
                                }
                            }
                            media.addEventListener("pause",function(){
                                if(type == "VIDEO"){
                                    if(document.querySelector('video') != null){
                                        if(!media.ended){
                                            media.play();
                                            Notify({
                                                message: typeText+"不能暂停!",
                                                color: '#333',
                                                background: '#fff',
                                                duration: 500
                                            });
                                        }
                                    }
                                }
                            })
                            media.addEventListener('ended',function(){
                                if(type == "VIDEO"){
                                    dom.firstChild.style.display = "block";
                                    media.remove();
                                    var video = document.createElement("video");
                                    video.poster = posterImg;
                                    video.style.width = "100%";
                                    video.style.height = "100%";
                                    let html = '<source src="'+_this.itemData.resourceLocation+'" type=\'video/mpeg\' />' +
                                        '<source src="'+_this.itemData.resourceLocation+'" type=\'video/webm\' />' +
                                        '<source src="'+_this.itemData.resourceLocation+'" type=\'video/ogg\' />'
                                    video.innerHTML = html;
                                    if(dom.parentNode.querySelector("video") == null){
                                        dom.parentNode.insertBefore(video,dom)
                                    }
                                }
                            })
                        })
                    }else{
                        Notify({
                            message: "该"+typeText+"只能播放"+playLimit+"次!",
                            color: '#333',
                            background: '#fff',
                            duration: 500
                        });
                        _this.playCount = 0;
                    }
                }else{
                    Notify({
                        message: typeText+"不能暂停!",
                        color: '#333',
                        background: '#fff',
                        duration: 500
                    });
                }
            }
        },
        watch:{
            itemIndex:function(){
                let _this = this;
                this.ItemVideo = false;
                this.ItemAudio = false;
                setTimeout(function(){
                    _this.setItem();
                },250)
            },
            childIndex:function(){
                this.childData = this.currentItem.son[this.childIndex];
                this.currentItemType = this.childData.type;
                if(this.childData.content != null){
                    this.childData.content = decodeURIComponent(this.childData.content);
                }
                this.options = this.childData.option.split(",");
            },
            answerIndex:function(){
                document.getElementsByClassName("selectUl")[0].children.forEach(function(item){
                    if(item.classList.length>0){
                        item.classList.remove("blue");
                    }
                })
                this.getAnswer();
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../assets/style/mixin.less";
    .topicBig{
        padding: 88px 0;
        text-align: left;
        .stem{
            h4{
                font-size: 34px;
                font-weight: 500;
                color: @defaultColor;
                text-align: center;
            }
            .mediaBox {
                padding-top:24px;
                .video {
                    .wh(100%,400px);
                    position: relative;
                    video {
                        .wh(100%,100%);
                    }
                    .videoImg{
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: 999;
                        background: transparent;
                        span{
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            margin: auto;
                            .wh(100px,100px);
                            display: inline-block;
                            font-size: 100px;
                            color: #fff;
                        }
                    }
                }
                .audio{
                    .wh(100%,100px);
                    position: relative;
                    audio{
                        .wh(100%,100%);
                    }
                    .audioImg{
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: 999;
                        background: transparent;
                    }
                }
            }
            .textTopic{
                padding: 24px;
                font-size: 30px;
                margin-bottom: 28px;
            }
        }
        .question{
            position: fixed;
            left: 0;
            bottom: 100px;
            z-index: 1111;
            width: 100%;
            height: 160px;
            min-height:160px;
            max-height: 1000px;
            background: #fff;
            border-top: 2px solid #eee;
            .questionTop{
                position: absolute;
                left: 0;
                right: 0;
                margin: 0 auto;
                top: -46px;
                width: 160px;
                height: 48px;
                background: #fff;
                .touchUp{
                    width: 100%;
                    height: 48px;
                    text-align: center;
                    border: 2px solid #eee;
                    border-bottom: none;
                    .touchImg{
                        width: 100px;
                        height: auto;
                    }
                }
            }
            .questionBottom{
                width: 100%;
                height: 100%;
                overflow: hidden;
                .questionCount{
                    padding-top: 20px;
                    font-size: 30px;
                    text-align: center;
                    color: #666;
                }
                .questionMain{
                    padding: 24px;
                    height: calc(100% - 64px);
                    font-size: 32px;
                    overflow-y: auto;
                    .selectUl {
                        background: @white;
                        text-align: center;
                        padding: 40px 0;
                        button {
                            margin-top: 32px;
                            height: 72px;
                            width: 540px;
                            font-size: 34px;
                            border-radius: 36px;
                            background: #fff;
                            color: #999;
                            border: 2px solid #eee;
                            &.blue {
                                background-color: #04AEF2;
                                color: #fff;
                            }
                        }
                    }
                    &.judgeBtn{
                        button{
                            font-size: 40px;
                        }
                    }
                }
            }
        }

    }
</style>