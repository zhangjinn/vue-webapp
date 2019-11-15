<template>
    <div class="playerEdit pageContent" v-wechat-title="this.navTitle">
        该组别或赛区无对应赛事
        <div class="fixed">
            <div class="btn">
                <control-btn :btnActive="true" btnText="前往修改选手地区或组别" class="submitBtn"
                             @click.native.prevent="out()"></control-btn>
            </div>
        </div>
    </div>

</template>

<script>
    import ControlBtn from "../../../../components/common/controlBtn";
    import {getStoreStudent, getStudentIndex} from "../../../../js/user";

    export default {
        name: "noGame",
        data() {
            return {
                navTitle: '赛事',
                studentId: '',
                studentIndex: ''
            }
        },
        components: {
            [ControlBtn.name]: ControlBtn,
        },
        created() {
            let student = getStoreStudent();
            this.studentId = student.identifier;
            this.studentIndex = getStudentIndex();
        },
        methods: {
            out() {
                if (this.studentIndex) {
                    this.$router.push({
                        path: "/editPlayer",
                        query: {
                            type: 'evpi'
                        }
                    })
                } else {
                    this.$router.push({
                        path: "/editPlayer",
                        query: {
                            type: 'game',
                            student: this.studentId
                        }
                    })
                }
            }
        }

    }
</script>

<style lang="less">
    @import "../../../../assets/style/mixin";

    .fixed {
        .wh(100%, 120px);

        .btn {
            position: fixed;
            bottom: 0;
            left: 0;
            padding: 24px 0;
            width: 100%;
            background: #fff;

            .controlBtnActiveColor {
                background: #90D0DA;
            }
        }
    }
</style>
