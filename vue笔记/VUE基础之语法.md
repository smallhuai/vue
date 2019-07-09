### 声明式渲染

```js
命令式渲染 ： 命令我们的程序去做什么，程序就会跟着你的命令去一步一步执行
```

```js
声明式渲染 ： 我们只需要告诉程序我们想要什么效果，其他的交给程序来做。
声明式渲染,其实就是在页面添加内容 
Vue.js 的核心是一个允许采用简洁的`模板语法`来`声明式`地将`数据渲染`进 `DOM系统`
```

### 引入VUE

```html
<script src="../js/VUE.min.js"></script>
当我们引入了VUE之后,在控制台打印window会发现:
window挂载了一个对象Vue,类似于jQuery挂载了jQuery和$对象.
```

### 基本的数据渲染

```html
<div id="app">
    {{msg}} //渲染的模板,固定语法{{}}
</div>
<script>
    new Vue({
            el:"#app",
            data:{
                msg:"hello world"
            }
        })
</script>
```

```js
1.html:
  渲染模板,{{}},固定语法
2.js:
 `new Vue()`实例化对象,Vue首字母大写.一个页面可以new多个Vue()对象,但             不推荐
 `el`:固定写法,el限定了vue数据解析范围,类似选择器
 `data`:渲染的数据,data里的msg,和html模板{{msg}}要对应.
```

---

---

---

### html模板{{}}

```js
js定义Vue数据:
  new Vue({
      el:"#app",
      data:{
          msg:"hello,world",
          booeal: true
      }
  })
```

```html
html模板的用法:
<div id = "app">
    {{msg}} //渲染msg即"hello,world"
    
    {{100 + 200}} //渲染到页面为300
    
    {{msg.indexOf("w")}} //求字符串的下标
    
    {{booleal ? msg : "你好"}} //三目运算,渲染msg即"hello,world"
    
    {{[1,2,3,4].splice(0,1)}} //数组,渲染为字符串[1](splice方法返     回的时删除元素组成的数组)
    
</div>
```

```js
总结:
	模板里面可以写简单的逻辑:包括简单的运算符`+-*/`及`三目运算符`,
    也可以写数组的一方法.
    结合data里面的变量来进行数据的操作和渲染
注意:别在模板里面写大量的,复杂的逻辑.
```

---

---

---

### 内置指令

```js
//定义一个Vue对象
new Vue({
    el:"#app" //解析范围,类似选择器
    data:{
    	msg:"hello world",
    	temp:"<h1>哈哈</h1>",
    	txt:"下雨"
   }
})
```

#### v-text

```js
根据上面的Vue对象渲染模板,方法:`v-text`
```

```html
<div id="app">
    <span v-text = "msg"></span> //渲染上面的msg即"hello world"
</div>
```

#### v-html

```js
根据上面的Vue对象渲染模板,方法:`v-html`
```

```html
<div id="app">
    <span v-html = "temp"></span>
    //渲染上面的temp即"<h1>哈哈</h1>",渲染为h1标题的哈哈
</div>
```

#### v-show

```js
v-show指令,使用方法为在标签内写`v-show=booeal`
    当boolea为`true`时,元素`显示`,
    当=后面的布尔值为`false`时元素`隐藏`,
    内部调用的css方法时`display:none`
```

```html
<div v-show="false" style="width:100px;height:100px"></div>
//当v-show=false时元素隐藏,css为display:none
```

#### v-if

```js
v-if指令,使用方法为在标签内写`v-if=booeal`
    当boolea为`true`时,元素`显示`,
    当=后面的布尔值为`false`时元素`隐藏`,
        注意:undefined,0,null,"",false都为false.
注意:v-if是`直接删除`了元素的结构
```

组合v-else-if 和v-else

```js
//定义一个Vue对象
new Vue({
    el:"#app" //解析范围,类似选择器
    data:{
    	msg:"hello world",
    	temp:"<h1>哈哈</h1>",
    	txt:"下雨"
   }
})
```

