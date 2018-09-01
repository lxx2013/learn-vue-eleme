<template>
  <section>
    <Header></Header>
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
  export default {
    components: {
      Header
    }
  };

</script>

<style lang='less' scoped>
  .tab{
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    .tab-item{
      flex:1;
      text-align: center;
      a{
        display: block;
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
