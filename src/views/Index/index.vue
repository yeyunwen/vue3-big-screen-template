<script setup lang="ts">
import LeftTop from './left-top/index.vue'
import LeftCenter from './left-center/index.vue'
import LeftBottom from './left-bottom/index.vue'
import RightTop from './right-top/index.vue'
import RightCenter from './right-center/index.vue'
import RightBottom from './right-bottom/index.vue'
import CenterTop from './center-top/index.vue'

defineOptions({
  name: 'Index',
})
</script>

<template>
  <div class="index-container">
    <div class="left-container">
      <div class="left-top-wrap">
        <left-top />
      </div>
      <div class="left-center-wrap">
        <left-center />
      </div>
      <div class="left-bottom-wrap">
        <left-bottom />
      </div>
    </div>

    <div class="center-warp">
      <center-top />
    </div>

    <div class="right-container">
      <div class="right-top-wrap">
        <right-top />
      </div>
      <div class="right-center-wrap">
        <right-center />
      </div>
      <div class="right-bottom-wrap">
        <right-bottom />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$left: vw(20);
$left-width: vw(480);
$left-gap: vh(10);

$right: vw(20);
$right-width: vw(480);
$right-gap: vh(10);

.left-container {
  position: absolute;
  left: $left;
  .left-top-wrap {
    margin-bottom: $left-gap;
    width: $left-width;
    height: vh(380);
    border: vw(1) solid red;
    transition: all 0.1s; // 过渡时间最好和echart内resize的防抖时间一致
  }
  .left-center-wrap {
    margin-bottom: $left-gap;
    width: $left-width;
    height: vh(272);
    border: vw(1) solid red;
  }
  .left-bottom-wrap {
    width: $left-width;
    height: vh(268);
    border: vw(1) solid red;
  }
}
.right-container {
  position: absolute;
  right: $right;
  .right-top-wrap {
    margin-bottom: $right-gap;
    width: $right-width;
    height: vh(380);
    border: vw(1) solid red;
  }
  .right-center-wrap {
    margin-bottom: $right-gap;
    width: $right-width;
    height: vh(272);
    border: vw(1) solid red;
  }
  .right-bottom-wrap {
    width: $right-width;
    height: vh(268);
    border: vw(1) solid red;
  }
}

.center-warp {
  position: absolute;
  top: vh(88);
  left: 50%;
  width: vh(480);
  height: vh(150);
  transform: translateX(-50%);
  border: vw(1) solid red;
}
</style>