```html
<div v-if="txt=='下雨'">带上伞</div> 
//txt=='下雨'的结果为true,所以想当于v-if = true,这个div显示
<div v-else-if="txt=='不下雨'">不带伞</div>
// txt=='不下雨'的结果为false,所以这个div隐藏
<div v-else>不带伞</div>
//v-else的逻辑是除了if和else之外的逻辑,如果符合的话则显示
```

```js
小技巧:动态修改vue实例对象里的`txt`的文字可以`控制`这三个div哪个`显示`哪个`隐藏`
```

### 绑定元素属性

```js
使用v-bind指令为元素绑定属性,语法为在元素属性的前面加上`v-bind:`,
那么元素的属性的值就可以为data数据里面的值了
```

```js
new Vue({
    el:"#app",
    data:{
        url:"http://www.baidu.com",
        txt:"跳转百度",
        setStyle:"height:100px;width:100px;background:red",
        bool:true,
        my:"xxx"
    }
})
```

```html
<div id="app">
    //使用v-bind:后,href的url值自动为data数据里的url值了
    //v-bind:可以简写为:,:加在元素属性的前面
    <a v-bind:href="url" :title="txt">百度一下</a>
    <div :style="setStyle"></div>
    //:为v-bind:的简写,设置div的style样式为data数据的setStyle
    </button :disabled="disabled"></button>
</div>
```

```html
//控制按钮或者表单的可点击
<button :disabled="bool"></button>
```

```html
绑定自定义属性:
<div :data-my="my"></div>
```

---

---

---

```js
Vue对象的methods和data之间互相取值,要利用this.xxx,比如在methods函数里面要用到data的数据,就要用到this.xxx.xxx
methods函数之间互相调用,也要用this.xxxfn()
methods:{
    fn1(){
        ...
        this.fn2() ;要想调用函数2必须用this.fn2();
        ...
    },
     fn2(){
         
     }
}
```

### 绑定事件和methods

#### v-on 和 @

```js
`v-on`为元素绑定事件,事件方法在Vue对象的`methods`属性里面定义函数
语法:`v-on:event=function`例如:v-on:click=event1
```

```js
new Vue({
    el:"#app",
    methods:{
        event1(e){
           console.log(e)
       }
    }
})
```

```html
<div id="app">
    <button v-on:click="event1">点击打印事件对象</button>
</div>
或者:
<div id="app">
    <button @click="event1">点击打印事件对象</button>
</div>
```

```js
1.`事件`写在`元素的行内`,事件的`方法`写在Vue对象的`methods`里面.
2. methods对象里的函数`不用写function`.
3. v-on:click可以简写为@click
```

#### 事件传参

```js
new Vue({
    el:"#app",
    data:{
        num1:10,
        num2:20
    }
    methods:{
        event2(a,b,e){ //这个函数要返回a+b的值和事件对象
           console.log(e);
    	   console.log(a + b);
       }
    }
})
```

```html
<div id="app">
    <button v-on:click=event2(num1,num2,$event)></button>
</div>
```

```js
1.事件写在元素的行内
2.事件的方法写在Vue对象的methods里面.
3.事件传参写在元素行内的函数括号里面
4.获取事件对象必须传参$event
```

#### 阻止事件冒泡

**原生js之e.stopPropagation()**

```html
<div id="app">
    <div @click=test1()                                           style="height:100px;width:100px;background:yellow">
        <div @click=test2($event)                                     style="height:50px;width:50px;background:red">
        </div>
    </div>
 </div>
```

```js
new Vue({
    el:"#app",
    methods:{
    test1(){
           alert("parent")
          }, //父元素点击事件
    test2(e){
           alert("child");
            e.stopPropagation();
          } //子元素点击事件
    }
})
```

```js
以上代码利用原生的e.stopPropagation()方法阻止事件冒泡,即点击子元素不会再触发父元素的事件.
```

**Vue阻止事件冒泡**

```js
Vue封装了阻止事件冒泡的函数,直接在点击事件的后面加修饰符.stop即可
语法:`v-on:click.stop = fn`;
	`@click.stop=fn`
```

```html
<div id="app">
    <div @click.stop=test1()>
        <div @click.stop=test2($event)></div>
    </div>
 </div>
@click.stop或者v-on:click.stop即可阻止事件冒泡
```

