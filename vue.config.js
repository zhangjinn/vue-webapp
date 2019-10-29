module.exports = {
    // baseUrl: '/', // 根域上下文目录
    outputDir:'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    devServer: {
        // disableHostCheck: true,
        port: 8088, // 此处修改你想要的端口号，
        proxy: { // 配置多个代理

            '/foo': {
                target: 'http://192.168.3.139:8080', // 代理接口--需要请求的地址
                ws: true,
                changeOrigin: true, //开启代理
                pathRewrite: {  //使用/foo 来代替http://192.168.3.139:8080/husky-org-webapp/area/list
                    '^/foo': '/husky-org-webapp/area/list' //代理路径
                }
            },


        },
    },

    lintOnSave: true,
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    blue: '#03a9f4',
                    green: '#3eaf7c',
                    orange: '#FF6600',
                    //'active-color': '#FF6600',
                    // 'hack': `true; @import "http://192.168.2.121:8088/variables.less";`
                }
            },
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue : 32, // 换算的基数
                        propList : ['*'],
                        // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
                        //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
                        selectorBlackList:[ //忽略的选择器   .ig-  表示 .ig- 开头的都不会转换
                            '.ig-','.vux-','.weui-','.mint-','.van-'
                        ]
                    }),
                ]
            },

        }
    },

}
