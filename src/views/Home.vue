<template>
  <div class="home">
    <test />
  </div>
</template>

<script>
// @ is an alias to /src
import Test from "@/components/test.vue";

export default {
  name: "Home",
  components: {
    Test
  }
};
</script>
