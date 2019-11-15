<template>
    <div class="enrollPage" v-wechat-title="this.title">
        <div class="top">
            {{ gameSubject.game && gameSubject.game.name ? gameSubject.game.name : "" }}
        </div>
        <div class="center">
            <van-row>
                <van-col span="12" class="area">
                    <van-row>
                        <van-col span="5">
                            <img src="../../../../assets/images/areaImg.png"/>
                        </van-col>
                        <van-col offset="1" span="18">
                            <div>
                                <div class="label">参赛地区:</div>
                                <div class="text">
                                    {{location.grandpaName ? location.grandpaName : ''}} &nbsp;
                                    {{location.parentName ? location.parentName : ''}} &nbsp;
                                    {{location.areaName ? location.areaName : ''}}
                                </div>
                            </div>
                        </van-col>
                    </van-row>
                </van-col>
                <van-col span="12" class="group">
                    <van-row>
                        <van-col span="5">
                            <img src="../../../../assets/images/groupImg.png"/>
                        </van-col>
                        <van-col offset="1" span="18">
                            <div>
                                <div class="label">参赛组别:</div>
                                <div class="text">{{ gameSubject.name }}</div>
                            </div>
                        </van-col>
                    </van-row>
                </van-col>
            </van-row>
        </div>
        <div class="player">
            <h4>选择选手</h4>
            <ul class="playerList">
                <van-radio-group v-model="student_index">
                    <li v-for="(item,index) in students" :key="index">
                        <div>{{item.person&&item.person.name ? item.person.name : ''}}</div>
                        <p>{{item.school&&item.school.name ? item.school.name : ''}}</p>
                        <p>{{studentClass[index]}}</p>
                        <span class="radioBox">
                            <van-radio :name="index" checked-color="#90D0DA"></van-radio>
                        </span>
                    </li>
                </van-radio-group>
            </ul>
        </div>
        <div class="bottom">
            <div class="fixed">
                <button class="changeBtn" @click="editPlayer()">修改选手信息</button>
                <button class="enrollBtn" @click="submit()">确认报名</button>
            </div>
        </div>
    </div>
