<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type ECOption } from '@/echarts'
import { baseOption, bigOption } from './option'
import { merge } from 'es-toolkit'
import { useShowBig } from '@/hooks/useShowBig'
import type { SelectProps } from 'ant-design-vue'

defineOptions({
  name: 'left-center',
})
type InjectData = {
  xList: string[]
  yList: number[]
}

const selectValue = ref('')
const selectOption: SelectProps['options'] = [
  {
    value: 'jack',
    label: 'Jack',
  },
  {
    value: 'lucy',
    label: 'Lucy',
  },
  {
    value: 'disabled',
    label: 'Disabled',
    disabled: true,
  },
  {
    value: 'yiminghe',
    label: 'Yiminghe',
  },
]

const title = 'left-center'
const chartRef = ref()
const chartOption = ref<ECOption>({})

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

  return merge(baseOption(), exctrOption)
}

// 父容器在使用时，只需要注入数据
const fetchDataApi = (): Promise<InjectData> => {
  return new Promise((resolve) => {
    resolve({
      xList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      yList: [120, 200, 150, 80, 70, 110, 130, 140, 150, 160],
    })
  })
}

const { showBig } = useShowBig({
  chartRef,
  title,
  bigOption,
})

const clickBig = () => {
  showBig()
}

const onResize = () => {
  chartOption.value = merge(chartOption.value, baseOption())
}

onMounted(async () => {
  const data = await fetchDataApi()
  chartOption.value = createChartOption(data)
})
</script>

<template>
  <div class="left-top">
    <border-box-1 :title="title">
      <template #right>
        <a-select
          class="big-screen"
          popupClassName="big-screen"
          v-model:value="selectValue"
          :options="selectOption"
        ></a-select>
        <button @click="clickBig">放大</button>
      </template>
      <Echart ref="chartRef" :option="chartOption" :on-resize="onResize" />
    </border-box-1>
  </div>
</template>

<style lang="scss" scoped>
.left-top {
  width: 100%;
  height: 100%;
  .big-screen {
    width: vw(100);
  }
}
</style>
