<template>
    <div class="noContent">
        <div class="noContentPic">
            <img src="../../assets/images/noContent.png" alt="">
        </div>
        <div class="noContentText">{{noContentShowText}}~</div>
    </div>
</template>

<script>
    export default {
        name: "noContent",
        props:['noContentShowText']
    }
</script>

<style scoped lang="less">
    @import "../../assets/style/mixin";
    .noContent{
        margin-top: 4px;
        padding: 38px;
        .fj(center);
        align-items: center;
        flex-direction: column;

        background:@defaultBgColor;
        .noContentPic{
            .wh(330px,223px)
        }
        .noContentText{
            margin-top: 41px;
            .sc(22px,@noContentTextColor)
        }
    }


</style>
