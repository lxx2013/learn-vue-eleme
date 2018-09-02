<template>
  <section>
    <Header :seller= "seller"></Header>
    <div class="tab">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评价</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <div class="content"><nuxt-child/></div>
  </section>
</template>

<script>
  import Header from "~/components/header/header.vue";
  import axios from 'axios'
  export default {
    components: {
      Header
    },
    data(){
      return {
        seller:{
            
        }
      }
    },
    async asyncData ({ params }) {
      let { data } = await axios.get(`http://localhost:8101/api/seller`)
      return { seller: data }
    }
  };

</script>

<style lang='less' scoped>
@import url('~assets/mixin.less');
  .tab{
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    .border-1px(rgba(7,17,27,0.1));
    .tab-item{
      flex:1;
      text-align: center;
      a{
        display: block;
        height: 40px;
        line-height: 40px;
        text-decoration: none;
        color:rgb(77,85,93);
        font-size: 14px;
        &.nuxt-link-active{
          color:rgb(240,20,20)
        }
      }
    }
  }
</style>
