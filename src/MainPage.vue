<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
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
                  <div class="device-section__title">
                    <h3>{{ section.title }}</h3>
                    <span
                      v-if="isSectionDirty(definition.key, section.title)"
                      class="dirty-indicator"
                      aria-label="Modified section"
                    ></span>
                  </div>
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
                      :dirty="isFieldDirty(definition.key, section.title, field.key)"
                      @update:model-value="
                        (value: number) =>
                          setFieldValue(definition.key, field.key, section.title, value)
                      "
                    />

                    <ConfigSelectInput
                      v-else-if="field.type === 'select'"
                      :field="field"
                      :model-value="
                        configs[definition.key][section.title]?.[field.key] as string | number
                      "
                      :dirty="isFieldDirty(definition.key, section.title, field.key)"
                      @update:model-value="
                        (value: string | number | null) =>
                          setFieldValue(
                            definition.key,
                            field.key,
                            section.title,
                            value ?? field.defaultValue,
                          )
                      "
                    />

                    <ConfigBooleanInput
                      v-else-if="field.type === 'boolean'"
                      :field="field"
                      :model-value="configs[definition.key][section.title]?.[field.key] as boolean"
                      :dirty="isFieldDirty(definition.key, section.title, field.key)"
                      @update:model-value="
                        (value: boolean) =>
                          setFieldValue(definition.key, field.key, section.title, value)
                      "
                    />

                    <ConfigTextInput
                      v-else-if="field.type === 'text'"
                      :field="field"
                      :model-value="configs[definition.key][section.title]?.[field.key] as string"
                      :dirty="isFieldDirty(definition.key, section.title, field.key)"
                      @update:model-value="
                        (value: string) =>
                          setFieldValue(definition.key, field.key, section.title, value)
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
  <CodeModal v-model:show="showModal" title="Kotlin" language="kotlin" :code="codeSnippet" :json-code="jsonSnippet" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import ConfigNumberInput from './components/inputs/ConfigNumberInput.vue'
import ConfigBooleanInput from './components/inputs/ConfigBooleanInput.vue'
import ConfigSelectInput from './components/inputs/ConfigSelectInput.vue'
import ConfigTextInput from './components/inputs/ConfigTextInput.vue'
import CodeModal from './components/CodeModal.vue'
import { deviceDefinitions } from './deviceDefenitions'
import { createInitialState, type DeviceConfig, type DeviceKey, type FieldValue } from './devices'
import { jsonToKotlin } from './snippetMaker'

type CollapseValue = string | number | Array<string | number> | null | undefined

