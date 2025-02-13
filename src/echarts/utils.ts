import type { ECOption } from './library'
import { fitChartSize } from '@/utils'
export const DEFAULT = {
  fontSize: 12,
  color: '#fff',
}
export const FONT_SIZE = 14
export const FONT_COLOR = '#fff'
export const SPLIT_LINE_COLOR = '#ccc'

export const BIG = {
  fontSize: 16,
}

export const getBigFontSizeOption = (fontSize = BIG.fontSize): ECOption => {
  return {
    xAxis: {
      nameTextStyle: { fontSize: fitChartSize(fontSize) },
      axisLabel: { fontSize: fitChartSize(fontSize) },
    },
    yAxis: {
      nameTextStyle: { fontSize: fitChartSize(fontSize) },
      axisLabel: { fontSize: fitChartSize(fontSize) },
    },
    series: [{ label: { fontSize: fitChartSize(fontSize) } }],
    legend: { textStyle: { fontSize: fitChartSize(fontSize) } },
    tooltip: { textStyle: { fontSize: fitChartSize(fontSize) } },
  }
}

export const getDataZoom = (data: any[], maxValue = 8) => {
  return {
    dataZoom: [
      {
        // 滚动条
        type: 'slider',
        bottom: '6%',
        right: '4%',
        // 滚动条颜色
        fillerColor: '#ddd',
        // 滚动条左右详情数字隐藏
        showDetail: false,
        // 滚动条左右缩放手柄样式
        handleStyle: {
          color: '#ddd',
          borderColor: '#ddd',
        },
        // 无移动手柄
        moveHandleSize: 0,
        // 滚动条中无阴影无颜色
        dataBackground: {
          lineStyle: { opacity: 0 },
          areaStyle: { opacity: 0 },
        },
        selectedDataBackground: {
          lineStyle: { opacity: 0 },
          areaStyle: { opacity: 0 },
        },
        // 滚动条不缩短伸长
        brushSelect: false,
        // 从头开始，最多显示7条数据
        show: data.length > maxValue ? true : false,
        start: 0,
        end: (maxValue / data.length) * 100, // 初始显示前7条数据
        maxValueSpan: maxValue,
        minValueSpan: maxValue,
        // 滚动条宽度
        height: 8,
        // 平移也缩放
        zoomLock: true,
      },
      {
        type: 'inside',
      },
    ],
  }
}
