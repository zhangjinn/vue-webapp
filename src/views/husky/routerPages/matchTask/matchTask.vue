<template>
    <div v-wechat-title="this.title">
        <div class="matchTask" v-if="tasks.length > 0">
            <div class="container">
                <div class="top">
                    <img class="userIcon" src="../../../../assets/images/gameHeader.png">
                </div>
                <p class="userName" v-if="student.person.name">{{student.person.name}}</p>
                <div class="content">
                    <div>
                        <p><span>大会名称：</span> <i>{{game.name}}-{{gameSubject.name}}</i></p>
                        <p><span>考试内容：</span><i>{{task.name}}</i></p>
                        <p><span>考核时间：</span><i>{{task.limitTime}}分钟</i></p>
                        <p><span>满分：</span><i>{{task.score}}分</i></p>
                        <p><span>出题方：</span> <i>{{organization.schoolName}}</i></p>
                    </div>
                </div>

                <div class="toExamPaper" @click.prevent="toExamPaper()">
                    <controlBtn :btnActive="true" btnText="开始考试"></controlBtn>
                </div>
                <div class="btn" @click.prevent="returnPage()">
                    <controlBtn :btnActive="false" btnText="还要再准备一下"></controlBtn>
                </div>
            </div>
        </div>
        <div class="nodata" v-else> <!-- 无比赛显示 -->
            <div>
                <img src="../../../../assets/images/noContent.png" alt="">
            </div>
            <p>暂无比赛内容~</p>
        </div>
    </div>
</template>

<script>
    import controlBtn from '../../../../components/common/controlBtn.vue';
    import {getMatchTask, getMatch, gameSubject, getOri, getExecute} from '../../../../service/husky/api.js';
    import {getStoreStudent} from '../../../../js/user';

    export default {
        name: 'matchTask',
        data() {
            return {
                title: '比赛内容',
                student: {},
                matchId: '',
                tasks: [],
                task: {},
                match: {},
                gameSubject: {},
                game: {},
                applicantNum: 0,
                organization: {},
                noContentShowText: '暂无比赛内容'
            }
        },
        created() {
            this.student = getStoreStudent();
            this.matchId = this.$route.query.match;
            this.verify();
        },
        methods: {
            // 去比赛
            toExamPaper() {
                this.$router.push({
                    path: '/taskAssess',
                    query: {
                        matchTask: this.task.identifier,
                        match: this.matchId,
                        person: this.student.person.identifier
                    }
                })
            },
            // 返回
            returnPage() {
                this.$router.go(-1)
            },
            async verify() {
                let _this = this;
                let student_person_id = _this.student.person.identifier;
                let matchTask = await getMatchTask(_this.matchId, "MATCH", student_person_id);
                let tasks = matchTask.data;
                this.tasks = tasks;
                if (tasks[0] != null && tasks[0] != undefined) {
                    _this.task = tasks[0].task;
                    if (tasks[0].state) {
                        let data = {
                            matchTask: tasks[0].task.identifier,
                            person: _this.student.person.identifier
                        }

                        let executeData = await getExecute(data);
                        let execute = executeData.data;
                        this.$router.push({
                            path: '/result',
                            query: {
                                execute: execute.identifier,
                                match: _this.matchId
                            }
                        })
                    } else {
                        let matchData = await getMatch({id: _this.matchId});
                        _this.match = matchData.data;
                        let subjectData = await gameSubject(_this.match.gameSubject.identifier);
                        _this.gameSubject = subjectData.data;
                        _this.game = _this.gameSubject.game;
                        let organization = await getOri({}, _this.task.owner);
                        this.organization = organization.data;
                    }
                }
            }

        },
        components: {
            controlBtn,
        }
    }
</script>

<style lang="less" scoped>
    .matchTask {
        width: 100vw;
        height: 100vh;
        text-align: left;
        background: #fff;

        .container {
            .toExamPaper {
                margin-top: 30px;
            }

            .btn {
                margin-top: 24px;
            }

            .top {
                width: 750px;
                height: 400px;
                background: transparent url("../../../../assets/images/gameAssess.png") no-repeat;
                background-size: 100% 100%;
                position: relative;
                margin-bottom: 96px;

                .userIcon {
                    position: absolute;
                    right: 0;
                    left: 0;
                    margin: 0 auto;
                    bottom: -80px;
                    width: 160px;
                    height: 160px;
                }
            }

            .userName {
                text-align: center;
                font-size: 34px;
                padding-top: 8px;
            }

            .content {
                padding: 24px;
                background: #fff;

                p {
                    font-size: 32px;
                    overflow: hidden;
                    line-height: 2;

                    span {
                        float: left;
                        display: inline-block;
                        width: 240px;
                        text-align: right;
                    }

                    i {
                        float: left;
                        display: inline-block;
                        width: 400px;
                    }
                }
            }

            .controlBtn {
                .controlBtnInner {
                    font-weight: 400;
                }
            }
        }
    }


    .nodata {
        font-size: 28px;

        img {
            width: 580px;
            height: 360px;
            margin-top: 280px;
        }

        p {
            color: #999;
            margin-top: 20px;
        }
    }
</style>
