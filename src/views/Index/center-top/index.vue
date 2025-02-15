<script setup lang="ts">
import type { Dayjs } from 'dayjs'

defineOptions({
  name: 'center-top',
})

type RangeValue = [Dayjs, Dayjs]

const dateRangeValue = ref<RangeValue>()
</script>

<template>
  <div class="center-top">
    <a-range-picker class="big-screen" popupClassName="big-screen" v-model:value="dateRangeValue" />
  </div>
</template>

<style lang="scss" scoped>
.center-top {
  width: 100%;
  height: 100%;
}
</style>
