import { BIG, getBigFontSizeOption, type ECOption } from '@/echarts'
import { merge } from 'es-toolkit'
import { fitChartSize } from '@/utils'

export const baseOption = (): ECOption => {
  return {
    xAxis: {
      type: 'category',
      data: [],
      axisLabel: {
        fontSize: fitChartSize(12),
        color: '#fff',
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: fitChartSize(12),
        color: '#fff',
      },
    },
    series: [
      {
        data: [],
        type: 'line',
      },
    ],
  }
}

export const bigOption = merge(getBigFontSizeOption(), {
  series: [
    {
      barWidth: 20,
      itemStyle: {
        normal: {
          label: {
            textStyle: {
              fontSize: BIG.fontSize,
            },
          },
        },
      },
      label: {
        normal: {
          textStyle: {
            fontSize: BIG.fontSize,
          },
        },
      },
    },
  ],
})
