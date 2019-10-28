<template>
    <div class="newFamilyMembers pageContent">
        <div class="stepContent">
            <div class="stepContentInner">
                <van-steps
                        :active="active"
                        active-icon="success"
                        active-color="#38f"
                >
                    <span slot="active-icon"><i class="icon iconfont iconrenwu"></i></span>
                    <van-step>验证身份</van-step>
                    <van-step>完善信息</van-step>

                </van-steps>
            </div>
        </div>
        <div class="newFamilyContent">
            <verify-id-from v-if="active == 0"></verify-id-from>
            <edit-family-from v-else></edit-family-from>
        </div>
        <div class="btnContent" v-if="active == 0">
            <control-btn :btnActive="true" btnText="下一步" @click.native="goToNextVerify"></control-btn>
        </div>
        <div class="btnContent" v-else>
            <control-btn :btnActive="true" btnText="完成"></control-btn>
            <control-btn :btnActive="false" btnText="取消" class="playerEdit"></control-btn>
        </div>
    </div>
</template>

<script>
    import { Step, Steps } from 'vant';
    import EditFamilyFrom from '../../components/content/editFamilyFrom'
    import VerifyIdFrom from '../../components/content/verifyIdFrom'
    import ControlBtn from "../../components/common/controlBtn";
    export default {
        name: "editFamily",
        data() {
            return {
                active: 0,
            };
        },
        components:{
            VerifyIdFrom,
            [Step.name]:Step,
            [Steps.name]:Steps,
            [EditFamilyFrom.name]:EditFamilyFrom,
            [VerifyIdFrom.name]:VerifyIdFrom,
            [ControlBtn.name]:ControlBtn
        },
        methods:{
            goToNextVerify(){
                this.active=1;
            }
        }
    }
</script>

<style lang="less">
    @import "../../assets/style/mixin";
    .newFamilyMembers{
        .stepContent{
            width: 100%;
            .stepContentInner{
                text-align: left;
                width: 50%;
                .van-steps {
                    overflow: hidden;
                    background-color: @phoneDefaultBgColor;
                    .van-step--horizontal .van-step__title{
                        font-size: 14px;
                    }
                    .van-step--horizontal .van-step__circle-container{
                        background-color: @phoneDefaultBgColor;
                    }
                }
            }
        }
        .btnContent{
            margin-top: 178px;
            .playerEdit{
                margin-top: 24px;
            }
        }
    }

</style>
