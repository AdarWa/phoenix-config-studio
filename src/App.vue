<template>
  <n-config-provider :theme="darkTheme" :hljs="hljs">
    <n-global-style />
    <n-message-provider>
      <MainPage />
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme } from 'naive-ui'
import MainPage from './MainPage.vue'
import hljs from 'highlight.js/lib/core'
import kotlin from 'highlight.js/lib/languages/kotlin'

hljs.registerLanguage('kotlin', kotlin)
</script>
