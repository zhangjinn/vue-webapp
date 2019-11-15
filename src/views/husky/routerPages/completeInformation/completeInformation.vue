<template>
    <div class="completeInformation" v-wechat-title="this.title">
        <div class="header">
            <span>完善参评信息</span>
        </div>
        <div class="content">
            <div class="list">
                <p>选手参赛地区:</p>
                <div class="item">
                    <span v-if="!chooseValue" class="value default" @click="showArea()">请选择参赛地区</span>
                    <span v-else class="value" @click="showArea()"> {{ chooseValue }} </span>
                    <p class="areaTip"><span class="red">*</span>根据参赛地区，为你推荐更适合的考核内容</p>
                </div>
            </div>
            <div class="list">
                <p>参赛组别:</p>
                <div class="item">
                    <span v-if="!group.length" @click="showGroup()" class="value  default">请选择参赛组别</span>
                    <span v-else class="value  default" @click="showGroup()">
						<div v-show="true" class="value ">
							<span class="item_list" v-for="(item,index) in group" :key="index">
								{{ item.name }}
								<span class="icon iconfont close" @click="remove(index)">&#xe63a;</span>
							</span>
						</div>
					</span>

                </div>
            </div>


        </div>

        <div class="saveBtn">
            <div class="completeBtn" @click.stop="completeData()">完成</div>
        </div>


        <van-popup v-model="show">
            <div class="selectGroup">
                <h4><span>请选择参赛组别（可多选）</span></h4>

                <div class="box">
                    <van-checkbox-group @change="changeItem" v-model="result">
                        <div class="groupList" v-for="(item,index) in result1" :key="index">
                            <van-checkbox :name="item" v-model="checkd"> {{item.name}}</van-checkbox>
                        </div>
                    </van-checkbox-group>
                </div>
                <div class="btn">
                    <span @click="hidePopup()">取消</span>
                    <span @click="savePopup()">确定</span>
                </div>
            </div>
        </van-popup>


        <van-popup v-model="isArea" position="top">
            <van-area :area-list="areaList" @cancel="cancel" title="选择地区" @confirm="confirm"/>
        </van-popup>


    </div>
</template>

