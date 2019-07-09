# webpack简易版的制作

### 1.配置好相关的loader

### 2.开始制作简易版的webpack

1.在webpack.config.js文件中配置好我们所需要的loader

2.在mian.js中引入所需要的模块,包括自定义模块,js,css,scss,router,componnent(组件)等,并且在里面写好Vue实例

```js
//简版Vue引入的写法
import Vue from "Vue/dist/vue.js";
//lay_head组件注册到new vue实例中的成局部组价
import lay_head from "./components/lay_head.vue";
//引入路由
import router from "./router"
new Vue({
    el:"#app",
    data:{
        msg:"哈哈哈"
    },
    router,
    //注册一个局部组件
    components:{
        lay_head
    }
})
```

3.新建一个component的文件,来装我们所需要的Vue组件,如head.vue

4.在mian.js中引入我们所需要的组件,可以将组件vue实例中将组件注册为局部组件

5.把vue实例中的局部组件引入页面中中

```html
<div id="app">
    <lay_head></lay_head>
</div>
```

6.新那个建一个router文档的模块,里面设置一个index.js,在里面Vue和路由的模块,同时在全局注册路由,

```js
import Vue from "Vue/dist/vue.js";
import VueRouter from "vue-router";
//注册全局
Vue.use(VueRouter)
```



(1)先引入组件的路径,

```js
// 先引入组价的路径
import info from "../components/info.vue";
import news from "../components/news.vue";
import test from "../components/test.vue";
```



(2)配置路由,

```js
//配置路由 
var routes=[
    {
        path:"/",
        component:info
    },
    {
        path:"/news",
        component:news
    },
    {
        path:"/test",
        component:test
    }
]
```



(3)创建路由实例

```js
//创建路由实例
export default new VueRouter({
    routes
})
```

