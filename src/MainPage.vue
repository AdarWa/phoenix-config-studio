<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <n-card class="config-card">
    <h1 class="header">Phoenix Config Studio</h1>
    <n-space class="page-body" vertical size="large" style="width: 100%">
      <label for="device-select">Device Type:</label>
      <n-select
        v-model:value="currentDefinition"
        id="device-select"
        placeholder="Select a device"
        :options="deviceList.map((d) => ({ label: d.label, value: d.key }))"
      />

      <section
        v-for="definition in deviceList.filter((d) => d.key === currentDefinition)"
        :key="definition.key"
      >
        <n-space vertical size="large">
          <p class="device-summary">{{ definition.summary }}</p>

          <n-collapse
            :value="openSections[definition.key]"
            :accordion="false"
            arrow-placement="right"
            @update:value="updateSectionPanels(definition.key, $event)"
          >
            <n-collapse-item
              v-for="section in definition.sections"
              :key="section.title"
              :name="section.title"
            >
              <template #header>
                <div class="device-section__header">
                  <h3>{{ section.title }}</h3>
                  <p v-if="section.helper" class="device-section__helper">{{ section.helper }}</p>
                </div>
              </template>

              <div class="device-section">
                <n-form
                  :model="configs[definition.key]"
                  label-placement="left"
                  label-width="220"
                  class="device-section__form"
                >
                  <template v-for="field in section.fields" :key="field.key">
                    <ConfigNumberInput
                      v-if="field.type === 'number'"
                      :field="field"
                      :model-value="configs[definition.key][section.title]?.[field.key] as number"
                      @update:model-value="
                        (value: number) => setFieldValue(definition.key, field.key,section.title, value)
                      "
                    />

                    <ConfigSelectInput
                      v-else-if="field.type === 'select'"
                      :field="field"
                      :model-value="configs[definition.key][section.title]?.[field.key] as string | number"
                      @update:model-value="
                        (value: string | number | null) =>
                          setFieldValue(definition.key, field.key, section.title, value ?? field.defaultValue)
                      "
                    />

                    <ConfigBooleanInput
                      v-else-if="field.type === 'boolean'"
                      :field="field"
                      :model-value="configs[definition.key][section.title]?.[field.key] as boolean"
                      @update:model-value="
                        (value: boolean) => setFieldValue(definition.key, field.key, section.title, value)
                      "
                    />

                    <ConfigTextInput
                      v-else-if="field.type === 'text'"
                      :field="field"
                      :model-value="configs[definition.key][section.title]?.[field.key] as string"
                      @update:model-value="
                        (value: string) => setFieldValue(definition.key, field.key, section.title, value)
                      "
                    />
                  </template>
                </n-form>
              </div>
            </n-collapse-item>
          </n-collapse>
        </n-space>
      </section>
    </n-space>
    <div class="actions-bar">
      <n-space justify="end">
        <n-button @click="resetConfig" secondary>Reset</n-button>
        <n-button @click="saveConfig" type="primary">Save</n-button>
      </n-space>
    </div>
  </n-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import ConfigNumberInput from './components/inputs/ConfigNumberInput.vue'
import ConfigBooleanInput from './components/inputs/ConfigBooleanInput.vue'
import ConfigSelectInput from './components/inputs/ConfigSelectInput.vue'
import ConfigTextInput from './components/inputs/ConfigTextInput.vue'
import { deviceDefinitions } from './deviceDefenitions'
import { createInitialState, type DeviceConfig, type DeviceKey, type FieldValue } from './devices'

const STORAGE_KEY = 'phoenixDeviceConfigs'
type CollapseValue = string | number | Array<string | number> | null | undefined

export default defineComponent({
  name: 'MainPage',
  components: {
    ConfigNumberInput,
    ConfigBooleanInput,
    ConfigSelectInput,
    ConfigTextInput,
  },
  setup() {
    const deviceList = Object.values(deviceDefinitions)
    const configs = reactive<Record<DeviceKey, DeviceConfig>>(createInitialState())
    const firstDevice = deviceList[0]
    const currentDefinition = ref<DeviceKey>('motor')
    if (firstDevice) {
      currentDefinition.value = firstDevice.key
    }

    const buildInitialSectionState = () => {
      const result = {} as Record<DeviceKey, Array<string | number>>
      for (const device of deviceList) {
        result[device.key] = device.sections.map((section) => section.title)
      }
      return result
    }
    const openSections = reactive<Record<DeviceKey, Array<string | number>>>(
      buildInitialSectionState(),
    )

    const updateSectionPanels = (device: DeviceKey, value: CollapseValue) => {
      openSections[device] = Array.isArray(value)
        ? value
        : value !== null && value !== undefined
          ? [value]
          : []
    }

    const setFieldValue = (device: DeviceKey, fieldKey: string, sectionKey: string, value: FieldValue) => {
      if(!configs[device][sectionKey]) return;
      configs[device][sectionKey][fieldKey] = value;
    }

    const saveConfig = () => {
      try {

        Object.keys(configs).forEach((key: string)=>{
          if(key != currentDefinition.value){
            delete configs[key as DeviceKey]
          }
        });
        const json = JSON.stringify(configs);
        localStorage.setItem(STORAGE_KEY, json);
        console.log(json);
        console.log('Configuration saved');
      } catch (error) {
        console.error('Failed to save configuration', error);
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
            configs[key] = deviceConfig;
          }
        }
      } catch (error) {
        console.error('Failed to parse saved configuration', error)
      }
    })

    return {
      deviceList,
      configs,
      currentDefinition,
      openSections,
      updateSectionPanels,
      setFieldValue,
      saveConfig,
      resetConfig,
    }
  },
})
</script>

<style scoped>
.config-card {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: visible;
  position: relative;
}

.config-card :deep(.n-card__content) {
  overflow: visible;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.page-body {
  flex: 1 1 auto;
}

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

.device-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.device-section__header h3 {
  margin: 0 0 4px;
  font-size: 16px;
}

.device-section__helper {
  margin: 0;
  color: var(--n-text-color-3);
}

.actions-bar {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding: 16px 0;
  margin: 0;
  background: rgb(16, 16, 20);
  border-top: 1px solid var(--n-border-color);
  z-index: 5;
}

.header {
  text-align: center;
}
</style>
