<template>
    <div class="topicSmall">
        <div class="contentBox">
            <h4>第{{questionIndex+1}}题</h4>
            <div class="topicType">
                <span v-if="currentItemType=='RADIO'">单选题</span>
                <span v-if="currentItemType=='MULTIPLE'">多选题</span>
                <span v-if="currentItemType=='JUDGEMENT'">判断题</span>
            </div>
                <!--   题干    -->
            <div class="mediaBox">
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
                <div class="audio" v-if="ItemAudio">
                    <audio controls="controls">
                        <source :src="itemData.resourceLocation" type='audio/mp3'>
                        <source :src="itemData.resourceLocation" type='audio/mpeg'>
                        <source :src="itemData.resourceLocation" type="audio/ogg">
                        您的浏览器不支持 audio 元素。
                    </audio>
                    <div class="audioImg" @click="playMedia(event,'AUDIO')"></div>
                </div>
            </div>

            <div class="content" v-html="itemData.content">

            </div>

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
                options:[],
                answer:[],
                matchTask:{
                    matchTaskPart:'',
                    items:[]
                },
                parts:[],
                playCount:0,
            }
        },
        components:{
            [Notify.name]: Notify,
        },
        props:['currentItem','partIndex','answerIndex','itemIndex','id','questionIndex','stopMedia'],
        created(){
            this.taskId = this.$route.query.matchTask;
            this.matchId = this.$route.query.match;
            this.person = this.$route.query.person;
            this.setItem();
        },
        methods:{
            setItem(){
                this.itemData = this.currentItem.father;
                this.currentItemType = this.itemData.type;
                if(this.itemData.content != null){
                    this.itemData.content = decodeURIComponent(this.itemData.content);
                }
                this.options = this.itemData.option.split(",");
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
            getAnswer(){
                let executeItems = JSON.parse(localStorage.getItem("executeItems"+this.taskId+this.person));
                if (executeItems != undefined && executeItems.length > 0
                    && executeItems[this.partIndex] != undefined
                    && executeItems[this.partIndex].items.length > 0
                    &&executeItems[this.partIndex].items[this.answerIndex]) {
                    let answer = executeItems[this.partIndex].items[this.answerIndex].answer;
                    this.answer = [];
                    this.answer.push(...answer.split(","));
                }
            },
            saveAnswer(){
                let _this = this;
                let executeItem = {
                    answer: _this.answer.join(","),
                    matchTaskItem: _this.itemData.identifier,
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
    .topicSmall{
        padding: 88px 0;
        text-align: left;
        .contentBox{
            position: relative;
            h4{
                position: absolute;
                top: 24px;
                width: 100%;
                font-size: 34px;
                font-weight: 500;
                color: @defaultColor;
                text-align: center;
            }
            .topicType{
                padding: 24px 24px 0;
                span{
                    display: inline-block;
                    background-color: #FCD6A9;
                    color: @defaultColor;
                    padding: 8px;
                    border-radius: 12px;
                }
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
            .content{
                padding: 24px;
                line-height: 1.5;
            }
        }
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
            &.judgeBtn{
                button{
                    font-size: 40px;
                }
            }
        }
    }

</style>