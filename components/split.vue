<template>
<div class='split'>

</div>
</template>
<script>
export default {};
</script>
<style lang='stylus' scoped>
.split{
    width:100%
    height:16px
    background-color #f3f5f7
    position: relative;
      &:after {
        display: block;
        position: absolute;
        left: 0;
        bottom: 1px;
        width: 100%;
        border-top: 1px solid $color;
        content: ' ';
        $media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio:2) {
          -webkit-transform: scaleY(0.5)
          transform: scaleY(0.5)
        }
        $media (-webkit-min-device-pixel-ratio: 3),
        (min-device-pixel-ratio:3) {
          -webkit-transform: scaleY(0.333333)
          transform: scaleY(0.333333)
        }
      }
      &:before {
        display: block;
        position: absolute;
        left: 0;
        top: 1px;
        width: 100%;
        border-top: 1px solid $color;
        content: ' ';
        $media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio:2) {
          -webkit-transform: scaleY(0.5)
          transform: scaleY(0.5)
        }
        $media (-webkit-min-device-pixel-ratio: 3),
        (min-device-pixel-ratio:3) {
          -webkit-transform: scaleY(0.333333)
          transform: scaleY(0.333333)
        }
      }
    
}
</style>