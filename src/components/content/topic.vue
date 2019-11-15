<template>
    <div class="topic">
        <div class="header">
            <span class="title">{{title}}</span>
        </div>
        <template v-if="itemBig">
            <topic-big :id="id" :current-item="currentItem" :part-index="partIndex" :answer-index="answerIndex"
                       :item-index="itemIndex" :child-index="childIndex"
                       :question-index="questionIndex"
                       v-on:stopCountdown="stopCountdown()" v-on:countDownAgain="countDowntime()"></topic-big>
        </template>
        <template v-if="itemSmall">
            <topic-small :id="id" :current-item="currentItem" :part-index="partIndex" :answer-index="answerIndex"
                         :item-index="itemIndex"
                         :question-index="questionIndex"
                         v-on:stopCountdown="stopCountdown()" v-on:countDownAgain="countDowntime()"></topic-small>
        </template>
        <div class="topicBtn">
            <span class="prev" @click="previous()">上一题</span>
            <button class="submit" @click="submit()">
                <span class="icon iconfont">&#xe62d;</span>
                <span>提交</span>
            </button>
            <span :class="questionIndex == (questionCount-1)&&(currentItem.son.length>0 ? childIndex+1==currentItem.son.length : childIndex==0) ? 'next default':'next'"
                  @click="next()">下一题</span>
        </div>
    </div>
</template>

<script>
    import TopicBig from "@/components/content/topicBig.vue";//组合大题
    import TopicSmall from "@/components/content/topicSmall.vue";//单题
    export default {
        name: 'topic',
        data() {
            return {
                itemBig: false,
                itemSmall: false,
                title: '',
                taskId: '',
                match: '',
                person: '',
                answerIndex: 0,
                itemIndex: 0,
                childIndex: 0,
                count: 0,
                currentChildItem: {},
                currentItem: {},
                isBig: false,
                partItemLength: 0,
            }
        },
        props: ["currentData", "partIndex", "questionIndex", "questionCount", "topicIndex"],
        components: {
            TopicBig,
            TopicSmall
        },
        created() {
            if (this.topicIndex > 0) {
                this.itemIndex = this.topicIndex;
            }
            this.taskId = this.$route.query.matchTask;
            this.matchId = this.$route.query.match;
            this.person = this.$route.query.person;
            this.count = this.questionIndex;
            this.setTitle();
            this.setTopic();
        },
        methods: {
            previous() {
                if (this.partIndex >= 0) {
                    if (this.itemIndex > 0 || this.childIndex > 0) {
                        if (this.isBig) {
                            this.childIndex -= 1;
                            this.answerIndex -= 1;
                            if (this.childIndex < 0) {
                                this.itemIndex -= 1;
                                this.childIndex = 0;
                                this.count -= 1;
                                this.removeVideo();
                                this.$emit("questionNO", this.count);
                                this.countDowntime();
                            }
                        } else {
                            this.itemIndex -= 1;
                            this.answerIndex -= 1;
                            this.count -= 1;
                            this.removeVideo();
                            this.$emit("questionNO", this.count);
                            this.countDowntime();
                            this.countDowntime();
                        }
                    } else {
                        this.count -= 1;
                        this.$emit("questionNO", this.count);
                        this.countDowntime();
                        this.$emit("toLastPart");
                    }
                }
            },
            next() {
                if (this.questionIndex < this.questionCount - 1 || this.currentItem.son.length > 0 && this.childIndex + 1 < this.currentItem.son.length) {
                    if (this.itemIndex < this.partItemLength - 1 || this.currentItem.son.length > 0 && this.childIndex + 1 < this.currentItem.son.length) {
                        if (this.isBig) {
                            this.childIndex += 1;
                            this.answerIndex += 1;
                            if (this.childIndex >= this.currentItem.son.length) {
                                this.itemBig = false;
                                this.itemSmall = false;
                                this.isBig = false;
                                this.itemIndex += 1;
                                this.count += 1;
                                this.removeVideo();
                                this.$emit("questionNO", this.count);
                                this.countDowntime();
                                this.childIndex = 0;
                            }
                        } else {
                            this.itemBig = false;
                            this.itemSmall = false;
                            this.isBig = false;
                            this.itemIndex += 1;
                            this.answerIndex += 1;
                            this.count += 1;
                            this.removeVideo();
                            this.$emit("questionNO", this.count);
                            this.countDowntime();
                        }
                    } else {
                        this.$emit("toNextPart");
                        this.countDowntime();
                    }
                }
            },
            setTitle() {
                this.title = "Part" + (this.partIndex + 1) + ":" + this.currentData.part.name;
                this.id = this.currentData.part.identifier;
                this.partItemLength = this.currentData.items.length;
            },
            setTopic() {
                this.currentItem = this.currentData.items[this.itemIndex];
                if (this.currentItem.son && this.currentItem.son.length == 0) {
                    this.itemBig = false;
                    this.itemSmall = true;
                    this.isBig = false;
                } else {
                    this.itemBig = true;
                    this.itemSmall = false;
                    this.isBig = true;
                }
            },
            removeVideo() {
                if (document.body.querySelector('video') != undefined) {
                    document.body.querySelector('video').remove();
                }
            },
            stopCountdown() {
                this.$emit("stopCountdown");
            },
            countDowntime() {
                this.$emit("countDownAgain");
            },
            submit() {
                this.$emit("submit");
            }
        },
        watch: {
            itemIndex: function () {
                let _this = this;
                this.$emit('itemIndex', this.itemIndex);
                setTimeout(function () {
                    _this.setTopic();
                }, 250)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../assets/style/mixin.less";

    .topic {
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

        .videoBox {
            .video {
                height: 400px;
                width: 100%;

                video {
                    height: 400px;
                }
            }

        }

        .profile {
            width: 699px;
            margin: 0 auto;
            min-height: 200px;
            margin-top: 23px;
            padding-bottom: 24px;
        }

        .topicBtn {
            position: fixed;
            padding: 20px 20px 0;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100px;
            line-height: 88px;
            background: @white;
            border-top: 2px solid #eee;

            span, button {
                vertical-align: middle;
                background: #fff;
                font-size: 32px;
                vertical-align: middle;
            }

            .icon {
                font-size: 60px;
                display: inline-block;
                color: @defaultColor;
            }

            button {
                color: @defaultColor;
                line-height: 32px;
                padding: 8px 24px;
                float: left;
                margin-left: 120px;
            }

            .prev, .next {
                padding: 0px 24px;
                width: 160px;
                height: 60px;
                line-height: 60px;
                background: @defaultColor;
                border-radius: 30px;
                color: @white;

                &.default {
                    background: #F0F0F0 !important;
                }
            }

            .prev {
                float: left;
            }

            .next {
                float: right;
            }
        }
    }
</style>
