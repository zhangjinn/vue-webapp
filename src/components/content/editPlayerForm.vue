<template>
    <div class="editPlayerFrom editFormPage">
        <van-cell-group>
            <van-field
                    v-model="formList.username"
                    label="姓名"
                    placeholder="请输入选手的姓名"
                    required
            />
            <van-field
                    v-model="formList.sexValue"
                    readonly
                    clickable
                    label="性别"
                    placeholder="请选择性别"
                    @click="showSex = true"
            />
            <van-field
                    v-model="formList.areaValue"
                    readonly
                    clickable
                    label="地区"
                    placeholder="请选择所在地区"
                    @click="showArea = true"
                    required
            />
            <van-field
                    v-if="!showSchoolInput"
                    v-model="formList.schoolValue"
                    readonly
                    clickable
                    label="学校"
                    placeholder="请选择选手所在学校"
                    @click="showSchool = true"
                    required
            />
            <van-field
                    v-if="showSchoolInput"
                    v-model="otherSchool"
                    readonly
                    clickable
                    label="学校"
                    placeholder="请选择选手所在学校"
                    @click="showSchool = true"
                    required
            />
            <van-field
                    v-if="showSchoolInput"
                    v-model="formList.schoolValue"
                    placeholder="请输入学校名称"
            />
            <van-field
                    v-model="formList.gradeValue"
                    readonly
                    clickable
                    label="年级"
                    placeholder="请选择选手所在年级"
                    @click="showGrade = true"
                    required
            />
            <van-field
                    v-model="formList.classValue"
                    readonly
                    clickable
                    label="班级"
                    placeholder="请选择选手所在班级"
                    @click="showClass = true"
                    required
            />
            <van-field
                    v-model="formList.phoneNumber"
                    label="联系电话"
                    maxlength="11"
                    placeholder="请输入联系电话"
            />
            <van-field
                    v-model="formList.urgentPerson"
                    label="紧急联系人"
                    placeholder="请输入紧急联系人"
                    disabled
            />
            <van-field
                    v-model="formList.urgentPhoneNumber"
                    label="联系人电话"
                    maxlength="11"
                    placeholder="请输入联系人电话"
                    disabled
            />


        </van-cell-group>
        <van-popup v-model="showSchool" position="bottom">

            <van-picker
                    show-toolbar
                    :columns="schoolList"
                    @cancel="schoolCancel"
                    @confirm="schoolConfirm"
            >

                <form slot="title" action="/" class="searchForm">
                    <van-search
                            v-model="searchValue"
                            placeholder="请输入搜索关键词"
                            :clearable=false
                    />
                </form>

            </van-picker>
        </van-popup>
        <van-popup v-model="showGrade" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="gradeList"
                    @cancel="showGrade = false"
                    @confirm="gradeConfirm"
            />
        </van-popup>
        <van-popup v-model="showClass" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="classList"
                    @cancel="showClass = false"
                    @confirm="classConfirm"
            />
        </van-popup>
        <van-popup v-model="showSex" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="sexList"
                    @cancel="showSex = false"
                    @confirm="sexConfirm"
            />
        </van-popup>

        <van-popup v-model="showArea" position="bottom">
            <van-area
                    :area-list="areaList"
                    @cancel="showArea = false"
                    @confirm="areaConfirm"/>
        </van-popup>
    </div>
</template>

<script>
    import {Field, CellGroup, Picker, Toast, Popup, Area, Search} from 'vant';
    import {getGrade, getSchool} from '../../service/husky/api.js'

    export default {
        name: "editPlayerFrom",
        props: ['student', 'formList', 'areaList', 'areaCodeId'],
        data() {
            return {
                showSchool: false,
                showSchoolInput: false,
                showGrade: false,
                showClass: false,
                showArea: false,
                showSex: false,
                schoolListArr: [],
                gradeListArr: [],
                groupArr: [],
                schoolList: [],
                gradeList: [],
                groupList: [],
                classList: ["1班", "2班", "3班", "4班", "5班", "6班", "7班", "8班", "9班", "10班", "11班", "12班", "13班", "14班", "15班", "16班", "17班", "18班", "19班", "20班", "21班", "22班", "23班", "24班", "25班", "26班", "27班", "28班", "29班", "30班"],
                sexList: ['男', '女'],
                codeIdValue: '',
                searchValue: '',
                otherSchool: '其他'
            }
        },
        components: {
            [Field.name]: Field,
            [CellGroup.name]: CellGroup,
            [Picker.name]: Picker,
            [Toast.name]: Toast,
            [Popup.name]: Popup,
            [Area.name]: Area,
            [Search.name]: Search,

        },
        created() {
            this.proEntry()
        },
        watch: {
            searchValue() {
                this.getSchool();
            }
        },
        methods: {
            async getSchool() {
                let schoolParam = {
                    name: this.searchValue
                };
                let schoolData = await getSchool(schoolParam);
                this.schoolListArr = schoolData.data;
                this.schoolList = [];
                for (let i = 0; i < this.schoolListArr.length; i++) {
                    this.schoolList.push(this.schoolListArr[i].name)
                }

            },
            async getGrade() {
                let gradeData = await getGrade();
                this.gradeListArr = gradeData.data;
                this.gradeList = [];
                for (let i = 0; i < this.gradeListArr.length; i++) {
                    this.gradeList.push(this.gradeListArr[i].name)
                }
            },

            proEntry() {
                this.getSchool();
                this.getGrade();
            },
            schoolConfirm(value, index) {
                this.student.school = this.schoolListArr[index];
                this.formList.schoolValue = value;
                if (this.formList.schoolValue == "其他") {
                    this.showSchoolInput = true;
                    this.formList.schoolValue = '';
                } else {
                    this.showSchoolInput = false;
                }
                this.showSchool = false;

            },
            schoolCancel() {
                this.showSchool = false;
                this.showSchoolInput = false;
            },
            gradeConfirm(value, index) {
                this.student.grade = this.gradeListArr[index];
                this.formList.gradeValue = value;
                this.showGrade = false;
            },
            classConfirm(value) {
                this.student.className = value;
                this.formList.classValue = value;
                this.showClass = false;
            },
            sexConfirm(value) {
                this.formList.sexValue = value;
                this.showSex = false;
            },

            areaConfirm(value) {
                //因为解析过来的数据是数组而area定义字符串
                let code = value[value.length - 1]['code'];
                this.codeIdValue = this.areaCodeId[code];
                this.student.person.location = this.codeIdValue;
                let str = '';
                for (let i = 0; i < value.length; i++) {
                    if (i == (value.length - 1)) {
                        str += value[i].name;
                    } else {
                        str += value[i].name + '-';
                    }
                }
                this.formList.areaValue = str;
                this.showArea = false;
            },
        }
    }
</script>

<style lang="less">

    .editFormPage .searchForm .van-field__control {
        text-align: left;
    }

    .editFormPage .searchForm .van-search {
        padding: 10px 0;
    }

    .van-picker {
        .van-picker__cancel {
            padding-right: 0;
        }

        .van-picker__confirm {
            padding-left: 0;
        }
    }
</style>

