<template>
  <div class="header" >
    <div class="back-to-index"><a href="/"><i class="icon-arrow_lift"></i></a></div>
    <div class="blur-image"><img :src="seller['big-avatar']?seller['big-avatar']:seller['avatar']" alt="blur-image" width="100vw" height="33vw"></div>
    <div class="container-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64px" height="64px" alt="avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.activities" class="support">
          <span class="icon" :style="'background-color:#'+seller.activities[0].icon_color">{{seller.activities[0].icon_name | iconNameToOne }}</span>
          <span class="text">{{seller.activities[0].description}}</span>
        </div>
      </div>
      <div v-if= "seller.activities" class="support-count" @click= "$store.commit('toggle_globalBlur');$store.commit('toggle_detailShow'); ">
        <span class="count">{{seller.activities.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-img"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  </div>
</template>

<script>
import star from "~/components/star.vue";

export default {
  components: { star },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {

    };
  },
  computed: {
    // header_style:()=>{
    //   backgroundImage : `url${this.seller.avatar}`
    // }
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
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  }
};
</script>

<style lang="stylus" scoped>
@import "~assets/mixin"

.header {
  background-color: rgba(7, 17, 27, 0.5);
  position: relative;
  overflow: hidden;
  .blur-image {
    position: absolute;
    z-index: -1;
    top: 0;
    filter: blur(10px);
    img {
      width: 100vw;
      height: 33vw;
    }
  }
  
}

.container-wrapper {
  position: relative;
  padding: 24px 12px 18px 24px;

  .avatar {
    display: inline-block;
    vertical-align: top;
    border-radius: 2px;
    img {
      border-radius: 2px;
    }
  }

  .content {
    display: inline-block;
    vertical-align: top;
    margin-left: 16px;

    .title {
      margin: 2px 0 8px 0;
      font-size: 16px;
      color: rgb(255, 255, 255);
      font-weight: bold;
      line-height: 18px;

      .brand {
        display: inline-block;
        width: 30px;
        height: 18px;
        bg-image("brand")
        background-size: 30px 18px;
      }

      .name {
        vertical-align: top;
        margin-left: 6px;
      }
    }

    .description {
      font-size: 12px;
      color: white;
      font-weight: 200;
      line-height: 12px;
      margin-bottom: 10px;
    }

    .support {
      .icon {
        width: 14px;
        height: 15px;
        font-size 12px
        background-size: 12px 12px;
        color white
        display inline-block
        line-height 15px
        border-radius 3px
        background-position center center
        background-repeat no-repeat
        margin-right 2px
        padding 0 1px 0px 1px
        text-align center
        vertical-align top
      }
      .text {
        display inline-block
        font-size: 10px;
        color: white;
        font-weight: 200;
        line-height: 12px;
        margin-left: 4px;
        vertical-align: bottom;
        overflow hidden
        width 50vw
        white-space nowrap
        text-overflow ellipsis
      }
    }
  }
  .support-count {
    position: absolute;
    vertical-align: middle;
    right: 12px;
    bottom: 16px;
    height: 24px;
    border-radius: 12px;
    background-color: rgba(0, 0, 0, 0.2);
    font-size: 10px;
    color: white;
    line-height: 12px;
    height: 26px;
    padding: 7px 6px 7px 12px;
    .count {
      margin-right: 2px;
    }
  }
}
.bulletin-wrapper {
  position: relative;
  width: 100%;
  padding-right: 20px;
  min-width: 1px;
  background-color: rgba(7, 17, 27, 0.2);
  color: white;
  height: 28px;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .bulletin-img {
    display: inline-block;
    margin-left: 12px;
    width: 22px;
    height: 12px;
    bg-image("bulletin")
    background-size: 22px 12px;
  }
  .bulletin-text {
    margin-left: 4px;
    font-size: 10px;
    vertical-align: top;
  }
  .icon-keyboard_arrow_right {
    position: absolute;
    font-size: 10px;
    right: 12px;
    top: 8px;
  }
}

.back-to-index{
  position: absolute;
  top:10px;
  left:5px;
  width: 30px;
  height: 30px;
  z-index: 300;
  a{
    text-decoration: none;
    color: white;
    font-weight: 700;
  }
}
</style>
