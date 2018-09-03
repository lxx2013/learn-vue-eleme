<template>
  <section >
    <Detail :seller= "seller"></Detail>
    <div :class="$store.state.globalBlur?'global-blur':''">
      <div class="grey-blur" v-if="$store.state.globalBlur" ></div>
      <Header :seller= "seller" ></Header>
      <div class="tab">
        <div class="tab-item"><router-link to="/restaurant/goods">商品</router-link></div>
        <div class="tab-item"><router-link to="/restaurant/ratings">评价</router-link></div>
        <div class="tab-item"><router-link to="/restaurant/seller">商家</router-link></div>
      </div>
      <div class="content"><nuxt-child/></div>
    </div>
  </section>
</template>

<script>
import Header from "~/components/header/header.vue";
import Detail from "~/components/detail.vue";
import axios from "axios";
export default {
  components: {
    Header,
    Detail
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
.tab {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  .border-1px(rgba(7,17,27,0.1));
  .tab-item {
    flex: 1;
    text-align: center;
    a {
      display: block;
      height: 40px;
      line-height: 40px;
      text-decoration: none;
      color: rgb(77, 85, 93);
      font-size: 14px;
      &.nuxt-link-active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
.global-blur {
  filter: blur(8px);
}
.grey-blur {
  display: block;
  width: 150vw;
  height: 150vh;
  position: fixed;
  left: -25%;
  top: -25%;
  background-color: rgba(7, 17, 27, 0.8);
  background-size: 150% 150%;
  background-attachment :fixed;
  background-position: center center;
  overflow: hidden;
  z-index: 101;
}
.content{
  min-height: 60vh;
}
</style>
