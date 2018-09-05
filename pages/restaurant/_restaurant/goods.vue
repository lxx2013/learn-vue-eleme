<template>
<div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item,_index) in goods" :key="_index" class="menu-item">
          <span class="text">
            <span v-show="item.type>0"  class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="(item,_index) in goods" :key="_index" class="food-list" >
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" :key="index" class="food-item">
              <div class="icon">
                <img  alt="food.icon" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span>￥{{food.price}}</span>
                  <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
</div>
   
</template>
<script>
import axios from "axios";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {};
  },
  async asyncData({ params, store }) {
    //1.首先检测是否有数据缓存
    try {
      let data = store.state.restaurants[params.restaurant];
      if (data && data["goods"]) {
        console.log("[goods.vue] goods exists. No need to reload.");
        return { goods: data["goods"], restaurant: params.restaurant };
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
        ? `http://eleme.setsuna.wang:8101/api/goods/${params.restaurant}`
        : `http://localhost:8101/api/goods/${params.restaurant}`;
      console.log(`[goods.vue] axios.get(url): ${url}`)
      let { data } = await axios.get(url);
      store.commit('update',{name1:params.restaurant,name2:'goods',o:data});
      return { goods: data, restaurant: params.restaurant };
    } catch (err) {
      console.log("[goods.vue 2.]", err);
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  }
};
</script>
<style lang="less" scoped>
@import url("~assets/mixin.less");
ul {
  list-style: none;
}
.goods {
  position: absolute;
  display: flex;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px; //flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
    width: 80px; //flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
    background-color: #f3f5f7; //flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
    //flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
    .menu-item {
      display: table;
      line-height: 14px;
      width: 80px;
      height: 54px;
      padding: 0 12px;
      .icon {
        float: left;
        width: 12px;
        height: 12px;
        background-repeat: no-repeat;
        background-size: 12px 12px;
        background-position: center center;
        vertical-align: middle;
        &.decrease {
          .bg-image("decrease_3");
        }
        &.discount {
          .bg-image("discount_3");
        }
        &.special {
          .bg-image("special_3");
        }
        &.invoice {
          .bg-image("invoice_3");
        }
        &.guarantee {
          .bg-image("guarantee_3");
        }
      }
      .text {
        font-size: 12px;
        font-weight: 400;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        width: 56px;
        .border-1px(rgba(7,17,27,0.1));
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    line-height: 20px;
    .title {
      font-style: 24px;
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-style: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      .border-1px(rgba(7,17,27,0.1));
      &:last-child:after {
        border: none;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
