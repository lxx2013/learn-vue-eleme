<template>
  <section >
      <ul class='seller-list'>
        <li v-for="(seller,index) in sellers" :key="index">
          <a :href="'\/restaurant\/'+index+'\/goods'">
              <div class="shadow" v-if="seller.shadow" @click.stop.prevent="seller.shadow = !seller.shadow"></div>
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
                    <span>{{(Math.random()*2).toFixed(2)}}km</span>
                    <span>{{seller.deliveryTime}}分钟</span>
                  </div>
                </div>
                <div class="bulletin-bottom">
                  <div class="info-wrapper" v-if="seller.infos['品类']">
                    <span v-for="(item,index) in infoSplit(seller.infos['品类'])" :key="index">{{item}}</span>
                    <div class="recommend" v-if="seller['koubei-recommend']"><img src="//fuss10.elemecdn.com/a/c1/24c767ffa7fd296d3e2d6f01798c6png.png?imageMogr/format/webp/thumbnail/!20x20r/gravity/Center/crop/20x20/">口碑人气好店</div>
                  </div>
                  <div class="split"></div>
                  <div class="supports" @click.stop.prevent="seller.isFold = !seller.isFold" :class="seller.isFold?'fold':'unfold'">
                    <span class='button'>{{seller.supports.length}}个活动<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjOTk5IiBkPSJNNC41NzcgNS40MjNjLjc5Ljc3IDIuMDczLjc2NyAyLjg1NyAwbDQuMTItNC4wMjZDMTIuMzQ1LjYyNSAxMi4wOSAwIDEwLjk4NSAwSDEuMDI3Qy0uMDc3IDAtLjMzLjYzLjQ1NyAxLjM5N2w0LjEyIDQuMDI2eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+" :class="seller.isFold?'fold':'unfold'"></span>
                    <ul>
                      <li v-for="(support,index) in seller.supports" :key="index">
                        <span class="icon" :class="classMap[support.type]">{{activity[support.type]}}</span>
                        <span class="text">{{support.description}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
          </a>
        </li>
      </ul>
  </section>
</template>

<script>
import axios from "axios";
import star from '~/components/star'
export default {
  components: {
    star
  },
  data() {
    return {
    };
  },
  computed:{
    sellers(){
      var sellers = {}
      for(let i in this.$store.state.restaurants){
        sellers[i] = this.$store.state.restaurants[i].seller
        sellers[i].isFold = true;
        sellers[i].shadow = false;
      }
      return sellers;
    }
  },
  methods:{
    infoSplit(str){
      return str.split(/,|，/)
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee","first-order"];
    this.activity = ['减','折','特','票','保','首']
  },
  async asyncData({ params,store }) {
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
      console.log(`[index.vue 2.] axios.get(url): ${url}`)
      let { data } = await axios.get(url);
      for(let i=0;i<data.length;i++){
        let url = process.client
          ? `http://eleme.setsuna.wang:8101/api/seller/${data[i]}`
          : `http://localhost:8101/api/seller/${data[i]}`;
        let data2  = (await axios.get(url)).data;
        store.commit('update',{name1:data[i],name2:'seller',o:data2});
      }
    } catch (err) {
      console.log("[index.vue 40.]", err);
    }
  }
};
</script>

<style lang='stylus' scoped>
@import "~assets/mixin"
*{
  line-height 17px
}
.seller-list{
  li>a{
    display flex
    flex-direction row
    position relative
    width 100%
    padding 4vw 2.67vw
    text-decoration none
    font-size 12px
    color #666
    font-weight normal
    border-1px($line)
    .shadow{
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      z-index 100
      background-color rgba(0,0,0,0.5)
    }
    .left{
      width 17.33vw
      height 17.33vw
      img{
        width 100%
        height 100%
        border: .133333vw solid rgba(0,0,0,.08);
      }
    }
    .right{
      padding-left 2.67vw
      width 100%
      .title{
        font-size 16.5px
        color #333
        font-weight 700
        height 24px
      }
      .star-right{
        display inline-block
        height 17px
        padding-left 3px
        vertical-align middle
      }
      .delivery-middle{
        margin-top 3px
        height 12px
        line-height 17px
      }
      .delivery-right{
        position absolute
        right 2.67vw
        top 2.67vw
        text-align right
        color #999
        span:first-of-type{
          height 24px
          line-height 24px
        }
        div:first-of-type span{
          background-image linear-gradient(45deg,#0085ff,#0af)
          color white
          border-radius 5px
          background-size 100% 80%
          background-repeat no-repeat
          background-position center center
        }
      }
      .bulletin-bottom{
        .info-wrapper{
          margin 3.5vw 2.67vw 0 0
          span{
            border 1px solid #ddd
            padding 0 1vw
            margin-right 1.3vw
            height 17px
            line-height 17px
            vertical-align middle
            font-family 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif
          }
          div{
            display inline-block
            color #e8470b
            img{
              width 11px
              height 11px
              vertical-align top
              margin 3px
            }
          } 
        }
        .split{
          margin-top 3.5vw
          width 100%
          border-1px(#eee)
        }
        .supports{
          position relative
          &.fold{
            max-height 48px 
            overflow hidden 
          }
          &.unfold{
            
          }
          .button{
            position absolute 
            top 0
            right 0
            color #999
            img{
              transition all 0.3s ease-in-out
              width 8px
              vertical-align middle
              margin-left 4px
            }
            .fold{
              transform rotate(0)
            }
            .unfold{
              transform rotate(180deg)
            }
          }
          ul{
            diplay flex
          }
          li{
            line-height 24px
            .icon{
              color white
              border-radius 2px
              background-size 120% 100%
              background-position center center
              background-repeat no-repeat
              margin-right 4px
              padding 0 1px
              &.decrease {
                  background-color rgb(240,115,115)
              }

              &.discount {
                  background-color #2fa1d2
              }

              &.special {
                  background-color rgb(241,136,79)
              }

              &.invoice {
                  background-color #920783
              }

              &.guarantee {
                  background-color #00cc99
              }

              &.first-order{
                  background-color rgb(112, 188, 70)
              }
            }
          }
        }
      }
    }
  }
}
.span-split{
  span{
    height 12px
    line-height 12px
  }
  span:first-of-type{
    border-right-1px($line)
    padding-right 3px
  }
  span:last-of-type{
    margin-left 3px
  } 
}
</style>
