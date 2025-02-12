<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from 'vue'
import { type ECOption, useEchart } from '@/echarts'

defineOptions({
  name: 'Echart',
})

const props = defineProps<{
  /** 图表配置 */
  option: ECOption
}>()

const chartRef = useTemplateRef<HTMLElement>('chart')
// 通过hooks初始化图表。可以自带resize、loading
const { setOption, getInputOption, initChart } = useEchart(chartRef)

// 渲染图表
const render = () => {
  setOption(props.option)
}

onMounted(() => {
  initChart()
})

// 监听注入数据的变化，变化则重新渲染图表
watch(
  () => props.option,
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
