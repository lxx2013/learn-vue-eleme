<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,_index) in goods" :key="_index" class="menu-item menu-item-hook" :class="{'current':currentIndex==_index}" @click="selectMenu(_index,$event)">
          <span class="text">
            <span v-if="item.icon_url" class="icon" :style="'background-image:url('+getUrl(item.icon_url)"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item,_index) in goods" :key="_index" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li  @click="checkFood(food,$event)" v-for="(food,index) in item.foods" :key="index" class="food-item">
              <div class="icon">
                <img width="95px" height="95px" alt="food.icon" :src="food.image_path | getUrl">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.month_sales}}份</span>
                  <span>好评率{{food.satisfy_rate}}%</span>
                </div>
                <div class="price">
                  <span>￥</span>
                  <span>{{((food.specfoods[0].price*100).toFixed(0))/100}}</span>
                  <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"></CartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCart :seller="seller"></ShopCart>
    <Food :food="checkedFood" ref="food"></Food>
  </div>

</template>
<script>
import axios from "axios";
import BScroll from "better-scroll";
import ShopCart from "~/components/shopcart.vue";
import CartControl from "~/components/cartcontrol.vue";
import Food from "~/components/food.vue";
import { setTimeout } from 'timers';
export default {
  transition: "content",
  components: {
    ShopCart,
    CartControl,
    Food
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      listHeight: [],
      scrollY: 0,
      checkedFood: {}
    };
  },
  filters: {
    getUrl(url) {
      if (!(typeof url == "string")) {
        console.log("[goods.vue] getUrl : not String", url);
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
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  watch: {
    currentIndex: function(val) {
      let menuList = this.$refs.menuWrapper.getElementsByClassName(
        "menu-item-hook"
      );
      let el = menuList[val];
      this.menuScroll.scrollToElement(el, 200);
    }
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      });
      this.foodsScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      } else {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName(
          "food-list-hook"
        );
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 200);
      }
    },
    checkFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.checkedFood = food;
      this.$refs.food.show();
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
    }
  },
  async asyncData({ params, store }) {
    //1.首先检测是否有数据缓存
    try {
      let data = store.state.restaurants[params.restaurant];
      if (data && data["goods"]) {
        console.log("[goods.vue] goods exists. No need to reload.");
        return {
          goods: data["goods"],
          restaurant: params.restaurant
        };
      }
    } catch (err) {
      console.log("[goods.vue 1.]", err);
    }
    //2.如果无数据那么请求服务端去加载数据
    try {
      console.log(
        `[goods.vue] asyncData: isClient : ${process.client}, isServer: ${
          process.server
        }`
      );
      let url = process.client
        ? `https://eleme.setsuna.wang/api/goods/${params.restaurant}`
        : `http://localhost:8101/api/goods/${params.restaurant}`;
      console.log(`[goods.vue] axios.get(url): ${url}`);
      var { data } = await axios.get(url);
      store.commit("update", {
        name1: params.restaurant,
        name2: "goods",
        o: data
      });
      var output = {
        goods: data,
        restaurant: params.restaurant
      };
      //预取 ratings 数据
      url = process.client
        ? `https://eleme.setsuna.wang/api/ratings/${params.restaurant}`
        : `http://localhost:8101/api/ratings/${params.restaurant}`;
      console.log(`[ratings.vue] axios.get(url): ${url}`);
      data = (await axios.get(url)).data;
      store.commit("update", {
        name1: params.restaurant,
        name2: "ratings",
        o: data
      });
      return output;

    } catch (err) {
      console.log("[goods.vue 2.]", err);
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  mounted: function() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been rendered
      this._initScroll();
      this._calculateHeight();
    });
  }
};
</script>
<style lang="stylus" scoped>
@import '~assets/mixin'
.goods{
  cursor default
}
ul {
  list-style none
}

.goods {
  position absolute
  display flex
  top 177px
  bottom 46px
  width 100%

  .menu-wrapper {
    flex 0 0 80px // flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
    width 80px // flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
    background-color #f3f5f7 // flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
    // flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
    overflow-y auto

    &::-webkit-scrollbar {
      display none
    }

    .menu-item {
      display table
      line-height 14px
      width 80px
      height 54px
      padding 0 12px

      &.current {
        color rgb(240, 20, 20)
        font-weight 600
        margin-top -1px
        background-color #fff

        .text {
          border none
        }
      }

      .icon {
        float left
        width 12px
        height 12px
        background-repeat no-repeat
        background-size 12px 12px
        background-position center center
        vertical-align middle

        &.decrease {
          bg-image('decrease_3')
        }

        &.discount {
          bg-image('discount_3')
        }

        &.special {
          bg-image('special_3')
        }

        &.invoice {
          bg-image('invoice_3')
        }

        &.guarantee {
          bg-image('guarantee_3')
        }
      }

      .text {
        font-size 12px
        font-weight 400
        display table-cell
        vertical-align middle
        text-align center
        width 56px
      }
    }
  }

  .foods-wrapper {
    flex 1
    line-height 20px
    padding-left 10px
    overflow-y auto

    .title {
      font-size 12px
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      color rgb(147, 153, 159)
      background #f3f5f7
    }

    .food-item {
      display flex
      position relative
      padding 10px 0
      margin-bottom 1px
      border-1px(rgba(7, 17, 27, 0.1))

      &:last-child:after {
        border none
      }

      &:last-child {
        margin-bottom 0
      }

      .icon {
        flex 0 0 95px
        padding-right 10px
        cursor zoom-in
      }

      .content {
        flex 1

        .name {
          margin 2px 0 0 0
          height 17px
          line-height 17px
          font-size 14px
          color rgba(7, 17, 27, 0.9)
        }

        .desc, .extra {
          color rgb(147, 153, 159)
          font-size 12px
          line-height 12px
          margin 6px 0
          overflow hidden
          max-height 36px
        }

        .extra {
          span:first-child {
            margin-right 12px
          }
        }

        .price {
          position absolute
          bottom 10px

          span {
            font-size 22px
            color rgb(255, 83, 57)
            font-weight 400
            line-height 24px
            vertical-align middle
          }

          span:first-child {
            font-size 14px
          }

          .old-price {
            font-size 10px
            color #93999f
            text-decoration line-through
            font-weight 200
          }
        }

        .cartcontrol-wrapper {
          position absolute
          right 0
          bottom 3px
        }
      }
    }
  }
}
</style>
