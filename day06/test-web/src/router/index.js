import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
Vue.use(Router)
const routers = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/components/home'], resolve),
      //redirect:"info",
      children: [
        {
          path: "info",
          name: "info",
          component: resolve => require(['@/components/main/info'], resolve)
        },
        {
          path: "news",
          name: "news",
          component: resolve => require(['@/components/main/news'], resolve),
          children: [
            { name: "nation", path: "nation", component: resolve => require(['@/components/main/nation'], resolve) },
            { name: "internation", path: "internation", component: resolve => require(['@/components/main/internation'], resolve) }
          ]
        },
        {
          path: "test",
          name: "test",
          component: resolve => require(['@/components/main/test'], resolve)
        },
      ],

    }
  ]
})
console.log(routers);

// routers.beforeEach((to, from, next) => {
//   //to是从到哪里去,from是从哪里来,next()是进入下一个路由
//   if (to.path == "/") {
//     // 通过参数匹配路径,注意在通过参数跳转的时候,要记得把重定向注释,通过location中的search是自己定义的参数名字,通过找到相关的参数来进行跳转
//     if (location.search.indexOf("newyear") != -1) {
//       next({ path: "/news" })
//     }else if(location.search.indexOf("yuandan")!=-1){
//       next({ path: "/test" })
//     }else if(location.search.indexOf("dangwu")!=-1){
//       next("/info")
//     }else{
//       next();
//     }
//   }
//    next();
// })
// routers.afterEach((to,from)=>{
//   console.log("ok");
// })
export default routers;