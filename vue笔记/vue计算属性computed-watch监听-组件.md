# 数据渲染的时候

1.在数据初始化`created`的时候,在`mouted`中渲染完毕了,所以不管视图有没有用到,都可以打印`ok`

2.如果修改的数据,在视图中没有用到,就不会更新,打印什么都没有,如果在视图中用到了`msg`,就会打印`ok`,   

```html
<div id="app">
    <div>
        {{msg}}
    </div>
</div>
```

```js
new Vue({
    el:"#app",
    data:{
        msg:""
    },
    created() {
        console.log("0k"); 
        //在数据初始化的时候,在mouted中渲染完毕了,所以不管视图有没有用到,都可以打印ok   
    },
    mounted() {
        this.msg="hahah";    
    },
    updated() {           
        console.log("0k");//如果修改的数据,在视图中没有用到,就不会更新,打印什么都没有,如果在视图中用到了msg,就会打印ok,   
    },
    methods: {

    },
})
```

# 2.computed属性计算

### 1 .应用场景

(1)属性计算:一般`Vue`中里面的属性计算,都推介写在`computed`中;

(2)在应用的时候,就直接将函数当前变量一样的使用,

(3)修改一个无关的值,不会触发computed中的函数执行,因为computed读取的是缓存,

(4)是当data中`num`的变化,computed中用了这个可以的变量,所以`totalPrice`会跟着变化 多个数据影响一个数据

```html
<div id="app">
    <div>
        <h1>{{name+":价格"+price}}</h1>
        数量:
        <button @click="sub">-</button>
        <span>{{num}}</span>
        <button @click="add">+</button>
        <!-- 这个是computed属性计算中的函数totalPrice,在应用的时候,就直接将函数当前变量一样的使用,修改一个无关的值,不会触发computed中的函数执行,因为computed读取的是缓存,是当data中num的变化,computed中用了这个可以的变量,所以totalPrice会跟着变化 多个数据影响一个数据-->
        <span>总价:{{totalPrice}}</span>
        <!-- 测试test的时候,不会让computed的函数执行 -->
        <button @click="test">test</button>
    </div>
</div>
```

```js
new Vue({
    el: "#app",
    data: {
        name: "苹果",
        price: 8,
        num: 0,
        allPice: 0
    },
    computed: {
        //computed的计算
        totalPrice() {
            let allPice = this.price * this.num;
            console.log("ok");
            return allPice;
        }
    },
    mounted() {

    },
    methods: {
        add() {
            this.num++;
        },
        sub() {
            this.num--;
        },
        test() {
            this.name = "西瓜"
        }
    },
})
```

# 3.watch监听

watch初始化的时候,不会被执行,监听是监听传递类型的值,或者引用类型的值的变化,一般是用来监听异步,watch是一个数据,影响多个,直接通过监听变量名现实监听

### 1.监听传递类型和引用类型的值

```js
data: {
    msg: "光头强",//传递类型的值
    info: {}  //应用类型的值
},
```

### 2.监听的语法

1.监听变量名

2. `msg(newVal,old) {})` 的`newVal,old` 是形参,表示获得修改后的值,和之前的值
3. 引用类型的值,由于受到`js`的限制,`vue`不能监听到对象的删除和增加,所以要使用$.set("对象名称","key","value")来解决
4. 一般监听用来监听异步

```js
mounted() {
    setTimeout(() => {
        this.$set(this.info, "name", "蝌蚪");
    }, 1000);
},
    watch: {
        //要监听的变量名
        msg(newVal,old) {
            console.log("msg发生了改变");
         //newVal,old 是形参,表示获得修改后的值,和之 前的值
            console.log(newVal,old);
        },
            // 引用类型监听的固定写法
            info:{
                handler(newVal,old){
                    console.log("info发生了改变");
                    console.log(newVal);
                },
                    // 深监听
                    deep:true                  
            }
```

# 动画

### 1.单节点动画

使用 animate  动画库 要加 类 animated

单节点动画,节点名称都是固定的写法,属性传入了一个css3的动画名 `bounceOut`都是直接从animate动画库取的名字,动画类型

