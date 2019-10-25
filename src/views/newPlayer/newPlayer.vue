<template>
    <div class="playerEdit pageContent">
        <edit-player-from></edit-player-from>
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
    export default {
        name: "newPlayer",
        data(){
            return{

            }
        },
        components:{
            EditPlayerFrom,
            [Field.name]:Field,
            [CellGroup.name]:CellGroup,
            [ControlBtn.name]:ControlBtn,
            [EditPlayerFrom.name]:EditPlayerFrom
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
