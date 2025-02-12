import type { ECOption } from '@/echarts'
import { useAppStore } from '@/stores/modules/app'
import { useEchart } from '@/echarts'
import type { Ref } from 'vue'

export const useShowBig = ({
  chartRef,
  title,
  bigOption,
}: {
  chartRef: Ref<HTMLElement>
  title: string
  bigOption: ECOption
}) => {
  const appStore = useAppStore()
  const { getInputOption } = useEchart(chartRef)

  const showBig = () => {
    appStore.setChartData({
      option: getInputOption(),
      title,
      bigOption,
    })
  }

  return {
    showBig,
  }
}
