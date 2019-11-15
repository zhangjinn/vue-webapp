<template>
    <div v-wechat-title="this.title" class="starRoom starPageContent">
        <section class="adContent">
            <van-swipe :autoplay="4000">
                <van-swipe-item>
                    <img src="../../../../assets/images/starCeremony.png" alt=""/>
                </van-swipe-item>
                <van-swipe-item>
                    <img @click="goToActiveCard" src="../../../../assets/images/agendaBg.png" alt=""/>
                </van-swipe-item>
            </van-swipe>
        </section>
        <section class="playerInfo">
            <div class="playerInfoText">
                选手信息
            </div>
            <div class="changePlayer" @click="showPickerFn">
                <span class="icon iconfont iconqiehuan"></span>
                <p class="changePlayerText">切换选手</p>
            </div>
        </section>
        <section class="playerCard">
            <div class="playerCardInfo">
                <div class="playerDes">
                    <p class="playerIntro playerSpace">
                        <span class="playerName">{{student.person&&student.person.name ? student.person.name : ''}}</span>
                        <span class="playerSex">{{student.person&&student.person.gender=='MALE'? '男' : '女'}}</span>
                    </p>
                    <p class="playerSchool playerSpace">{{student.school&&student.school.name ? student.school.name :
                        ''}}</p>
                    <p class="playerGrade playerSpace">{{student.grade&&student.grade.name ? student.grade.name :
                        ''}}</p>
                    <p class="playerClass">{{student.className}}</p>
                </div>
                <div class="playerHead">
                    <img v-if="student.person&&student.person.gender=='MALE'"
                         src="../../../../assets/images/boy-primary.png"
                         alt="">
                    <img v-else src="../../../../assets/images/girl-primary.png" alt="">
                </div>
            </div>
        </section>
        <section class="playerCheck">
            <div class="startBtn">
                <div class="checkBtn" @click="start()">
                    <div class="checkName">开始测评</div>
                    <span class="icon iconfont iconkaishiceping"></span>
                </div>
            </div>
        </section>
        <van-popup v-model="showPlayer" position="top">
            <van-picker
                    show-toolbar
                    :columns="studentList"
                    :default-index="student_index"
                    @cancel="showPlayer = false"
                    @confirm="playerConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
    import {Picker, Popup, Dialog, Swipe, SwipeItem} from 'vant';
    import {
        getLoginInfo,
        getToken,
        getStoreStudent,
        setStoreStudent,
        removeStudentIndex,
        removeStoreStudent,
        setIndex,
        getIndex
    } from '../../../../js/user.js';
    import {getByUser, listByStudent, getMatch} from '../../../../service/husky/api.js';
    import {clearStore, clearSession} from '../../../../js/common.js';

    export default {
        name: "index",
        data() {
            return {
                title: '测评首页',
                value: '',
                showPlayer: false,
                userInfo: {},
                students: [],
                studentList: [],
                student: {},
                student_index: 0,
                gameSubject: [],

            }
        },
        created() {
            this.getUser()
        },
        components: {
            [Picker.name]: Picker,
            [Popup.name]: Popup,
            [Dialog.Component.name]: Dialog.Component,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
        },
        methods: {
            async getStudents() {
                let _this = this;
                let param = {
                    user: this.userInfo.person
                };
                getByUser(param).then(res => {
                    _this.students = res.data;
                    if (_this.students.length == 0) {
                        removeStoreStudent();
                        removeStudentIndex();
                        _this.$router.push({
                            path: '/editPlayer',
                            query: {
                                type: 'evpi'
                            }
                        })
                    } else {
                        for (let i = 0; i < this.students.length; i++) {
                            if (this.students[i]) {
                                let str = this.students[i].person.name + '(' + this.students[i].grade.name + ')';
                                this.studentList.push(str);
                            }
                        }
                        let index = 0;
                        if (getIndex() != undefined) {
                            index = parseInt(getIndex());
                            this.student_index = index;
                        } else {
                            setIndex(index);
                        }
                        this.student = getStoreStudent();
                        this.getGame(this.student);
                    }
                }).catch(() => {
                    let corpId = '';
                    let route = _this.$route;
                    if (route.query.corpId) {
                        corpId = route.query.corpId
                    }
                    Dialog.alert({
                        message: '登录信息已过期，点击确认重新登录！'
                    }).then(() => {
                        clearStore();
                        clearSession();
                        _this.$router.push({
                            path: '/login',
                            query: {
                                corpId: corpId
                            }
                        })
                    });

                })

            },
            getUser() {
                let token = getToken();
                let user = getLoginInfo();
                if (token == undefined || token == null || user == undefined || user == null) {
                    clearStore();
                    clearSession();
                    let corpId = '';
                    let route = this.$route;
                    if (route.query.corpId) {
                        corpId = route.query.corpId
                    }
                    this.$router.push({
                        path: '/login',
                        query: {
                            corpId: corpId
                        }
                    })
                } else {
                    this.userInfo = user;
                    this.getStudents();
                }
            },
            playerConfirm(value, index) {
                this.student_index = index;
                this.student = this.students[index];
                setIndex(index);
                this.showPlayer = false;
                setStoreStudent(this.student);
                this.getGame(this.student);
            },
            async getGame(student) {
                let data = {
                    student: student.person.identifier
                }
                setStoreStudent(student);
                let subject = await listByStudent(data);
                let gameSubjectList = subject.data;
                if(gameSubjectList.length > 0){
                    let matchData = await getMatch({gameSubject: gameSubjectList[0].identifier});
                    this.$set(gameSubjectList[0], "matchs", matchData.data);
                    this.gameSubject = [];
                    this.gameSubject = gameSubjectList[0];
                }
            },
            showPickerFn() {
                this.showPlayer = true;
            },
            start() {
                if (this.gameSubject.identifier == undefined) {
                    Dialog.confirm({
                        confirmButtonText: '前往报名',
                        cancelButtonText: '关闭',
                        message: '选手没有报名的赛事'
                    }).then(() => {
                        this.$router.push({
                            path: '/taskInformation',
                        })
                    }).catch(() => {
                        //on close
                    })
                } else {
                    let subjectId = this.gameSubject.identifier;
                    let matchId = this.gameSubject.matchs[0].identifier;
                    this.$router.push({
                        path: '/gameInstroduce',
                        query: {
                            gameSubject: subjectId,
                            match: matchId,
                            type: 'star'
                        }
                    })
                }
            },
            goToActiveCard() {
                this.$router.push({path: '/activateCard'})
            },
        }
    }
