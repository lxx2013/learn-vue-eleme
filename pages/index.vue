<template>
  <section >
      <transition-group name="list" tag="ul" class='seller-list'>
        <li v-for="(seller,index) in sellers" :key="index" v-if="seller.isLike" class='list-item'>
          <a :href="'\/restaurant\/'+index+'\/goods'">
              <div class="shadow" v-if="seller.shadow" @click.stop.prevent="seller.shadow = !seller.shadow">
                <div class="dislike" @click.stop.prevent="seller.isLike=false">不喜欢</div>
              </div>
              <div class="left">
                <div class="avatar">
                  <img :src="seller.avatar" alt="seller.avatar">
                </div>
              </div>
              <div class="right">
                <div class="title">{{seller.name}}</div>
                <star :size="24" :score="seller.score"></star>
                <div class="star-right">{{seller.score+' '+'月售'+seller.sellCount+'单'}}</div>
                <div class="delivery-middle span-split">
                  <span>¥{{seller.minPrice}}起送</span>
                  <span>配送费¥{{seller.deliveryPrice}}</span>
                </div>
                <div class="delivery-right">
                  <span @click.stop.prevent="seller.shadow=!seller.shadow">···</span>
                  <div><span>蜂鸟专送</span></div>
                  <div class='span-split'>
                    <span>{{getDistance(seller.latitude,seller.longitude)}}km</span>
                    <span>{{getDistance(seller.latitude,seller.longitude)|getDeliveryTime}}分钟</span>
                  </div>
                </div>
                <div class="bulletin-bottom">
                  <div class="info-wrapper" v-if="seller.infos['品类']">
                    <span v-for="(item,index) in infoSplit(seller.infos['品类'])" :key="index">{{item}}</span>
                    <div class="recommend" v-if="seller['koubei-recommend']"><img src="https://fuss10.elemecdn.com/a/c1/24c767ffa7fd296d3e2d6f01798c6png.png?imageMogr/format/png/thumbnail/!20x20r/gravity/Center/crop/20x20/">口碑人气好店</div>
                  </div>
                  <div class="split"></div>
                  <div class="supports" @click.stop.prevent="seller.isFold = !seller.isFold" :class="seller.isFold?'fold':'unfold'">
                    <span class='button'>{{seller.activities.length}}个活动<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjOTk5IiBkPSJNNC41NzcgNS40MjNjLjc5Ljc3IDIuMDczLjc2NyAyLjg1NyAwbDQuMTItNC4wMjZDMTIuMzQ1LjYyNSAxMi4wOSAwIDEwLjk4NSAwSDEuMDI3Qy0uMDc3IDAtLjMzLjYzLjQ1NyAxLjM5N2w0LjEyIDQuMDI2eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+" :class="seller.isFold?'fold':'unfold'"></span>
                    <ul>
                      <li v-for="(item,index) in seller.activities" :key="index">
                        <span class="icon" :style="'background-color:#'+item.icon_color">{{item.icon_name | iconNameToOne}}</span>
                        <span class="text">{{item.description}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
          </a>
        </li>
      </transition-group>
  </section>
</template>

<script>
import axios from "axios";
import star from "~/components/star";
import { calculateDistance } from "~/assets/common.js";
export default {
  components: {
    star
  },
  data() {
    return {
      here: {}
    };
  },
  computed: {
    sellers() {
      var sellers = {};
      for (let i in this.$store.state.restaurants) {
        sellers[i] = this.$store.state.restaurants[i].seller;
        sellers[i].isFold = true;
        sellers[i].shadow = false;
        sellers[i].isLike = true;
      }
      return sellers;
    },
   
  },
  filters: {
    iconNameToOne(a) {
      if (typeof a == "string" && ["满", "发"].indexOf(a[0]) > -1) return a[1];
      else if (typeof a == "string") return a[0];
      else return a;
    },
    getDeliveryTime(a) {
      if(a<30){
        return Math.ceil(a*3+7)
      }
      else{
        return '∞';
      }
    }
  },
  methods: {
    infoSplit(str) {
      return str.split(/,|，/);
    },
    getDistance(la, lon) {
      //返回一个2位float
      var here = this.here;
      var dis = calculateDistance(here.latitude, here.longitude, la, lon);
      return Math.round(dis * 100) / 100;
    }
  },
  created() {
    this.classMap = [
      "decrease",
      "discount",
      "special",
      "invoice",
      "guarantee",
      "first-order"
    ];
    this.activity = ["减", "折", "特", "票", "保", "首"];
  },
  mounted() {
    var flag = 0;
    var latitude, longitude;
    var getCurrentPosition = (options = {}) => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    };
    if (window && window.navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          console.log("h5定位成功；");
          this.here = { latitude, longitude };
        },
        (error)=> {
          console.log("h5定位权限被关闭；");
          this.here = { latitude: 30.514, longitude: 114.407 };
        }
      );
    } else 
    this.here = { latitude: 30.514, longitude: 114.407 };
  },
  async asyncData({ params, store }) {
    //请求服务端去加载数据
    try {
      console.log(
        `[index.vue] asyncData: isClient : ${process.client}, isServer: ${
          process.server
        }`
      );
      let url = process.client
        ? `http://eleme.setsuna.wang:8101/list/sellers`
        : `http://localhost:8101/list/sellers`;
      console.log(`[index.vue 2.] axios.get(url): ${url}`);
      let { data } = await axios.get(url);
      for (let i = 0; i < data.length; i++) {
        let url = process.client
          ? `http://eleme.setsuna.wang:8101/api/seller/${data[i]}`
          : `http://localhost:8101/api/seller/${data[i]}`;
        let data2 = (await axios.get(url)).data;
        store.commit("update", { name1: data[i], name2: "seller", o: data2 });
      }
    } catch (err) {
      console.log("[index.vue 40.]", err);
    }
  }
};
</script>

