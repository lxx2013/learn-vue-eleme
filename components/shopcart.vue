<template>
  <div class="shopcart">
      <div class="content">
          <div class="content-left" @click="toggle_showCart">
              <div class="logo-wrapper" :class="{'cart-jump':$store.state.cartJump}">
                <div class="logo" :class="{'highlight':totalCount>0}">
                    <i class="icon-shopping_cart"></i>
                </div>
                <div class="num" v-if="totalCount>0">{{totalCount}}</div>
              </div>
              <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
              <div class="desc">另需配送费{{seller.deliveryPrice}}元</div>
          </div>
          <div class="content-right">
              <div class="pay" v-if="totalPrice===0">￥{{seller.minPrice}}起送</div>
              <div class="pay" v-if="seller.minPrice>totalPrice">￥还差{{(seller.minPrice-totalPrice).toFixed(2)}}起送</div>
              <div class="pay submit" v-if="seller.minPrice<=totalPrice">去结算</div>
          </div>
      </div>
      <transition name="shadow">
      <div class="shopcart-list-shadow" v-show="listShow"></div></transition>
      <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty">清空</span>
        </div>
        <div class="list-content">
          <ul style="list-style:none">
            <li class="food" v-for="(food,index) in $store.state.selectedFoods" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="cartcontrol-wrapper">
                <CartControl :food="food"></CartControl>
              </div>
              <div class="price">
                <span>￥</span>
                <span>{{food.price*food.count}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      </transition>
  </div>
</template>
<script>
import CartControl from "~/components/cartcontrol.vue";

export default {
  components: {
    CartControl
  },
  data() {
    return {
      listShow: false
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    toggle_showCart() {
      if (!this.listShow && this.totalCount > 0) this.listShow = true;
      else if (this.listShow) this.listShow = false;
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      for (let i in this.$store.state.selectedFoods) {
        let food = this.$store.state.selectedFoods[i];
        total += food.price * food.count;
      }
      return total;
    },
    totalCount() {
      let count = 0;
      for (let i in this.$store.state.selectedFoods) {
        let food = this.$store.state.selectedFoods[i];
        count += food.count;
      }
      return count;
    }
  },
  watch: {
    getSelected: {
      deep: true,
      handler(val) {
        console.log("[shopcart.vue watch]", val);
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~assets/mixin'

@keyframes jump {
  0% {
    transform scale(1)
  }

  33% {
    transform scale(0.9)
  }

  66% {
    transform scale(1.2)
  }

  100% {
    transform scale(1)
  }
}

.shopcart {
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height 48px

  .content {
    display flex
    background-color #141d27

    .content-left {
      flex 1

      .logo-wrapper {
        &.cart-jump {
          animation jump ease-in-out 0.5s
        }

        display inline-block
        position relative
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        background-color #141d27
        vertical-align top
        border-radius 50%

        .logo {
          width 100%
          height 100%
          border-radius 50%
          background-color #2b343c
          text-align center

          .icon-shopping_cart {
            line-height 44px
            color #80858a
            font-size 24px
          }

          &.highlight {
            background-color rgb(0, 160, 220)

            .icon-shopping_cart {
              color white
            }
          }
        }

        .num {
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          font-size 9px
          font-weight 700
          color #fff
          background-color rgb(240, 20, 20)
          box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        }
      }

      .price {
        display inline-block
        vertical-align top
        margin-top 12px
        line-height 24px
        padding-right 12px
        border-right 1px solid rgba(255, 255, 255, 0.1)
        font-size 16px
        font-weight 700
        color rgba(255, 255, 255, 0.4)

        &.highlight {
          color #fff
        }
      }

      .desc {
        display inline-block
        vertical-align top
        line-height 24px
        margin 12px 0 0 12px
        color rgba(255, 255, 255, 0.4)
        font-size 12px
      }
    }

    .content-right {
      flex 0 0 105px
      width 105px
      background-color #2b333b

      .pay {
        font-size 12px
        line-height 48px
        height 48px
        text-align center
        color rgba(255, 255, 255, 0.4)
      }

      .submit {
        background-color #38ca73
        color white
        font-size 15px
        font-weight 700
      }
    }
  }

  .shopcart-list-shadow {
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    z-index -2
    background-color #000
    opacity 0.4

    &.shadow-enter-active, &.shadow-leave-active {
      transition opacity 0.3s ease
    }

    &.shadow-enter, &.shadow-leave-to {
      opacity 0
    }
  }

  .shopcart-list {
    position fixed
    left 0
    bottom 48px
    z-index -1
    width 100%

    &.fold-enter-active, &.fold-leave-active {
      transition all 0.5s
    }

    &.fold-enter, &.fold-leave-to {
      transform translate3d(0, 100%, 0)
    }

    .list-header {
      height 40px
      line-height 40px
      padding 0 18px
      background-color #f3f5f7
      border-1px(rgba(7, 17, 27, 0.1))

      .title {
        float left
        font-size 16px
        color rgb(7, 17, 27)
        font-weight 300
        line-height 40px
      }

      .empty {
        float right
        font-size 12px
        color rgb(0, 160, 220)
        line-height 40px
      }
    }

    .list-content {
      .food {
        height 48px
        line-height 24px
        box-sizing border-box
        padding 12px 18px
        background-color #fff
        border-1px(rgba(7, 17, 27, 0.1))
        position relative

        .name {
          display inline-block
          font-size 16px
          color rgb(7, 17, 27)
          line-height 24px
          font-weight 500
          float left
        }

        .price {
          position absolute
          right 100px
          font-size 16px
          font-weight 700
          line-height 24px
          color rgb(240, 20, 20)
          span:first-child{
            font-size 10px
          }
        }

        .cartcontrol-wrapper {
          min-width 75px
          position absolute
          right 0px
          bottom 6px
        }
      }
    }
  }
}
</style>

