<script setup lang="ts">
import { useTemplateRef, nextTick, watch, ref } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import echarts from '@/echarts'
import { merge } from 'es-toolkit'
import Header from './components/header.vue'

const appStore = useAppStore()

const showBig = ref(false)
const bigChartRef = useTemplateRef<HTMLElement>('bigChart')

const handleClose = () => {
  showBig.value = false
}

watch(
  () => appStore.chartData,
  (newVal) => {
    if (newVal.option) {
      showBig.value = true
      nextTick(() => {
        const chart = echarts.init(bigChartRef.value!)
        chart.setOption(merge(newVal.option!, appStore.chartData.bigOption!))
      })
    }
  },
)
</script>

<template>
  <div class="default-layout">
    <div class="header-wrapper">
      <Header />
    </div>
    <div class="main-wrapper">
      <router-view />
    </div>
    <div
      v-if="showBig"
      :title="appStore.chartData.title"
      style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
    >
      <button @click="handleClose">关闭</button>
      <div class="dialog-chart">
        <div ref="bigChart" style="width: 100%; height: 100%"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$header-height: vh(74);
$main-x-padding: vw(20);
$main-top-margin: vh(30);

.default-layout {
  width: 100%;
  height: 100vh;
  .header-wrapper {
    width: 100%;
    height: $header-height;
  }
  .main-wrapper {
    margin-top: $main-top-margin;
    padding: 0 $main-x-padding;
    width: 100%;
    height: calc(100vh - $header-height - $main-top-margin);
    overflow-y: auto;
  }
  .dialog-chart {
    width: vw(600);
    height: vh(500);
  }
}
</style>
