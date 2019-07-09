<template>
  <div>
    <lay_head></lay_head>   
    <router-view></router-view>
  </div>
</template>

<script>
import lay_head from "@/components/layout/head";
export default {
  name: "home",
  data() {
    return {
      
    };
  },
  mounted() {
  },
  components: {
    lay_head
  },
};
</script>