<style lang='stylus' scoped>
@import '~assets/mixin'

.list-item {
  transition all 0.6s cubic-bezier(0.13, 1.33, 0.97, 1.09)
  display inline-block
}

.list-enter, .list-leave-to, {
  opacity 0
  transform translateX(-160%)
}

.list-leave-active {
  position absolute
}

* {
  line-height 17px
}

.seller-list {
  .list-item {
    width 100%
  }

  li>a {
    display flex
    flex-direction row
    position relative
    width 100%
    padding 4vw 2.67vw
    text-decoration none
    font-size 12px
    color #666
    font-weight normal

    &:firs-of-type:after {
      display none
    }

    &:after {
      display block
      position absolute
      left 0
      top 0px
      width 100%
      border-top 1px solid $line
      content ' '

      $media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio:2) {
        -webkit-transform scaleY(0.5)
        transform scaleY(0.5)
      }

      $media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio:3) {
        -webkit-transform scaleY(0.333333)
        transform scaleY(0.333333)
      }
    }

    .shadow {
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      z-index 100
      background-color rgba(0, 0, 0, 0.5)

      .dislike {
        width 13.33vw
        height 13.33vw
        border-radius 50%
        background-color #fff
        text-align center
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        font-size 12px
        font-weight 600
        line-height 13.33vw
      }
    }

    .left {
      width 17.33vw
      height 17.33vw

      img {
        width 100%
        height 100%
        border 0.133333vw solid rgba(0, 0, 0, 0.08)
      }
    }

    .right {
      padding-left 2.67vw
      width 100%

      .title {
        font-size 16.5px
        color #333
        font-weight 700
        height 24px
      }

      .star-right {
        display inline-block
        height 17px
        padding-left 3px
        vertical-align middle
      }

      .delivery-middle {
        margin-top 3px
        height 12px
        line-height 17px
      }

      .delivery-right {
        position absolute
        right 2.67vw
        top 2.67vw
        text-align right
        color #999

        span:first-of-type {
          height 24px
          line-height 24px
        }

        div:first-of-type span {
          background-image linear-gradient(45deg, #0085ff, #0af)
          color white
          border-radius 5px
          background-size 100% 80%
          background-repeat no-repeat
          background-position center center
        }
      }

      .bulletin-bottom {
        .info-wrapper {
          margin 3.5vw 2.67vw 0 0

          span {
            border 1px solid #ddd
            padding 0 1vw
            margin-right 1.3vw
            height 17px
            line-height 17px
            vertical-align middle
            font-family 'Helvetica Neue', Tahoma, Arial, PingFangSC-Regular, 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif
          }

          div {
            display inline-block
            color #e8470b

            img {
              width 11px
              height 11px
              vertical-align top
              margin 3px
            }
          }
        }

        .split {
          margin-top 3.5vw
          width 100%
          border-1px(#eee)
        }

        .supports {
          position relative
          overflow hidden

          &.fold {
            max-height 48px
            overflow hidden
          }

          &.unfold {
          }

          .button {
            position absolute
            top 0
            right 0
            color #999
            line-height 24px

            img {
              transition all 0.3s ease-in-out
              width 8px
              vertical-align middle
              margin-left 4px
            }

            .fold {
              transform rotate(0)
            }

            .unfold {
              transform rotate(180deg)
            }
          }

          ul {
            diplay flex
          }

          li {
            line-height 24px

            .icon {
              color white
              display inline-block
              line-height 15px
              border-radius 3px
              background-position center center
              background-repeat no-repeat
              margin-right 4px
              padding 0 1px 0px 1px
              text-align center
            }
          }
        }
      }
    }
  }
}

.span-split {
  span {
    height 12px
    line-height 12px
  }

  span:first-of-type {
    border-right-1px($line)
    padding-right 6px
  }

  span:last-of-type {
    margin-left 3px
  }
}
</style>
