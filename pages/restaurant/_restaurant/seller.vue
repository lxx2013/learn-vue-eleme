<template>
<div class="seller">
    <div class="seller-content">
        <div class="overview">
            <h1 class="title">{{seller.name}}</h1>
        </div>
        <div class="desc">
            <star :size="36" :score="seller.score"></star>
            <span class="text">{{seller.score}}</span>
            <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark" style="list-style:none">
            <li class="block">
                <h2>起送价</h2>
                <div class="content">
                    <span class="stress">{{seller.minPrice}}元</span>
                </div>
            </li>
            <li class="block">
                <h2>商家配送</h2>
                <div class="content">
                    <span class="stress">{{seller.deliveryPrice}}</span>元
                </div>
            </li>
            <li class="block">
                <h2>平均配送时间</h2>
                <div class="content">
                    <span class="stress">{{seller.deliveryTime}}</span>分钟
                </div>
            </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
            <span class="icon-favorite" :class="{'active':favoriteActive}"></span>
            <span class="text">{{favoriteText}}</span>
        </div>
    </div>
    <split></split>
    <div class="bulletin">
        <h1 class="title">活动与服务</h1>
        <ul v-if="seller.activities" class="activities">
          <li class="activity-item" v-for= "(item,index) in seller.activities" :key= "index" >
            <span class="icon" :style="'background-color:#'+item.icon_color">{{item.icon_name}}</span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
    </div>
    <split></split>
    <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper">
            <ul class="pic-list">
                <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index" @click="toggleImg(pic)">
                    <img :src="pic" width="120px" height="90px" alt="pic">
                </li>
            </ul>
        </div>
    </div>
    <split></split>
    <div class="info">
         <h1 class="title">商家信息</h1>
         <p>{{seller.bulletin}}</p>
         <div class="info-wrapper">
             <ul class="info-list">
                 <li class="info-item" v-for="(info,index) in seller. infos" :key="index">
                     <span class="left">{{index}}</span>
                     <a :href="'tel:'+info" v-if="index=='商家电话'" class='right'>{{info}}</a>
                     <span v-else class="right">{{info}}</span>
                 </li>
             </ul>
         </div>
    </div>
    <split></split>
    <div class="pics">
        <h1 class="title">营业资质</h1>
        <div class="pic-wrapper">
            <ul class="pic-list">
                <li class="pic-item" v-for="(pic,index) in seller. certificate" :key="index" @click="toggleImg(pic)">
                    <img :src="pic" width="120px" height="90px" alt="pic">
                </li>
            </ul>
        </div>
    </div>
    <div class="big-img" v-if="showFlag" @click="toggleImg()">
        <img :src="bigImgSrc" alt="pic">
    </div>
    <div class="shadow" v-show="showFlag" @click="toggleImg()"></div>
</div>
</template>
<script>
import star from "~/components/star.vue";
import split from "~/components/split.vue";
import { saveToLocal,loadFromLocal } from '~/assets/store'

export default {
  components: {
    star,
    split
  },
  props: {
    seller: {
      type: Object
    }
  },
  data(){
      return {
          showFlag:false,
          bigImgSrc:'',
          favoriteActive:false
      }
  },
  computed:{
      favoriteText(){
          return this.favoriteActive ? '已收藏':'收藏'
      }
  },
  methods:{
      toggleImg(src){
          this.showFlag = ! this.showFlag
          this.bigImgSrc = ''
          if(!this.showFlag){
            return
          }
          /.*(\?.*)/.test(src)
          this.bigImgSrc = src.replace(RegExp.$1,'');
          console.log(this.bigImgSrc)
      },
      toggleFavorite(){
            this.favoriteActive = ! this.favoriteActive
            var name = Object.keys(this.$store.state.restaurants)[0]
            saveToLocal(name,'FavoriteActive',this.favoriteActive)
      }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee","first-order"];
    this.activity = ['满减','折扣','特价','发票','保险','首单']
  },
  mounted(){
      var name = Object.keys(this.$store.state.restaurants)[0]
      console.log(name)
      this.favoriteActive =  loadFromLocal(name,'FavoriteActive',false)
      console.log(`localStorage :`,localStorage)
  },
  transition:{
      name:'content',
  }
};
</script>
<style lang="stylus" scoped>
@import '~assets/mixin'

$line = rgba(7, 17, 27, 0.1)
$grey = rgb(7, 17, 27)
$147 = rgb(147, 153, 159)


.title {
    font-size 14px
    color $grey
    line-height 14px
    font-weight 500
}

.seller {
    line-height 20px
    position relative

    .seller-content {
        position relative
        padding 18px

        .overview {
            width 100%
        }

        .desc {
            padding 8px 0 18px 0
            line-height 18px
            border-1px($line)

            .star {
                margin-right 8px
            }

            .text {
                font-size 10px
                color rgb(77, 85, 93)
                line-height 18px
                margin-right 12px
            }
        }

        .remark {
            padding 18px 0 0 0
            display flex
            flex-direction row

            .block {
                width 33%
                border-right-1px($line)

                &:last-of-type:after {
                    display none
                }

                h2 {
                    font-size 10px
                    color $147
                    line-height 20px
                    text-align center
                }

                .content {
                    margin 4px auto 0
                    text-align center
                    font-size 10px

                    .stress {
                        width 100%
                        text-align center
                        font-size 24px
                    }
                }
            }
        }
        .favorite{
            position absolute
            width 40px
            right 18px
            top 18px
            text-align center
            .icon-favorite{
                display block
                color #d4d6d9
                font-size 24px
                &.active{
                    color rgb(240,20,20)
                }
            }
            .text{
                font-size 10px
                color rgb(77,85,93)
                line-height 10px
            }
        }
    }

    .bulletin {
        padding 18px
        font-size 12px
        font-weight 300
        .activities{
            margin-top 4.27vw
            .activity-item{
                margin-bottom 3vw
                .text{
                    vertical-align bottom
                }
            }
        }
    }
}

.icon {
    display inline-block
    height 16px
    line-height 16px
    padding: 0 6px;
    margin-right: 1.6vw;
    color white
    font-size 12px
    font-weight 400
    vertical-align middle
}
.pics{
    padding 18px
    font-size 12px
    font-weight 300
    .pic-wrapper{
        white-space nowrap
        overflow-x  auto
    }
    .pic-list{
        margin-top 8px
        .pic-item{
            display inline-block
            margin-right 7px
            
        }
    }
}
.info{
    padding 18px
    font-size 12px
    font-weight 300
    p {
        padding 16px 0
        border-1px($line)
    }
    .info-item{
        border-1px($line)
        padding 14px 0
        &:last-of-type:after{
            display:none;
        }
        &:last-of-type{
            padding-bottom 0
        }
        font-size 12px
        line-height 18px
        vertical-align middle
        display flex
        flex-direction row
        .left{
            flex 0 0 60px
            text-align left
            font-weight 500
        }
        .right{
            flex 1
            text-align right
        }
        a.right{
            color $grey
        }
        
    }
}
.big-img{
    position fixed
    top 50%
    left 0
    transform translateY(-50%)
    width 100vw
    z-index 900

    img{
        width 100vw
    }
}
.shadow{
    position fixed
    left 0 
    top 0
    width 100vw
    height 100vh
    background-color rgba(0,0,0,0.9)
}
</style>


