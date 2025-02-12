<script setup lang="ts">
import LeftTop from './left-top/index.vue'
import LeftCenter from './left-center/index.vue'
import LeftBottom from './left-bottom/index.vue'

</script>

<template>
  <div class="left-top-wrap">
    <left-top />
  </div>
  <div class="left-center-wrap">
    <left-center />
  </div>
  <div class="left-bottom-wrap">
    <left-bottom />
  </div>
</template>

<style lang="scss" scoped>
$left-width: vw(480);
$left-gap: vh(10);

.left-top-wrap {
  margin-bottom: $left-gap;
  width: $left-width;
  height: vh(380);
  border: vw(1) solid red;

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
</style>
