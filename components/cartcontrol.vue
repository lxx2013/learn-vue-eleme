<template>
    <div class="cartcontrol">
        <div class="cart-decrease" v-show="food.count>0"></div>
        <div class="cart-count" v-show="food.count>0"></div>
        <div class="cart-add"></div>
    </div>
</template>
<script>
export default {
  props: {
    food: {
      type: Object
    }
  },
  created() {}
};
</script>
<style lang="stylus" scoped>
.test {
  color #000
  font-size 24px

  .test2 {
  }

  .test3 {
    background-color #fff
    vertical-align top
    line-height 24px
  }
}
</style>


