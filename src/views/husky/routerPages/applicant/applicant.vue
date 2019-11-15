<template>
    <div class="app applicant" v-wechat-title="this.title">
        <div class="main"></div>
        <van-row>
            <div class="bao">
                <van-col span="12">
                    <div class="area">
                        <van-icon name="location-o"/>
                        <span>参赛地区:</span>
                        <p>
                            <span class="areaBox">{{location.grandpaName}} &nbsp;{{location.parentName}}&nbsp;{{location.areaName}}</span>
                        </p>
                    </div>
                </van-col>
                <van-col span="12">
                    <div class="group">
                        <span class="icon iconfont">&#xe617;</span>
                        <span>参赛组别:</span>
                        <p>
                            <span class="groupBox">{{gameSubject.name}}</span>
                        </p>
                    </div>
                </van-col>

                <div>
                    <p id="triggerBtn" @click="myModal()" class="editor clearfix">

                        <van-field
                                v-model="person.name"
                                placeholder="选手姓名"
                        >
                            <div slot="button" size="small" type="primary">
                                <span class="personName" v-if="!person.name">选择</span>
                                <span class="personName" v-else>修改</span>
                            </div>
                        </van-field>

                    </p>
                </div>

            </div>

        </van-row>


        <div class="box">
            <span>选手信息</span>
        </div>
        <div class="form">

            <van-cell-group>
                <van-field
                        v-model="person.name"
                        required
                        clearable
                        label="选手姓名："
                        placeholder="请输入选手姓名"
                        :disabled="disabled"
                        @click-right-icon="$toast('question')"
                        error-message=""
                />

                <van-field
                        v-model="SchoolValue.name"
                        type="text"
                        label="所在学校："
                        placeholder="请选择选手的学校"
                        @click="getSchool"
                        :disabled="disabled"
                        required
                        :readonly="true"
                />

                <van-field
                        v-model="gradeValue.name"
                        type="text"
                        label="所在年级："
                        :disabled="disabled"
                        placeholder="请选择选手的年级"
                        @click="getGrade"
                        required
                />

                <van-field
                        v-model="classValue"
                        type="text"
                        label="所在班级："
                        placeholder="请选择选手的班级"
                        @click="getClass"
                        :disabled="disabled"
                        required
                        :readonly="true"
                />
                <!--  error-message="手机号格式错误" 错误信息 -->
                <van-field
                        v-model="person.phone"
                        type="text"
                        label="选手电话："
                        :disabled="disabled"
                        placeholder="请输入选手电话"
                        maxlength="11"
                        error-message=""
                />
                <!--  error-message="身份证号格式错误" 错误信息 -->
                <van-field
                        v-model="person.idCard"
                        type="text"
                        label="身份证号："
                        :disabled="disabled"
                        maxlength="18"
                        placeholder="请输入选手身份证号码"

                />

                <van-field
                        v-model="user_person.phone"
                        type="text"
                        label="家长电话："
                        disabled
                        placeholder="请输入家长电话"
                        required
                />

                <van-field
                        v-model="user_person.name"
                        type="text"
                        label="家长姓名："
                        placeholder="请输入家长姓名"
                        disabled
                        required
                />


            </van-cell-group>


            <div class="submit" @click="addApplicant()">
                <span>提交资料</span>
            </div>
        </div>


        <!-- 资料提交成功 -->
        <div class="fix" v-show="issuccess">
            <div class="m"></div>
            <div class="success">
                <p>资料提交成功</p>
                <div class="imgBox">
                    <img src="../../../../assets/images/enrollBg.png" alt="">
                </div>
                <div class="msg">
					<span>
						恭喜你，{{person && person.name ?  person.name : ""}}同学，你已成功报名
						{{game.name}} 希望你能取得好成绩，记得按时完成比赛哦！！！
					</span>
                </div>
                <div class="go" @click.prevent="toReadyRoom()">
                    <span>前往预备室，准备比赛</span>
                </div>
            </div>

        </div>

        <div class="van-loading" v-show="loading">
            <van-loading type="spinner" color="#1989fa"/>
        </div>

        <!--showSchool 学校-->
        <van-popup v-model="showSchool" position="bottom">
            <!-- 学校 -->

            <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="schoolCancel"
                    @confirm="schoolConfirm"

            >
                <form slot="title" action="/" class="searchForm">
                    <van-search
                            v-model="searchTxt"
                            placeholder="请输入搜索关键词"
                            :clearable=false
                    />
                </form>
            </van-picker>
            ·

        </van-popup>

        <van-popup v-model="show" position="bottom">

            <van-picker
                    show-toolbar
                    :columns="grades_columns"
                    @cancel="gradeCancel"
                    @confirm="gradeConfirm"

            />

        </van-popup>

        <!--班级-->
        <van-popup position="bottom" v-model="showClass">
            <!-- 班级 -->
            <van-picker
                    show-toolbar
                    :columns="classes"
                    @cancel="classCancel"
                    @confirm="classConfirm"

            />
        </van-popup>
        <!-- 选手 -->
        <van-popup position="top" v-model="showPlayer">
            <!-- 选手 -->
            <van-picker
                    show-toolbar
                    :columns="players"
                    @cancel="cancel"
                    @confirm="affirm"

            />
        </van-popup>


    </div>

