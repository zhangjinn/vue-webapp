<template>
    <div class="playerEdit" v-wechat-title="this.navTitle">
        <nav-bar v-if="title!=''">
            <span slot="title">{{title}}</span>
        </nav-bar>
        <div class="pageContent">
            <edit-player-from :student="student" :formList="formList" :areaList="areaList"
                              :areaCodeId="areaCodeId"></edit-player-from>
            <div class="btnContent">
                <control-btn :btnActive="true" btnText="保存" @click.native.prevent="verifyForm"></control-btn>
                <control-btn :btnActive="false" btnText="取消" class="playerEdit"
                             @click.native="returnPage"></control-btn>
            </div>

        </div>
        <van-overlay :show="overlayShow"/>
    </div>

</template>

<script>
    import {Field, CellGroup, Dialog, Toast, Overlay} from 'vant';
    import ControlBtn from "../../../../components/common/controlBtn";
    import EditPlayerFrom from "../../../../components/content/editPlayerForm";
    import AddPerson from '../../../../components/common/addPerson';
    import NavBar from '../../../../components/common/navBar';
    import {getLoginInfo} from '../../../../js/user.js'
    import {
        getArea,
        getStudent,
        putStudent,
        postStudent,
        getPerson,
        putPerson,
        postPerson,
        postAssociate,
        getParent
    } from '../../../../service/husky/api.js'

    export default {
        name: "editPlayer",
        data() {
            return {
                userInfo: {},
                addPersonText: '移除',
                navTitle: '选手',
                title: '',
                areaCodeId: {},
                overlayShow: false,
                areaList: {
                    province_list: {},
                    city_list: {},
                    county_list: {}
                },
                formList: {
                    username: '',
                    schoolValue: '',
                    gradeValue: '',
                    classValue: '',
                    areaValue: '',
                    sexValue: '',
                    idCard: '',
                    phoneNumber: ''

                },
                studentId: "",
                student: {
                    person: {},
                    grade: {},
                    school: {},
                    className: ""
                },

            }
        },
        components: {
            EditPlayerFrom,
            [Field.name]: Field,
            [CellGroup.name]: CellGroup,
            [ControlBtn.name]: ControlBtn,
            [EditPlayerFrom.name]: EditPlayerFrom,
            [AddPerson.name]: AddPerson,
            [Dialog.Component.name]: Dialog.Component,
            [NavBar.name]: NavBar,
            [Toast.name]: Toast,
            [Overlay.name]: Overlay,
        },
        created() {
            this.getArea();

        },
        methods: {
            async getArea() {
                let getAreaData = await getArea();
                this.areaList.province_list = getAreaData.provinceList;
                this.areaList.city_list = getAreaData.cityList;
                this.areaList.county_list = getAreaData.countyList;
                this.areaCodeId = JSON.parse(JSON.stringify(getAreaData.codeId));

                this.proEntry();
            },
            async getStudent(id) {
                let studentData = await getStudent(id);
                this.student = studentData.data;

                this.formList.gradeValue = this.student.grade.name;
                this.formList.sexValue = this.student.person.gender == "MALE" ? "男" : "女";
                this.formList.username = this.student.person.name;
                this.formList.idCard = this.student.person.idCard;
                this.formList.phoneNumber = this.student.person.phone;
                this.formList.schoolValue = this.student.school.name;
                this.formList.classValue = this.student.className;
                let areaIdCode = this.student.person.location;
                let areaParam = {
                    areaGuid: areaIdCode
                };
                let areaStr = await getParent(areaParam);
                this.location = areaStr.data;
                let locationName = this.location.grandpaName + '-' + this.location.parentName + '-' + this.location.areaName;
                this.formList.areaValue = locationName;


            },

            async putData(person) {
                await putPerson(person, this.student.person.identifier);
                await putStudent(this.student, this.student.identifier);
                this.overlayShow = true;
                Toast.success('更新成功');
                this.timer();

            },
            async addData(person) {
                person = JSON.parse(JSON.stringify(person));
                let personId = this.userInfo.person;
                let user_person = await getPerson(personId);

                user_person = user_person.data;
                let student_person = await postPerson(person);
                student_person = student_person.data;
                this.student.person = student_person;
                let postAssociateParam = {
                    one: user_person,
                    other: student_person,
                    type: "AGENT"
                };

                await postAssociate(postAssociateParam);
                let postStudentParam = {
                    student: this.student,
                    user: personId
                };

                await postStudent(postStudentParam);
                this.overlayShow = true;
                Toast.success('保存成功');
                this.timer();
            },
            timer() {
                let second = 1;
                const timer = setInterval(() => {
                    second--;
                    if (!second) {
                        clearInterval(timer);
                        Toast.clear();
                        this.overlayShow = false;
                        this.$router.push({path: '/playerList'})
                    }
                }, 1000);
            },
            proEntry() {
                this.userInfo = getLoginInfo();
                let routeData = this.$route;
                let isEdit = routeData.query.student;
                this.studentId = isEdit;
                if (this.studentId) {
                    this.title = '编辑选手';
                    this.student.identifier = this.studentId;
                    this.student.person.identifier = this.studentId;
                    this.getStudent(isEdit);
                } else {
                    this.title = '添加选手';
                }

            },
            verifyForm() {
                let person = this.student.person;
                person.name = this.formList.username;
                person.idCard = this.formList.idCard;
                person.gender = this.formList.sexValue == "男" ? "MALE" : "FEMALE";
                person.phone = this.formList.phoneNumber;

                if (this.formList.username == '' || this.formList.username == null) {
                    this.dialogPrompt("用户名不能为空");
                    return false;
                } else if (this.formList.areaValue == '' || this.formList.areaValue == null) {
                    this.dialogPrompt("地区不能为空");
                    return false;
                } else if (this.formList.schoolValue == '' || this.formList.schoolValue == null) {
                    this.dialogPrompt("学校不能为空");
                    return false;
                } else if (this.formList.gradeValue == '' || this.formList.gradeValue == null) {
                    this.dialogPrompt("年级不能为空");
                    return false;
                } else if (this.formList.classValue == '' || this.formList.classValue == null) {
                    this.dialogPrompt("班级不能为空");
                    return false;
                } else {

                    if (this.studentId) {
                        this.putData(person);
                    } else {
                        this.addData(person);
                    }
                }
            },
            returnPage() {
                this.$router.push({path: '/playerList'})
            },
            dialogPrompt(content) {
                Dialog.alert({
                    message: content
                });
            }
        }
    }
</script>

<style lang="less">
    @import "../../../../assets/style/mixin";

    .playerEdit {
        .pageContent {
            top: 46PX;
        }

        .btnContent {
            margin-top: 178px;

            .playerEdit {
                margin-top: 24px;
            }
        }

    }
</style>
