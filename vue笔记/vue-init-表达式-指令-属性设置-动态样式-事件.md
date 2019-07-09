# vue

### 1.vue的优缺点

#### 1.优点

1.轻量级框架

2.双向数据绑定(mvvm) m是model v是view 可视化 vm 是v和m之间沟通的桥梁

3.指令系统

4.组件化

#### 2.缺点

兼容性问题,不支持ie9以下版本

### 2.vue的初始化

```html
<div id="app">
    {{"哈哈"+msg}} 
</div>
```

```js
new Vue({
    el:"#app",
    data:{//msg是变量, data是model层
        msg:"hellow word",
    }
})
```

### 3.vue的表达式

{{msg}}是vue中表达式
1.表达式中要注意数据类型
2.表达式可以使用运算符合逻辑运算符

```html
<div id="app">
    <!-- {{}}这个是表达式 其中msg是变量 -->
    {{msg}}
    <!-- hellow world -->
    {{111+1+msg}}
    <!-- 112hellow world -->
    <hr>
    {{bool?"你是最亮的崽崽":"你是猪"}}
    <!-- 你是最亮的崽崽 -->
    <hr>
    {{"最亮的崽崽".indexOf("崽崽")}}
    <!-- 3 返回下标-->
    <hr>
    {{[1,2,4,5].splice(0,2)}}
    <!-- [1,2] 删除返回被的值-->
    <hr>
    {{"你是最亮的崽崽".indexOf("哈哈")!=-1?"最亮的崽":"最宠的猪"}}
    <!-- false 所以是 最宠的猪-->
    <!-- 注意vue中的表达式中不要写过多的逻辑 -->
</div>
```

```js
// {{msg}}是vue中表达式
//表达式中要注意数据类型
//表达式可以使用运算符合逻辑运算符
new Vue({
    el:"#app",
    data:{//这个是model
        msg:"hellow world",
        bool:true
    }
})
```

### 3.内置指令

以下指令的vue的代码

```js
new Vue({
    el:"#app",
    data:{
        msg:"hellow word",
        temp:"<h1>哈哈</h1>",
        text:"下雨" 
    }
})
```

### 1.v-text=" ";

```html
<!-- 相当于jquery.text() -->
<h1 v-text="msg"></h1>
<!-- hellow word -->
```

### 2.v-html="  ";

```html
<!-- 相当于jquery中.html() -->
<h1 v-html="temp"></h1>
<!-- 哈哈-->
 <!-- v-html="temp"双引号之间也要注意数据类型 -->
```

### 3.v-show=" " 和v-if=" ";

#### (1)俩者的区别

```

1.v-show="布尔值" true显示,false是隐藏 这个是的隐藏是给元素添加了一个dispaly:none,频繁操作的适用这个,如tab切换 
2.v-if="布尔值",true表示显示,false表示隐藏,但是这个的隐藏是删除了元素,适合用于数据的一次性渲染 
```



```html
<div v-show="false" style="width: 200px;height:200px;background:cadetblue"></div>
<div v-if="true" style="width: 200px;height:200px;background:blue"></div>
```

### 4.v-if 和v-else-if和v-else

 v-if的组合必须连在一起使用 

```html
<div v-if="text=='下雨'">带伞呀</div>
<div v-else-if="text=='天晴'">带太阳伞呀</div>
<div v-else>爱咋滴咋地</div>
//其中text是从data中传入的数据
```

### 5.属性的绑定

属性的绑定 v-bind:  简写是:

```js
new Vue({
    el:"#app",
    data:{
        url:"http://www.baidu.com"
    }
})
```



```html
<div id="app">
    <!-- 属性的绑定 v-bind:  简写是: -->
    <a v-bind:href="url" :title="'跳转百度'">百度</a>
    <!-- false可以点击,true不可以点击 -->
    <button :disabled="false">点击</button>
    <button :disabled="true">不点击</button>
</div>
```

### 6.事件绑定

#### 1.v-on:事件名字(如.v-on:click)简写是@事件名字(如@click)

