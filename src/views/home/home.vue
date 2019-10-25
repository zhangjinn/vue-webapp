<template>
    <div class="wrap">
        <div class="container">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
        <div class="bottom" >
            <bottom-tab-bar></bottom-tab-bar>
        </div>
    </div>
</template>

<script>
    import BottomTabBar from "../../components/common/bottomTabBar";
    export default {
        name: 'home',
        components:{
            [BottomTabBar.name]: BottomTabBar,

        },
        methods:{

        }
    }
</script>

<style scoped>
    .wrap{
        width:100%;
    }
    .container{
        position:absolute;
        z-index:1;
        top:0;
        left:0;
        bottom:100px;
        width:100%;
        overflow: scroll
    }
</style>
