<template>
    <div class="personItem">
        <div class="personItemInfo">
            <h3>萱草{{personItem}}</h3>
            <p>小学一年级</p>
        </div>
        <div class="personItemIcon">
            <span class="icon iconfont iconbianji"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "personItem",
        props:['personItem']
    }
</script>

<style scoped lang="less">
    @import "../../assets/style/mixin";
    .icon{
        font-size: 48px;
    }
    .personItem{
        .fj();
        align-items: center;
        text-align: left;
        padding: 26px 27px 26px 22px;
        margin-top: 4px;
        background: @defaultBgColor;
        .personItemInfo{
            h3{
                color: @defaultColor;
            }
            p{padding-top: 16px;}
        }
    }
</style>
