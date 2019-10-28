<template>
  <div>
    <van-button type="default" @click="gotoItem">登录页</van-button>
  </div>
</template>

<script>
  import { Button } from 'vant';

  export default {
    name: 'login',
    components:{
      [Button.name]: Button
    },
    methods:{
      gotoItem(){
        this.$router.push({ path: '/home'})
      }
    },
  }
</script>

<style scoped>

</style>
