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
    <ratingselect :selectType="selectType"  :desc="desc" :ratings="ratings" :onlyContent="onlyContent" @switch="onlyContent = !onlyContent" @select="selectType  = arguments[0]"></ratingselect>
    <div class="rating-wrapper">
        <ul style="list-style:none">
            <li v-for="(rating,index) in ratings" :key="index" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                <div class="avatar">
                    <img :src="hashImage(rating.username,rating.avatar)" alt="rating.avatar" width="28px" height="28px">
                </div>
                <div class="content">
                    <h1 class="name">{{rating.username}}</h1>
                    <div class="star-wrapper">
                        <star :size="24" :score="rating.score"></star>
                        <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                    </div>
                    <p class="text">{{rating.text}}</p>
                    <div class="reply" v-if="rating.reply">{{rating.reply}}</div>
                    <div class="order-image-wrapper">
                        <img :src="getUrl(img.image_hash)" alt="order-image" v-for="(img,_index) in rating.order_images" :key="_index" :style="flexImageStyle(rating.order_images)">
                    </div>
                    <div class="recommend" v-if="recommend(rating)">
                        <i class="icon-thumb_up"></i>
                        <span v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                    </div>
                    <div class="time">{{rating.rateTime|formatDate }}</div>
                </div>
            </li>     
        </ul>
    </div>
</div>
</template>
<script>
import axios from "axios";
import star from "~/components/star.vue";
import split from "~/components/split.vue";
import ratingselect from "~/components/ratingselect.vue";
import { formatDate } from "~/assets/common.js";

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
  transition: "content",
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
  methods: {
    recommend(rating) {
      return rating.recommend && rating.recommend.length;
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    hashImage(name, url) {
      if (url == "http://7xr4g8.com1.z0.glb.clouddn.com/") {
        name = name.charCodeAt(0) * 100 + name.charCodeAt(name.length - 1);
        return "http://7xr4g8.com1.z0.glb.clouddn.com/" + name % 900;
      }
      else {
        return url
      }
    },
    getUrl(url) {
      if (!(typeof url == "string")) {
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
          `.${RegExp.$1}` +
          "?imageMogr/format/png/thumbnail/150x/";
      }
      return ourl;
    },
    flexImageStyle(images){
        if(images && images.length!=0){
            let o =`width:${80/images.length}vw;height:${80/images.length + 'vw'}`
            return o
        }
        else {
            return ''
        }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
      //console.log(formatDate)
    },
    randomImage(url) {
      if (url == "http://7xr4g8.com1.z0.glb.clouddn.com/") {
        return url + parseInt(Math.random() * 900);
      } else {
        return url;
      }
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
        ? `https://eleme.setsuna.wang/api/ratings/${params.restaurant}`
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
@import '~assets/mixin'


.ratings {
    // position relative
    // top 174px
    // bottom 0
    // left 0
    width 100%
    line-height 12px
    color rgb(7, 17, 27)
    z-index 300

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

    .rating-wrapper {
        padding 0 18px
        color rgb(7, 17, 27)

        .rating-item {
            display flex
            padding 18px 0
            border-1px(rgba(7, 17, 27, 0.1))

            .avatar {
                flex 0 0 28px
                margin-right 12px

                img {
                    border-radius 50%
                }
            }

            .content {
                flex 1
                position relative

                .name {
                    line-height 12px
                    font-size 10px
                    margin-bottom 4px
                }

                .star-wrapper {
                    margin-bottom 6px
                    font-size 0

                    .star {
                        display inline-block
                        margin-right 6px
                        vertical-align top
                    }

                    .delivery {
                        font-size 10px
                        font-weight 200
                        color rgb(147, 153, 159)
                        line-height 12px
                    }
                }

                .text {
                    line-height 18px
                    font-weight 400
                    margin 6px 0 8px 0
                    font-size 14px
                }

                .reply {
                    padding 8px
                    margin 8px 0
                    background-color rgb(243, 243, 243)
                    font-size 12px
                    line-height 14px
                    position relative
                    border-radius 1vw

                    &:after {
                        content ' '
                        position absolute
                        bottom 100%
                        left 15px
                        width 0
                        height 0
                        border-style solid
                        border-width 0 8px 8px
                        // border-width top right+left bottom
                        border-color transparent transparent #f3f3f3
                        // border-color red blue green yellow
                    }
                }
                .order-image-wrapper{
                    display flex 
                    flex-direction row
                    flex-wrap nowrap
                    width 80vw
                    
                    margin-bottom 8px
                    img{
                        flex 0 1 150px
                        max-height 150px
                    }
                }
                .recommend {
                    line-height 16px

                    .icon-thumb_up {
                        display inline-block
                        margin 0 8px 4px 0
                        color rgb(0, 160, 220)
                        vertical-align top
                        transform translateY(2px)
                    }

                    span {
                        font-size 9px
                        background-color #ebf5ff
                        padding 0 6px
                        margin-left 8px
                        margin-bottom 8px
                        color #6d7885
                    }
                }

                .time {
                    line-height 12px
                    font-size 10px
                    color rgb(147, 153, 159)
                    position absolute
                    top 0
                    right 0px
                }
            }
        }
    }
}
</style>


