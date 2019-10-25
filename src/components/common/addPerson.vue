<template>
    <div class="addPerson">
        <span class="icon iconfont" :class="addIcon"></span>
        <span class="addPersonText">{{addPersonText}}</span>
    </div>
</template>

<script>
    export default {
        name: "addPerson",
        props:['addIcon','addPersonText']
    }
</script>

<style scoped lang="less">
    @import "../../assets/style/mixin";
    .icon{
        font-size: 60px;
    }
    .addPerson{
        .fj(center);
            align-items: center;
            //color: @blue;
            padding: 30px 0 27px;
            //background: @defaultBgColor;
        .addPersonText{
            padding-left: 16px;
            font-size: 32px;
        }
    }
</style>
