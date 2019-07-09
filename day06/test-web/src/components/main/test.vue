<template>
  <div>
    <div>我是测试页面</div>
    <button @click="test">test</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    // console.log(this.$route);
    // console.log(this.$router);
  },
  methods: {
    test() {
     // this.$router.push("/info");
     // this.$router.push({ path: "info", query: { id: "15646" } });
      this.$router.push({ name: "info", params: { id: "15646" } });
    }
  }
};
</script>



