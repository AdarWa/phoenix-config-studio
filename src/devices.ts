import type { SelectOption } from 'naive-ui'
import { deviceDefinitions } from './deviceDefenitions'

export type DeviceKey = 'motor' | 'cancoder'
export type FieldValue = string | number | boolean

interface BaseField {
  key: string
  label: string
  description?: string
  defaultValue: FieldValue
}

export interface NumberField extends BaseField {
  type: 'number'
  min?: number
  max?: number
  step?: number
  suffix?: string
}

export interface SelectField extends BaseField {
  type: 'select'
  options: SelectOption[]
}

export interface BooleanField extends BaseField {
  type: 'boolean'
  trueLabel?: string
  falseLabel?: string
  useBoolean: boolean
}

export interface TextField extends BaseField {
  type: 'text'
  placeholder?: string
}

export type FieldDefinition = NumberField | SelectField | BooleanField | TextField

export interface SectionDefinition {
  title: string
  helper?: string
  fields: FieldDefinition[]
}

export interface DeviceDefinition {
  key: DeviceKey
  rootName: string
  label: string
  summary: string
  sections: SectionDefinition[]
}

export type DeviceConfig = Record<string, SectionConfig>
export type SectionConfig = Record<string, FieldValue>

export const createDefaultConfig = (definition: DeviceDefinition): DeviceConfig => {
  return definition.sections.reduce<DeviceConfig>((acc, section) => {
    const sectionConfig: SectionConfig = {}
    section.fields.forEach((field) => {
      sectionConfig[field.key] = field.defaultValue
    })
    acc[section.title] = sectionConfig
    return acc
  }, {})
}

export const createInitialState = (): Record<DeviceKey, DeviceConfig> => {
  return Object.entries(deviceDefinitions).reduce<Record<DeviceKey, DeviceConfig>>(
    (acc, [key, definition]) => {
      acc[key as DeviceKey] = createDefaultConfig(definition)
      return acc
    },
    {} as Record<DeviceKey, DeviceConfig>,
  )
}
