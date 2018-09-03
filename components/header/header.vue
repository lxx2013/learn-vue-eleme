<template>
  <div class="header" >
    <div class="blur-image"><img :src="seller.avatar" alt="blur-image"></div>
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
      <div v-if= "seller.supports" class="support-count" @click= "detailShow = !detailShow">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-img"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div v-show= "detailShow" class="detail">
      <div class="blur"></div>
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper"><star :size="48" :score="4.5"></star></div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for= "(item,index) in seller.supports" :key= "index" :class="classMap[seller.supports[index].type]">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
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
      <i class="icon-close" @click= "detailShow = !detailShow"></i>
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
      detailShow: false
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
.detail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 100;
  color: white;
  background-color: rgba(7, 17, 27, 0.8);
  .blur {
    position: fixed;
    // top:-50%;
    // left:-50%;
    // width: 200%;
    // height: 200%;
    // background-color: rgba(7, 17, 27 , 0.8);
    // background-size: 150% 150%;
    // background-position: -50% -50%;
    // filter:blur(10px);
    // z-index:99;
  }
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
          .border-1px(rgba(255,255,255,0.2));
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
