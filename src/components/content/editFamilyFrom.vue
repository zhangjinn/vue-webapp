<template>
    <div class="editFamilyFrom editFormPage">
        <van-cell-group>
            <van-field
                    v-model="formList.username"
                    label="家庭昵称"
                    placeholder="请输入家庭昵称"
            />

            <van-field
                    v-model="formList.grade"
                    label="联系电话"
                    type="tel"
                    placeholder="请输入联系电话"
            />
            <van-field
                    v-model="formList.area"
                    label="地区"
                    placeholder="请选择所在地区"
            />
            <van-field
                    v-model="formList.idCard"
                    label="身份"
                    placeholder="请选择"
            />
            <van-switch-cell v-model="checked" title="管理员" />

        </van-cell-group>
    </div>
</template>

<script>
    import { Field, CellGroup, Button, Switch,SwitchCell  } from 'vant';
    export default {
        name: "editFamilyFrom",
        data(){
            return{
                formList:{
                    username:'zhang',
                    grade:'',
                    area:'',
                    idCard:'',
                    phoneNumber:''
                },
                checked: true
            }
        },
        components:{
            [Field.name]:Field,
            [CellGroup.name]:CellGroup,
            [Button.name]:Button,
            [Switch.name]:Switch,
            [SwitchCell.name]:SwitchCell,
        }
    }
</script>

<style lang="less">


</style>

