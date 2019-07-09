# `vue`的`$set`

### 1.`$set("修改的对象",key,val)`

`vue`受到`js`的限制,,`vue`不能监听到对象的删除和增加,所以用`$set("修改的对象",key,val)`来解决这个问题

```html
<div id="app">
    <div >
        {{msg.say}}
        {{msg.name}}
    </div>
</div>
```



```js
new Vue({
    el: "#app",
    data: {
        msg: { say: "哈哈" }
    },
    mounted() {
        // this.msg.name="光头强"
        // console.log(this.msg);
        //打印了msg的对象,并且里面有name="光头强",但是在页面上监听不到对象的删除和增加 
        this.$set(this.msg,"name","光头强")
        //页面就会显示这个增加的属性
    },
    methods: {

    },
})
```

### 2.指令系统

指令系统封装了一些功能,通过`v-xxx`可以在任何位置调用,复用 ,

```html
<div id="app">
    <div v-test="{msg:'拖拽',bg:'blue'}"></div>
    <div v-test="{msg:'拖拽',bg:'yellow'}"></div>
    <div v-test="{msg:'拖拽',bg:'skyblue'}"></div>
    <div v-test="{msg:'拖拽',bg:'pink'}"></div>
</div>
```

#### 1..指令系统的一些值

​	1.`Vue.directive("test",function (el,binding,vnode) { })`

​    2.el代表了当前元素 div

3. `bindind ` 代表传入参数` bindind.value`  拿到`{msg: "拖拽", bg: "blue"}`

​    4.`vnode `拿当前组件的`vnode.context  `拿到`vue`实例也就是this 

​    5.视图调用的时候  `v-xxx`

6. 简单的指令

   ```js
   // 封装了一个简单的指令
   Vue.directive("test", function (el, binding, vnode) {
       el.style.cssText = `width:100px;height:100px;background:${binding.value.bg};position:absolute`;
       var disX = 0,
           disY = 0;
       el.onmousedown = function (e) {
           disX = e.clientX - el.offsetLeft;
           disY = e.clientY - el.offsetTop;
           document.onmousemove = function (e) {
               el.style.left = e.clientX - disX + "px";
               el.style.top = e.clientY - disY + "px";
           }
           el.onmouseup = function () {
               console.log(111);
               el.onmouseup = document.onmousemove = null;
           }
       }
   })
   new Vue({
       el: "#app",
       data: {
           say: "哈哈哈"
       },
       methods: {
           send() {
               console.log("ok")
           }
       },
   })
   ```

   #### 2.指令swiper

   数据渲染到页面是异步,页需要时间,所以要利用异步编程来解决问题,`setTimeout`是属于异步编程,`vnode.context.$nextTick(()=>{})`是等视图数据渲染完之后再执行,解决数据异步过程拿不到的问题

   <font color="green">注意:如果没有用异步操作,就会其中的指令会渲染俩次,一次是没拿到数据之前,一次是拿到数据之后,用v-if="bool",用this.bool=ture异步加载开关,得到更新后的数据,或者是用update中获取数据,也是为更新后的数据</font>,
   
   
   
   ```js
   Vue.directive("swiper", function (el, binding, vnode) {
       let str = ""; 
       binding.value.forEach((item) => {
           str += ` <div class="swiper-slide" v-for="item in imgList"> <img src="${item}" alt=""> </div>`
       })
       let swiperNode = `
   <div class="swiper-container" style="height:160px">
   <div class="swiper-wrapper">
   ${str}
   </div>
   </div>
   `;
       el.innerHTML=swiperNode;
       // 数据渲染到页面是异步,页需要时间,所以要利用异步编程来解决问题,setTimeout是属于异步编程,
       // setTimeout(() => {
       // new Swiper ('.swiper-container', {
       //     autoplay:1000
       // })
       // }, 2000);
       //   vnode.context.$nextTick(()=>{})是等视图数据渲染完之后再执行,解决数据异步过程拿不到的问题
       vnode.context.$nextTick(()=>{
           new Swiper ('.swiper-container', {
               autoplay:1000
           })
       })
   })
   new Vue({
       el: "#app",
       data: {
           imgList: [],
           imgList1:[],
           bool: false
       },
       // 数据初始化,被created 
       //数据渲染,视图数据渲染是属于异步,所以要获取到数据的话,要等同步走完之后才能获取到数据
       mounted() {
           setTimeout(() => {
               this.imgList = ["./img/4.jpg", "./img/5.jpg", "./img/6.jpg"];
               this.imgList1 = ["./img/1.jpg", "./img/2.jpg", "./img/3.jpg"];
               // 异步加载开关
               this.bool= true;
           }, 1000)
       },
    methods: {
       },
})
   ```

   ### 3.指令的生命周期

   `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

   `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
   
   在inserted的状态的时候,虚拟dom形成真正的元素,这样的话就可以直接拿到数据操作了,不用异步处理
   
   `update`：所在组件的 VNode 更新时调用，update是数据更新是才会调用,也是异步,利用update就不需要考虑解决异步的问题,因为本身是被动触发的,就无需异步编程 <font color="green"> update纸打印渲染后的数据,只打印拿到后的数据</font>
   
   