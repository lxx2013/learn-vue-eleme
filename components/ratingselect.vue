<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2)" class="block all"  :class="{'active':selectType==2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positve" :class="{'active':selectType==0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{'active':selectType==1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="onlyContent=!onlyContent">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  components: {},
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    originSelectType: {
      type: Number,
      default: ALL
    },

    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },
  data() {
    return {
      selectType: 2,
      onlyContent: true
    };
  },
  methods: {
    select(s) {
      this.selectType = s;
    }
  },
  computed: {
    positives() {
      return this.ratings.filter(rating => {
        return rating.rateType === 0;
      })
    },
    negatives() {
      return this.ratings.filter(rating => {
        return rating.rateType === 1;
      }) 
    },
  },
  created() {
    this.selectType = this.originSelectType;
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/mixin'

.ratingselect {
  line-height 20px

  .rating-type {
    padding 18px 0
    margin 0 18px
    border-1px(rgba(7, 17, 27, 0.1))

    .block {
      display inline-block
      padding 8px 12px
      margin-right 8px
      border-radius 1px
      color rgb(77, 85, 93)
      font-size 12px
      line-height 16px

      &.positve, &.all {
        background-color #ebf5ff
      }

      &.negative {
        background-color rgba(77, 85, 93, 0.2)
      }

      &.active {
        color white
        background-color #0097ff
      }

      .count {
        margin-left 2px
        font-size 8px
      }
    }
  }

  .switch {
    padding 12px 18px
    line-height 24px
    border-1px(rgba(7, 17, 27, 0.1))
    color rgb(147, 153, 159)

    &.on {
      .icon-check_circle {
        color #76d572
      }
    }

    .icon-check_circle {
      display inline-block
      vertical-align middle
      font-size 14px
      margin-right 4px

      .text {
        font-size 12px
      }
    }
  }
}
</style>

