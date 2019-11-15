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
                    <video poster="../../assets/images/gameAssess.png"
                           :src="itemData.resourceLocation"
                           x5-playsinline="true"
                           playsinline="true"
                           webkit-playsinline="true"
                           x-webkit-airplay="true"
                           x5-video-player-type="h5"
                           x5-video-player-fullscreen=""
                           x5-video-orientation="portraint"
                    >
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
                    <div class="audioImg" @click="playMedia($event,'AUDIO')"></div>
                </div>
            </div>

            <div class="content" v-html="currentData.content">

            </div>

        </div>
        <!--   选择题      -->
        <ul class="selectUl" v-if="currentItemType=='RADIO'||currentItemType=='MULTIPLE'">
            <button v-for="(option,index) in options" :key="index"
                    @click.prevent="chooseOption($event)"
                    :class="answer.length>0&&answer.indexOf(option.toUpperCase())>-1 ? 'blue' : ''">
                {{option.toLowerCase()}}
            </button>
        </ul>
        <!--   是判断题    -->
        <ul class="selectUl judgeBtn" v-if="currentItemType=='JUDGEMENT'">
            <button @click.prevent="chooseOption($event)" value="true"
                    :class="answer.length>0&&answer.indexOf('true')!=-1 ? 'blue' : ''">√
            </button>
            <button @click.prevent="chooseOption($event)" value="false"
                    :class="answer.length>0&&answer.indexOf('false')!=-1 ? 'blue' : ''">×
            </button>
        </ul>
    </div>
