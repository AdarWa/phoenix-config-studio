<template>
  <n-form-item
    :label="field.label"
    :feedback="field.description"
    :show-feedback="Boolean(field.description)"
  >
    <n-input v-model:value="localValue" :placeholder="field.placeholder" v-bind="inputProps" />
  </n-form-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TextField } from '../../devices'
import type { InputProps } from 'naive-ui'

const props = withDefaults(
  defineProps<{
    field: TextField
    modelValue: string
    inputProps?: InputProps
  }>(),
  {
    inputProps: () => ({}),
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
