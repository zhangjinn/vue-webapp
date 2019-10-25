// 引入 axios
import axios from 'axios'

// 测试地址
axios.defaults.baseURL = '';
// 默认设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//响应拦截器
axios.interceptors.response.use(res => {
    // 对响应数据做点什么
    return res;
}, error => {
    // 对响应错误做点什么
    if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response);
        if (error.response.data.state != 500001) {
            alert(error.response.data.message, {
                icon: "error"
            });
        }
    }
    // loading_close();
    return Promise.reject(error);
});

var http = {
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
