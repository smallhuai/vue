<template>
    <div>
        <ul>
            <!-- v-for指令来循环路径,记得要加:key的标识 -->
            <li v-for="(item,index) in pathlist" :key="index">
                <!-- 注意属性设置一定要加: -->
                <router-link :to="item.path">{{item.name}}</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            pathlist:[
                {name:"信息页",path:"/"},
                {name:"新闻页",path:"/news"},
                {name:"测试页",path:"/test"}
            ]
        }
    },
}
</script>
<style lang="scss" scope>
    ul{
        height: 50px;
        border: 1px solid #8bf1f3;
        li{
            height:50px;
            width: 100px;
            text-align: center;
            line-height: 50px;
            float: left;
            list-style: none;
        }
    }
</style>