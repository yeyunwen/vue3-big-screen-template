import type { ECOption } from './library'

export const getBigFontSizeOption = (fontSize: number): ECOption => {
  return {
    xAxis: { axisLabel: { fontSize } },
    yAxis: { axisLabel: { fontSize } },
    // series: { label: { fontSize } },
    legend: { textStyle: { fontSize } },
    tooltip: { axisPointer: { lineStyle: { width: fontSize } } },
    // dataZoom: { textStyle: { fontSize } },
  }
}
