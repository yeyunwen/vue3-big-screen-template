import type { ECOption } from '@/echarts'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

interface ChartData {
  option: ECOption | null
  title: string
  bigOption: ECOption | null
}

interface AppStore {
  chartData: Ref<ChartData>
  setChartData: (payload: ChartData) => void
}

export const useAppStore = defineStore('app', (): AppStore => {
  const chartData = ref<ChartData>({
    option: null,
    title: '',
    bigOption: null,
  })

  const setChartData = (payload: ChartData) => {
    chartData.value = payload
  }

  return {
    chartData,
    setChartData,
  }
})
