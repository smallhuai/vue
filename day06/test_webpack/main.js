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
