<template>
  <div>
    <h1>我是头部</h1>
    <ul>
      <li v-for="(item,index) in pathList" :key="index">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pathList: [
        { name: "信息", path: "/info" },
        { name: "新闻", path: "/news" },
        { name: "测试", path: "/test" }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
