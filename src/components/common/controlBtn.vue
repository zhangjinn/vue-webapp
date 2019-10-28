<template>
    <div clas="controlBtn">
        <div class="controlBtnInner" :class="{controlBtnActiveColor: btnActive}">
            {{btnText}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "controlBtn",
        props:['btnActive','btnText']
    }
</script>

<style scoped lang="less">
    @import "../../assets/style/mixin";
    .controlBtnInner{
        .wh(540px, 72px);
        font-size:34px;
        border-radius:36px;
        margin: 0 auto;
        line-height: 72px;
        color: @white;
        background: @controlBtnDefaultColor;
				text-align: center;
				letter-spacing: 3px;
    }
    .controlBtnActiveColor{
       background: @defaultColor;
    }

</style>
