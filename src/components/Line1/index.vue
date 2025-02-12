<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from 'vue'
import { type ECOption, useEchart } from '@/echarts'
import { merge } from 'es-toolkit'
import { baseOption } from './option'
defineOptions({
  name: 'Line1',
})
// 注入数据类型
type InjectData = {
  xList: string[]
  yList: number[]
}

const props = defineProps<{
  /** 需要注入的数据 */
  injectData: InjectData | undefined
}>()

const chartRef = useTemplateRef<HTMLElement>('chart')
// 通过hooks初始化图表。可以自带resize、loading
const { setOption, getInputOption, initChart } = useEchart(chartRef)

// 注入业务数据
const createChartOption = (data: InjectData): ECOption => {
  // 这里通过echart的类型，可以清晰的知道需要注入的数据用于echart的哪些配置
  const exctrOption: ECOption = {
    xAxis: {
      data: data.xList,
    },
    series: [
      {
        data: data.yList,
      },
    ],
  }

  return merge(baseOption, exctrOption)
}

// 渲染图表
const render = () => {
  setOption(createChartOption(props.injectData!))
}

onMounted(() => {
  initChart()
})

// 监听注入数据的变化，变化则重新渲染图表
watch(
  () => props.injectData,
  () => {
    render()
  },
)

// 暴露方法
defineExpose({
  getInputOption,
})
</script>

<template>
  <!-- 宽高由父级控制 -->
  <div ref="chart" style="width: 100%; height: 100%"></div>
</template>

<style scoped></style>
