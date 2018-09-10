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
</div>
</template>
<script>
import star from '~/components/star.vue'
import split from '~/components/split.vue'

export default {
    components:{
        star,
        split
    },
    props:{
        seller:{
            type:Object
        }
    }
}
</script>
<style lang="stylus" scoped>
.ratings{
    // position relative
    // top 174px
    // bottom 0
    // left 0
    width 100%
    line-height 12px
    color rgb(7,17,27)
    .overview{
        display flex
        padding 18px 0
        .overview-left{
            flex 0 0 137px
            border-right 1px solid rgba(7,17,27,0.1)
            @media only screen and (max-width:320px){
                    flex 0 0 120px
                    width 120px
            }
            .score{
                font-size 24px
                line-height 28px
                color rgb(255,153,0)
                text-align center
            }
            .title{
                font-size 12px
                line-height 12px
                font-weight 500
                text-align center
                margin 6px 0 8px 0
            }
            .rank{
                font-size 10px
                line-height 10px
                margin-bottom 6px
                text-align center
            }
            
        }
        
        .overview-right{
            flex 1
            .score-wrapper{
                padding 0 24px
                line-height 18px
                margin-bottom 8px
                height 18px
                @media only screen and (max-width:320px){
                    padding 0 5px
                }
                .title{
                    font-size 12px
                    line-height 18px
                    font-weight 500
                    text-align center
                    margin 0px 12px 8px 0
                }
                &:nth-of-type(3){
                    span:nth-of-type(2){
                        color:rgb(147,153,159)
                        font-size 12px
                        font-weight 500
                    }
                }
                .score{
                    font-size 12px
                    color rgb(255,153,0)
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


