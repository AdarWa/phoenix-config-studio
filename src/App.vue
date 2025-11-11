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
import json from 'highlight.js/lib/languages/json'

hljs.registerLanguage('kotlin', kotlin)
hljs.registerLanguage('json', json)
</script>
