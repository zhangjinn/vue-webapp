// 引入 axios
import axios from 'axios'
import { Toast } from 'vant';
import router from "../router/index"

// 测试地址
// axios.defaults.baseURL = '';

let baseURL='';
// 默认设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

/****** 创建axios实例 ******/
/**
 * 但是有时候你需要创建多个实例，比如你需要访问多个服务地址，而这些服务请求和响应的结构都完全不同，那么你可以通过axios.create创建不同的实例来处理。
 * 比如axios1是用http状态码确定响应是否正常，而axios2是服务器自己定义的状态码，又或者他们请求头不同，支持的content-type不同，那么我可以单独为axios1和axios2写拦截器
 */
const axios_1 = axios.create({
    baseURL:baseURL, // api的base_url
    timeout: 5000 // 请求超时时间
});
 axios_1.interceptors.request.use(
config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
},
    error => {
        return Promise.error(error);
    });
// 响应拦截器
axios_1.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    router.replace({
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    // 清除token
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;
                // 404请求不存在
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }
    }
);

var http = {
    /** get 请求
     * @param  {接口地址} url
     * @param  {请求参数} params
     */
    get: function(url,params){
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
    post: function(url,params){
        return new Promise((resolve,reject) => {
            axios.post(url,params)
                .then((response) => {
                    resolve( response.data );
                })
                .catch((error) => {
                    reject( error );
                });
        })
    }
}
export default http
