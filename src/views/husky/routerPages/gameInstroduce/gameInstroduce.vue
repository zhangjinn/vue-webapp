<template>
    <div class="gameInstroduce" v-wechat-title="this.title">
        <div class="mainContainer" v-html="gameSubject.instructions">

        </div>
        <div class="fixed" v-if="showBtn">
            <div class="btn">
                <control-btn :btnActive="true" btnText="已读,开始测评" class="submitBtn"
                             @click.native.prevent="goToTest()"></control-btn>
            </div>
        </div>

    </div>
</template>

<script>

    import {gameSubject, getMatchTask, getExecute} from '../../../../service/husky/api.js';
    import ControlBtn from "../../../../components/common/controlBtn";
    import {getStoreStudent} from '../../../../js/user';

    export default {
        name: "gameInstroduce",
        data() {
            return {
                title: '测评须知',
                gameSubject: {
                    instructions: "",
                },
                gameSubjectId: '',
                matchId: "",
                showBtn: false,
                tasks: [],
                task: {},
                student: {},
                type: ''
            }
        },
        components: {
            [ControlBtn.name]: ControlBtn,
        },
        created() {
            this.student = getStoreStudent();
            this.matchId = this.$route.query.match; // 测试先写死
            this.gameSubjectId = this.$route.query.gameSubject;
            this.type = this.$route.query.type;
            this.init();
            if (this.type && this.type == 'star') {
                this.showBtn = true;
                this.verify();
            }
        },
        methods: {
            async init() {
                let data = await gameSubject(this.gameSubjectId);
                this.gameSubject = data.data;
                if (this.gameSubject.instructions != null && this.gameSubject.instructions != '') {
                    this.gameSubject.instructions = decodeURIComponent(this.gameSubject.instructions);
                }
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
                    }
                }
            },
            goToTest() {
                if (this.tasks[0] != null && this.tasks[0] != undefined) {
                    this.$router.push({
                        path: '/taskAssess',
                        query: {
                            matchTask: this.task.identifier,
                            match: this.matchId,
                            person: this.student.person.identifier
                        }
                    })
                } else {
                    this.$router.push({
                        path: '/matchTask',
                        query: {
                            match: this.matchId,
                        }
                    })
                }

            }
        }
    }
</script>

<style lang="less">
    @import "../../../../assets/style/mixin";

    .gameInstroduce {
        .mainContainer {
            padding: 24px 24px 40px 24px;
            text-align: left;
            line-height: 1.5;
            font-size: 28px;
        }

        .fixed {
            .wh(100%, 120px);

            .btn {
                position: fixed;
                bottom: 0;
                left: 0;
                padding: 24px 0;
                width: 100%;
                background: #fff;

                .controlBtnActiveColor {
                    background: #90D0DA;
                }
            }
        }
    }
</style>
