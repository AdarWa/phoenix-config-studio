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
    <n-input-number v-model:value="localValue" v-bind="numberProps">
      <template v-if="props.field.suffix" #suffix>{{ props.field.suffix }}</template>
    </n-input-number>
  </n-form-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { NumberField } from '../../devices'

const props = defineProps<{
  field: NumberField
  modelValue: number
  dirty?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const numberProps = computed(() => ({
  min: props.field.min,
  max: props.field.max,
  step: props.field.step,
}))

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (value === null) return
    emit('update:modelValue', value)
  },
})
</script>
