<template>
  <section >
      <div class="tab">
        <div class="tab-item"><a href="/restaurant/dami">大米先生</a></div>
        <div class="tab-item"><a href="/restaurant/data">粥品香坊</a></div>
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
    
  }
};
</script>

<style lang='less' scoped>
@import url("~assets/mixin.less");
.tab{
    line-height: 30px;
}
</style>
