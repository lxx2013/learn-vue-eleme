<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" @click.stop="decreaseCart" v-show="selectedFood.count>0"></div>
      </transition>
    <div class="cart-count" v-show="selectedFood.count>0">{{selectedFood.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
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
      }
      let food = this.food;
      let selectedFood = this.selectedFood
      console.log(food);
      if (!selectedFood.count) {
        selectedFood.count = 1;
      } else {
        selectedFood.count++;
      }
      //console.log(this.$store.state.selectedFoods)
      this.$store.commit("food", {
        name: food.name,
        price: food.price != undefined || food.specfoods[0].price,
        count: selectedFood.count
      });
      this.$store.commit("cartJump", 500);
    },
    decreaseCart(event) {
      if (!event._constructed) {
        console.log("[cartcontrol.vue] event._contructed : false");
      }
      let food = this.food;
      let selectedFood = this.selectedFood
      if (selectedFood.count <= 0) {
        console.log("[cartcontrol.vue] 它已经是0了为什么你还要减少它>?");
      } else {
        selectedFood.count--;
      }
      //console.log(this.$store.state.selectedFoods)
      this.$store.commit("food", {
        name: food.name,
        price: food.price || food.specfoods[0].price,
        count: selectedFood.count
      });
    }
  },
  computed: {
    selectedFood() {
      let selectedFoods = this.$store.state.selectedFoods;
      let food = selectedFoods[this.food.name] || {}
      return food;
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

  .move-enter-active, .move-leave-active {
    transition all 0.4s linear
  }

  .move-enter-to, .move-leave {
    opacity 1
    transform translate3d(0, 0, 0) rotate(0)
  }

  .move-enter, .move-leave-to {
    opacity 0
    transform translate3d(24px, 0, 0) rotate(180deg)
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
