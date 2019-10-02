const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
    publicPath: './',

    outputDir: 'docs',

    assetsDir: 'static',

    filenameHashing: true,

    configureWebpack: config => {

        if(process.env.NODE_ENV === 'production'){
            return{
                plugins: [
                    new CompressionPlugin({
                        test:/\.js$|\.html$|\.css$|\.otf/, //匹配文件名
                        threshold: 10240,//对超过10k的数据压缩
                        deleteOriginalAssets: false //不删除源文件
                    })
                ]
            }
        }

    },

};