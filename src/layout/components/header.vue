<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const currentTime = ref('')
const timeInterval = ref<number | null>(null)

const getCurrentTime = () => {
  timeInterval.value = setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString()
  }, 1000)
}

onMounted(() => {
  getCurrentTime()
})

onUnmounted(() => {
  if (timeInterval.value) {
    clearInterval(timeInterval.value)
  }
})
</script>

<template>
  <div class="header-container">
    <div class="header-left">left</div>
    <div class="header-center">XXX驾驶舱</div>
    <div class="header-right">
      <span>{{ currentTime }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: vw(20);
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-bottom: vh(1) solid #e4e4e4;
  .header-left,
  .header-right {
    font-size: vw(16);
  }

  .header-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: vw(20);
    font-weight: 600;
  }
}
</style>
