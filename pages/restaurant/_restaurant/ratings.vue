<template>
<div class="ratings">
    <div class="ratings-content">
        <div class="overview">
            <div class="overview-left">
                <h1 class="score">{{seller.score}}</h1>
                <div class="title">综合评分</div>
                <div class="rank">高于周边商家{{seller.rankRate}}%</div>
            </div>
            <div class="overview-right">
                <div class="score-wrapper">
                    <span class="title">服务态度</span>
                    <star :size="36" :score="seller.serviceScore">{{seller.serviceScore}}</star>
                    <span class="score">{{seller.serviceScore}}</span>
                </div>
                <div class="score-wrapper">
                    <span class="title">商品评分</span>
                    <star :size="36" :score="seller.foodScore">{{seller.foodScore}}</star>
                    <span class="score">{{seller.foodScore}}</span>
                </div>
                <div class="score-wrapper">
                    <span class="title">送达时间</span>
                    <span>{{seller.deliveryTime}}分钟</span>
                </div>
            </div>
        </div>
    </div>
    <split></split>
    <ratingselect :selectType="selectType"  :desc="desc" :ratings="ratings" :onlyContent="onlyContent" v-on:switch="onlyContent = !onlyContent" @select="selectType  = arguments[0]"></ratingselect>
    <div class="rating-wrapper">
        <ul style="list-style:none">
            <li v-for="(rating,index) in ratings" :key="index" class="rating-item">
                <div class="avatar">
                    <img :src="rating.avatar" alt="rating.avatar">
                </div>
                <div class="content">
                    <h1 class="name">{{rating.username}}</h1>
                    <div class="star-wrapper">
                        <star :size="24" :score="rating.score"></star>
                        <span class="delivery" v-show="rating.deliveryTime"></span>
                    </div>
                    <p class="text">{{rating.text}}</p>
                    <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                        <i class="icon-thumb_up"></i>
                        <span v-for="(item,index) in recommend" :key="index"></span>
                    </div>
                    <div class="time">{{rating.rateTime|formatDate }}</div>
                </div>
            </li>     
        </ul>
    </div>
</div>
</template>
<script>
import axios from "axios"
import star from "~/components/star.vue";
import split from "~/components/split.vue";
import ratingselect from "~/components/ratingselect.vue";
import { formatDate } from "~/assets/common.js"

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  components: {
    star,
    split,
    ratingselect
  },
  props: {
    seller: {
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
      },
      onlyContent: true
    };
  },
  filters:{
    formatDate(time){
      let date = new Date(time)
      return formatDate(date,'yyyy-MM-dd hh:mm');
    //console.log(formatDate)
    }
  },
  async asyncData({ params, store }) {
    //1.首先检测是否有数据缓存
    try {
      let data = store.state.restaurants[params.restaurant];
      if (data && data["ratings"]) {
        console.log("[ratings.vue] ratings exists. No need to reload.");
        return {
          ratings: data["ratings"],
          restaurant: params.restaurant
        };
      }
    } catch (err) {
      console.log("[ratings.vue 1.]", err);
    }
    //2.如果无数据那么请求服务端去加载数据
    try {
      console.log(
        `[ratings.vue] asyncData: isClient : ${process.client}, isServer: ${
          process.server
        }`
      );
      let url = process.client
        ? `http://eleme.setsuna.wang:8101/api/ratings/${params.restaurant}`
        : `http://localhost:8101/api/ratings/${params.restaurant}`;
      console.log(`[ratings.vue] axios.get(url): ${url}`);
      let { data } = await axios.get(url);
      store.commit("update", {
        name1: params.restaurant,
        name2: "ratings",
        o: data
      });
      return {
        ratings: data,
        restaurant: params.restaurant
      };
    } catch (err) {
      console.log("[ratings.vue 2.]", err);
    }
  }
};
</script>
<style lang="stylus" scoped>
.ratings {
    // position relative
    // top 174px
    // bottom 0
    // left 0
    width 100%
    line-height 12px
    color rgb(7, 17, 27)

    .overview {
        display flex
        padding 18px 0

        .overview-left {
            flex 0 0 137px
            border-right 1px solid rgba(7, 17, 27, 0.1)

            @media only screen and (max-width: 320px) {
                flex 0 0 120px
                width 120px
            }

            .score {
                font-size 24px
                line-height 28px
                color rgb(255, 153, 0)
                text-align center
            }

            .title {
                font-size 12px
                line-height 12px
                font-weight 500
                text-align center
                margin 6px 0 8px 0
            }

            .rank {
                font-size 10px
                line-height 10px
                margin-bottom 6px
                text-align center
            }
        }

        .overview-right {
            flex 1

            .score-wrapper {
                padding 0 24px
                line-height 18px
                margin-bottom 8px
                height 18px

                @media only screen and (max-width: 320px) {
                    padding 0 5px
                }

                .title {
                    font-size 12px
                    line-height 18px
                    font-weight 500
                    text-align center
                    margin 0px 12px 8px 0
                }

                &:nth-of-type(3) {
                    span:nth-of-type(2) {
                        color rgb(147, 153, 159)
                        font-size 12px
                        font-weight 500
                    }
                }

                .score {
                    font-size 12px
                    color rgb(255, 153, 0)
                    line-height 18px
                    font-weight 500
                    vertical-align middle
                    margin-left 12px
                }
            }
        }
    }
}
</style>