export default defineComponent({
  name: 'MainPage',
  components: {
    ConfigNumberInput,
    ConfigBooleanInput,
    ConfigSelectInput,
    ConfigTextInput,
    CodeModal,
  },
  setup() {
    const deviceList = Object.values(deviceDefinitions)
    const configs = reactive<Record<DeviceKey, DeviceConfig>>(createInitialState())
    const defaultConfigs = createInitialState()
    const firstDevice = deviceList[0]
    const currentDefinition = ref<DeviceKey>('motor')
    const showModal = ref(false)

    const codeSnippet = ref<string>('// Something is wrong...')
    const jsonSnippet = ref<string>('{}')
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

    const getFieldDefinition = (device: DeviceKey, sectionKey: string, fieldKey: string) => {
      const deviceDef = deviceDefinitions[device]
      const sectionDef = deviceDef?.sections.find((section) => section.title === sectionKey)
      return sectionDef?.fields.find((field) => field.key === fieldKey)
    }

    const serializeFieldValue = (
      device: DeviceKey,
      sectionKey: string,
      fieldKey: string,
      value: FieldValue,
    ): FieldValue => {
      const fieldDef = getFieldDefinition(device, sectionKey, fieldKey)
      if (!fieldDef) return value
      if (fieldDef.type === 'boolean' && fieldDef.useBoolean !== true) {
        if (typeof value === 'boolean') {
          return (value ? fieldDef.trueLabel : fieldDef.falseLabel) ?? (value ? 'true' : 'false')
        }
        return value
      }
      return value
    }

    const buildSnippetConfig = (device: DeviceKey, source: DeviceConfig | undefined) => {
      const result: DeviceConfig = {}
      const definition = deviceDefinitions[device]
      if (!definition || !source) return result
      for (const section of definition.sections) {
        const sectionConfig = source[section.title]
        if (!sectionConfig) continue
        const serializedSection: Record<string, FieldValue> = {}
        for (const field of section.fields) {
          if (sectionConfig[field.key] === undefined) continue
          serializedSection[field.key] = serializeFieldValue(
            device,
            section.title,
            field.key,
            sectionConfig[field.key] as FieldValue,
          )
        }
        if (Object.keys(serializedSection).length > 0) {
          result[section.title] = serializedSection
        }
      }
      return result
    }

    const stripDefaultValues = (config: DeviceConfig, defaults: DeviceConfig): DeviceConfig => {
      const result: DeviceConfig = {}
      for (const [sectionKey, fields] of Object.entries(config)) {
        const defaultSection = defaults[sectionKey] ?? {}
        const filteredFields: Record<string, FieldValue> = {}
        for (const [fieldKey, value] of Object.entries(fields)) {
          if (!Object.is(value, defaultSection[fieldKey])) {
            filteredFields[fieldKey] = value
          }
        }
        if (Object.keys(filteredFields).length > 0) {
          result[sectionKey] = filteredFields
        }
      }
      return result
    }

    const setFieldValue = (
      device: DeviceKey,
      fieldKey: string,
      sectionKey: string,
      value: FieldValue,
    ) => {
      if (!configs[device][sectionKey]) return
      configs[device][sectionKey][fieldKey] = value
    }

    const isFieldDirty = (device: DeviceKey, sectionKey: string, fieldKey: string): boolean => {
      const defaultSection = defaultConfigs[device]?.[sectionKey]
      const currentSection = configs[device]?.[sectionKey]
      if (!defaultSection || !currentSection) return false
      return !Object.is(currentSection[fieldKey], defaultSection[fieldKey])
    }

    const isSectionDirty = (device: DeviceKey, sectionKey: string): boolean => {
      const defaultSection = defaultConfigs[device]?.[sectionKey]
      const currentSection = configs[device]?.[sectionKey]
      if (!defaultSection || !currentSection) return false
      return Object.keys(defaultSection).some(
        (fieldKey) => !Object.is(currentSection[fieldKey], defaultSection[fieldKey]),
      )
    }

    const saveConfig = () => {
      try {
        const clone = JSON.parse(JSON.stringify(configs)) as Record<DeviceKey, DeviceConfig>
        Object.keys(clone).forEach((key: string) => {
          if (key != currentDefinition.value) {
            delete clone[key as DeviceKey]
          }
        })
        Object.entries(clone[currentDefinition.value]).forEach(([sectionTitle, sectionConfig]) => {
          Object.entries(sectionConfig).forEach(([fieldKey, value]) => {
            const deviceDef = deviceDefinitions[currentDefinition.value as DeviceKey]
            if (!deviceDef) return
            const sectionDef = deviceDef.sections.find((s) => s.title === sectionTitle)
            if (!sectionDef) return
            const fieldDef = sectionDef.fields.find((f) => f.key === fieldKey)
            if (!fieldDef) return

            if (fieldDef.type === 'boolean' && fieldDef.useBoolean !== true) {
              sectionConfig[fieldKey] = serializeFieldValue(
                currentDefinition.value,
                sectionTitle,
                fieldKey,
                value as FieldValue,
              )
            }
          })
        })

        const json = JSON.stringify(clone)
        console.log(json)
        const snippetConfig = buildSnippetConfig(
          currentDefinition.value,
          clone[currentDefinition.value],
        )
        const defaultSnippetConfig = buildSnippetConfig(
          currentDefinition.value,
          defaultConfigs[currentDefinition.value],
        )
        const trimmedConfig = stripDefaultValues(snippetConfig, defaultSnippetConfig)
        codeSnippet.value = jsonToKotlin(
          trimmedConfig,
          deviceDefinitions[currentDefinition.value].rootName,
        )
        jsonSnippet.value = JSON.stringify(trimmedConfig, null, 2)
        showModal.value = true
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
    return {
      deviceList,
      configs,
      currentDefinition,
      openSections,
      showModal,
      codeSnippet,
      jsonSnippet,
      updateSectionPanels,
      setFieldValue,
      isFieldDirty,
      isSectionDirty,
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

.device-section__title {
  display: flex;
  align-items: center;
  gap: 8px;
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

:global(.dirty-indicator) {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff5f5f;
  display: inline-block;
}

:global(.form-item-label) {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
</style>