</template>
<script>
    import {Row, Col, Dialog, RadioGroup, Radio, Popup, Picker, Toast} from 'vant';
    import {getLoginInfo, getStoreStudent, setStoreStudent, removeStoreStudent, getStudentIndex, setIndex} from '../../../../js/user.js';
    import {removeStore} from '../../../../js/common.js';
    import {
        getByUser,
        listByCity,
        getParent,
        putStudent,
        putPerson,
        applicantPost,
        getPerson2,
        postStudent,
        getPerson,
        postPerson,
        postAssociate
    } from '../../../../service/husky/api.js';

    import {getGroup, getGameArea} from '../../../../service/star/api.js'

    export default {
        data() {
            return {
                title: '确认报名',
                student_index: 0,
                location: {
                    grandpaName: '',
                    parentName: '',
                    areaName: ''
                },
                students: [
                    {
                        name: '紫荆1',
                        school: '广州市第一中学',
                        grade: '小学三年级',
                        className: '1班'
                    },
                    {
                        name: '紫荆2',
                        school: '广州市第七中学',
                        grade: '小学三年级',
                        className: '2班'
                    }
                ],
                studentClass: [],
                user: {},
                gameSubject: {},
                gradeId: '',//年级id
                areaId: '', //地址id
                playerId: '',//选手id
                StudentIndex: '',
                userInfo: {}
            }
        },
        created() {
            this.userInfo = getLoginInfo();
            let StudentIndex = getStudentIndex();
            this.StudentIndex = StudentIndex;
            let student = getStoreStudent();
            let grade = student.grade.identifier;
            let area = student.person.location;
            let player = student.identifier;
            if (grade) {
                this.gradeId = grade;
            }
            if (area) {
                this.areaId = area;
            }
            if (player) {
                this.playerId = player;
            }
            this.getGame();
            this.getStudentInfo();

        },
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Dialog.Component.name]: Dialog.Component,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Popup.name]: Popup,
            [Picker.name]: Picker,
            [Toast.name]: Toast
        },
        methods: {
            async getGroup(gradeId) {
                // 获取选手组别
                let groupParam = {
                    grade: gradeId
                };
                let group = await getGroup(groupParam);
                let nowGroupId = group.data.identifier;
                if (nowGroupId == this.groupList.identifier) {
                    removeStore('studentIndex');
                    setStoreStudent(this.students[this.student_index]);
                    if (this.StudentIndex) {
                        //添加选手之后并报名
                        this.addData(this.students[this.student_index])
                    } else {
                        //选手已添加直接报名
                        this.addApplicant();
                    }

                } else {
                    Dialog.alert({
                        message: '选手组别与赛事组别不符，不可以报名哦！'
                    })
                }
            },
            // 提交资料
            async addApplicant() {
                let _this = this;
                let student = _this.students[_this.student_index];
                setIndex(_this.student_index);
                let param = {
                    student: student, // 选手
                    gameSubject: _this.gameSubject, // 赛事信息
                    user_person: _this.user_person // 用户
                }
                applicantPost(param).then(() => {
                    //报名成功
                    Toast.success('报名成功');
                    _this.timer();
                }).catch((err) => {
                    //报名失败
                    let text = err.response.data.message;
                    Dialog.confirm({
                        cancelButtonText: '关闭',
                        confirmButtonText: '前往测评',
                        message: text
                    }).then(() => {
                        _this.$router.push({
                            path: '/index'
                        })
                    }).catch(() => {
                        // on cancel
                    });
                })
            },
            async getParent(id) {
                //根据赛区code获取省市区
                let areaParam = {
                    areaGuid: id
                };
                let areaStr = await getParent(areaParam);
                this.location = areaStr.data;
            },
            async getGame() {
                // 获取赛事组别
                let groupParam = {
                    grade: this.gradeId
                };
                let group = await getGroup(groupParam);
                this.groupList = group.data;

                // 根据组别和赛区获取赛事
                let cityParam = {
                    regionCode: '',
                    areaGuid: this.areaId,
                    group: this.groupList.identifier,
                };
                let game = await listByCity(cityParam);
                this.gameSubject = game.data[0];
                let gameId = this.gameSubject.game.identifier;
                let gameRes = await getGameArea(gameId);
                let gameData = gameRes.data;
                this.getParent(gameData.location);
            },
            //获取年级与班级字段
            getClassName() {
                for (let i = 0; i < this.students.length; i++) {
                    let num = parseInt(this.students[i].className);
                    let str = this.students[i].grade.name + ' (' + num + ') 班';
                    this.studentClass.push(str);
                }
            },
            async getStudentInfo() {
                //获取用户信息
                let user = getLoginInfo();
                if (user != undefined && user != null) {
                    this.user = user
                }
                let userData = {
                    user: this.user.person
                };
                if (this.StudentIndex) {
                    //用户没有添加选手
                    let studenTtem = getStoreStudent();
                    this.students = [studenTtem];
                } else {
                    let userRes = await getPerson2(this.user.person);
                    this.user_person = userRes.data;
                    let res = await getByUser(userData);
                    let students = res.data;
                    this.students = students;
                    if (this.students.length > 1) {
                        this.students.forEach((item, index) => {
                            if (item.identifier == this.playerId) {
                                this.student_index = index;
                            }
                        })
                    }
                }

                this.getClassName();
            },
            editPlayer() {
                //前往编辑选手
                let studentId = this.students[this.student_index].identifier;
                this.$router.push({
                    path: "/editPlayer",
                    query: {student: studentId, type: 'game'}
                });
            },
            async addData(studentItem) {
                //第一次添加选手并报名
                let student = studentItem;
                let personId = this.userInfo.person;
                let user_person = await getPerson(personId);

                user_person = user_person.data;
                let student_person = await postPerson(student.person);
                student_person = student_person.data;
                student.person = student_person;
                let postAssociateParam = {
                    one: user_person,
                    other: student_person,
                    type: "AGENT"
                };

                await postAssociate(postAssociateParam);
                let postStudentParam = {
                    student: student,
                    user: personId
                };
                await postStudent(postStudentParam);
                removeStoreStudent();
                let userData = {
                    user: this.user.person
                };
                let res = await getByUser(userData);
                this.student = res.data[0];
                setStoreStudent(this.student);
                this.addApplicant();
            },
            async putData(studentItem) {
                //提交修改的选手信息
                let student = studentItem;
                await putPerson(student.person, student.person.identifier);
                await putStudent(student, student.identifier);
                this.addApplicant();

            },
            timer() {
                //跳转到测评首页
                let second = 1;
                const timer = setInterval(() => {
                    second--;
                    if (!second) {
                        clearInterval(timer);
                        Toast.clear();
                        this.$router.push({path: "/"});
                    }
                }, 1000);
            },
            submit() {
                let studentItem = this.students[this.student_index];

                let gradeId = studentItem.grade.identifier;
                this.getGroup(gradeId)
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "../../../../assets/style/mixin.less";

    .enrollPage {
        text-align: left;
        padding: 20px 0;

        .top {
            padding: 0 24px;
            .wh(100%, 120px);
            line-height: 120px;
            font-size: 32px;
            .linear-gradient(left, #ECF6FF, #FFFFFF);
        }

        .center {
            margin: 20px 0;
            padding: 25px 0;
            width: 100%;
            background: @white;

            .van-col--5 {
                padding-top: 4px;
                text-align: right;
            }

            img {
                width: 54px;
                height: 54px;
            }

            .label {
                font-size: 24px;
                color: #333333;
            }

            .text {
                font-size: 30px;
                color: #333;
            }
        }

        .player {
            padding: 40px 24px;
            min-height: 720px;
            background: @white;

            h4 {
                margin-bottom: 40px;
                font-size: 30px;
                font-weight: 400;
            }

            .playerList {
                li {
                    padding: 24px;
                    border: 1px solid #e8e8e8;
                    .border-radius(8px);
                    position: relative;

                    &:not(:first-child) {
                        margin-top: 24px;
                    }

                    div {
                        font-size: 30px;
                        color: #333;
                    }

                    p {
                        margin-top: 10px;
                        font-size: 24px;
                        color: #999;
                    }

                    .radioBox {
                        position: absolute;
                        right: 24px;
                        top: 64px;
                    }
                }
            }
        }

        .bottom {
            .wh(100%, 160px);
            background: @white;

            .fixed {
                position: fixed;
                bottom: 0;
                left: 0;
                padding: 44px 45px;
                .wh(100%, 160px);
                background: @white;

                button {
                    .wh(320px, 72px);
                    font-size: 34px;
                    .border-radius(36px);

                    &.changeBtn {
                        color: #90D0DA;
                        background: @white;
                        border: 1px solid #90D0DA;
                    }

                    &.enrollBtn {
                        margin-left: 20px;
                        color: @white;
                        background: #90D0DA;
                        border: 1px solid #90D0DA;
                    }
                }
            }
        }
    }
</style>
