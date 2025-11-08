<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <n-card>
    <n-space vertical size="large" style="width: 100%">
      <n-select
        v-model:value="currentDefinition"
        :options="deviceList.map((d) => ({ label: d.label, value: d.key }))"
      />
      <ConfigCollapse v-model="activePanels">
        <ConfigSection
          v-for="definition in deviceList.filter((d) => d.key === currentDefinition)"
          :key="definition.key"
          :name="definition.key"
          :title="definition.label"
          :model="configs[definition.key]"
        >
          <n-space vertical size="large">
            <p class="device-summary">{{ definition.summary }}</p>

            <div v-for="section in definition.sections" :key="section.title" class="device-section">
              <div class="device-section__header">
                <h3>{{ section.title }}</h3>
                <p v-if="section.helper" class="device-section__helper">{{ section.helper }}</p>
              </div>

              <template v-for="field in section.fields" :key="field.key">
                <ConfigNumberInput
                  v-if="field.type === 'number'"
                  :field="field"
                  :model-value="configs[definition.key][field.key] as number"
                  @update:model-value="
                    (value: number) => setFieldValue(definition.key, field.key, value)
                  "
                />

                <ConfigSelectInput
                  v-else-if="field.type === 'select'"
                  :field="field"
                  :model-value="configs[definition.key][field.key] as string | number"
                  @update:model-value="
                    (value: string | number | null) =>
                      setFieldValue(definition.key, field.key, value ?? field.defaultValue)
                  "
                />

                <ConfigBooleanInput
                  v-else-if="field.type === 'boolean'"
                  :field="field"
                  :model-value="configs[definition.key][field.key] as boolean"
                  @update:model-value="
                    (value: boolean) => setFieldValue(definition.key, field.key, value)
                  "
                />

                <ConfigTextInput
                  v-else-if="field.type === 'text'"
                  :field="field"
                  :model-value="configs[definition.key][field.key] as string"
                  @update:model-value="
                    (value: string) => setFieldValue(definition.key, field.key, value)
                  "
                />
              </template>
            </div>
          </n-space>
        </ConfigSection>
      </ConfigCollapse>

      <n-space justify="end">
        <n-button @click="resetConfig" secondary>Reset</n-button>
        <n-button @click="saveConfig" type="primary">Save</n-button>
      </n-space>
    </n-space>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import ConfigCollapse from './components/ConfigCollapse.vue'
import ConfigSection from './components/ConfigSection.vue'
import ConfigNumberInput from './components/inputs/ConfigNumberInput.vue'
import ConfigBooleanInput from './components/inputs/ConfigBooleanInput.vue'
import ConfigSelectInput from './components/inputs/ConfigSelectInput.vue'
import ConfigTextInput from './components/inputs/ConfigTextInput.vue'
import { deviceDefinitions } from './deviceDefenitions'
import { createInitialState, type DeviceConfig, type DeviceKey, type FieldValue } from './devices'

const STORAGE_KEY = 'phoenixDeviceConfigs'

export default defineComponent({
  name: 'MainPage',
  components: {
    ConfigCollapse,
    ConfigSection,
    ConfigNumberInput,
    ConfigBooleanInput,
    ConfigSelectInput,
    ConfigTextInput,
  },
  setup() {
    const deviceList = Object.values(deviceDefinitions)
    const configs = reactive<Record<DeviceKey, DeviceConfig>>(createInitialState())
    const activePanels = ref<string | number | Array<string | number>>([])
    const firstDevice = deviceList[0]
    const currentDefinition = ref<string>('motor')
    if (firstDevice) {
      activePanels.value = firstDevice.key
    }

    const setFieldValue = (device: DeviceKey, fieldKey: string, value: FieldValue) => {
      configs[device][fieldKey] = value
    }

    const saveConfig = () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(configs))
        console.log('Configuration saved')
      } catch (error) {
        console.error('Failed to save configuration', error)
      }
    }

    const resetConfig = () => {
      const defaults = createInitialState()
      for (const key of Object.keys(defaults) as DeviceKey[]) {
        Object.assign(configs[key], defaults[key])
      }
    }

    onMounted(() => {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (!saved) return
      try {
        const parsed = JSON.parse(saved) as Partial<Record<DeviceKey, DeviceConfig>>
        for (const key of Object.keys(parsed) as DeviceKey[]) {
          const deviceConfig = parsed[key]
          if (deviceConfig) {
            Object.assign(configs[key], deviceConfig)
          }
        }
      } catch (error) {
        console.error('Failed to parse saved configuration', error)
      }
    })

    return {
      activePanels,
      deviceList,
      configs,
      currentDefinition,
      setFieldValue,
      saveConfig,
      resetConfig,
    }
  },
})
</script>

<style scoped>
.device-summary {
  margin: 0;
  color: var(--n-text-color-3);
}

.device-section {
  border: 1px solid var(--n-border-color);
  border-radius: 8px;
  padding: 16px;
  background: var(--n-card-color);
}

.device-section + .device-section {
  margin-top: 12px;
}

.device-section__header {
  margin-bottom: 12px;
}

.device-section__header h3 {
  margin: 0 0 4px;
  font-size: 16px;
}

.device-section__helper {
  margin: 0;
  color: var(--n-text-color-3);
}
</style>
