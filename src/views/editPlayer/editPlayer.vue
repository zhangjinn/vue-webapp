<template>
    <div class="playerEdit pageContent">
        <edit-player-from></edit-player-from>
        <add-person :addIcon="'iconxinzengchengyuan'" :addPersonText="addPersonText"></add-person>

        <div class="btnContent">
            <control-btn :btnActive="true" btnText="保存"></control-btn>
            <control-btn :btnActive="false" btnText="取消" class="playerEdit"></control-btn>
        </div>

    </div>
</template>

<script>
    import { Field, CellGroup  } from 'vant';
    import ControlBtn from "../../components/common/controlBtn";
    import EditPlayerFrom from "../../components/content/editPlayerForm";
    import AddPerson from '../../components/common/addPerson';

    export default {
        name: "editPlayer",
        data(){
            return{
                addPersonText:'移除'
            }
        },
        components:{
            EditPlayerFrom,
            [Field.name]:Field,
            [CellGroup.name]:CellGroup,
            [ControlBtn.name]:ControlBtn,
            [EditPlayerFrom.name]:EditPlayerFrom,
            [AddPerson.name]:AddPerson
        }
    }
</script>

<style lang="less">
    @import "../../assets/style/mixin";
.playerEdit{
    .btnContent{
        margin-top: 178px;
        .playerEdit{
            margin-top: 24px;
        }
    }

}
</style>
