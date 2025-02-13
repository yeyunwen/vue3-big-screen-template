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
})
</script>

<template>
  <div class="border-box1">
    <div class="header-container">
      <div class="title">{{ props.title }}</div>
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
$header-height: vw(54);

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
    padding: vw(18);
    height: $header-height;
    .title {
      font-size: vw(20);
    }
  }
  .content-container {
    height: calc(100% - $header-height);
  }
}
</style>
