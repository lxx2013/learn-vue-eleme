<template>
    <div class="star" :class= "starType">
        <span v-for= "(item,index) in items" :class= "item" class="star-item" :key= "index"></span>
    </div>
</template>
<script>
export default {
    props:{
        size:{
            type:Number
        },
        score:{
            type:[Number,String]
        },
        max:{
            type:Number,
            default:5
        }
    },
    computed:{
        starType(){
            return 'star-'+this.size;
        },
        items(){
            var o = [];
            var floor = Math.floor(this.score)
            var i=0;
            for(i =0;i<floor;i++){
                o[i] = 'on'
            }
            if(this.score - floor > 0.25){
                o[i++] = 'half'
            }
            for(;i<this.max;i++){
                o[i] = 'off'
            }
            return o;
        }
    }
}
</script>

<style lang="stylus">
@import "~assets/mixin"
.star{
    font-size: 0;
    display:inline-block;
    vertical-align middle
    margin-top -2px
    .star-item{
        display: inline-block;
        background-repeat: no-repeat;
        vertical-align middle
    }
    &.star-48{
        .star-item{
            width: 20px;
            height: 20px;
            margin-right:22px;
            background-size: 20px 20px;
            font-size: 24px;
            line-height 24px
            &:last-child{
                margin-right: 0;
            }
            &.on{
                bg-image('star48_on')
            }
            &.half{
                bg-image('star48_half')
            }
            &.off{
                bg-image('star48_off')
            }
        }
    }
    &.star-36{
        .star-item{
            width: 15px;
            height: 15px;
            margin-right:6px;
            background-size: 15px 15px;
            font-size: 18px;
            line-height 18px
            &:last-child{
                margin-right: 0;
            }
            &.on{
                bg-image('star36_on')
            }
            &.half{
                bg-image('star36_half')
            }
            &.off{
                bg-image('star36_off')
            }
        }
    }
    &.star-24{
        .star-item{
            width: 10px;
            height: 10px;
            margin-right:3px;
            background-size: 10px 10px;
            font-size: 12px;
            line-height 12px
            &:last-child{
                margin-right: 0;
            }
            &.on{
                bg-image('star24_on')
            }
            &.half{
                bg-image('star24_half')
            }
            &.off{
                bg-image('star24_off')
            }
        }
    }
    
}
</style>


