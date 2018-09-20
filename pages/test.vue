<template>
    <test :seller="seller"></test>
</template>
<script>
import test from "~/components/header/header.vue";
import axios from "axios";
export default {
  components: {
    test
  },
  async asyncData({ params }) {
    console.log(
      `[test.vue] asyncData: isClient : ${process.client}, isServer: ${process.server}`
    );
    var {data} = await axios.get('http://localhost:8101/api/seller/yangguofu')
    console.log(data)
    return { seller: data };
  }
};
</script>

