import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component:resolve => require(['@/components/HelloWorld'], resolve),
      redirect:"info",
      children:[
        {
          path:"info",
          name:"info",
          component:resolve=>require(['@/components/main/info'],resolve)
        },
        {
          path:"news",
          name:"news",
          component:resolve=>require(['@/components/main/news'],resolve)
        },
        {
          path:"test",
          name:"test",
          component:resolve=>require(['@/components/main/test'],resolve)
        }
      ]
    },
    {
      path: '/users',
      name: 'HelloWorld',
      component:resolve => require(['@/components/HelloWorld'], resolve),
      redirect:"info",
      children:[
        {
          path:"info",
          name:"info",
          component:resolve=>require(['@/components/main/info'],resolve)
        },
        {
          path:"news",
          name:"news",
          component:resolve=>require(['@/components/main/news'],resolve)
        },
        {
          path:"test",
          name:"test",
          component:resolve=>require(['@/components/main/test'],resolve)
        }
      ]
    }
  ]
})