```html
<transition enter-active-class="bounceOut" leave-active-class="fadeOutDown">
    <!-- 使用 animate  动画库 要加 类 animated  --> 
    <!-- 单节点动画,节点名称都是固定的写法,属性传入了一个css3的动画名 -->
    <div v-show="bool" class="box animated"></div> 
</transition>
<button @click="bool=!bool">set</button>
```

```js
new Vue({
    el:"#app",
    data:{
        bool:true
    }
})
```

### 2.多节点动画

多节点动画用transition-group 节点位置要加key,以便区分节点

```html
 <div id="app">
            <!-- 多节点动画用transition-group 节点位置要加key,以便区分节点 -->
        <transition-group enter-active-class="bounceOut" leave-active-class="fadeOutDown">
            
            <div v-show="bool" class="box animated" :key="1"></div>   
            <div v-show="bool" class="box animated" :key="2"></div>  
        </transition-group>
        <button @click="bool=!bool">set</button>
    </div>
```

### 3.模糊查询的动画效果

多节点动画用transition-group 节点位置要加key,以便区分节点 

```html
<div id="app">
    <!-- 多节点动画用transition-group 节点位置要加key,以便区分节点 注意:transition中下的元素要被锁定-->
    <input type="text" v-model="name">
    <transition-group enter-active-class="bounceOut" leave-active-class="fadeOutDown">
        <li class="animated" v-for="(item,index) in List" :key="index">
            {{item}}
        </li>
    </transition-group>
```

```js
new Vue({
    el: "#app",
    data: {
        nameList: ["周瑜", "曹操", "江河", "项羽", "虞姬", "周后"],
        bool: true,
        name: "",
    },
    //属性计算都用computed
    computed: {
        List() {
            let arr = [];
            this.nameList.map((item) => {
                // 注意一个值indexof("")=0;只要是indexOf("")值就是一个0;
                if (item.indexOf(this.name) != -1) {
                    arr.push(item)
                }
            })
            console.log(arr);

            return arr;

        }
    },
})
```

# 组件

# 1.组件的分类

### 1.1组件分为全局组价和局部组件,有父组价和子组件

组件有独立的`css`独立租用域,`js`独立命名空间,全局组件(可以在任何子组件里面使用而不需要引入)

### 1.2组件的构成部分

```js
Vue.component("lay_head(组件名)", {
     template:``,//组件中形成页面结构的元素,使用es6的字符串模板
     data() {return { msg: "哈哈"  }})//组件中的data是一个函数,必须用return来返出一个对象

```



# 组件之间的传参

### 1.子组件调用父组件的属性和方法

#### (1)传参的过程

##### 1.1.定义一个子组件`lay_test`

```js
这是一个局部的组件:components:{"lay_test":{}}
```

##### 1.2.在lay_test构造好页面`html`的结构,利用template 利用es6的字符串模板拼接

```js
template: `
<div>
<h1 style="color:pink">{{msg}}</h1>
<button  @click="run">test</button>
</div>        
`
```

##### 1.3.调用父组件中的属性和方法,父组价向子组件传参数 调用组件`lay_test` 子组件lay_test中定义属性`:msg(:后面的msg也是可以随意去名字)`去接收父组件中的`msg`的属性和定义`@ceshi(@后面是任何取名)`的事件绑定的方法来接收父组件`test`的方法来接收父组件的属性和方法,`msg`属性和test方法,

```html
<lay_test :msg="msg" @ceshi="test"></lay_test>
```

##### 1.4.父组件传入了参数和方法之后,子组件要去接收,接收的方法如下

```js
  props:["msg","@ceshi"] //其中接收的属性和方法,是在页面上写接收父节点定义的属性和方法,要一致
```

##### 1.5.接收好了之后,属性可以直接是使用了,但是方法还需要用在子组件绑定事件的方法上去驱动父组件的方法的执行

```js
 this.$emit("ceshi",{name:"猪猪侠"})  //触发和驱动的意思
```

##### 1.6.触发之后,父组件就可以用了,父组件用res去接收,子组件触发时所要产生的数据

```js
test(res) {  
    alert("天下")          
    console.log(res);               
}
```



 