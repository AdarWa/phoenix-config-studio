<template>
  <n-space vertical>
    <div
      v-for="(point, index) in props.modelValue"
      :key="index"
      style="display: flex; gap: 8px; align-items: center"
    >
      <n-input-number
        :value="point[props.rpmKey]"
        v-bind="props.rpmInputProps"
        @update:value="updatePoint(index, props.rpmKey, $event)"
      />
      <n-input-number
        :value="point[props.valueKey]"
        v-bind="props.valueInputProps"
        @update:value="updatePoint(index, props.valueKey, $event)"
      />
      <n-button size="tiny" tertiary @click="removePoint(index)"
        >{{ props.removeButtonLabel }}</n-button
      >
    </div>
    <n-button size="small" @click="addPoint">{{ props.addButtonLabel }}</n-button>
  </n-space>
</template>

<script setup lang="ts">
import type { InputNumberProps } from 'naive-ui'

type PointRecord = Record<string, number>

const props = withDefaults(
  defineProps<{
    modelValue: PointRecord[]
    rpmKey?: string
    valueKey?: string
    rpmInputProps?: InputNumberProps
    valueInputProps?: InputNumberProps
    removeButtonLabel?: string
    addButtonLabel?: string
    createPoint?: () => PointRecord
  }>(),
  {
    rpmKey: 'rpm',
    valueKey: 'value',
    removeButtonLabel: 'Remove',
    addButtonLabel: 'Add point',
    createPoint: () => ({ rpm: 0, value: 0 }),
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: PointRecord[]): void
}>()

const updatePoint = (index: number, key: string, value: number | null) => {
  if (value === null) return
  const next = props.modelValue.slice()
  next[index] = { ...next[index], [key]: value }
  emit('update:modelValue', next)
}

const removePoint = (index: number) => {
  const next = props.modelValue.slice()
  next.splice(index, 1)
  emit('update:modelValue', next)
}

const addPoint = () => {
  const next = props.modelValue.slice()
  next.push(props.createPoint())
  emit('update:modelValue', next)
}
</script>
