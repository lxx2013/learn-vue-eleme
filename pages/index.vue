<template>
  <section >
      <div class="tab">
        <div class="tab-item"><a href="/restaurant/dami/goods">大米先生</a></div>
        <div class="tab-item"><a href="/restaurant/data/goods">粥品香坊</a></div>
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

<style lang='stylus' scoped>
@import "~assets/mixin"
.tab{
    line-height: 30px;
}
</style>