<script>

    import {Checkbox, CheckboxGroup, Area, Dialog, Popup} from 'vant';
    import {
        getArea,
        getUserInfo,
        getPerson,
        getGroup,
        putPerson
    } from '../../../../service/husky/api.js';
    import {
        getLoginInfo,
        setUser,
        setLoginInfo,
        getToken,
        getPhone
    } from '../../../../js/user.js';

    export default {
        name: 'completeInformation',
        data() {
            return {
                title: '完善参评信息',
                show: false,
                checkd: false,
                isArea: false,
                result: [],
                result1: ['初中组1', '初中组2', '初中组3', '初中组4', '初中组5', '初中组6'], // 组别lists
                group: [], // 选择的组别
                choose_district: {}, // 选择的地区对象
                chooseValue: '', // 显示的省市地区
                person: {
                    location: "",
                },
                user: {},
                areaList: {
                    province_list: {
                        110000: "北京市",
                        120000: "天津市"
                    },
                    city_list: {
                        110100: "北京市",
                        110200: "县",
                        120100: "天津市",
                        120200: "县"
                    },
                    county_list: {
                        110101: "东城区",
                        110102: "西城区",
                        110105: "朝阳区",
                        110106: "丰台区",
                        120101: "和平区",
                        120102: "河东区",
                        120103: "河西区",
                        120104: "南开区",
                    },
                    codeIds: []
                }
            }
        },
        components: {
            [Popup.name]: Popup,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [Area.name]: Area,
            [Dialog.name]: Dialog
        },
        created() {
            var _this = this;
            this.getProvince(); // 获取省份
            this.getGroups();    // 获取组别
            this.user = getLoginInfo();
            if (_this.user == undefined || _this.user == null) {
                getUserInfo({
                    phone: getPhone(),
                    token: getToken(),
                }).then(function (res) {
                    _this.user = res.data;
                    // 设置用户
                    setUser(_this.user)
                    setLoginInfo(_this.user)

                    getPerson(_this.user.person).then(function (res) {
                        _this.person = res.data;
                    })
                });
            } else {
                getPerson(_this.user.person).then(function (res) {
                    _this.person = res.data;
                })
            }


        },
        methods: {
            getGroups() { // 获取组别
                var _this = this;
                getGroup().then(function (res) {
                    _this.result1 = res.data;
                })
            },
            // 删除组别
            remove(index) {
                this.group.splice(index, 1);
                this.result.splice(index, 1);
            },
            hidePopup() {
                this.show = false;
            },
            savePopup() {
                this.show = false;
            },
            changeItem(v) {
                this.group = v;
            },
            // 显示选择组别弹框
            showGroup() {
                this.show = true;
            },
            // 选择地区
            showArea() {
                this.isArea = true;
            },
            cancel() {
                this.isArea = false;
            },
            confirm(v) {
                this.chooseValue = "";
                this.choose_district = v[v.length - 1];
                for (var i = 0; i < v.length; i++) {
                    this.chooseValue += v[i].name + '-'
                }
                this.chooseValue = this.chooseValue.substring(0, this.chooseValue.length - 1);
                this.isArea = false;

                let codeId = this.searchCodeId(this.choose_district.code, this.areaList.codeIds);

                this.person.location = codeId;

            },
            searchCodeId(code, codeIds) {
                var codeId = '';
                for (var key in codeIds) {
                    if (code == key) {
                        codeId = codeIds[key];
                        break;
                    }
                }
                return codeId;
            },
            getProvince() { // 获取所有省
                var _this = this;
                getArea({}).then(function (res) {

                    // areaList province_list city_list county_list
                    _this.areaList.city_list = res.cityList;
                    _this.areaList.province_list = res.provinceList;
                    _this.areaList.county_list = res.countyList;
                    _this.areaList.codeIds = res.codeId;
                })
            },

            completeData() { // 完成保存

                if (this.person.location == undefined || this.person.location === '') {
                    Dialog.alert({
                        title: '',
                        message: '请选择地区'
                    }).then(() => {

                    });
                    return false;
                }
                let _this = this;
                let groupString = "";
                for (let i = 0; i < _this.group.length; i++) {
                    groupString = groupString + _this.group[i].identifier + "-";

                }
                groupString = groupString.substring(0, groupString.length - 1);
                putPerson(_this.person, _this.user.person).then(function () {
                    Dialog.alert({
                        title: '',
                        message: '修改成功'
                    }).then(() => {
                        // on close
                        _this.$router.push({
                            path: '/',
                        })
                    });

                })

            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../../../assets/style/mixin.less";

    .completeInformation {
        color: #333333;

        .header {
            height: 88px;
            line-height: 88px;
            font-size: 36px;
            border-bottom: 1px solid #E8E8E8;
            margin-bottom: 45px;

            .icon {
                position: absolute;
                left: 24px;
                top: 0;
                font-size: 46px;
            }
        }

        .content {
            width: 702px;
            margin: 0 auto;
            text-align: left;

            .list {
                margin-bottom: 40px;

                .item {
                    font-size: 28px;
                    color: #333333;

                    .default {
                        color: #999999;
                    }

                    .item_list {
                        display: inline-block;
                        border-radius: 5px;
                        padding: 1px 46px 1px 10px;
                        background: rgba(253, 234, 190, 1);
                        position: relative;
                        line-height: 40px;
                        height: 40px;
                        margin: 0 10px 10px 0;

                        .close {
                            position: absolute;
                            right: 5px;
                            top: 0;
                            width: 33px;
                            text-align: center;
                        }

                    }

                    .value {
                        display: block;
                        min-height: 60px;
                        line-height: 60px;
                        border-bottom: 1px solid #E8E8E8;
                        padding-left: 20px;
                    }

                    .value2 {
                        border-bottom: 1px solid #fff;
                    }

                    p {
                        height: 60px;
                        line-height: 60px;
                        font-size: 32px;
                    }

                    .red {
                        color: @defaultColor;
                    }

                    .areaTip {
                        font-size: 24px;
                        color: #999999;
                        height: 48px;
                        line-height: 48px;
                    }
                }
            }

        }

        .selectGroup {
            width: 640px;
            padding-bottom: 80px;
            padding-top: 90px;
            position: relative;

            h4 {
                height: 80px;
                line-height: 80px;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                background: #fff;
                z-index: 120;
            }

            .box {
                position: relative;
                max-height: 540px;
                overflow-y: scroll;

                .groupList {
                    height: 80px;
                    line-height: 80px;
                    padding-top: 20px;
                    padding-left: 40px;
                    font-size: 28px;
                }
            }

            .btn {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                height: 80px;
                line-height: 80px;

                span {
                    display: inline-block;
                    width: 120px;
                    text-align: center;
                    background: #fff;
                    margin-right: 20px;
                    color: @defaultColor;
                }
            }

        }

        .saveBtn {
            margin-top: 260px;

            .completeBtn {
                display: block;
                width: 540px;
                height: 72px;
                border-radius: 72px;
                line-height: 72px;
                background: @defaultColor;
                color: #fff;
                font-size: 34px;
                margin: 0 auto;
                /*cursor: pointer;*/
            }
        }
    }
</style>
