<template>
    <div class="curriculumDetail">
        <div class="good">
            <div class="cover" :class="{isVideoPlay:!showVideo}">
<!--                <img :style="{opacity:opacity}" src="../../../../assets/images/bePaiedCurriculum.png" alt="cover">-->
                <div v-if="showVideo" class="video">
                    <video
                           :src="resourceLocation"
                           controls
                           webkit-playsinline="true"
                           x-webkit-airplay="true"
                           playsinline="true"
                           x5-video-player-type="h5"
                           autoplay="autoplay"
                           controlslist="nodownload">
                        <source :src="resourceLocation" type='video/mpeg'/>
                        <source :src="resourceLocation" type='video/webm'/>
                        <source :src="resourceLocation" type='video/ogg'/>
                    </video>
                </div>
            </div>

            <div v-if="!purchased" class="price">
                <span>¥</span>198.00
            </div>
            <div class="title">
                英语听力理解模拟答题技巧大全
            </div>
        </div>
        <div class="detail">
            <div class="detailTitle">
                <div class="detailTil">
                    <div class="divide"></div>
                    <span>目录</span>
                </div>
            </div>
            <van-cell-group>
                <template v-for="(item,index) in lessonName">
                    <div class="videoList" @click="playVideo(index)" :key="index">
                        <van-cell :value="item"/>
                        <van-icon name="play-circle-o" color="#04aef2"/>
                    </div>
                </template>
            </van-cell-group>
        </div>
   <!--     <div class="detail">
            <div class="detailTitle">
                <div class="detailTil">
                    <div class="divide"></div>
                    <span>课程详情</span>
                </div>
            </div>
            <div class="detailImage">
                <img src="../../../../assets/images/gameSub.png" alt="detailImage">
            </div>
            <div v-if="!purchased" class="detailText">
                课程是指学校学生所应学习的学科总和及其进程与安排。课程是对教育的目标、教学内容、教学活动方式的规划和设计，是教学计划、教学大纲等诸多方面实施过程的总和。广义的课程是指学校为实现培养目标而选择的教育内容及其进程的总和，它包括学校老师所教授的各门学科和有目的、有计划的教育活动。狭义的课程是指某一门学科。
            </div>
        </div>-->
        <div v-if="!purchased" class="buyBtn">
            <p>立即购买</p>
        </div>
    </div>
</template>

<script>
    import {Cell, CellGroup, Icon, Dialog} from 'vant';
    import {getLoginInfo, getToken} from '../../../../js/user';
    import {userActivated} from '../../../../service/star/api.js';

    export default {
        name: "curriculumDetail",
        data() {
            return {
                purchased: true,
                opacity: 1,
                showVideo: false,
                resourceLocation: '',
                lessonName: [
                    '1.lesson1希语盛典闪耀你的舞台（50内）.mp4',
                    '2.于翔-第二课50.mp4',
                    '3.第三课 曹聪（50以内）.mp4',
                    '4.田薇网课第四集最终50.mp4',
                    '5.季小军-撰写出奇制胜的个性演讲稿...演讲稿的“情”和“理”（50以内）.mp4'
                ],
                resources: [
                    'https://xiyuhui.oss-cn-beijing.aliyuncs.com/course/1.lesson1%E5%B8%8C%E8%AF%AD%E7%9B%9B%E5%85%B8%E9%97%AA%E8%80%80%E4%BD%A0%E7%9A%84%E8%88%9E%E5%8F%B0%EF%BC%8850%E5%86%85%EF%BC%89.mp4',
                    'https://xiyuhui.oss-cn-beijing.aliyuncs.com/course/2.%E4%BA%8E%E7%BF%94%EF%BC%8D%E7%AC%AC%E4%BA%8C%E8%AF%BE50.mp4',
                    'https://xiyuhui.oss-cn-beijing.aliyuncs.com/course/3.%E7%AC%AC%E4%B8%89%E8%AF%BE%20%E6%9B%B9%E8%81%AA%EF%BC%8850%E4%BB%A5%E5%86%85%EF%BC%89.mp4',
                    'https://xiyuhui.oss-cn-beijing.aliyuncs.com/course/4.%E7%94%B0%E8%96%87%E7%BD%91%E8%AF%BE%E7%AC%AC%E5%9B%9B%E9%9B%86%E6%9C%80%E7%BB%8850.mp4',
                    'https://xiyuhui.oss-cn-beijing.aliyuncs.com/course/5.%E5%AD%A3%E5%B0%8F%E5%86%9B%EF%BC%8D%E6%92%B0%E5%86%99%E5%87%BA%E5%A5%87%E5%88%B6%E8%83%9C%E7%9A%84%E4%B8%AA%E6%80%A7%E6%BC%94%E8%AE%B2%E7%A8%BF%EF%BC%882%EF%BC%89%E6%9E%84%E5%BB%BA%E6%BC%94%E8%AE%B2%E7%A8%BF%E7%9A%84%E2%80%9C%E6%83%85%E2%80%9D%E5%92%8C%E2%80%9C%E7%90%86%E2%80%9D%EF%BC%8850%E4%BB%A5%E5%86%85%EF%BC%89.mp4'
                ],
                permission: false,
                user: {},
            }
        },
        components: {
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Icon.name]: Icon,
            [Dialog.Component.name]: Dialog.Component,
        },
        created() {
            let user = getLoginInfo();
            let token = getToken();
            if (user == undefined || user == null || token == undefined || token == null) {
                let corpId = this.$route.query.corpId;
                this.$router.push({
                    path: '/login',
                    query: {
                        corpId: corpId,
                        card: true,
                    }
                })
            } else {
                this.user = user;
                this.judge();
            }
        },
        methods: {
            //判断权限
            async judge() {
                let userId = this.user.identifier;
                let userAct = await userActivated(userId);
                this.permission = userAct.data;
            },
            //播放视频
            playVideo(index) {
                if (this.permission == true) {
                    this.opacity = 0.5;
                    if (this.showVideo == true) {
                        this.showVideo = false;
                    }
                    let _this = this;
                    setTimeout(function () {
                        _this.showVideo = true;
                        _this.resourceLocation = _this.resources[index];
                    }, 50)
                } else {
                    Dialog.confirm({
                        confirmButtonText: '前往激活卡片',
                        cancelButtonText: '关闭',
                        message: '没有权限观看该视频',
                    }).then(() => {
                        this.$router.push({
                            path: '/activateCard'
                        })
                    }).catch(() => {
                        // on cancel
                    });
                }
            }
        }
    }
