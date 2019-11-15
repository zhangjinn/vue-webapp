<template>
    <div class="BottomTabBar">
        <van-tabbar
                v-model="active"
                active-color="#90D0DA"
        >
            <van-tabbar-item
                    v-for="(item,index) in tabbars"
                    :key="index"
                    replace
                    :to="item.path"
            >
                <span> {{item.title}}</span>
                <span slot="icon" :class="item.iconfont"></span>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>

    import {Tabbar, TabbarItem, Icon} from 'vant';

    export default {
        name: "bottomTabBar",
        data() {
            return {
                active: 0,//当前选中标签，默认第三个选中
                tabbars: [
                    {
                        name: 'index',
                        path: '/index',
                        title: '测评',
                        iconfont: 'icon iconfont iconshouye',
                    },
                    {
                        name: 'mine',
                        path: '/mine',
                        title: '我的',
                        iconfont: 'icon iconfont iconwode',
                    },
                ]
            }
        },
        components: {
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
            [Icon.name]: Icon
        },
        watch: {
            '$route': 'getPath'
        },
        created() {
            this.getPath(this.$route);
        },
        methods: {
            getPath(route) {
                if (route.meta.fActive >= 0) {
                    var tab = route.meta.fActive;
                    this.active = tab;
                }
            }

        }
    }
</script>

<style lang="less">
    .BottomTabBar {
        .iconfont {
            font-size: 48px;
        }
    }
</style>