</template>

<script>


    import {
        getGrade,
        getUserInfo,
        getByUser,
        getPerson2,
        getNullDetail,
        getLocation,
        applicantPost,
        getSchools
    } from '../../../../service/husky/api.js';
    import {getLoginInfo, getPhone, getToken, setUser} from '../../../../js/user.js';
    import {Search, Field, CellGroup, Cell, RadioGroup, Picker, Radio, Popup, Icon, Row, Col, Loading} from 'vant';

    export default {
        name: "applicant",
        data() {
            return {
                title: '报名入口',
                radio: '',
                loading: false,
                columns: [],
                showPlayer: false,
                show: false, // 控制弹框显示
                disabled: false, // 控制输入框可用
                issuccess: false, // 控制成功框框显示
                gameSubject: {}, // 赛事详情
                game: {},
                grades: [], // 年级
                grades_columns: [],
                students: [], // 选手列表数据
                players: [],
                StudentValue: { // 选择的选手
                    person: {},
                    grade: {},
                    className: '',
                    identifier: '',
                    organization: '',
                    school: {}
                },// 选中的选手
                student: {
                    person: {},
                    grade: {},
                },
                student_index: 0,
                user: {},
                user_person: {  // 家长数据
                },
                person: { // 选手
                    name: "",
                    idCard: "", // 身份证号
                    location: "",
                    phone: "",
                },
                showGrade: false,
                gradeClass: [],
                gradeValue: {},// 选择的年级
                SchoolValue: {},// 选择的学校
                schooles: ["学校1", "学校2", "学校3", "学校4"],
                searchTxt: '', // 学校
                showSchool: false, // 控制选择学校弹框显示
                location: {},
                classValue: '', // 选择的班级
                showClass: false, // 控制选择班级弹框显示
                classes: ["1班", "2班", "3班", "4班", "5班", "6班", "7班", "8班", "9班", "10班", "11班", "12班", "13班", "14班", "15班", "16班", "17班", "18班", "19班", "20班", "21班", "22班", "23班", "24班", "25班", "26班", "27班", "28班", "29班", "30班"],
            }
        },
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Popup.name]: Popup,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Loading.name]: Loading,
            [Search.name]: Search,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Field.name]: Field,
            [Picker.name]: Picker
        },
        created() {

            var _this = this;

            // 获取用户信息
            this.user = getLoginInfo();
            let token = getToken();
            let phone = getPhone();
            if (_this.user == undefined || _this.user == null) {
                getUserInfo({phone: phone, token: token}).then(function (res) { // 获取用户信息
                    _this.user = res.data;
                    // 根据用户	person id 获取
                    getPerson2(_this.user.person).then(function (res) {
                        _this.user_person = res.data;
                    });
                    setUser(_this.user);// 获取相关的选手列表
                    _this.getStudentList();
                })
            } else {

                // 获取选手
                getPerson2(_this.user.person).then(function (res) {
                    _this.user_person = res.data;
                });
                // 获取相关的选手列表
                _this.getStudentList();

            }

            this.getGradeList() // 获取可选择年级列表
            //获取赛事详情
            this.getGameSubject();
            // 获取学校
            this.getSchools();
        },

        methods: {
            searchSchool() { // 搜索学校

            },
            // 获取学校数据
            getSchools() {
                let _this = this;
                _this.columns = [];
                getSchools({name: this.searchTxt}).then(function (res) {
                    _this.schooles = res.data;
                    for (let i = 0; i < _this.schooles.length; i++) {
                        _this.columns.push(_this.schooles[i].name)
                    }
                })
            },
            // 选择学校
            getSchool() {
                if (this.disabled) {
                    return false;
                }
                this.showSchool = true;
            },
            schoolCancel() {
                this.searchTxt = '';
                this.showSchool = false;
            },
            schoolConfirm(value, index) {
                this.SchoolValue = this.schooles[index];
                this.showSchool = false;
            },
            gradeCancel() {
                this.show = false;
            },
            gradeConfirm(value, index) {
                this.gradeValue = this.grades[index];
                this.show = false;
            },
            getClass() {
                if (this.disabled) {
                    return false;
                }
                this.showClass = true;
            },
            classCancel() {
                this.showClass = false;
            },
            classConfirm(value) {
                this.classValue = value;
                this.showClass = false;
            },
            // cancel affirm 选手弹框取消 确认
            cancel() {
                this.person = {};
                this.SchoolValue = {};
                this.gradeValue = {};
                this.StudentValue = {};
                this.classValue = '';
                this.disabled = false;
                this.showPlayer = false;
            },
            affirm(value, index) {
                // 对先手信息赋值
                this.person = this.students[index].person;
                // // 学校
                this.SchoolValue = this.students[index].school;
                // // 年级
                this.gradeValue = this.students[index].grade;
                // // 班级
                this.classValue = this.students[index].className;
                this.StudentValue = this.students[index];
                this.disabled = true;
                this.showPlayer = false;

            },
            // 获取赛事详情
            async getGameSubject() {
                let _this = this;
                let gameSubjectId = this.$route.query.gameSubjectId;
                if (gameSubjectId == undefined || gameSubjectId == null || gameSubjectId == "") {
                    // 返回到index 页面
                    this.$route.push({
                        name: 'index'
                    })
                }
                // 根据 gameSubjectId 获取赛事
                let res = await getNullDetail(gameSubjectId);
                _this.gameSubject = res.data;
                _this.game = _this.gameSubject.game;

                let locationRes = await getLocation(_this.game.identifier);
                _this.location = locationRes.data;

            },
            myModal() { // 修改选手
                this.showPlayer = true;
            },
            toReadyRoom() {
                this.$router.push({path: '/index'})
            },
            // 获取年级
            getGrade() {
                if (this.disabled) {
                    return false;
                }
                this.show = true;
            },
            // 获取所有的年级列表
            async getGradeList() {
                let data = await getGrade()
                this.grades = data.data;
                for (let i = 0; i < this.grades.length; i++) {
                    this.grades_columns.push(this.grades[i].name)
                }
            },
            //获取选手列表
            getStudentList() {
                let _this = this;
                //用户personId
                let user_person_id = _this.user.person;
                getByUser({user: user_person_id}).then(function (res) {// 如果返回的数据 有null 数据 则页面会报错
                    _this.students = res.data.splice(0, 19);
                    for (let i = 0; i < _this.students.length; i++) {
                        let str = _this.students[i].person.name + "(" + _this.students[i].grade.name + ")";
                        _this.players.push(str);
                    }
                })

            },
            // 提交资料
            addApplicant() {
                let _this = this;
                this.$set(_this.StudentValue, "person", _this.person);
                this.$set(_this.StudentValue, "grade", _this.gradeValue);
                this.$set(_this.StudentValue, "school", _this.SchoolValue);
                this.$set(_this.StudentValue, "className", _this.classValue);
                let param = {
                    student: _this.StudentValue, // 选手
                    gameSubject: _this.gameSubject, // 赛事信息
                    user_person: _this.user_person // 用户
                }


                applicantPost(param).then(function () {
                    // 显示 成功弹框
                    _this.issuccess = true;
                }).catch(function () {
                })
            }

        },
        watch: {
            searchTxt: function () {
                // 获取学校
                this.getSchools();
            }
        }


    }
