<template>
  <div id="app">
    <!-- 路由匹配到的组件将渲染在这里 -->
    <div class="wrap" v-if="$route.meta.showTab">
      <div class="container">
        <router-view></router-view>
      </div>
      <div class="bottom">
        <bottom-tab-bar></bottom-tab-bar>
      </div>
    </div>
    <div class="wrap" v-else>
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
  import BottomTabBar from "./components/common/bottomTabBar";
  export default {
    name: 'app',
    components:{
      [BottomTabBar.name]: BottomTabBar,
    },

  }
</script>

<style scoped lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
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
