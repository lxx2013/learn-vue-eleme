<template>
    <test :seller="seller"></test>
</template>
<script>
import test from "~/components/detail.vue";
import axios from "axios";
export default {
  components: {
    test
  },
  async asyncData({ params }) {
    console.log(
      `[test.vue] asyncData: isClient : ${process.client}, isServer: ${process.server}`
    );
    return { seller: data };
  }
};
</script>

