<template>
    <div v-wechat-title="this.title">
        <div class="mainContainer">
            <div class="readyRoom">
                <div class="top">
                    <van-row>
                        <van-col span="4" class="userIcon"><img src="../../../../assets/images/boy.png" alt="">
                        </van-col>
                        <van-col span="16">
                            <div>
                                <p v-if="student.person" class="playerMsg">
                                    {{student.person.name}}
                                    <a @click.prevent=" alertMsg()" v-if="student.grade">({{student.grade.name}})</a>
                                </p>
                                <!-- 无报名信息  -->
                                <p v-else @click.prevent.stop="toPlayer()" class="nonePlayer">未添加参赛选手</p>
                            </div>
                        </van-col>
                        <van-col span="4" class="changeIcon"><span v-if="students.length > 1"
                                                                   class="icon iconfont iconqiehuan"
                                                                   @click.prevent="changePlayer()"></span></van-col>
                    </van-row>
                </div>
                <div class="banner"><img src="../../../../assets/images/bn.png" alt=""></div>
                <div class="gameTitle">
                    <div class="before"></div>
                    赛事管理
                    <div class="after"></div>
                </div>
                <div class="emptyBox" v-if="gameSubjectList.length == 0">
                    <div class="empty">
                        <div class="emptyImg">
                            <img src="../../../../assets/images/game_empty.png"/>
                        </div>
                        <h5>你好，你还未帮选手报名任何比赛</h5>
                        <p class="textNine">请前往发现页面，为选手选择一个比赛吧!</p>
                        <p class="textBlue">点击按钮，可直接到达...</p>
                        <button @click.prevent.stop="toFind()">前往发现</button>
                    </div>
                </div>

                <div class="readyTabs" v-for="(gameSubject,key) in gameSubjectList" :key="key">
                    <div class="cover">
                        <div class="coverUrl">
                            <img v-if="gameSubject.frontCover" :src=" gameSubject.frontCover">
                            <img v-else src="../../../../assets/images/noneFontCover.png"/>
                        </div>
                        <h5>{{gameSubject.game.name}}- {{gameSubject.name}}</h5>
                        <div class="coverBottom">
                            <p>参赛人数：{{gameSubject.applicantNum}}</p>
                            <p>当前环节：
                                <template v-for="(match,index) in gameSubject.matchs">
                                    <a :key="index" v-if="match.state == 'PROCESSING'">{{match.name}}</a>
                                </template>
                                <a v-if="gameSubject.matchs&&gameSubject.matchs[gameSubject.matchs.length - 1].state == 'END'">赛事结束</a>
                            </p>
                            <button class="enterBtn" @click.prevent="enterGame($event)">进入</button>
                        </div>
                    </div>
                    <div class="mainMsg" style="display: none">
                        <h5 v-if="gameSubject.game.name&&gameSubject.name">
                            {{gameSubject.game.name}}- {{gameSubject.name}}</h5>
                        <div class="returnBack" @click.prevent="backToCover($event)">
                            <span></span>
                            <img src="../../../../assets/images/turnBackIcon.png">
                        </div>
                        <div class="progress">
                            <template v-for="(match,index) in gameSubject.matchs">
                                <a v-if="match.name" :key='index' :class="index==0?'listC active':'listC'"
                                   @click.prevent="switchMatch(key,index,$event)"><span>{{match.name}}</span></a>
                            </template>
                        </div>
                        <section v-for="(match,index) in gameSubject.matchs"
                                 :style="index==0?'display:block':''"
                                 :class="index==0?'':'section'" :key="index">
                            <template v-if="index%4===1">
                                <van-row gutter="4">
                                    <van-col span="8">
                                        <a @click.prevent="gameInstroduce(match.identifier)">
                                            <img src="../../../../assets/images/xuzhi.png">
                                            <p>测评须知</p>
                                            <span>比赛环节讲解</span>
                                        </a>
                                    </van-col>
                                    <van-col span="8">
                                        <!-- match.identifier -->
                                        <a @click.prevent="toExerciseTaskList(match.identifier)">
                                            <img src="../../../../assets/images/lianxi.png">
                                            <p>练习入口</p>
                                            <span>提前练习考试内容</span>
                                        </a>
                                    </van-col>
                                    <van-col span="8">
                                        <!-- match.identifier -->
                                        <a @click.prevent="toMatchTaskList(match.identifier)">
                                            <img src="../../../../assets/images/bisai2.png">
                                            <p>测评入口</p>
                                            <span>测评入口</span>
                                        </a>
                                    </van-col>
                                </van-row>
                            </template>
                            <template v-else-if="index%4===2">
                                <van-row gutter="4">
                                    <van-col span="8">
                                        <a @click.prevent="gameInstroduce(match.identifier)">
                                            <img src="../../../../assets/images/xuzhi2.png">
                                            <p>测评须知</p>
                                            <span>比赛环节讲解</span>
                                        </a>
                                    </van-col>
                                    <van-col span="8">
                                        <!-- match.identifier -->
                                        <a @click.prevent="toExerciseTaskList(match.identifier)">
                                            <img src="../../../../assets/images/lianxi2.png">
                                            <p>练习入口</p>
                                            <span>提前练习考试内容</span>
                                        </a>
                                    </van-col>
                                    <van-col span="8">
                                        <!-- match.identifier -->
                                        <a @click.prevent="toMatchTaskList(match.identifier)">
                                            <img src="../../../../assets/images/bisai3.png">
                                            <p>测评入口</p>
                                            <span>测评入口</span>
                                        </a>
                                    </van-col>
                                </van-row>
                            </template>
                            <template v-else-if="index%4===3">
                                <van-row gutter="4">
                                    <van-col span="8">
                                        <a @click.prevent="gameInstroduce(match.identifier)">
                                            <img src="../../../../assets/images/xuzhi3.png">
                                            <p>测评须知</p>
                                            <span>比赛环节讲解</span>
                                        </a>
                                    </van-col>
                                    <van-col span="8">
                                        <!-- match.identifier -->
                                        <a @click.prevent="toExerciseTaskList(match.identifier)">
                                            <img src="../../../../assets/images/lianxi3.png">
                                            <p>练习入口</p>
                                            <span>提前练习考试内容</span>
                                        </a>
                                    </van-col>
                                    <van-col span="8">
                                        <!-- match.identifier -->
                                        <a @click.prevent="toMatchTaskList(match.identifier)">
                                            <img src="../../../../assets/images/bisai3.png">
                                            <p>测评入口</p>
                                            <span>测评入口</span>
                                        </a>
                                    </van-col>
                                </van-row>
                            </template>
                            <template v-else>
                                <van-row gutter="4">
                                    <van-col span="8">
                                        <a @click.prevent="gameInstroduce(match.identifier)">
                                            <img src="../../../../assets/images/xuzhi4.png">
                                            <p>测评须知</p>
                                            <span>比赛环节讲解</span>
                                        </a>
                                    </van-col>
                                    <van-col span="8">
                                        <!-- match.identifier -->
                                        <a @click.prevent="toExerciseTaskList(match.identifier)">
                                            <img src="../../../../assets/images/lianxi4.png">
                                            <p>练习入口</p>
                                            <span>提前练习考试内容</span>
                                        </a>
                                    </van-col>
                                    <van-col span="8">
                                        <!-- match.identifier -->
                                        <a @click.prevent="toMatchTaskList(match.identifier)">
                                            <img src="../../../../assets/images/bisai4.png">
                                            <p>测评入口</p>
                                            <span>测评入口</span>
                                        </a>
                                    </van-col>
                                </van-row>
                            </template>
                        </section>
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="showPlayer" position="top">
            <van-picker
                    show-toolbar
                    :columns="studentList"
                    @cancel="showPlayer = false"
                    @confirm="submitPlayer"
            />
        </van-popup>
    </div>
