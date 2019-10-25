<template>
    <div class="editFamilyMembers pageContent">
        <div class="editFamilyContent">
            <edit-family-from></edit-family-from>
        </div>
        <add-person :addIcon="'iconxinzengchengyuan'" :addPersonText="addPersonText"></add-person>
        <div class="btnContent">
            <control-btn :btnActive="true" btnText="保存"></control-btn>
            <control-btn :btnActive="false" btnText="取消" class="playerEdit"></control-btn>
        </div>

    </div>
</template>

<script>
    import ControlBtn from '../../components/common/controlBtn';
    import EditFamilyFrom from '../../components/content/editFamilyFrom';
    import AddPerson from '../../components/common/addPerson';
    export default {
        name: "editFamilyMembers",
        data(){
            return{
                addPersonText:'移除',
                formList:{
                    username:'zhang',
                    grade:'',
                    area:'',
                    identity:'',
                    phoneNumber:''
                }
            }
        },
        components:{
            [ControlBtn.name]:ControlBtn,
            [EditFamilyFrom.name]:EditFamilyFrom,
            [AddPerson.name]:AddPerson
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/style/mixin";
    .editFamilyMembers{
        .btnContent{
            margin-top: 178px;
            .playerEdit{
                margin-top: 24px;
            }
        }

    }
</style>