</script>

<style lang="less">
    @import "../../../../assets/style/mixin.less";


    .app.applicant {
        /*padding: 0 24px;*/
        font-size: 28px;
        background: #fff;
        color: @333;

        .van-search {
            padding: 5px 0;
        }

        .searchBox {
            position: relative;
            height: 600px !important;
            padding-bottom: 40px;

            .search {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100px;
                z-index: 3000;
                background-color: @white;

                h3 {
                    height: 60px;
                    line-height: 60px;
                }
            }

            .data {
                padding-top: 140px;
                padding-bottom: 15px;
                overflow-y: scroll;
                height: 100%;
            }
        }

        .my-container {
            width: 640px;
            height: 480px;
            background: @white;
            overflow-y: scroll;
            border-radius: 15px;
            /*padding: 20px 20px 20px 50px;*/

            .van-radio {
                line-height: 40px;
                height: 40px;
            }

            li {
                padding: 20px 0;
                font-size: 30px;
                border-bottom: 1px solid @EEEEEE;
            }
        }

        .bao {
            height: 365px;
            background-image: url("../../../../assets/images/bao.png");
            background-repeat: no-repeat;
            background-size: 100%;
            padding: 0 24px;
        }

        .area {
            text-align: left;
            /*height: 88px;*/
            line-height: 88px;
            color: @white;
            font-size: 32px;

            i {
                color: #90D0DA;
                font-size: 32px;
                margin-right: 4px;
                vertical-align: middle;
            }

            span {
                vertical-align: middle;
            }

            .areaBox {
                margin-left: 12px;
                color: @defaultColor;
            }
        }

        .group {
            text-align: right;
            /*height: 88px;*/
            line-height: 88px;
            color: #fff;
            font-size: 32px;

            .groupBox {
                margin-left: 12px;
                color: @defaultColor;
            }

            .icon {
                margin-right: 4px;
                font-size: 32px;
                color: @defaultColor;
            }
        }

        #triggerBtn {
            width: 701px;
            margin: 0 auto;
            height: 120px;
            line-height: 120px;
            text-align: left;
            padding: 0 20px;
            color: #999;

            .personName {
                color: @blue;
            }

            a {
                display: block;
                text-align: right;
            }
        }

        .box {
            text-align: left;
            height: 88px;
            line-height: 98px;
            font-size: 32px;
            text-align: center;

            span {
                vertical-align: middle;
            }
        }

        .form {
            padding: 24px 25px 24px;

            .item {
                margin-bottom: 30px;

                p {
                    width: 100%;
                    height: 80px;
                    line-height: 80px;
                    text-align: left;

                    i {
                        color: @defaultColor;
                    }
                }

                input {
                    display: block;
                    width: 100%;
                    height: 52px;
                    line-height: 52px;
                    border-bottom: 1px solid @EEEEEE;
                    background: @white;
                    color: @333;
                    font-size: 28px;
                }
            }
        }

        .submit {
            width: 540px;
            height: 72px;
            line-height: 72px;
            border-radius: 72px;
            text-align: center;
            background: @defaultColor;
            color: @white;
            margin: 0 auto;
            margin-top: 80px;
            margin-bottom: 80px;
            font-size: 34px;
        }

        // 提交资料成功 fix success
        .fix {
            position: fixed;
            left: 0px;
            top: 0;
            width: 100%;
            height: 100%;

            .m {
                position: absolute;
                left: 0px;
                top: 0;
                width: 100%;
                height: 100%;
                background: @black;
                opacity: 0.3;
            }

            .success {
                width: 702px;
                height: 748px;
                padding: 23px;
                background: @white;
                border-radius: 15px;
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                z-index: 10;

                .imgBox {
                    width: 656px;
                    height: 353px;
                    margin: 0 auto;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                p {
                    line-height: 97px;
                    font-size: 34px;
                }

                .msg {
                    font-size: 32px;
                    color: @666;
                    height: 117px;
                    line-height: 43px;
                    text-align: left;
                    margin-top: 30px;
                }

                .go {
                    width: 540px;
                    height: 72px;
                    line-height: 72px;
                    background: @defaultColor;
                    color: #fff;
                    font-size: 34px;
                    margin: 0 auto;
                    margin-top: 30px;
                    border-radius: 72px;
                }
            }
        }

        //van-loading
        .van-loading {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            z-index: 2;

            .van-loading__spinner {
                top: 300px;
            }
        }

        //van-picker
        .van-picker {
            .van-picker__cancel {
                padding-right: 0;
            }

            .van-picker__confirm {
                padding-left: 0;
            }
        }
    }

</style>
