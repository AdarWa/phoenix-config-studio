<template>
  <n-form-item
    :label="field.label"
    :feedback="field.description"
    :show-feedback="Boolean(field.description)"
  >
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
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
