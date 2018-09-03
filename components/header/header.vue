<template>
  <div class="header" >
    <div class="blur-image"><img :src="seller.avatar" alt="blur-image" width="100vw" height="auto"></div>
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
        <div v-if="seller.supports" class="support">
          <span class="icon" :class= "classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if= "seller.supports" class="support-count" @click= "$store.commit('toggle_globalBlur');$store.commit('toggle_detailShow'); ">
        <span class="count">{{seller.supports.length}}个</span>
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
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  }
};
</script>

<style lang="less" scoped>
@import url("~assets/mixin.less");

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
      height: 50%;
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
        .bg-image("brand");
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
        display: inline-block;
        width: 12px;
        height: 12px;
        background-size: 12px 12px;
        vertical-align: top;
        &.decrease {
          .bg-image("decrease_1");
        }
        &.discount {
          .bg-image("discount_1");
        }
        &.special {
          .bg-image("special_1");
        }
        &.invoice {
          .bg-image("invoice_1");
        }
        &.guarantee {
          .bg-image("guarantee_1");
        }
      }
      .text {
        font-size: 10px;
        color: white;
        font-weight: 200;
        line-height: 12px;
        margin-left: 4px;
        vertical-align: top;
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
    .bg-image("bulletin");
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


</style>
