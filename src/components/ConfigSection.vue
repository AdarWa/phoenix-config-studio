<template>
  <n-collapse-item :name="name" :title="title">
    <n-form :model="model" :label-placement="labelPlacement" :label-width="labelWidth">
      <slot />
    </n-form>
  </n-collapse-item>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string | number
    title: string
    model: Record<string, unknown>
    labelWidth?: string | number
    labelPlacement?: 'left' | 'right' | 'top'
  }>(),
  {
    labelWidth: '120px',
    labelPlacement: 'left',
  },
)
</script>
