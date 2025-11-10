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
    dirty?: boolean
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
