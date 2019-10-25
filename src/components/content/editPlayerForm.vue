<template>
    <div class="editPlayerFrom editFormPage">
        <van-cell-group >
            <van-field
                    v-model="formList.username"
                    label="姓名"
                    placeholder="请输入孩子的姓名"
            />

            <van-field
                    label="年级"
                    readonly
                    clickable
                    :value="value"
                    placeholder="请输入孩子所在年级"
                    @click="showPicker = true"
            />
            <van-field
                    v-model="formList.area"
                    label="地区"
                    placeholder="请选择所在地区"
            />
            <van-field
                    v-model="formList.sex"
                    label="性别"
                    placeholder="请选择性别"
            />
            <van-field
                    v-model="formList.idCard"
                    label="身份证"
                    placeholder="请输入身份证"
            />
            <van-field
                    v-model="formList.phoneNumber"
                    label="联系电话"
                    placeholder="请输入联系电话"
            />

        </van-cell-group>
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
            />
        </van-popup>

        <van-popup v-model="showPicker1" position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
    import { Field, CellGroup, Picker, Toast,Popup } from 'vant';
    export default {
        name: "editPlayerFrom",
        data(){
            return{
                formList:{
                    username:'zhang',
                    grade:'',
                    area:'',
                    sex:'',
                    idCard:'',
                    phoneNumber:''
                },
                value: '',
                showPicker: false,
                showPicker1: false,
                columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
                AreaList:{
                    province_list: {
                        110000: '北京市',
                        120000: '天津市'
                    },
                    city_list: {
                        110100: '北京市',
                        110200: '县',
                        120100: '天津市',
                        120200: '县'
                    },
                    county_list: {
                        110101: '东城区',
                        110102: '西城区',
                        110105: '朝阳区',
                        110106: '丰台区',
                        120101: '和平区',
                        120102: '河东区',
                        120103: '河西区',
                        120104: '南开区',
                        120105: '河北区',

                    }
                }
            }
        },
        components:{
            [Field.name]:Field,
            [CellGroup.name]:CellGroup,
            [Picker.name]:Picker,
            [Toast.name]:Toast,
            [Popup.name]:Popup,
        },
        methods:{
            pickerList(){

            },
            onConfirm(value) {
                this.value = value;
                this.showPicker = false;
            }
        }
    }
</script>

<style lang="less">


</style>

