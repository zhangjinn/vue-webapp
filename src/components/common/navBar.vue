<template>
    <van-nav-bar>
        <slot name="left"  slot="left"></slot>
        <slot name="right"  slot="right"></slot>
        <slot name="title"  slot="title"></slot>
    </van-nav-bar>
</template>

<script>
    import { NavBar } from 'vant';
    export default {
        name: "NavBar",
        components:{
            [NavBar.name]:NavBar
        }
    }
</script>

<style scoped>

</style>