```js
// 自定义键位
Vue.config.keyCodes.q=81;
new Vue({
    el:"#app",
    data:{
        url:"http://www.baidu.com",
    },
    methods: {
        show1(e){
            console.log(e)               
        },
        show2(msg,e){
            console.log(e);
            console.log(msg);     
        },
        test1(){
            alert("test1")
        },
        test2(){
            alert("test2")
        },
        keyTest(e){
            console.log(e.keyCode); 
        }
    },
})
```

```html
<div id="app">
    <a :href="url" :title="'跳转百度'">百度</a>
    <button v-on:click="show1">点击1</button>
    <!-- show2('哈哈',$event)" 这个里面表示传入实参 -->
    <button @click="show2('哈哈',$event)">点击2</button>
    <hr>
    <!-- 键盘事件 -->
    <input type="text" @keydown="keyTest">
    <!-- 就只能按q键才会有打印 -->
    <input type="text" @keydown.q="keyTest">
</div>
```

### 2.阻止默认行为和阻止冒泡的写法

@click.stop是阻止冒泡 冒泡是从内往外,所以只会触发test2的弹框 

 @click..prevent   阻止默认事件

 @click..prevent.stop 是既阻止冒泡,又阻止默认行为

```html
<div @click="test1">
    <!-- @click.stop是阻止冒泡 冒泡是从内往外,所以只会触发test2的弹框 -->
    <div @click.stop="test2">点我</div>
</div>
<form action="" @click="test1">
    <input type="text">
    <!-- 阻止默认事件  @click..prevent   @click..prevent.stop 是既阻止冒泡,又阻止默认行为-->
    <button @click..prevent.stop="test2">点一下</button>
</form>
```

### 7. v-for

1.v-for="(item,index) in list" item是取得数组list中的一个对象,item.name,就是取得对象中的值,index就是list数数组里面元素的下标 

2.遍历list中每个对象中的数组的值

3.v-for遍历对象 可以取得对象的键和值以及下标 

```html
<div id="app">
    <ul>
        <!--v-for="(item,index) in list" item是取得数组list中的一个对象,item.name,就是取得对象中的值,index就是list数数组里面元素的下标  -->
        <li v-for="(item,index) in list">
            {{index+item.name}}
            <ul>
                <!-- 遍历list中每个对象中的数组的值 -->
                <li v-for="(num in item.arr">
                    {{num}}
                </li>
            </ul>
        </li>
    </ul>
    <!-- v-for遍历对象 可以取得对象的键和值以及下标 -->
    <div v-for="(val,key,index) in info">
        {{val+key+index}}
    </div>
    <ul>
        <li v-for="item in testList">
            {{item.name}}
        </li>
    </ul>
</div>
```

```js
new Vue({
    el: "#app",
    data: {
        list: [
            { name: "小一", arr: [1, 2, 3, 4, 56, 7] },
            { name: "小二", arr: [1, 2, 3, 4, 56, 7] },
            { name: "小三", arr: [1, 2, 3, 4, 56, 7] }
        ],
        info: {
            name: "唐僧",
            sex: 1,
            say: "爱取经"
        },
        testList: []
    },
    mounted() {
        setTimeout(() => {
            // this是new Vue的  所以就是this.testList,就是data中testList: []
            this.testList = [
                { name: "猪猪侠" },
                { name: "村长" },
                { name: "棒棒糖" }
            ]
        }, 2000)
    },
    // 这个里面是定义方法的
    methods: {
        test(index){//controller js逻辑部分
            alert(this.list[index].name)
        },
        test2(item){
            console.log(item);   
        }
    },
})
```

### 8.动态样式

```html
 <!-- 传入数组[已有class类名] 注意数据类型 -->
        <div :class="classList">猪猪</div>
        <!-- 类名:布尔值,类名:布尔值 -->
        <div :class="{box1:true,col:false}" >侠客</div>
        <div :style="setStyle">村长</div>
        <!-- 事件绑定是用在methods上 -->

        <button @click="myStyle">set</button>
```

