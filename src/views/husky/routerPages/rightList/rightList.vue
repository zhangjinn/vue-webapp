<template>
    <div class="playList pageContent" v-wechat-title="this.title">
        <div class="list" v-for="(right , index) in rights" :key="index">
            <div class="listItem">
                <van-row class="rowBorder">
                    <van-col span="4" >
                        <img src="../../../../assets/images/rightItem.png"/>
                    </van-col>
                    <van-col span="14">
                        <div>
                            <p>2019-11-04</p>
                            <div class="title">
                                希语报名卷
                            </div>
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class="useBtn" @click.prevent.stop="useRight(index)">
                            立即使用
                        </div>
                    </van-col>
                </van-row>
                <p class="rightContent">本报名卷只能在希语盛典英语风采大会杭州赛事区报名时使用，线上专用</p>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast , Row, Col}from 'vant';

    export default {
        name: "rightList",
        data() {
            return {
                title: "我的权益",
                rights: [{content: "1"}, {content: "2"}],//权益列表
            }
        },
        components:{
            [Toast.name]:Toast,
            [Row.name]: Row,
            [Col.name]: Col,
        },
        methods:{
            useRight(index){
                Toast.success("使用权益")
                if(index!=undefined && index!=null){
                   // this.dialogPrompt('玩命开发中~')
                    Toast.success("使用权益")
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../../assets/style/mixin";

    .list {
        background: @white;
        padding: 24px;
        .border-radius(15px);

        &:not(:first-child) {
            margin-top: 24px;
        }
        .listItem{
            .rowBorder{
                border-left: 0px;
                border-top: 0px;
                border-right: 0px;
                border-bottom: 1px;
                border-color: #999999;
                border-style: solid;
                display: flex;
                align-items: center;
                padding-bottom: 15px;
            }
            p {
                font-size: 28px;
                color: #333333;
                text-align: left;
                padding-left: 10px;
                padding-right: 10px;
                padding-bottom: 5px;
            }
            .title{
                font-size: 34px;
                color: @blue;
                text-align: left;
                padding-left: 10px;
                padding-right: 10px;
                padding-top: 5px;
            }
            .useBtn {
                height: 48px;
                color: @white;
                font-size: 28px;
                line-height: 48px;
                border-radius: 24px;
                background: @orange;
            }
            .rightContent{
                padding-top: 15px;
                font-size: 26px;
                color:@gray-light2;

            }
        }
    }

</style>
