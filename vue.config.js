module.exports = {
    // publicPath: '/mobile', // 根域上下文目录
    // outputDir:'mobile', // 构建输出目录
    // assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    devServer: {
        port: 8088 // 此处修改你想要的端口号，

    },
    pages:{
        husky:{
            // 应用入口配置，相当于单页面应用的main.js，必需项
            entry:'src/views/husky/husky.js',
            // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
            template: 'public/star.html',
            // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
            filename: 'star.html',
        },
        // 只有entry属性时，直接用字符串表示模块入口,其他默认与模块名一致
        star:{
            // 应用入口配置，相当于单页面应用的main.js，必需项
            entry:'src/views/star/star.js',
            // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
            template: 'public/index.html',
            // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
            filename: 'index.html',
        }
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
