<template>
  <n-config-provider :theme="darkTheme">
    <n-global-style />
    <MainPage />
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import MainPage from './MainPage.vue'
</script>
