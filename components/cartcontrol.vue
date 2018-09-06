<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" @click="decreaseCart" v-show="food.count>0"></div>
      </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  props: {
    food: {
      type: Object
    }
  },
  created() {},
  methods: {
    addCart(event) {
      if (!event._constructed) {
        console.log("[carcontrol.vue] event._contructed : false");
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
    },
    decreaseCart(event) {
      if (!event._constructed) {
        console.log("[carcontrol.vue] event._contructed : false");
        return;
      }
      if (this.food.count <= 0) {
        console.log("[carcontrol.vue] 它已经是0了为什么你还要减少它>?");
      } else {
        this.food.count--;
      }
    }
  }
};
</script>
<style lang="stylus" scoped >
.cartcontrol {
  .cart-decrease, .cart-add {
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 160, 220)
  }
  .move-enter-active, .move-leave-active{
    transition all 0.4s linear
  }

  .move-enter-to, .move-leave {
    opacity 1
    transform translate3d(0, 0, 0) rotate(0)
  }

  .move-enter, .move-leave-to {
    opacity 0
    transform translate3d(24px, 0, 0)  rotate(180deg)
  }

  .cart-count {
    display inline-block
    vertical-align top
    min-width 12px
    padding-top 6px
    line-height 24px
    text-align center
    font-style 10px
    color rgba(0, 0, 0, 0.87)
  }
}
</style>
