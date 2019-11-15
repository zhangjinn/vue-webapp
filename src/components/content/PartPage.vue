<template>
    <div class="partPage">
        <div class="header">
            <span class="title">{{title}}</span>
        </div>

        <div class="mediaBox">
            <div v-if="isVideo" class="video">
                <video poster="../../assets/images/gameAssess.png"
                       :src="part.resourceLocation"
                       x5-playsinline="true"
                       playsinline="true"
                       webkit-playsinline="true"
                       x-webkit-airplay="true"
                       x5-video-player-type="h5"
                       x5-video-player-fullscreen=""
                       x5-video-orientation="portraint"
                >
                    <source :src="part.resourceLocation" type='video/mpeg'/>
                    <source :src="part.resourceLocation" type='video/webm'/>
                    <source :src="part.resourceLocation" type='video/ogg'/>
                </video>
                <div class="videoImg" @click="playMedia($event,'VIDEO')">
                    <span class="icon iconfont iconbofang"></span>
                </div>
            </div>
            <div v-if="isAudio" class="audio">
                <audio controls="controls">
                    <source :src="part.resourceLocation" type="audio/mp3">
                    <source :src="part.resourceLocation" type="audio/ogg">
                    <source :src="part.resourceLocation" type='audio/mpeg'>
                    您的浏览器不支持 audio 元素。
                </audio>
                <div class="audioImg" @click="playMedia($event,'AUDIO')"></div>
            </div>
        </div>

        <div class="profile">
            <div v-html="part.description"></div>
            <p>点击“NEXT”开始答题。</p>
        </div>


        <div class="next" @click="toTopic()">
            <span>NEXT</span>
        </div>
    </div>
</template>

<script>
    import {Notify} from 'vant';
    import posterImg from "../../assets/images/gameAssess.png";
    import {setStore, getStore, getStringStore, setExamTime} from "../../js/common";

    export default {
        name: 'PartPage',
        data() {
            return {
                taskId: '',
                matchId: '',
                person: '',
                title: "",
                isVideo: false,
                isAudio: false,
                matchData: {},
                part: {},
                playStrArr: [],
                mediaStop: false,
            }
        },
        components: {
            [Notify.name]: Notify,
        },
        props: ["partData", "partIndex"],
        created() {
            this.taskId = this.$route.query.matchTask;
            this.matchId = this.$route.query.match;
            this.person = this.$route.query.person;
            this.getItemList();
        },
        methods: {
            // 去答题目
            toTopic() {
                this.$emit("toTopic");
                this.mediaStop = true;
            },
            getItemList() {
                this.part = this.partData;
                this.part.description = decodeURIComponent(this.part.description);
                this.title = "Part" + (this.partIndex + 1) + ":" + this.part.name;
                if (this.part.resourceType == "VIDEO") {
                    this.isVideo = true;
                    this.isAudio = false;
                } else if (this.part.resourceType == "AUDIO") {
                    this.isVideo = false;
                    this.isAudio = true;
                }
            },
            playMedia(event, type) {
                let _this = this;
                let dom = event.currentTarget;
                let str, flag = false;
                let typeText;
                if (type == "VIDEO") {
                    str = "v_part" + _this.partIndex + _this.taskId + _this.person;
                    typeText = "视频";
                } else {
                    str = "a_part" + _this.partIndex + _this.taskId + _this.person;
                    typeText = "音频";
                }
                let playLimit = _this.part.playLimit;
                let stopCountTime = _this.part.suspendExam;
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
                                    let pageDom = document.body.getElementsByClassName("partPage")[0];
                                    if (pageDom != undefined) {
                                        if (!media.ended && _this.mediaStop == false) {
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
                            })
                            media.addEventListener('ended', function () {
                                if (type == "VIDEO") {
                                    dom.firstChild.style.display = "block";
                                    media.remove();
                                    var video = document.createElement("video");
                                    video.poster = posterImg;
                                    video.src = _this.part.resourceLocation;
                                    video.setAttribute('x5-playsinline',true);
                                    video.setAttribute('playsinline',true);
                                    video.setAttribute('webkit-playsinline',true);
                                    video.setAttribute('x-webkit-airplay',true);
                                    video.setAttribute('x5-video-player-type',"h5");
                                    video.setAttribute('x5-video-player-fullscreen','');
                                    video.setAttribute('x5-video-orientation',"portraint");
                                    video.style.width = "100%";
                                    video.style.height = "100%";
                                    let html = '<source src="' + _this.part.resourceLocation + '" type=\'video/mpeg\' />' +
                                        '<source src="' + _this.part.resourceLocation + '" type=\'video/webm\' />' +
                                        '<source src="' + _this.part.resourceLocation + '" type=\'video/ogg\' />'
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
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/style/mixin.less";

    .partPage {
        padding: 88px 0;
        font-size: 30px;

        .header {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1111;
            .wh(100%, 88px);
            line-height: 88px;
            font-size: 34px;
            text-align: center;
            background: @white;
        }

        .mediaBox {
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

        .profile {
            width: 699px;
            margin: 0 auto;
            min-height: 200px;
            margin-top: 23px;
            padding-bottom: 88px;
            text-align: left;
            line-height: 1.5;

            p {
                color: #04AEF2;
            }
        }

        .next {
            position: fixed;
            left: 0;
            bottom: 0;
            text-align: center;
            height: 88px;
            width: 100%;
            line-height: 88px;
            font-size: 34px;
            color: #fff;
            background: @defaultColor;

        }
    }
</style>
