<template>
  <section >
      <div class="tab">
        <div class="tab-item"><router-link to="/restaurant">大米先生</router-link></div>
        <div class="tab-item"><router-link to="/restaurant">粥品香坊</router-link></div>
      </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  components: {

  },
  data() {
    return {
      seller: {},
      detailShow: false
    };
  },
  async asyncData({ params }) {
    let { data } = await axios.get(`http://localhost:8101/api/seller`);
    return { seller: data };
  }
};
</script>

<style lang='less' scoped>
@import url("~assets/mixin.less");
.tab{
    line-height: 30px;
}
</style>
