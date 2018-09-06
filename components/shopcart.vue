<template>
  <div class="shopcart">
      <div class="content">
          <div class="content-left">
              <div class="logo-wrapper">
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
  </div>
</template>
<script>
export default {
  data(){
    return {
        selectedFoods: {}
      }
  },
  props: {
    seller: {
      type: Object
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      console.log(this.selectedFoods)
      for (let i in this.selectedFoods) {
        let food = this.selectedFoods[i]
        total += food.price * food.count;
      }
      return total;
    },
    totalCount() {
      let count = 0;
      for (let i in this.selectedFoods) {
        let food = this.selectedFoods[i]
        total +=  food.count;
      }
      return count;
    },
    getSelected(){
      console.log('[shopcart.vue] getSelected!',this.$store.state.selectedFoods)
      return this.$store.state.selectedFoods
    }
  },
  watch:{
    getSelected:{
      deep: true,
      handler(val){
        console.log('[shopcart.vue watch]', val)
        this.selectedFoods = val;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
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
}
</style>

