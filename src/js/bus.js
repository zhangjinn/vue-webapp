import Vue from 'vue'

/**
 * 定义空的vue实例，作为 bus实现非父子组件之间的通信(vue2.x中去掉了broadcast)
 */
var bus = new Vue({});
export default bus;