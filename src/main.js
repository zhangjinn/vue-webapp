import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import "./config/rem";
import './assets/style/main.less';
import http from './service/http';
import './assets/font/iconfont.css';

import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'


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

//  设置时间格式
	Date.prototype.format = function(fmt)
	{
	
	    var o = {
	        "M+" : this.getMonth()+1,                 //月份
	        "d+" : this.getDate(),                    //日
	        "h+" : this.getHours(),                   //小时
	        "m+" : this.getMinutes(),                 //分
	        "s+" : this.getSeconds(),                 //秒
	        "q+" : Math.floor((this.getMonth()+3)/3), //季度
	        "S"  : this.getMilliseconds()             //毫秒
	    };
	    if(/(y+)/.test(fmt))
	        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	    for(var k in o)
	        if(new RegExp("("+ k +")").test(fmt))
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	    return fmt;
	}
	
	





