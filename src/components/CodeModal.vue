<template>
  <n-modal v-model:show="visible">
    <n-card
      class="code-card"
      title="Code Snippet"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        {{ currentLanguage }}
        <n-button type="primary" style="margin-left: 10px;" @click="changeLang">{{currentLanguage === 'Kotlin' ? 'JSON' : 'Kotlin'}}</n-button>
      </template>

      <div class="code-wrapper">
        <div class="code-container">
          <n-code :code="currentLanguage === 'Kotlin' ? code : jsonCode" :language="currentLanguage.toLowerCase()" show-line-numbers word-wrap />
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-2">
          <n-button @click="onClose">Close</n-button>
          <n-button type="primary" @click="copyCode">Copy</n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { NModal, NCard, NButton, NCode, useMessage } from 'naive-ui'

type SnippetLanguage = 'Kotlin' | 'JSON'

interface Props {
  show: boolean
  title?: string
  code: string,
  jsonCode: string
  language?: string,
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Kotlin Example',
  language: 'kotlin',
})

const currentLanguage = ref<SnippetLanguage>('Kotlin')

const emit = defineEmits(['update:show', 'close'])
const visible = ref(props.show)
const message = useMessage()

watch(
  () => props.show,
  (v) => (visible.value = v),
)
watch(visible, (v) => emit('update:show', v))

function copyCode() {
  navigator.clipboard.writeText(props.code)
  message.success('Code copied!')
}

function onClose() {
  visible.value = false
  emit('close')
}

function changeLang(){
  if(currentLanguage.value == "Kotlin"){
    currentLanguage.value = "JSON";
  }else {
    currentLanguage.value = "Kotlin";
  }
}
</script>

<style scoped>
.code-card {
  width: 80vw; /* make the modal wide */
  max-width: 1200px;
}

.code-wrapper {
  width: 100%;
}

.code-container {
  max-height: 75vh;
  overflow: auto;
  border: 1px solid #d9d9d9;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 0.9rem;
}

/* Scrollbar styling */
.code-container::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}
.code-container::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 4px;
}
.code-container::-webkit-scrollbar-thumb:hover {
  background-color: #a6a6a6;
}

.flex {
  display: flex;
  align-items: center;
}
.gap-2 {
  gap: 0.5rem;
}
.justify-end {
  justify-content: flex-end;
}
</style>
