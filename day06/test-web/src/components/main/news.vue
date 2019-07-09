<template>
  <div>
    <p>我是新闻页面</p>
    <router-link to="/news/nation">国内新闻</router-link>
    <router-link to="/news/internation">国际新闻</router-link>
    <router-view></router-view>
    <!-- 普通传参 -->
    <!-- <router-link to="/test">test</router-link> -->
    <router-link :to="{path:'/info',query:{id:'123456'}}">test</router-link>
    <router-link :to="{name:'test',params:{id:'456789'}}">test2</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  //路由钩子函数比生命周期还要提前,控制跳转的时候不会显示页面
  beforeCreate() {
    // console.log("你来或者不来,我都在这里等你")
  },
  // 子路由进入的时候触发
  beforeRouteEnter(to, from, next) {
    // console.log(122); //打印1122
    if (to.path == "/news") {
      next("/news/nation");
    }
    next();
  },
  beforeUpdate() {
    //子路由进入触发
    console.log("1222");
  },
  mounted() {
     console.log(this.$route);
  },
  beforeRouteLeave(to, from, next) {
    console.log("我已经离开新闻页面");
    next();
  },
  method: {
    test() {}
  }
};
</script>
<style scoped>
</style>