```js
new Vue({
    el:"#app",
    data:{
        classList:["box1","col"],
        bool1:true,
        bool2:false,
        setStyle:{
            height:"100px",
            width:"100px",
            background:"pink"
        }
    },
    methods: {
        myStyle(){
            //this是new Vue指向,也就是new Vue中data的setStyle.background
            this.setStyle.background="yellow";
        }
    },
})
```

### 9.tab栏切换

```html
<div id="app">
    <ul>
        <li v-for="(item,index) in list" >
            <button @click="setClo(index)" :class="{bg:active==index}">{{item}}</button>
            <!-- bg:active==index  此处的active==index是代表布尔类型,true或者false -->
        </li>
        <!-- active==0 是代表true的时候是显示,代表false的时候隐藏 -->
        <div v-show="active==0">num1</div>
        <div v-show="active==1">num2</div>
        <div v-show="active==2">num3</div>         
    </ul>
</div>
```

```js
new Vue({
    el:"#app",
    data:{
        list:["num1","num2","num3"],
        active:0
    },
    methods:{
        setClo(index){
            this.active=index;
            console.log(this.active)               
        }
    }
})
```

### 10.v-model

#### 1.1.购物车价格的计算

```html
<div id="app">
    <h1>{{name}}</h1>
    数量: <input type="number" v-model="num">
    <hr>
    价格:{{num*price}}
</div>
```

```js
new Vue({
    el:"#app",
    data:{
        name:"苹果",
        price:6,
        num:0,
        testStr:""
    },
    methods: {

    },
})
```

#### 2.2.v-model.lazy

修饰符号 在指令后面打.  lazy失焦显示

```html
<div id="app">
    <!-- 修饰符号 在指令后面打. -->
    <!-- lazy失焦显示 -->
    <input type="text" v-model.lazy="str1">{{str1}}
</div>
```

```js
new Vue({
    el:"#app",
    data: {
        str1:"",
        str2:""
    },
})
```

#### 3.v-model.number强制转化成number类型

```html
<input type="text" v-model.number="str2">{{typeof str2}}
```

#### 4.v-model.trim 去掉左右空白

```html
<input type="text" v-model.trim="str3">左{{str3}}右
```

#### 5.v-model的单元框和多选框的应用

1.单选框

```html
<input type="radio" value="男" v-model="sex">
<input type="radio" value="女" v-model="sex">{{sex}}
```

2.复选框

```html
<!-- 显示一个数组,可以动态的判断长度 在data对象中色泽一个中设置一个值nameList的数组-->
<input type="checkbox" value="小何" v-model="nameList">
<input type="checkbox" value="小王" v-model="nameList">  <input type="checkbox" value="小李" v-model="nameList">{{nameList}}
```

### 12购物车的加加减和总价

```html
<div id="app">
    <ul>
        <li v-for="(item,index) in goodList" style="list-style: none">
            <h2>{{item.name+":价格"+item.price}}</h2>
            <button @click="add(index)">+</button>{{item.num}} <button @click="sub(index)">-</button>
            小计:{{item.num*item.price}}
        </li>
    </ul>
    <p>合计:{{allPrice}}</p>
</div>
```

```js
new Vue({
    el: "#app",
    data: {
        goodList: [
            {
                name: "苹果",
                price: 6,
                num: 0
            },
            {
                name: "西瓜",
                price: 3,
                num: 0
            },
            {
                name: "哈密瓜",
                price: 8,
                num: 0
            }
        ],
        allPrice: 0
    },
    methods: {
        add(index) {
            this.goodList[index].num++;
            this.totalPrice();
        },
        sub(index) {
            this.goodList[index].num--;
            // 当数量为为0的时候,就不能再往下减了
            if (this.goodList[index].num<=0) {
                this.goodList[index].num=0;
            }
            // 注意这里要记得加this
            this.totalPrice();
        },
        totalPrice() {
            var allprice = 0;
            this.goodList.map((item, index) => {
                allprice += item.num * item.price
            })
            this.allPrice = allprice;
        }
    }
})
```

