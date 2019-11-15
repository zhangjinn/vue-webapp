<template>
    <div class="guidePage">
        <div v-if="isFirst" class="firstStep">
            <img src="../../assets/images/guideOne.png"/>
            <div class="button" @click="next()"></div>
        </div>
        <div v-if="isSecond" class="secondStep">
            <img src="../../assets/images/guideTwo.gif"/>
            <div class="button" @click="begin()"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isFirst: true,
                isSecond: false,
            }
        },
        created() {

        },
        methods: {
            next() {
                this.isFirst = false;
                this.isSecond = true;
            },
            begin() {
                this.$emit('begin');
            }

        }
    }
</script>

<style lang="less">
    @import "../../assets/style/mixin";

    .guidePage {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: #000;
        opacity: 0.6;
        z-index: 9999;

        .firstStep {
            position: absolute;
            left: 0;
            bottom: 30px;
            width: 100%;

            img {
                width: 100%;
            }

            .button {
                position: absolute;
                bottom: 20px;
                left: 240px;
                width: 260px;
                height: 120px;
            }
        }

        .secondStep {
            position: absolute;
            left: 0;
            right: 0;
            top: 500px;
            margin: 0 auto;
            width: 70%;

            img {
                width: 100%;
            }

            .button {
                position: absolute;
                bottom: 20px;
                left: 120px;
                width: 260px;
                height: 120px;
            }
        }
    }
</style>