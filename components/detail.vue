<template>
    <div v-show= "$store.state.detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper"><star :size="48" :score="4.5"></star></div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.activities" class="supports">
            <li class="support-item" v-for= "(item,index) in seller.activities" :key= "index" >
              <span class="icon" :style="'background-color:#'+item.icon_color">{{item.icon_name | iconNameToOne}}</span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="detail-bulletin-wrapper">
            <div class="text">{{seller.bulletin}}</div>
          </div>
        </div>
      </div>
      <i class="icon-close" @click= "$store.commit('toggle_detailShow'); $store.commit('toggle_globalBlur')"></i>
    </div>
</template>
<script>
import star from "~/components/star.vue";

export default {
    components:{
        star
    },
    props: {
      seller: {
        type: Object
      }
    },
    filters:{
      iconNameToOne(a){
        if((typeof a == 'string') && ['满','发'].indexOf(a[0])>-1)
          return a[1]
        else if((typeof a == 'string'))
          return a[0]
        else 
          return a
      }
    },
    created() {
      this.classMap = ["decrease", "discount", "special", "invoice", "guarantee",'decrease'];
    }
}
</script>
<style lang="stylus" scoped>
@import "~assets/mixin"

    .detail {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      z-index: 100;
      color: white;
      background-color: rgba(7, 17, 27, .8)
      .detail-wrapper {
        min-height: 100%;
        width: 100%;

        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;
          z-index: 101;
          .name {
            line-height: 32px;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
          }
          .star-wrapper {
            text-align: center;
            height: 24px;
            margin: 16px auto 28px auto;
          }
          .title {
            width: 80%;
            display: flex;
            margin: 28px auto 24px auto;
            line-height: 12px;
            .line {
              flex: 1;
              top: -5px;
              border-1px(rgba(255,255,255,0.2))
            }
            .text {
              padding: 0 12px;
              font-size: 12px;
              font-weight: 700;
            }
          }
          .supports {
            width: 80%;
            list-style-type: none;
            margin: 24px auto 28px auto;
            .support-item {
              margin: 0 12px 12px 12px;
              .text {
                margin-left: 6px;
                font-size: 12px;
                font-weight: 400;
                color: white;
                line-height: 12px;
              }
              .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                background-repeat: no-repeat;
                background-size: 16px 16px;
                background-position: center center;
                vertical-align: middle;
                line-height 16px
                font-size 14px
                text-align center
                font-weight 400
                border-radius 3px
                padding 0 1px 0px 1px
                &.decrease {
                  bg-image("decrease_1")
                }
                &.discount {
                  bg-image("discount_1")
                }
                &.special {
                  bg-image("special_1")
                }
                &.invoice {
                  bg-image("invoice_1")
                }
                &.guarantee {
                  bg-image("guarantee_1")
                }
              }
            }
          }
          .detail-bulletin-wrapper{
            width: 80%;
            margin: 24px auto auto auto;
            line-height: 24px;
            .text{
              font-size: 12px;
              font-weight: 400;
              color:white;
            }
          }
        }
      }
      .icon-close {
        font-size: 32px;
        display: block;
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        color: rgba(255, 255, 255, 0.5);
      }
    }
</style>