#### 阻止默认事件

```js
Vue封装了阻止默认事件的函数,直接在点击事件的后面加修饰符.prevent即可
语法:`v-on:click.prevent = fn`;
	`@click.prevent=fn`
```

```html
<div id="app">
   <form action="">
       <button type="submit" @click.prevent>提交</button>
   </form>
</div>
//直接在标签上写@click.prevent即可阻止默认点击提交的事件.
```

#### 键盘事件

```js
new Vue({
    el:"#app",
    methods:{
        keyTest(e){
            console.log(e.keyCode)
        }
    }
})
```

```html
 <div id="app">
     <input type="text" v-on:keydown=keyTest>
 </div>
//效果:在input里面输入字母会打印键盘事件的键盘码
```

##### 限制键盘事件

```js
`键盘事件@keydown还可以在后面加上限制,即只有指定的键才能触发键盘事件`,
    指定的键为少部分Vue内置的键,包含   enter,alt,shift,up,right,down,left键等等,只有预设的键才可以在.后面限制触发事件,如果想要在加入一些键,就要自定义Vue.config,将你想要的键加入预设.
```

```html
v-on:keydown.enter:

<div id="app">
     <input type="text" v-on:keydown.enter=keyTest>
 </div>
效果:只有输入enter键的时候才触发
```

```js
如果我想只有按下内置的键之外的键才触发事件怎么办?
在Vue里可以自定义键触发事件.
我们定义一个只有按q才触发事件
`Vue.config.keyCodes.q=81`; 
<div id="app">
     <input type="text" @keydown.q=keyTest>
 </div>
效果:只有输入q键的时候才触发事件
```

```js
Vue.config.keyCodes.q=81;
自定义键盘事件即将q键加入Vue预设的键盘里面,比如说Vue预设了enter键触发事件,即内部有Vue.config.keyCodes.enter = 13;
预设键盘码必须和键盘的键对应.
```

### 循环v-for

```js
v-for是循环遍历`创建dom元素`的方法
```

```js
new Vue({
    el:"#app",
    data:{
        list:["喜羊羊","灰太狼","小红帽"]
    }
})
```

```html
<div id="app">
    <ul>
        <li v-for="item in list">{{item}}</li>
    </ul>
</div>
渲染效果:
    喜羊羊
    灰太狼
    小红帽
以上是页面展示效果.
实际的dom元素,也会随着循环的次数创建对应数量的li标签dom
```

```js
// v-for会循环你指定的可迭代的对象(包含数组对象等),循环几次就会创建几次元素.
```

#### 遍历数组

```js
new Vue({
    el:"#app",
    data:{
        list:[
            {name:"喜羊羊",arr:[1,2]},
            {name:"灰太狼",arr:[3,4]},
            {name:"小红帽",arr:[5,6]}
        ]
    }
})
```

```html
<div id="app">
    <ul>
    	<li v-for="(item,index) in list">
        	{{item.name + "" + item.arr + index}}
        </li>
    </ul>
</div>
页面效果:
	喜羊羊1,2 0
    灰太狼3,4 1
    小红帽5,6 2
分别对应data数据里的list的name,list的arr以及相应的下标
```

#### 遍历对象

```js
new Vue({
     el: "#app",
     data: {
         list: {name:"喜羊羊",arr:[1,2,3,4,5]}
      }
  })
```

```html
<div id="app">
   <ul>
       <li v-for="(item,key,index) in list">
           {{item +key + index}} 
       </li>
   </ul>
</div>
```

```js
v-for遍历数组: 
	v-for = "item in arrList" item即数组的每一位
    v-for = "(item,index) in arrList",item是数组的每一位,index是数组元素的下标
v-for循环会创建与循环次数相等的数量的dom元素.可以相应的将数组的数据填进dom元素中.
```

```js
v-for遍历对象:
	v-for = "item in objList" 默认一位的话第一位即对象的值
    v-for = "(item,key,index) in objList" 第一位是对象的值,第二个参数是对象的键,第三个参数是下标.
```

#### 循环嵌套

```js
当我们循环的数组里面每一项拿到item后,item里面还有数组或者对象,即深度数据,我们还可以在循环的元素下面继续循环.
```

