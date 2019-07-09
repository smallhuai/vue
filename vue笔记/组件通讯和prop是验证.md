# 组件之间的通讯

### 1.父子之间的传值

```html
 <lay_one :msg="msg" @onefn="onefn"></lay_one>
lay_one 中tmplate绑定的事件
<button @click="onerun">点一点</button>
```

```js
lay_one 的子组件中触发父组件的方法,并且向父组件传入数据
//接收父组件传入的参数
props: ["msg","two"],
methods: {
    onerun() {
/* 第一种父子组件之间的传值
<lay_one :msg="msg" @onefn="onefn"></lay_one> 
this.$emit("onefn",{name:"猪猪猪猪"});
this.obj = res 父组件获取到子lay_two组件中 中传入的数据 */
//第二种传值的方式,利用$.on("事件名",()=>{})
        this.$emit("onefn",{name:"猪猪猪猪"})
    }
},
//父组件中的方法
    methods: {
        onefn(res){
            this.obj=res;
            console.log(this.obj);               
        }  
    },
        components: {
//es6键和值一致的时候,可以用结构解析赋值,只写一个
//lay_one相当于lay_one:lay_one
            lay_one,
        }
```

### 2.利用$on注册事件和$.emit触发事件

```html
<div id="app">
    <--渲染到页面-->
    {{"姓名:"+obj.name+"年龄:"+obj.age}}
    <lay_one></lay_one>
</div>
```

1.在`mouted`初始化周期中$on事件注册

```js
mounted() {
    //组件初始化的时候注册事件
    this.$on("onefn",(res)=>{
        alert("123")
        //把子组件的数据赋值给父组件中的属性,获取到子组件中的数据,并且渲染到页面
        this.obj=res;              
    })
},
    components:{
        lay_one
    }
```

2.在子组件`lay_one`中用`this.$parent.$emit`来触发注册的事件

```js
<button @click="first">测试</button>
methods: {
    first(){
        //利用$emit触发
        this.$parent.$emit("onefn",{name:"sunny",age:18})
    } 
},
```

### 3.$root用于组价传值

$root是全局作用域,一般不推介用来传值,全局作用域$root 要配合$on和$emit一起使用

#### 1.在全局组件中`mouted`中注册全部$root组件

```js
mounted() {
    this.$root.$on("onefn",(res)=>{
        this.say=res;
        alert("怀着剑心来见你")
    })
},
```

2.在子组件中去调用,在任何子组件中都可以调用

```js
methods: {
    first(){
        this.$root.$emit("onefn","淮竹,竹亭水岸")
    }
},
```

### 2.实例化组件之间传值

这个方法是用于父子,兄弟传值都很方便的一种写法,在相互传值的时候,一定要注意,视图中一个要调用组件,否则会没有效果

```js
mounted() {
    // 这个是接收参数,回调函数操作参数
    vm.$on("click", (res) => {
        this.msg = res
    })
},
    
    methods: {
        run() {
            //这个是传参数 $emit
            vm.$emit("click", this.msg)
        }
    },
```

# 属性验证

单类型属性限制,多类型限制,指定默认对象,属性验证,设置条件 如果默认类型设置,就直接可以用props中的属性,不需要在父组件或者子组件中定义,除非要修改

`html`对大小写不敏感,所以属性绑定要,指令,过滤器之类的推介写小写,

```html
<div id="app">
    <!-- 这个是绑定属性 -->
    <one_lay :num="num" :testobj="testobj" :testnum="50" ></one_lay>
</div>
```

```js
//html对大小写不敏感,所以属性绑定要,指令,过滤器之类的推介写小写
new Vue({
    el:"#app",
    data:{
        num:"3",
        testobj:{name:'飞猪',sex:0}
    },
    methods: {

    },
    components:{
        "one_lay":{
            template:`
<div>
{{msg}}
{{testobj.name+testobj.sex}}
</div>
`,
            props:{
                //  1.单类型限制,这里是设置为只能是数值类型 num:Number,

                //2.多类型限制,可以是数值,也可以是字符串类型
                num:[Number,String],
                //msg是默认类型,默认类型是mine
                msg:{
                    type:String,
                    default:"mine"
                },
                //指定默认对象
                testobj:{
                    type:Object,
                    default(){
                        var info={
                            name:"张天",
                            sex:1
                        }
                        return info
                    }
                },
                //属性验证,设置条件
                testnum:{
                    //validator 验证器
                    validator(value){
                        console.log(value);
                        return value<=50
                    }
                }
            }
        }
    }
})
```

# 路由

### 1.路由的配置

```html
首先安装cnpm i vue-router,
```

2.路由的使用

1.在页面中引入`vue-router.js`
2.注册组件  头部  底部 切换部分

```js
const lay_header = {
template: `
    <div>
    我是头部
	</div>
`
};
```

3.设置路由 

注意:<font color="green">其中router和routes都是估计写法,不能写错,router在vue实例中配置option</font>

routes:里面配置要写的组件的路径和组件的名称,在第一步注册的组件,是谁引用就是谁的,底下是引用了名称为info的组件

```js
 const router = new VueRouter({
        routes: [
            {
                path: "/",
                component: info
            },
    })
```

4.设置好路由之后,要在视图中显示,要用`router-view`

```html
<div id="app">
    <!-- 头部开始 头部的信息换成了router-link渲染的a标签,通过a标签会跳转到info news test等页面-->
    <template id="nav">
        <router-link to="/">主页</router-link>
        <router-link to="/news">新闻页</router-link>
        <router-link to="/test">测试页</router-link>
    </template>
    <router-view></router-view>
    <lay_footer></lay_footer>
</div>
```

### 5.子路由的设置

1.在某个需要设置子路由的路由下面设置children:[];数组中写所需要设置路由的路径和组件,其中路径不用加/

```js
{
    path: "/news",
        component: news,
            children: [
                // 子路由底下的路径不用加/在配路径的时候
                { path: "nationnew", component: nationnew },
                { path: "iternationnew", component: iternationnew }
            ]
},
```

2.在父路由所属的组件中,进行子路由的视图渲染和跳转链接

```js
const news = {
    template: `
<div>
<p>我是新闻页</p>
<router-link to="/news/nationnew">国内新闻</router-link>
<router-link to="/news/iternationnew">国际新闻</router-link>
<router-view></router-view>
</div>
`
};
```



