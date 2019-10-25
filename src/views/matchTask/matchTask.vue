<template>
    <div class="matchTask">
        <div class="main" v-title data-title="比赛内容"></div>
        <div class="container">
            <div class="top">
                <img class="userIcon" src="./../../assets/images/gameHeader.png">
            </div>
            <p class="userName">紫荆同学</p>
            <div class="content">
                <div>
                    <p><span>大会名称：</span> <i></i></p>
                    <p><span>考试内容：</span><i></i></p>
                    <p><span>考核时间：</span><i></i></p>
                    <p><span>满分：</span><i>分</i></p>
                    <p><span>参赛人数：</span><i> </i></p>
                    <p><span>出题方：</span> <i></i></p>
                </div>
            </div>

            <div class="loginBth" @click.prevent="toExamPaper()">
                <button>开始考试</button>
            </div>
            <div class="loginBth loginBthT" @click.prevent="returnPage()">
                <button>还要再准备一下</button>
            </div>
        </div>
    </div>
</template>

<script>

    export default {

    }
</script>

<style lang="less" scoped>
    .matchTask{
        .container{
            .top{
                width: 750px;
                height: 400px;
                background: transparent url("./../../assets/images/gameAssess.png") no-repeat;
                background-size: 100% 100%;
                position: relative;
                margin-bottom: 96px;
                .userIcon{
                    position: absolute;
                    right: 0;
                    left: 0;
                    margin: 0 auto;
                    bottom: -80px;
                    width: 160px;
                    height: 160px;
                }
            }
            .userName{
                text-align: center;
                font-size: 34px;
                padding-top: 8px;
            }
            .content{
                margin-top: 40px;
                padding: 38px 25px;
                background: #fff;
            }
        }
    }
</style>