```js
new Vue({
            el: "#app",
            data: {
                list: [{
                    name: "喜羊羊",
                    arr: [1, 2, 3, 4, 5]
                }, {
                    name: "小灰灰",
                    arr: [1, 2, 3, 4, 5]
                }, {
                    name: "慢羊羊",
                    arr: [1, 2, 3, 4, 5]
                }]
            },
            methods:{
                test(index){
                    alert(this.list[index].name)
                }
            }
        })
```

```html
<div id ="app">
    <ul>
        <li v-for="item in list"> //拿到list的每一项item
            <ul>
                <li v-for="el in item.arr"> //继续循环item里的											  arr 
                    {{el}}
                </li>
            </ul>
        </li>
    </ul>
</div>
```

#### 利用下标

```js
循环数据创建元素,很多时候我们需要拿到对应元素的下标
```

```js
new Vue({
            el: "#app",
            data: {
                list: [{
                    name: "喜羊羊",
                    arr: [1, 2, 3, 4, 5]
                }, {
                    name: "小灰灰",
                    arr: [1, 2, 3, 4, 5]
                }, {
                    name: "慢羊羊",
                    arr: [1, 2, 3, 4, 5]
                }]
            },
            methods:{
                test(index){
                    alert(this.list[index].name)
                }
            }
        })
```

```html
<div id="app">
        <ul>
            <li v-for="(item,index) in list"                              @click=test(index)>
                {{item.name}}
            </li>
        </ul>
 </div>
```

```js
拿下标即在`v-for循环`的时候,需要`循环下标`;
绑定事件的时候将下标`作为参数传入`事件函数,即可拿到下标;
在编写方法的时候下标作为`形参`即可利用下标
```

### 动态class样式

```js
`利用v-bind为class绑定样式`
语法:
	`v-bind:class=classList` 或 `:class = classList`
    classList为自定义的一个data的类名集合数组
    new Vue({
        data:{
        classList:[clss1,class2]
    }
    })
1.在vue对象里定义一个类名数组,包含class1,class2等类名
2.在css里写好class1,class2等类名的样式
3.在元素身上写v-bind:class=classList即可为该元素添加所有类名
```

```js
`利用v-bind为class绑定样式`
语法:
	`v-bind:class={class1:true,class2:true}`
    class1是直接在样式表里面取类名,即在style标签对里取类名,不是在data数据里面取
```

```js
`利用data的样式对象:`
	1.在data里面定义一个样式对象
    data:{
        setStyle:{
            width:"100px",
            height:"100px",
            background:"pink"
          }
    }
	2.利用v-bind:class = `styleobj`
		例如:<div :style="setStyle"></div>
```

```js
`利用函数:`
	1.在data里面定义一个样式对象
    data:{
        setStyle:{
            width:"100px",
            height:"100px",
            background:"pink"
          }
    }
2.在methods里面定义一个函数
    setClo(){
        this.setStyle.background="black";
     }
//这里的this即当前的Vue对象实例,修改自身的setStyle对象的background属性为black.
```

### v-model双向绑定

```js
这里讲的是input的v-model,并`不是真正`的双向绑定,而是利用`onchange`事件,即onchange的`语法糖`.
```

```js
new Vue({
       el:"#app",
       data:{
          name:"苹果",
          price:6,
          num:0,
          testStr:""
        }  
        })
```

```html
<div id="app">
    <h1>{{name}}</h1>    
    数量:<input type="number" v-model="num">
    价格:{{num*price}}
</div>
```

```js
上面代码利用了v-model = "num";
    即input里的值会与data的值进行双向绑定;
    当input的数字变化,那么修改data数据里的num;
    如果修改data数据的num,那么input里面的数据也会发生变化.
```

```js
在标签上写v-model = "xxx",与data数据里的xxx进行双向绑定.
```

```js
v-model.lazy : 即blur事件,失去焦点数据才发生变化;
v-model.number : 强制转化为number类型;
v-model.trim : 去掉左右空格
```

<https://segmentfault.com/a/1190000016344599?utm_source=tag-newest>面试时常问及的题目链接





