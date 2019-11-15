<template>
    <div class="personItem">
        <div class="personItemInfo">
            <p class="pItemInfoTitle">{{title}}</p>
            <p class="pItemInfoContent">{{content}}</p>
        </div>
        <div class="personItemIcon">
            <span class="icon iconfont iconbianji"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "personItem",
        props: ['title', 'content']
    }
</script>

<style scoped lang="less">
    @import "../../assets/style/mixin";

    .personItem {
        .icon {
            font-size: 48px;
        }

        .fj();
        align-items: center;
        text-align: left;
        padding: 26px 27px 26px 22px;
        margin-top: 4px;
        background: @defaultBgColor;

        .personItemInfo {
            .pItemInfoTitle {
                color: @defaultColor;
                font-size: 34px;
                font-weight: bold;
            }

            .pItemInfoContent {
                padding-top: 16px;
            }
        }
    }
</style>
