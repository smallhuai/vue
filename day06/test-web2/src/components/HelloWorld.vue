<template>
  <div>
    <lay_head></lay_head>
    <router-view></router-view>
  </div>
</template>

<script>
// 一定要注意路径问题,路径不对会显示没有找到组件,没有依赖关系
import lay_head from "@/components/layout/head";
export default {
  naem: "HelloWorld",
  mounted() {
    console.log(this.$route);
  },
  components: {
    lay_head
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
