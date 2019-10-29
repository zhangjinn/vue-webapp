// 引入 axios
import axios from 'axios'
import { Toast , Dialog} from 'vant';
// 测试地址
axios.defaults.baseURL = '';
// 默认设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 添加请求拦截器,在请求前做相关操作
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 此处对数据或接口进行处理判定
    //console.log(config);

    // 加载动画
    Toast.loading({
        duration: 0,
        mask: false,
        forbidClick: true,
        message: '加载中...'
    });
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器，对获取到的响应统一处理
axios.interceptors.response.use(res => {
    // 对响应数据做点什么
    // 关闭加载动画
    Toast.clear();
    return res;
}, error => {
    // 对响应错误做点什么
    Toast.clear();
    if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response);
        if (error.response.data.state != 500001) {
         /*   alert(error.response.data.message, {
                icon: "error"
            });*/
            Dialog.alert({
                message: error.response.data.message
            })
        }
    }
    return Promise.reject(error);
});

const http = {
    /** get 请求
     * @param  {接口地址} url
     * @param  {请求参数} params
     */
    get: function(url,params={}){
        return new Promise((resolve,reject) => {
            axios.get(url,{
                params:params
            })
                .then((response) => {
                    resolve( response.data );
                })
                .catch((error) => {
                    reject( error );
                });
        })
    },
    /** post 请求
     * @param  {接口地址} url
     * @param  {请求参数} params
     */
    post: function(url,params={}){
        return new Promise((resolve,reject) => {
            axios.post(url,params)
                .then((response) => {
                    resolve( response.data );
                })
                .catch((error) => {
                    reject( error );
                });
        })
    },
    /**
     * 封装put请求
     * @param url
     * @param data
     * @returns {Promise}
     */
    put: function(url,params={}){
        return new Promise((resolve,reject) => {
            axios.put(url,params)
                .then(response => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject( error );
                });
        })
    },
    /**
     * 封装delete请求
     * @param url
     * @param data
     * @returns {Promise}
     */
    del: function(url,params={}){
        return new Promise((resolve,reject) => {
            axios.delete(url,params)
                .then(response => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject( error );
                });
        })
    }

}

export default http