</template>
<script>
    import {Notify} from 'vant';
    import posterImg from "../../assets/images/gameAssess.png";
    import {setStore, getStore, getStringStore, setExamTime} from "../../js/common";

    export default {
        data() {
            return {
                taskId: '',
                matchId: '',
                person: '',
                currentItemType: '',
                ItemVideo: false,
                ItemAudio: false,
                currentData: {},
                itemData: {},
                options: [],
                answer: [],
                matchTask: {
                    matchTaskPart: '',
                    items: []
                },
                parts: [],
                playCount: 0,
            }
        },
        components: {
            [Notify.name]: Notify,
        },
        props: ['currentItem', 'partIndex', 'answerIndex', 'itemIndex', 'id', 'questionIndex', 'stopMedia'],
        created() {
            this.taskId = this.$route.query.matchTask;
            this.matchId = this.$route.query.match;
            this.person = this.$route.query.person;
            this.setItem();
        },
        methods: {
            setItem() {
                this.currentData = this.currentItem;
                this.itemData = this.currentItem.father;
                this.currentItemType = this.itemData.type;
                if (this.itemData.content != null) {
                    this.currentData.content = decodeURIComponent(this.itemData.content);
                }
                this.options = this.itemData.option.split(",");
                this.setMedia();
                this.getAnswer();
            },
            setMedia() {
                if (this.itemData.resourceType == "VIDEO") {
                    this.ItemVideo = true;
                    this.ItemAudio = false;
                } else if (this.itemData.resourceType == "AUDIO") {
                    this.ItemAudio = true;
                    this.ItemVideo = false;
                }
            },
            removeOption() {
                let optionParent = document.getElementsByClassName("selectUl")[0];
                if (optionParent && optionParent.children) {
                    optionParent.children.forEach(function (item) {
                        if (item.classList.length > 0) {
                            item.classList.remove("blue");
                        }
                    })
                }
            },
            getAnswer() {
                let executeItems = getStore("executeItems" + this.taskId + this.person);
                if (executeItems != undefined && executeItems.length > 0
                    && executeItems[this.partIndex] != undefined
                    && executeItems[this.partIndex].items.length > 0
                    && executeItems[this.partIndex].items[this.answerIndex]) {
                    let answer = executeItems[this.partIndex].items[this.answerIndex].answer;
                    this.answer = [];
                    this.answer.push(...answer.split(","));
                } else {
                    this.answer = [];
                    this.removeOption();
                }
            },
            saveAnswer() {
                let _this = this;
                let executeItem = {
                    answer: _this.answer.join(","),
                    matchTaskItem: _this.itemData.identifier,
                };
                let answers = getStore("executeItems" + _this.taskId + _this.person);
                if (answers && answers[_this.partIndex] && answers[_this.partIndex].items && answers[_this.partIndex].items[_this.answerIndex] != undefined) {
                    answers[_this.partIndex].items[_this.answerIndex] = executeItem;
                    _this.parts = answers;
                } else {
                    if (answers && answers[_this.partIndex]) {
                        _this.matchTask = answers[_this.partIndex];
                        _this.matchTask.items[_this.answerIndex] = executeItem;
                    } else {
                        _this.matchTask.matchTaskPart = _this.id;
                        _this.matchTask.items[_this.answerIndex] = executeItem;
                    }
                    if (answers != undefined) {
                        _this.parts = JSON.parse(JSON.stringify(answers));
                    }
                    _this.parts[_this.partIndex] = JSON.parse(JSON.stringify(_this.matchTask));
                }
                let executeItems = _this.parts;
                setStore("executeItems" + _this.taskId + _this.person, executeItems);
            },
            chooseOption(event) {
                let _this = this;
                let optionBtn = event.currentTarget;
                if (_this.currentItemType == "RADIO") {
                    //单选
                    let option = optionBtn.innerText.trim();
                    _this.answer[0] = option.toUpperCase();
                    optionBtn.parentNode.children.forEach(function (item) {
                        item.classList.remove("blue");
                    })
                    optionBtn.classList.add("blue");
                } else if (_this.currentItemType == "MULTIPLE") {
                    //多选
                    //避免重复点击
                    if (optionBtn.className && optionBtn.className.indexOf("blue") != -1) {
                        optionBtn.classList.remove("blue");
                    } else {
                        optionBtn.classList.add("blue");
                    }
                    let btnParent = optionBtn.parentNode;
                    let OBtn = btnParent.children;
                    _this.answer = [];
                    OBtn.forEach(function (item) {
                        if (item.className.indexOf("blue") != -1) {
                            let option = item.innerText.trim();
                            _this.answer.push(option.toUpperCase());
                        }
                    })
                } else if (_this.currentItemType == "JUDGEMENT") {
                    //判断
                    let answerO = optionBtn.value;
                    _this.answer[0] = answerO;
                    optionBtn.parentNode.children.forEach(function (item) {
                        item.classList.remove("blue");
                    })
                    optionBtn.classList.add("blue");
                }
                this.saveAnswer();
            },
            playMedia(event, type) {
                let _this = this;
                let dom = event.currentTarget;
                let str, flag = false;
                let typeText;
                if (type == "VIDEO") {
                    str = "v_part" + _this.partIndex + "_item" + _this.itemIndex + _this.taskId + _this.person;
                    typeText = "视频";
                } else {
                    str = "a_part" + _this.partIndex + "_item" + _this.itemIndex + _this.taskId + _this.person;
                    typeText = "音频";
                }
                let playLimit = _this.itemData.playLimit;
                let stopCountTime = _this.itemData.suspendExam;
                if (getStringStore(str) != undefined) {
                    _this.playCount = parseInt(getStringStore(str));
                } else {
                    _this.playCount = 0;
                }
                if (getStore("play_str_" + _this.taskId + _this.person) != undefined) {
                    _this.playStrArr = getStore("play_str_" + _this.taskId + _this.person);
                } else {
                    _this.playStrArr = [];
                }
                for (let i = 0; i < _this.playStrArr.length; i++) {
                    if (_this.playStrArr[i] == str) {
                        flag = true
                    }
                }
                if (flag == false) {
                    _this.playStrArr.push(str)
                }
                setStore("play_str_" + _this.taskId + _this.person, _this.playStrArr);
                let media = dom.previousElementSibling;
                if (media.paused) {
                    if (_this.playCount < playLimit) {
                        media.play();
                        if (type == "VIDEO") {
                            dom.firstChild.style.display = "none";
                        }
                        let playCount = _this.playCount;
                        media.addEventListener("timeupdate", function () {
                            if (_this.playCount == playCount) {
                                _this.playCount += 1;
                                setStore(str, _this.playCount);
                                if (stopCountTime == true) {
                                    _this.$emit("stopCountdown");
                                    let time = media.duration * 1000;
                                    let delayTime;
                                    let beginTime = getStringStore("exam_begin_time" + _this.taskId + _this.person);
                                    if (beginTime != undefined) {
                                        let miTime = new Date(beginTime).getTime() + time;
                                        delayTime = new Date(miTime);
                                    }
                                    setExamTime("exam_begin_time" + _this.taskId + _this.person, delayTime);
                                    media.addEventListener('ended', function () {
                                        _this.$emit("countDownAgain");
                                    })
                                }
                            }
                            media.addEventListener("pause", function () {
                                if (type == "VIDEO") {
                                    if (document.body.getElementsByClassName("topic")[0] != undefined && document.body.getElementsByClassName("topic")[0] != null) {
                                        if (document.querySelector('video') != null) {
                                            if (!media.ended) {
                                                media.play();
                                                Notify({
                                                    message: typeText + "不能暂停!",
                                                    color: '#333',
                                                    background: '#fff',
                                                    duration: 1000
                                                });
                                            }
                                        }
                                    }
                                }
                            })
                            media.addEventListener('ended', function () {
                                if (type == "VIDEO") {
                                    dom.firstChild.style.display = "block";
                                    media.remove();
                                    var video = document.createElement("video");
                                    video.poster = posterImg;
                                    video.src = _this.itemData.resourceLocation;
                                    video.setAttribute('x5-playsinline',true);
                                    video.setAttribute('playsinline',true);
                                    video.setAttribute('webkit-playsinline',true);
                                    video.setAttribute('x-webkit-airplay',true);
                                    video.setAttribute('x5-video-player-type',"h5");
                                    video.setAttribute('x5-video-player-fullscreen','');
                                    video.setAttribute('x5-video-orientation',"portraint");
                                    video.style.width = "100%";
                                    video.style.height = "100%";
                                    let html = '<source src="' + _this.itemData.resourceLocation + '" type=\'video/mpeg\' />' +
                                        '<source src="' + _this.itemData.resourceLocation + '" type=\'video/webm\' />' +
                                        '<source src="' + _this.itemData.resourceLocation + '" type=\'video/ogg\' />'
                                    video.innerHTML = html;
                                    if (dom.parentNode.querySelector("video") == null) {
                                        dom.parentNode.insertBefore(video, dom)
                                    }
                                }
                            })
                        })
                    } else {
                        Notify({
                            message: "该" + typeText + "只能播放" + playLimit + "次!",
                            color: '#333',
                            background: '#fff',
                            duration: 1000
                        });
                        _this.playCount = 0;
                    }
                } else {
                    Notify({
                        message: typeText + "不能暂停!",
                        color: '#333',
                        background: '#fff',
                        duration: 1000
                    });
                }
            }
        },
        watch: {
            itemIndex: function () {
                let _this = this;
                this.ItemVideo = false;
                this.ItemAudio = false;

                setTimeout(function () {
                    _this.setItem();
                    _this.getAnswer();
                }, 250)

            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../assets/style/mixin.less";

    .topicSmall {
        padding: 88px 0;
        text-align: left;

        .contentBox {
            position: relative;

            h4 {
                position: absolute;
                top: 24px;
                width: 100%;
                font-size: 34px;
                font-weight: 500;
                color: @defaultColor;
                text-align: center;
            }

            .topicType {
                padding: 24px 24px 0;

                span {
                    display: inline-block;
                    background-color: #FCD6A9;
                    color: @defaultColor;
                    padding: 8px;
                    border-radius: 12px;
                }
            }

            .mediaBox {
                padding-top: 24px;

                .video {
                    .wh(100%, 400px);
                    position: relative;

                    video {
                        .wh(100%, 100%);
                    }

                    .videoImg {
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        z-index: 999;
                        background: transparent;

                        span {
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            margin: auto;
                            .wh(100px, 100px);
                            display: inline-block;
                            font-size: 100px;
                            color: #fff;
                        }
                    }
                }

                .audio {
                    .wh(100%, 100px);
                    position: relative;

                    audio {
                        .wh(100%, 100%);
                    }

                    .audioImg {
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

            .content {
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

            &.judgeBtn {
                button {
                    font-size: 40px;
                }
            }
        }
    }

</style>