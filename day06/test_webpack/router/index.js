import Vue from "Vue/dist/vue.js";
import VueRouter from "vue-router";
//注册全局
Vue.use(VueRouter)
// 先引入组价的路径
import info from "../components/info.vue";
import news from "../components/news.vue";
import test from "../components/test.vue";
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
//创建路由实例
export default new VueRouter({
    routes
})