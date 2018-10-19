<template>
<transition name="fade">
    <div v-show="showFlag" class='food-detail'>
        <div class="food-content">
          <div class="image-header" @click="showFlag=false">
            <img :src="food.image_path | getUrl" alt="food.image">
            <div class="back" @click="showFlag=false">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <div class="title">{{food.name}}</div>
            <div class="detail">
              <div class="sell-count"> 月售{{food.month_sales}}份</div>
              <div class="rating">好评率{{food.satisfy_rate}}%</div>
            </div>
            <div class="price">￥{{getPrice(food)}}</div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </div>
          <split v-if="food.info||food.description"></split>
          <div class="info" v-if="food.info||food.description">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info||food.description}}</p>
          </div>
          <split v-if="food.ratings && food.ratings.length"></split>
          <div class="rating" v-if="food.ratings && food.ratings.length">
            <h1 class="title">商品评价</h1>
            <ratingselect :selectType="selectType"  :desc="desc" :ratings="food.ratings" :onlyContent="onlyContent" v-on:switch="onlyContent = !onlyContent" @select="selectType  = arguments[0]"></ratingselect>
            <div class="rating-wrapper">
              <ul v-show="food.ratings && food.ratings.length" style="list-style:none">
                <li v-for="(rating,index) in food.ratings" :key="index" class="rating-item"  v-if="needShow(rating.rateType,rating.text)">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img class='avatar' width="12px" height="12px" :src="rating.avatar|randomImage" alt="rating.avatar">
                  </div>
                  <div class="time">{{rating.rateTime| formatDate}}</div>
                  <p class="text">
                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!food.ratings||!food.ratings.length"></div>
            </div>
          </div>
        </div>
    </div>
</transition>
</template>
<script>
import cartcontrol from "~/components/cartcontrol.vue";
import split from "~/components/split.vue";
import ratingselect from "~/components/ratingselect.vue";
import { formatDate } from "~/assets/common.js"
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
        negative: "吐槽",
      },
      onlyContent:true,
    };
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = true;
    },
    needShow(type,text){
      if(this.onlyContent && !text){
        return false;
      }
      if(this.selectType === ALL){
        return true;
      }else {
        return type === this.selectType
      }
    },
    getPrice(food){
      if(food.specfoods)
        return food.specfoods[0].price
      else{
        console.log(food)
      }
    }
  },
  filters:{
    formatDate(time){
      let date = new Date(time)
      return formatDate(date,'yyyy-MM-dd hh:mm');
    //console.log(formatDate)
    },
    randomImage(url){
        if(url == "https://picsum.photos/50/50/?image="){
            return url+parseInt(1+900*Math.random())
        }
        else{
            return url;
        }
    },
    getUrl(url) {
      if (!(typeof url == 'string')) {
        console.log("getUrl : not String", url);
        return false;
      }
      if (!url || !url.length) {
        return false;
      }
      var ourl = "https://fuss10.elemecdn.com/";
      //c/e2/577a8a922a46ea93d363865d146a5jpeg.jpeg?imageMogr/format/webp/thumbnail/150x/
      if (/.*(jpeg|png|jpg|bmp|gif).*/.test(url)) {
        ourl +=
          url[0] +
          "/" +
          url[1] +
          url[2] +
          "/" +
          url.slice(3) +
          `.${RegExp.$1}`;
      }
      return ourl;
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '~assets/mixin'

.food-detail {
  position fixed
  left 0
  top 0
  bottom 48px
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

    .title {
      line-height 14px
      margin-left 18px
      font-size 14px
      color rgb(7, 17, 27)
    }

    .rating-wrapper {
      padding 0 18px

      .rating-item {
        position relative
        padding 16px 0
        border-1px(rgba(7, 17, 27, 0.1))

        .user {
          position absolute
          right 0
          top 16px
          line-height 12px

          .name {
            display inline-block
            vertical-align top
            font-size 10px
            color rgb(147, 153, 159)
          }
          .avatar {
            border-radius 50%
            margin-left 3px
          }
        }
        .time{
          line-height 12px
          font-size 10px
          color rgb(147, 153, 159)
          margin-bottom 6px
        }
        .text{
          line-height 16px
          font-size 12px
          color rgb(7,17,27)
          .icon-thumb_up,.icon-thumb_down{
            margin-right 4px
            line-height 16px
            font-size 12px
          }
          .icon-thumb_up{
              color rgb(0,160,220)
          }
          .icon-thumb_down{
              color rgb(140,153,159)
          }
        }
      }
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