<template>
  <n-form-item
    :label="field.label"
    :feedback="field.description"
    :show-feedback="Boolean(field.description)"
  >
    <n-select v-model:value="localValue" :options="field.options" v-bind="selectProps" />
  </n-form-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SelectField } from '../../devices'
import type { SelectProps } from 'naive-ui'

const props = withDefaults(
  defineProps<{
    field: SelectField
    modelValue: string | number | null
    selectProps?: SelectProps
  }>(),
  {
    selectProps: () => ({}),
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
