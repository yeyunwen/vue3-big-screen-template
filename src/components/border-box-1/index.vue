<script lang="ts" setup>
defineOptions({
  name: 'BorderBox1',
  inheritAttrs: true,
})

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  customLeftStyle: {
    type: Object,
  },
})
</script>

<template>
  <div class="border-box1">
    <div class="header-container">
      <div class="title" :style="{ ...props.customLeftStyle }">{{ props.title }}</div>
      <div class="header-right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="content-container">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$header-height: vh(54);

.border-box1 {
  position: relative;
  height: 100%;
  width: 100%;
  background-image: url('@/assets/imgs/borderbg.png');
  background-size: 100% 100%;
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: vh(10) vw(18);
    height: $header-height;
    overflow: hidden;
    .title {
      font-size: vw(20);
    }
    .header-right {
      display: flex;
      align-items: center;
    }
  }
  .content-container {
    height: calc(100% - $header-height);
  }
}
</style>
