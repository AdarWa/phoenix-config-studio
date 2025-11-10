<template>
  <n-form-item
    :label="field.label"
    :feedback="field.description"
    :show-feedback="Boolean(field.description)"
  >
    <template #label>
      <span class="form-item-label">
        {{ field.label }}
        <span v-if="dirty" class="dirty-indicator" aria-label="Field modified"></span>
      </span>
    </template>
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
    dirty?: boolean
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
