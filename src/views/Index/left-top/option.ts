import { BIG, getBigFontSizeOption, type ECOption } from '@/echarts'
import { merge } from 'es-toolkit'

export const baseOption: ECOption = {
  xAxis: {
    type: 'category',
    data: [],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [],
      type: 'line',
    },
  ],
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
