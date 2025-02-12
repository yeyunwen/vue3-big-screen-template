<script setup lang="ts">
import Header from './components/header.vue'
</script>

<template>
  <div class="default-layout">
    <div class="header-wrapper">
      <Header />
    </div>
    <div class="main-wrapper">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$header-height: 60px;
$main-x-padding: 20px;
$main-top-margin: 20px;

.default-layout {
  width: 100%;
  height: 100vh;
  .header-wrapper {
    width: 100%;
    height: $header-height;
  }
  .main-wrapper {
    margin-top: $main-top-margin;
    padding: 0 $main-x-padding;
    width: 100%;
    height: calc(100vh - $header-height - $main-top-margin);
    overflow-y: auto;
  }
}
</style>
