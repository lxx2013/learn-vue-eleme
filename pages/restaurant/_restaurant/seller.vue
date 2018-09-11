<template>
<div class="seller">
    <div class="seller-content">
        <div class="overview">
            <h1 class="title">{{seller.name}}</h1>
        </div>
        <div class="desc">
            <star :size="36" :score="seller.score"></star>
            <span class="text">({{seller.ratingCount}})</span>
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
    </div>
    <split></split>
    <div class="bulletin">
        <h1 class="title">活动与服务</h1>
    </div>
</div>
</template>
<script>
import star from "~/components/star.vue";
import split from "~/components/split.vue";

export default {
  components: {
    star,
    split
  },
  props: {
    seller: {
      type: Object
    }
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
    }
    .bulletin{
        padding 18px
        
    }
}
</style>