</script>

<style scoped lang="less">
    @import "../../../../assets/style/mixin";

    .starRoom {
        img {
            width: 100%;
            height: 100%;
        }

        .icon {
            font-size: 48px;
        }

        .adContent {
            height: 400px;

            img {
                height: 400px;
            }
        }

        .playerInfo {
            padding: 0 25px;
            .fj();
            height: 149px;
            align-items: center;

            .playerInfoText {
                font-size: 32px;
            }

            .changePlayer {
                color: @defaultColor;

                .changePlayerText {
                    font-size: 26px;
                    font-weight: 700;
                }
            }

        }

        .playerCard {
            padding: 0 24px;

            text-align: left;

            .playerCardInfo {
                padding: 40px;
                border: 1px solid @white-dark;
                .box-shadow(2px, 2px, 2px, @white-dark);
                .fj();

                .playerDes {
                    font-size: 24px;
                    font-weight: 400;
                    color: @gray-light;

                    .playerIntro {
                        .playerName {
                            font-size: 30px;
                            color: @gray;
                        }

                        .playerSex {
                            font-size: 20px;
                            color: @defaultColor;
                            padding-left: 10px;
                        }
                    }

                    .playerSpace {
                        padding-bottom: 20px;
                    }

                }

                .playerHead {
                    .wh(100px, 100px)
                }
            }
        }

        .playerCheck {
            padding: 82px 0;

            .startBtn {
                margin: 0 auto;
                padding-top: 30px;
                .wh(200px, 200px);
                background: @defaultColor;
                box-shadow: 0 0 20px 4px @defaultColor ;
                .border-radius(50%);

                .checkBtn {
                    margin: 0 auto;
                    padding: 40px 0 0;
                    .wh(140px, 140px);
                    color: @defaultColor;
                    background: @white;
                    .border-radius(50%);

                    .checkName {
                        font-size: 28px;
                    }
                }
            }


        }

    }
</style>
