<template>
<transition name="fade">
    <div v-show="showFlag" class='food-detail'>
        <div class="food-content">
          <div class="image-header" @click="showFlag=false">
            <img :src="food.image" alt="food.image">
            <div class="back" @click="showFlag=false">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <div class="title">{{food.name}}</div>
            <div class="detail">
              <div class="sell-count"> 月售{{food.sellCount}}份</div>
              <div class="rating">好评率{{food.rating}}%</div>
            </div>
            <div class="price">￥{{food.price}}</div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </div>
          <split></split>
          <div class="info" v-if="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split  v-if="food.info"></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect :originSelectType="selectType"  :desc="desc" :ratings="food.ratings"></ratingselect>
          </div>
        </div>
    </div>
</transition>
</template>
<script>
import cartcontrol from "~/components/cartcontrol.vue";
import split from "~/components/split.vue";
import ratingselect from "~/components/ratingselect.vue";

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = true;
    }
  }
};
</script>
<style lang='stylus' scoped>
.food-detail {
  position fixed
  left 0
  top 0
  bottom 48px
  z-index 400
  width 100%
  background-color #fff
  overflow auto

  .image-header {
    position relative
    width 100%
    height 100vw

    img {
      width 100%
      height 100%
    }

    .back {
      position fixed
      top 10px
      left 5px

      .icon-arrow_lift {
        display block
        font-size 16px
        color white
      }
    }
  }

  .content {
    padding 18px
    position relative

    .title {
      line-height 14px
      margin-bottom 8px
      font-size 14px
      font-weight 700
      color rgb(7, 17, 27)
    }

    .detail {
      margin-bottom 18px
      line-height 10px
      font-size 0

      .sell-count, .rating {
        display inline-block
        font-size 10px
        color rgb(147, 154, 159)
      }

      .sell-count {
        margin-right 12px
      }
    }

    .price {
      color rgb(255, 83, 57)
      font-size 16px
      font-weight 700
    }

    .cartcontrol-wrapper {
      position absolute
      right 12px
      bottom 2px
    }
  }

  .info {
    padding 18px

    .title {
      line-height 14px
      margin-bottom 6px
      font-size 14px
      color rgb(7, 17, 27)
    }

    .text {
      color rgb(77, 85, 93)
      line-height 24px
      font-weight 200
      padding 0 8px
      font-size 12px
    }
  }

  .rating {
    padding-top 18px
    .title{
      line-height 14px
      margin-left 18px
      font-size 14px
      color rgb(7, 17, 27)
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition all 0.3s
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
  opacity 0
  transform translate3d(100%, 100%, 0)
}
</style>