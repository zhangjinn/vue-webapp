<template>
    <div class="editFamilyFrom editFormPage">
        <van-cell-group>
            <van-field
                    v-model="formList.idCard"
                    label="身份"
                    placeholder="请选择对方身份"
            />
            <van-field
                    v-model="formList.grade"
                    label="对方联系电话"
                    type="tel"
                    placeholder="请输入联系电话"
            />
            <van-field
                    v-model="formList.sms"
                    placeholder="请输入短信验证码"
                    class="verifyField"
            >
                <van-button slot="button" size="small" tag="span" class="verifyBtn">发送验证码</van-button>
            </van-field>
        </van-cell-group>
    </div>
</template>

<script>
    import { Field, CellGroup, Button,Tag } from 'vant';
    export default {
        name: "verifyIdFrom",
        data(){
            return{
                formList:{
                    idCard:'',
                    phoneNumber:'',
                    sms:'',
                },
                checked: true
            }
        },
        components:{
            [Field.name]:Field,
            [CellGroup.name]:CellGroup,
            [Button.name]:Button,
            [Tag.name]:Tag,
        }
    }
</script>

<style lang="less">
    @import "../../assets/style/mixin";


</style>

