<template>
    <div class="playerEdit" v-wechat-title="this.navTitle">
        <nav-bar v-if="title!=''">
            <span slot="title" @click="clearSure()">{{title}}</span>
        </nav-bar>
        <div class="pageContent">
            <edit-player-from :student="student" :formList="formList" :areaList="areaList"
                              :areaCodeId="areaCodeId"></edit-player-from>
            <div v-if="pageType == 'evpi'" class="btnContent">
                <control-btn :btnActive="true" btnText="完成" class="submitBtn"
                             @click.native.prevent="verifyForm"></control-btn>
            </div>
            <div v-else class="btnContent">
                <control-btn :btnActive="true" btnText="完成" class="submitBtn"
                             @click.native.prevent="verifyForm"></control-btn>
                <control-btn :btnActive="false" btnText="取消" class="cancelBtn" @click.native="returnPage"></control-btn>
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
    import {
        getLoginInfo,
        setStoreStudent,
        getStoreStudent,
        setStudentIndex,
        getStudentIndex,
        getPhone
    } from '../../../../js/user.js';
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
    import {clearStore, clearSession} from '../../../../js/common.js'

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
                showCancel: false,
                pageType: '',
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
                    phoneNumber: '',
                    urgentPerson: '',
                    urgentPhoneNumber: ''

                },
                studentId: "",
                student: {
                    person: {},
                    grade: {},
                    school: {},
                    className: "",
                    identifier: '26'
                },
                StudentIndex: '',
                oldGrade: '',
                oldArea: '',
                phone: '',
                count: 0,
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
            let type = this.$route.query.type;

            if (type) {
                this.pageType = type;
            }
            this.userInfo = getLoginInfo();
            this.phone = getPhone();
            this.StudentIndex = getStudentIndex();
            if (this.StudentIndex) {
                this.evpiEntry();
            } else {
                this.proEntry();
            }
            this.getArea();
        },
        methods: {
            async getArea() {
                //获取地区
                let getAreaData = await getArea();
                this.areaList.province_list = getAreaData.provinceList;
                this.areaList.city_list = getAreaData.cityList;
                this.areaList.county_list = getAreaData.countyList;
                this.areaCodeId = JSON.parse(JSON.stringify(getAreaData.codeId));
            },
            async getStudent(id) {
                //获取选手信息并填充
                if (this.StudentIndex) {
                    let studentData = getStoreStudent();
                    this.student = studentData;
                } else {
                    let studentData = await getStudent(id);
                    this.student = studentData.data;
                }

                this.formList.gradeValue = this.student.grade.name;
                this.formList.sexValue = this.student.person.gender == "MALE" ? "男" : "女";
                this.formList.username = this.student.person.name;
                this.formList.phoneNumber = this.student.person.phone;
                this.formList.schoolValue = this.student.school.name;
                this.formList.classValue = this.student.className;
                this.formList.urgentPerson = this.userInfo.name;
                this.formList.urgentPhoneNumber = this.phone;

                this.oldArea = this.student.person.location;
                this.oldGrade = this.student.grade.identifier;

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
                //修改选手
                await putPerson(person, this.student.person.identifier);
                await putStudent(this.student, this.student.identifier);
                this.overlayShow = true;
                Toast.success('更新成功');
                if (this.pageType == 'game') {
                    setStoreStudent(this.student);
                    if (person.location != this.oldArea || this.student.grade.identifier != this.oldGrade) {
                        let _this = this;
                        setTimeout(function () {
                            _this.$router.push({
                                path: '/taskInformation'
                            })
                        }, 1000)
                    } else {
                        this.timer();
                    }
                } else {
                    this.timer();
                }
            },
            async addData(person) {
                //新增选手
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
                        if (this.pageType == 'game') {
                            setStoreStudent(this.student);
                            this.$router.push({path: '/enrollPage'});
                        } else {
                            this.$router.push({path: '/playerList', query: {type: 'star'}});
                        }

                    }
                }, 1000);
            },
            evpiEntry() {
                if (this.StudentIndex) {
                    this.title = '编辑选手';
                    this.getStudent();
                } else {
                    this.title = '添加选手';
                    this.formList.urgentPerson = this.userInfo.name;
                    this.formList.urgentPhoneNumber = this.phone;
                    this.formList.sexValue = '男';
                }

            },
            proEntry() {
                let routeData = this.$route;
                let isEdit = routeData.query.student;
                this.studentId = isEdit;
                if (this.studentId) {
                    this.title = '编辑选手';
                    this.student.person.identifier = this.studentId;
                    this.getStudent(isEdit);
                } else {
                    this.title = '添加选手';
                    this.formList.urgentPerson = this.userInfo.name;
                    this.formList.urgentPhoneNumber = this.phone;
                    this.formList.sexValue = '男';
                }

            },
            verifyForm() {
                //提交修改或新增的选手信息
                let person = this.student.person;
                person.name = this.formList.username;
                person.gender = this.formList.sexValue == "男" ? "MALE" : "FEMALE";
                person.phone = this.formList.phoneNumber;
                person.urgentPerson = this.formList.urgentPerson;
                person.urgentPhoneNumber = this.formList.urgentPhoneNumber;
                if (this.formList.username == '') {
                    this.dialogPrompt("姓名不能为空");
                    return false;
                } else if (this.formList.areaValue == '') {
                    this.dialogPrompt("地区不能为空");
                    return false;
                } else if (this.formList.schoolValue == '') {
                    this.dialogPrompt("学校不能为空");
                    return false;
                } else if (this.formList.gradeValue == '') {
                    this.dialogPrompt("年级不能为空");
                    return false;
                } else if (this.formList.classValue == '') {
                    this.dialogPrompt("班级不能为空");
                    return false;
                } else {
                    if (this.student.school.name == '其他') {
                        this.student.school.name = this.formList.schoolValue
                    }

                    if (this.pageType == "game" && this.StudentIndex) {
                        setStoreStudent(this.student);
                        this.returnPage()
                    } else if (this.pageType == 'evpi') {
                        setStoreStudent(this.student);
                        setStudentIndex(true);
                        this.$router.push({path: '/taskInformation'});
                    } else {
                        if (this.studentId) {
                            this.putData(person);
                        } else {
                            this.addData(person);
                        }
                    }

                }
            },
            returnPage() {
                this.$router.back(-1);
            },
            dialogPrompt(content) {
                Dialog.alert({
                    message: content
                });
            },
            clear(){
                clearStore();
                clearSession();
            },
            clearSure(){
                if(this.count >= 9){
                    this.count = 0;
                    Dialog.confirm({
                        message: '确认清除缓存'
                    }).then(()=>{
                        this.clear();
                    }).catch(()=>{
                        //on close
                    })
                }else{
                    this.count ++ ;
                }
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

            .submitBtn {
                .controlBtnInner {
                    background: #90D0DA;
                }
            }

            .cancelBtn {
                margin-top: 24px;
            }
        }

    }
</style>
