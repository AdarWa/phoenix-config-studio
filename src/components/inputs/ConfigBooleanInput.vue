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
    <n-switch v-model:value="localValue" :checked-value="true" :unchecked-value="false">
      <template v-if="field.trueLabel" #checked>{{ field.trueLabel }}</template>
      <template v-if="field.falseLabel" #unchecked>{{ field.falseLabel }}</template>
    </n-switch>
  </n-form-item>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BooleanField } from '../../devices'

const props = defineProps<{
  field: BooleanField
  modelValue: boolean
  dirty?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
