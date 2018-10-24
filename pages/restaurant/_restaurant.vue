<template>
  <section >
    <Detail :seller= "seller"></Detail>
    <div :class="$store.state.globalBlur?'global-blur':''">
      <Header :seller= "seller" ></Header>
      <div class="tab">
        <div class="tab-item"><nuxt-link :to="'/restaurant/'+restaurant+'/goods'" >商品</nuxt-link></div>
        <div class="tab-item"><nuxt-link :to="'/restaurant/'+restaurant+'/ratings'">评价</nuxt-link></div>
        <div class="tab-item"><nuxt-link :to="'/restaurant/'+restaurant+'/seller'" key="seller">商家</nuxt-link></div>
      </div>
      <div class="blue" :class="blueLine"></div>
      <div class="content"><nuxt-child :seller= "seller"/></div>
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
  computed:{
    blueLine(){
      /\/.*\/.*\/(.*)/.test(this.$route.fullPath)
      var name = RegExp.$1;
      console.log(`[_restaurant.vue] server render tab is ${name}\n`)
      if(name === "seller"){
        return 'blue-right'
      }
      else if(name == "goods"){
        return 'blue-left'
      }
      else if(name ==="ratings"){
        return 'blue-mid'
      }
    }
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
          ? `https://eleme.setsuna.wang/api/seller/${params.restaurant}`
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

<style lang='stylus' scoped>
@import "~assets/mixin"
.blue{
  background-color rgb(35,149,255)
  position absolute
  top 175px
  left 0
  height 2px
  width 8vw
  transform translateX(-50%)
  transition left 0.5s
  &.blue-left{
    left 16.7%
  }
  &.blue-mid{
    left 50%
  }
  &.blue-right{
    left 83.3%
  }
}
.tab {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  border-1px(rgba(7,17,27,0.1))
  .tab-item {
    flex: 1;
    text-align: center;
    a {
      display: block;
      height: 40px;
      line-height: 40px;
      text-decoration: none;
      color: #666
      font-weight 400
      font-size: 14px;
      &.nuxt-link-active {
        color: #333
        font-weight 700
        span{
          border-bottom 1px solid rgb(35, 149, 255)
        }
      }
    }
  }
}
.global-blur {
  filter: blur(8px);
}
.content{
  min-height: calc(100vh - 178px);
}
</style>
