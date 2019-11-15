<template>
    <div id="star">
        <!-- 路由匹配到的组件将渲染在这里 -->
        <div class="wrap" v-if="$route.meta.showTab">
            <div class="container">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
            <div class="bottom">
                <bottom-tab-bar></bottom-tab-bar>
            </div>
        </div>
        <div class="wrap" v-else>
            <div class="taskAssess" v-if="this.$route.meta.title == '测评' || this.$route.meta.title == '提示'">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </div>
            <div v-else>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import BottomTabBar from "./../../components/common/starBottomTabBar";

    export default {
        name: 'star',
        components: {
            [BottomTabBar.name]: BottomTabBar,
        },

    }
</script>
<style scoped lang="less">
    #star {
        /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
        font-family: PingFang SC;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .wrap {
        width: 100%;
    }

    .container {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        bottom: 100px;
        width: 100%;
        overflow: scroll
    }
</style>
