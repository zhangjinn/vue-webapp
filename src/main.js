import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import "./config/rem";
import './assets/style/main.less';
import http from './service/http';
import './assets/font/iconfont.css';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';


Vue.prototype.$http = http;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// 设置浏览器标题
Vue.directive('title', {
  inserted: function (el) {
    document.title = el.dataset.title
  }
})









