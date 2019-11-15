<template>
    <div class="noMoreContent">
        <div class="noContentText">
            <span class="line"></span>
            <span>{{noMoreContentShowText}}</span>
            <span class="line"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "noMoreContent",
        props: ['noMoreContentShowText']
    }
</script>

<style scoped lang="less">
    @import "../../assets/style/mixin";

    .noMoreContent {
        height: 88px;
        line-height: 88px;
        color: #BCBCBC;
        text-align: center;

        span {
            display: inline-block;
            vertical-align: middle;
            margin: 0 8px;
        }

        .line {
            display: inline-block;
            height: 2px;
            width: 80px;
            background-color: #BCBCBC;
            color: #BCBCBC;
            margin: 0;
        }
    }


</style>
