<template>
  <div>
    <ul>
      <li v-for="(item,index) in pathlist" :key="index">
        <router-link :to="item.path">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pathlist: [
        { name: "信息", path: "/info" },
        { name: "新闻", path: "/news" },
        { name: "测试", path: "/test" }
      ]
    };
  }
};
</script>
<style scoped>
ul {
  height: 50px;
  list-style: none;
}
li {
  width: 100px;
  text-align: center;
  float: left;
}
</style>



