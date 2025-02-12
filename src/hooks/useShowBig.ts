import type { ECOption } from '@/echarts'
import { useAppStore } from '@/stores/modules/app'
import type { Ref } from 'vue'

export const useShowBig = ({
  chartRef,
  title,
  bigOption,
}: {
  chartRef: Ref<{ getInputOption: () => ECOption }>
  title: string
  bigOption: ECOption
}) => {
  const appStore = useAppStore()

  const showBig = () => {
    appStore.setChartData({
      option: chartRef.value.getInputOption(),
      title,
      bigOption,
    })
  }

  return {
    showBig,
  }
}
