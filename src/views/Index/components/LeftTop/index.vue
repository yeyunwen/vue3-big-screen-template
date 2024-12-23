<script setup lang="ts">
import Line1 from '@/components/Echart/Line1/index.vue'
import { onMounted, ref, useTemplateRef } from 'vue'
import { useAppStore } from '@/stores/modules/app'
defineOptions({
  name: 'LeftTop',
})
const appStore = useAppStore()
const line1Ref = useTemplateRef<typeof Line1>('line1')
const clickBig = () => {
  appStore.chartData = {
    option: line1Ref.value?.getInputOption(),
    title: 'TopLeftTitle',
  }
}

// 父容器在使用时，只需要注入数据
const injectData = ref<InstanceType<typeof Line1>['injectData']>()
const fetchDataApi = (): Promise<InstanceType<typeof Line1>['injectData']> => {
  return new Promise((resolve) => {
    resolve({
      xList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      yList: [120, 200, 150, 80, 70, 110, 130, 140, 150, 160],
    })
  })
}

onMounted(async () => {
  const data = await fetchDataApi()
  injectData.value = data
})
</script>

<template>
  <div class="left-top">
    <div class="button-wrap">
      <button @click="clickBig">放大</button>
    </div>
    <div class="chart-wrap">
      <Line1 ref="line1" :inject-data="injectData" />
    </div>
  </div>
</template>

<style scoped>
.left-top {
  width: 100%;
  height: 100%;
  .button-wrap {
    display: flex;
    justify-content: flex-end;
  }
  .chart-wrap {
    width: 100%;
    height: calc(100% - 32px);
  }
}
</style>
