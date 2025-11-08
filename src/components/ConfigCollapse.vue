<template>
  <n-collapse v-model:value="internalValue" :accordion="accordion">
    <slot />
  </n-collapse>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type CollapseValue = string | number | Array<string | number>

const props = withDefaults(
  defineProps<{
    modelValue: CollapseValue
    accordion?: boolean
  }>(),
  {
    accordion: true,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: CollapseValue): void
}>()

const internalValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
