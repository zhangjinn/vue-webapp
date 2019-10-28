<template>
    <div class="switchAccount">
        <div class="userMsg">
            <span class="icon iconfont iconzhanghao"></span>
            <div class="userMsgMian">
                <p class="userMsgMianName">{{userInfo.user.name}}</p>
                <p class="userMsgMianPhone">{{userInfo.phone}}</p>
            </div>
        </div>
<!--        <div class="switchText">切换账号</div>-->
    </div>
</template>

<script>
    export default {
        name: "switchAccount",
        props:['userInfo']
    }
</script>

<style scoped lang="less">
    @import "../../assets/style/mixin";

    .switchAccount{
        .icon{
            font-size: 60px;
        }
        .wh('100%',120px);
        .border-radius(15px);
        background:rgba(255,255,255,1);
        .fj();
        align-items: center;
        padding: 26px 27px 26px 22px;
        font-size: 28px;
        .userMsg{
            .fj(flex-start);
            align-items: center;
            text-align: left;
            .userMsgMian{
                padding-left: 16px;
              .userMsgMianName{
                  font-size:32px;
                  font-weight:bold;
              }
            }
        }
        .switchText{
            //.wh(160px,100%);
            height: 100%;
            font-size:32px;
            font-family:PingFang SC;
            font-weight:400;
            color:@defaultColor;
            display:flex;
            align-items: center;

        }

    }
</style>