</template>

<script>
    import {getLoginInfo, getToken, setStoreStudent} from '../../../../js/user.js';
    import {getStore, getStringStore, setStore, clearStore, clearSession} from '../../../../js/common.js';
    import {getByUser, listByStudent, getMatch, getNum, getPlayer, getPerson} from '../../../../service/husky/api.js';
    import {Row, Col, Dialog, RadioGroup, Radio, Popup, Picker} from 'vant';

    export default {
        name: "index",
        data() {
            return {
                title: '预备室',
                gameSubjectList: [],
                user: {},
                student: {},
                student_index: 0,
                students: [],
                studentList: [],
                isApplicant: false,
                showPlayer: false,
                isStudents: true, // 控制比赛选手为多个时 显示选择选手图标
            }
        },
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Dialog.Component.name]: Dialog.Component,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Popup.name]: Popup,
            [Picker.name]: Picker
        },
        created() {
            let token = getToken();
            let user = getLoginInfo();
            if (token == undefined || token == null || token == "" || user == undefined || user == null) {
                let corpId = '';
                let route = this.$route;
                if (route.query.corpId) {
                    setStore('corpId', route.query.corpId);
                    corpId = route.query.corpId
                } else {
                    corpId = getStringStore('corpId')
                }
                this.$router.push({
                    path: '/login',
                    query: {
                        corpId: corpId
                    }
                })
            }
            this.user = getLoginInfo();
            let user_person_id = this.user.person;
            let userData = {
                user: user_person_id
            };
            this.judgeUser();
            this.getStudent(userData);
        },
        methods: {
            async judgeUser() {
                let user_person_id = this.user.person;
                let res = await getPerson(user_person_id);
                let person = res.data;
                if (person == null || person.location == undefined || person.location == null || person.location == "") {
                    this.$router.push({
                        path: '/completeInformation'
                    })
                }
            },
            getStudent(user) {
                let _this = this;
                getByUser(user).then(res => {
                    _this.students = res.data;
                    if (_this.students.length > 0) {
                        let index = 0;
                        for (let i = 0; i < _this.students.length; i++) {
                            let str = _this.students[i].person.name + '(' + _this.students[i].grade.name + ')';
                            _this.studentList.push(str);
                        }
                        if (sessionStorage.getItem("student_index") != undefined) {
                            index = parseInt(sessionStorage.getItem("student_index"));
                            this.student_index = index;
                        } else {
                            sessionStorage.setItem('student_index', index);
                        }
                        _this.student = _this.students[index];
                        _this.getGame(_this.student);
                    }
                }).catch(() => {
                    let corpId = '';
                    let route = _this.$route;
                    if (route.query.corpId) {
                        corpId = route.query.corpId
                    } else {
                        corpId = getStringStore('corpId')
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
            async getGame(student) {
                let data = {
                    student: student.person.identifier
                }
                setStoreStudent(student);
                let subject = await listByStudent(data);
                let gameSubjectList = subject.data;
                for (let i = 0; i < subject.data.length; i++) {
                    let matchData = await getMatch({gameSubject: gameSubjectList[i].identifier});
                    this.$set(gameSubjectList[i], "matchs", matchData.data)
                    let applicantNum = await getNum({gameSubjectId: gameSubjectList[i].identifier});
                    this.$set(gameSubjectList[i], "applicantNum", applicantNum.data)
                }
                this.gameSubjectList = gameSubjectList;
            },
            changePlayer() {
                this.showPlayer = true;
            },
            submitPlayer(value, index) {
                this.showPlayer = false;
                this.student_index = index;
                this.student = this.students[this.student_index];
                sessionStorage.setItem("student_index", this.student_index);
                this.getGame(this.student);
            },
            enterGame(event) {
                let btn = event.currentTarget;
                let el = btn.parentNode.parentNode;
                el.style.opacity = 0;
                setTimeout(function () {
                    el.style.display = "none";
                    el.style.opacity = 1;
                    el.nextElementSibling.style.display = "block";
                }, 200)
            },
            backToCover(event) {
                let btn = event.currentTarget;
                let el = btn.parentNode;
                el.style.opacity = 0;
                setTimeout(function () {
                    el.style.display = "none";
                    el.style.opacity = 1;
                    el.previousElementSibling.style.display = "block";
                }, 200)
            },
            async switchMatch(key, index, event) {
                let gameSubject = this.gameSubjectList[key];
                let matchs = gameSubject.matchs;
                let match = matchs[index];
                if (match.state == "PREPARATION") {
                    Dialog.alert({
                        message: '比赛未开始，暂时看不了哦'
                    })
                } else if (match.state == "PROCESSING") {
                    if (index > 0) {
                        let data = {
                            match: matchs[index - 1].identifier,
                            person: this.student.person.identifier
                        }
                        let playerRes = await getPlayer(data);
                        let player = playerRes.data;
                        if (player == null || player == undefined
                            || player.advance == undefined || player.advance == "" || player.advance == false) {
                            Dialog.alert({
                                message: '您还未晋级呢,请继续努力'
                            })
                        }
                    } else {
                        this.switch(index, event);
                    }
                } else {
                    this.switch(index, event);
                }
            },
            switch(index, event) {
                let element = event.currentTarget;
                let parent = element.parentNode;
                parent.childNodes.forEach(function (item) {
                    if (item.className && item.className.indexOf("active") != -1) {
                        item.classList.remove("active");
                    }
                })
                element.classList.add("active");
                let sections = element.parentNode.parentNode.getElementsByTagName('section');
                let chooseMatch = sections[index];
                sections.forEach(function (item) {
                    item.style.display = "none";
                })
                chooseMatch.style.display = "block";
            },
            // 去练习页面
            toExerciseTaskList(id) {
                this.$router.push({
                    path: '/exerciseTaskList',
                    query: {
                        match: id
                    }
                })
            },
            // 去测评须知
            gameInstroduce(id) {
                this.$router.push({
                    path: '/gameInstroduce',
                    query: {
                        match: id
                    }
                })
            },
            // 去测评入口
            toMatchTaskList(id) {
                this.$router.push({
                    path: '/matchTask',
                    query: {
                        match: id
                    }
                })
            },
            toFind() {
                this.$router.push({
                    path: '/find'
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .readyRoom {
        margin: 40px 24px;
    }

    .top {
        height: 100px;
        font-size: 30px;

        .userIcon img {
            float: left;
            width: 100px;
            height: 100px;
        }

        .playerMsg {
            padding-top: 30px;
            text-align: left;
            color: #90D0DA;

            a {
                font-size: 30px;
                color: #999;
            }
        }

        .nonePlayer {
            padding-top: 30px;
            text-align: left;
        }

        .changeIcon {
            padding-top: 20px;
            text-align: right;

            .icon {
                font-size: 56px;
                color: #04AEF2;
            }
        }
    }

    .van-dialog {
        background: #f9f9f9;
        overflow: visible;

        .playerBox {
            width: 100%;
            height: 204px;
            padding: 12px;
            position: relative;

            .img {
                position: absolute;
                top: -80px;
                right: 0;
                width: 100px;
                height: auto;
            }

            .playerList {
                width: 100%;
                height: 100%;
                overflow: auto;
                background: #fff;

                li {
                    height: 60px;
                    line-height: 60px;

                    .name {
                        font-size: 15px;
                        color: #999;
                    }

                    .grade {
                        font-size: 15px;
                        color: #333;
                    }

                    .radio {
                        padding-top: 20px;
                    }
                }
            }

            .bottomBtn {
                position: absolute;
                left: 0;
                bottom: -60px;
                padding-top: 5px;
                width: 100%;
                height: 60px;
                z-index: 99;
                background: #f9f9f9;
                border-radius: 16px;

                button {
                    width: 92px;
                    display: inline-block;
                    height: 36px;
                    line-height: 36px;
                    border-radius: 18px;
                    color: #fff;
                    font-size: 13px;

                    &.cancel {
                        background: #B0B0B0;
                    }

                    &.submit {
                        margin-left: 30px;
                        background: #90D0DA;
                    }
                }
            }
        }

    }

    .banner {
        margin-top: 65px;

        img {
            width: 100%;
            border-radius: 10px;
        }
    }

    .gameTitle {
        position: relative;
        padding-top: 20px;
        height: 100px;
        text-align: center;
        font-size: 32px;
        color: #90D0DA;

        .before {
            position: absolute;
            top: 42px;
            left: 200px;
            width: 70px;
            height: 2px;
            background: #90D0DA;

            &:after {
                position: absolute;
                right: 0;
                top: -3px;
                content: "";
                display: inline-block;
                width: 10px;
                height: 10px;
                background: #90D0DA;
                border-radius: 50%;
            }
        }

        .after {
            position: absolute;
            top: 42px;
            right: 200px;
            width: 70px;
            height: 2px;
            background: #90D0DA;

            &:before {
                position: absolute;
                left: 0;
                top: -3px;
                content: "";
                display: inline-block;
                width: 10px;
                height: 10px;
                background: #90D0DA;
                border-radius: 50%;
            }
        }
    }

    .emptyBox {
        padding-bottom: 36px;
        box-shadow: 0 12px 20px 0px #ddd;

        .empty {
            text-align: center;
            padding: 20px;

            .emptyImg {
                width: 60%;
                margin: 0 auto;

                img {
                    margin-right: 0;
                    width: 100%;
                }
            }

            h5 {
                margin-top: 30px;
                font-size: 30px;
                color: #666;
            }

            p {
                margin-top: 20px;
                font-size: 24px;
            }

            .textNine {
                color: #999;
            }

            .textBlue {
                color: #04AEF2;
            }

            button {
                margin-top: 30px;
                width: 180px;
                height: 48px;
                font-size: 28px;
                color: #fff;
                background: #90D0DA;
                border-radius: 24px;
            }
        }
    }

    .readyTabs {
        width: 100%;
        box-sizing: border-box;
        margin: auto 0;
        padding-bottom: 24px;
        position: relative;

        .cover {
            padding: 20px;
            opacity: 1;
            transition: opacity 0.2s linear;
            height: 510px;
            background: #fff;
            box-shadow: 0 12px 20px 0px #ddd;
            border-radius: 15px;

            .coverUrl {
                height: 320px;
                margin-bottom: 20px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            h5 {
                color: #333;
                font-size: 34px;
                text-align: left;
                font-weight: 700;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .coverBottom {
                position: relative;

                p {
                    color: #999;
                    font-size: 26px;
                    text-align: left;

                    &:first-child {
                        line-height: 52px;
                    }

                    a {
                        font-size: 24px;
                        color: #999;
                    }
                }

                .enterBtn {
                    position: absolute;
                    right: 0;
                    top: 30px;
                    width: 160px;
                    height: 48px;
                    background: #90D0DA;
                    color: #fff;
                    font-size: 28px;
                    border-radius: 24px;
                }
            }

        }

        .mainMsg {
            padding: 20px;
            opacity: 1;
            height: 510px;
            transition: opacity 0.2s linear;
            background: #fff;
            box-shadow: 0 12px 20px 0px #ddd;
            border-radius: 15px;

            h5 {
                font-size: 34px;
                color: #333;
                font-weight: 700;
                text-align: left;
                width: 90%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .returnBack {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 44px;
                height: 40px;
                font-size: 32px;
                color: #90D0DA;
            }

            .progress {
                height: 50px;
                overflow-x: auto;
                white-space: nowrap;
                margin-top: 20px;
                text-align: left;

                a {
                    padding: 0 33px;
                    box-sizing: border-box;
                    text-align: center;
                    height: 48px;
                    display: inline-block;
                    text-decoration: none;
                    font-size: 28px;
                    border-radius: 24px;
                    background: #f4e7de;
                    line-height: 48px;
                    color: #999;
                    margin: auto 24px 0 0;

                    &.active {
                        background: #90D0DA;
                        color: #fff;
                        transition: 1s all;
                    }
                }
            }

            section {
                display: none;
                padding-top: 20px;

                .van-col {
                    height: 168px;
                }

                a {
                    display: inline-block;
                    overflow: hidden;
                    position: relative;

                    img {
                        width: 215px;
                        height: 333px;
                    }

                    p {
                        line-height: 1.8;
                        position: absolute;
                        bottom: 50px;
                        left: 0;
                        font-size: 34px;
                        color: #fff;
                        text-indent: 16px;
                        text-align: left;
                    }

                    span {
                        line-height: 2;
                        position: absolute;
                        bottom: 10px;
                        left: 0;
                        font-size: 22px;
                        color: #fff;
                        text-indent: 16px;
                        width: 100%;
                        text-align: left;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
</style>
