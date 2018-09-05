<template>
  <section >
    <Detail :seller= "seller"></Detail>
    <div :class="$store.state.globalBlur?'global-blur':''">
      <div class="grey-blur" v-if="$store.state.globalBlur" ></div>
      <Header :seller= "seller" ></Header>
      <div class="tab">
        <div class="tab-item"><router-link :to="'/restaurant/'+restaurant+'/goods'">商品</router-link></div>
        <div class="tab-item"><router-link :to="'/restaurant/'+restaurant+'/ratings'">评价</router-link></div>
        <div class="tab-item"><router-link :to="'/restaurant/'+restaurant+'/seller'">商家</router-link></div>
      </div>
      <div class="content"><nuxt-child keep-alive :seller= "seller" /></div>
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
  async asyncData({ params,store}) {
    //1.首先检测是否有数据缓存
      try {
        let data = store.state.restaurants[params.restaurant];
        if (data && data["seller"]) {
          console.log("[header.vue 1.] seller exists. No need to reload.");
          return { seller: data["seller"], restaurant: params.restaurant };
        }
      } catch (err) {
        console.log("[header.vue 1.]", err);
      }
      //2.如果无数据那么请求服务端去加载数据
      try {
        console.log(
          `[goods.vue] asyncData: isClient : ${process.client}, isServer: ${
            process.server
          }`
        );
        let url = process.client
          ? `http://eleme.setsuna.wang:8101/api/seller/${params.restaurant}`
          : `http://localhost:8101/api/seller/${params.restaurant}`;
        console.log(`[header.vue 2.] axios.get(url): ${url}`)
        let { data } = await axios.get(url);
        store.commit('update',{name1:params.restaurant,name2:'seller',o:data});
        return { seller: data, restaurant: params.restaurant };
      } catch (err) {
        console.log("[header.vue 2.]", err);
      }
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
