module.exports={
    //入口文件
    entry:"./main.js",
    // 出口文件
    output:{
        path:__dirname+"/bundle",
        filename:"bundle.js"
    },
    //配置我们的loader
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                     {loader:"style-loader"},
                     {loader:"css-loader"}  
        
                ]
            },
            {

                test: /\.scss$/,
                use:[
                     {loader:"style-loader"},
                     {loader:"css-loader"},
                     {loader: "sass-loader"}  
        
                ]
        
            },
            { test: /\.js$/, loader: "babel-loader" },
            {

                test: /\.vue$/,

                use: [{

                    loader: 'vue-loader',

                    options: {

                        loaders: {

                            js: 'babel-loader?{"presets":["es2015"],"plugins": ["transform-object-rest-spread"]}',

                            css: 'vue-style-loader!css-loader'

                        }

                    }

                }],

            }
        ]
    
    }

}