</script>

<style lang="less">
    @import "../../../../assets/style/mixin";

    .curriculumDetail {
        .isVideoPlay{
            background: #FFFFFF url('../../../../assets/images/bePaiedCurriculum.png') no-repeat;
            /*background-size:100% 100%;*/
            background-size: cover;
        }
        padding-bottom: 98px;
        font-family: PingFang SC;
        .good {
            padding-bottom: 14px;
            .cover {
                .wh(100%, 456px);
                min-height: 456px;
                padding: 26px;
                position: relative;
                .video {
                    .wh(100%,  100%);
                    background: #fff;
                    video {
                        .wh(100%, 400px);
                    }
                }
            }

            .price {
                height: 56px;
                margin-top: 12px;
                line-height: 56px;
                color: @priceTextColor;
                font-size: 36px;
                padding-left: 25px;
                text-align: left;

                span {
                    font-size: 24px;
                }
            }

            .title {
                height: 56px;
                line-height: 56px;
                font-size: 34px;
                font-weight: bold;
                color: @defaultTitleTextColor;
                text-align: left;
                padding-left: 26px;
            }
        }

        .detail {
            margin-top: 21px;
            padding: 10px 25px;

            .videoList {
                position: relative;

                .van-icon {
                    position: absolute;
                    top: 14px;
                    right: 12px;
                    z-index: 11;
                }
            }

            .van-cell {
                padding: 10px 12px;
                text-align: left;

                span {
                    color: #04aef2;
                }
            }

            .detailTitle {
                padding: 13px 0;

                .detailTil {
                    display: flex;
                    height: 30px;
                    line-height: 30px;
                    font-size: 30px;
                    font-weight: 400;
                    color: @defaultTitleTextColor;

                    .divide {
                        width: 3px;
                        height: 30px;
                        margin-right: 9px;
                        background: @defaultColor;
                    }
                }
            }

            .detailImage {
                width: 703px;
                height: 416px;
                margin-top: 10px;
                padding-top: 16px;
                border-top: 1px solid @lightBorderColor;
            }

            .detailText {
                font-size: 28px;
                color: @defaultTitleTextColor;
                text-indent: 2em;
                line-height: 42px;
                text-align: left;
                padding: 11px 0 12px;
            }
        }

        .buyBtn {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            width: 750px;
            height: 98px;
            bottom: 0;
            left: 0;
            border-top: 1px solid @lightBorderColor;
            background-color: @white;

            p {
                width: 539px;
                height: 72px;
                background-color: @defaultColor;
                color: @white;
                font-size: 34px;
                font-weight: bold;
                line-height: 72px;
                border-radius: 36px;
            }
        }
    }

</style>
