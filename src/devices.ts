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
  label: string
  summary: string
  sections: SectionDefinition[]
  kotlinFactory: (config: DeviceConfig) => string
}

export type DeviceConfig = Record<string, FieldValue>

const enumCase = (token: string) => token.replace(/\s+/g, '_').toUpperCase()

const motorKotlin = (config: DeviceConfig) => {
  const inverted = config.inverted ? 'Clockwise_Positive' : 'CounterClockwise_Positive'
  const neutralMode = enumCase(String(config.neutralMode ?? 'Coast'))

  return `val talonFxConfig = TalonFXConfiguration().apply {
    motorOutput.withInverted(InvertedValue.${inverted})
    motorOutput.withNeutralMode(NeutralModeValue.${neutralMode})

    currentLimits.withSupplyCurrentLimit(${config.supplyCurrentLimit})
    currentLimits.withSupplyCurrentLimitEnable(true)

    openLoopRamps.withOpenLoopRampPeriod(${config.openLoopRampRate})
    closedLoopRamps.withClosedLoopRampPeriod(${config.closedLoopRampRate})

    slot0 = Slot0Configs().apply {
        kP = ${config.kP}
        kI = ${config.kI}
        kD = ${config.kD}
        kV = ${config.kF}
    }

    feedback.withSensorToMechanismRatio(${config.sensorToMechanismRatio})
}`
}

const cancoderKotlin = (config: DeviceConfig) => {
  const sensorDirection = enumCase(String(config.sensorDirection ?? 'Counter Clockwise Positive'))

  return `val cancoderConfig = CANcoderConfiguration().apply {
    magnetSensor.withAbsoluteSensorRange(AbsoluteSensorRangeValue.Unsigned_0To1)
    magnetSensor.withMagnetOffset(${config.magnetOffset})
    magnetSensor.withSensorDirection(SensorDirectionValue.${sensorDirection})

    dutyCyclePeriod.withGrain(${config.statusFrameRate})
    initializationStrategy = SensorInitializationStrategyValue.${enumCase(String(config.initStrategy ?? 'Boot to Absolute Position'))}
}`
}

export const createDefaultConfig = (definition: DeviceDefinition): DeviceConfig => {
  return definition.sections.reduce<DeviceConfig>((acc, section) => {
    section.fields.forEach((field) => {
      acc[field.key] = field.defaultValue
    })
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

export const buildKotlinSnippet = (device: DeviceKey, config: DeviceConfig): string => {
  return deviceDefinitions[device].kotlinFactory(config)
}
