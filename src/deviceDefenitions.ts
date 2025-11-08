import type { DeviceDefinition, DeviceKey } from './devices'

export const deviceDefinitions: Record<DeviceKey, DeviceDefinition> = {
  motor: {
    key: 'motor',
    label: 'TalonFX',
    summary: 'Configure TalonFX Motor',
    sections: [
      {
        title: 'Hardware',
        helper: 'Basic device identity and motor behavior.',
        fields: [
          {
            type: 'number',
            key: 'canId',
            label: 'CAN ID',
            description: 'Unique CAN device identifier.',
            min: 0,
            max: 63,
            step: 1,
            defaultValue: 1,
          },
          {
            type: 'select',
            key: 'bus',
            label: 'CAN Bus',
            description: 'Optional CANivore or CAN FD bus name.',
            options: [
              { label: 'rio', value: 'rio' },
              { label: 'canivore', value: 'canivore' },
              { label: 'mxp', value: 'mxp' },
            ],
            defaultValue: 'rio',
          },
          {
            type: 'boolean',
            key: 'inverted',
            label: 'Invert Output',
            description: 'Flip the direction of positive motor output.',
            trueLabel: 'Clockwise +',
            falseLabel: 'Counter Clockwise +',
            defaultValue: false,
          },
          {
            type: 'select',
            key: 'neutralMode',
            label: 'Neutral Mode',
            options: [
              { label: 'Brake', value: 'Brake' },
              { label: 'Coast', value: 'Coast' },
            ],
            defaultValue: 'Brake',
          },
        ],
      },
      {
        title: 'Closed Loop Gains',
        helper: 'Tune PIDF constants for your slot 0 profile.',
        fields: [
          {
            type: 'number',
            key: 'kP',
            label: 'kP',
            step: 0.001,
            defaultValue: 0.1,
          },
          {
            type: 'number',
            key: 'kI',
            label: 'kI',
            step: 0.0001,
            defaultValue: 0,
          },
          {
            type: 'number',
            key: 'kD',
            label: 'kD',
            step: 0.001,
            defaultValue: 0,
          },
          {
            type: 'number',
            key: 'kF',
            label: 'kV / Feed Forward',
            step: 0.001,
            defaultValue: 0,
          },
        ],
      },
      {
        title: 'Ramps & Limits',
        helper: 'Protect the mechanism with current limiting and ramping.',
        fields: [
          {
            type: 'number',
            key: 'supplyCurrentLimit',
            label: 'Supply Current Limit (A)',
            step: 1,
            defaultValue: 40,
          },
          {
            type: 'number',
            key: 'openLoopRampRate',
            label: 'Open Loop Ramp (s)',
            step: 0.05,
            defaultValue: 0.2,
          },
          {
            type: 'number',
            key: 'closedLoopRampRate',
            label: 'Closed Loop Ramp (s)',
            step: 0.05,
            defaultValue: 0.1,
          },
          {
            type: 'number',
            key: 'sensorToMechanismRatio',
            label: 'Sensor To Mechanism Ratio',
            step: 0.01,
            defaultValue: 1,
          },
        ],
      },
    ],
    kotlinFactory: () => '',
  },
  cancoder: {
    key: 'cancoder',
    label: 'CANcoder',
    summary: 'Absolute encoder configuration for steering or arm joints.',
    sections: [
      {
        title: 'Identity',
        helper: 'CAN addressing and boot behavior.',
        fields: [
          {
            type: 'number',
            key: 'canId',
            label: 'CAN ID',
            min: 0,
            max: 63,
            step: 1,
            defaultValue: 2,
          },
          {
            type: 'select',
            key: 'bus',
            label: 'CAN Bus',
            options: [
              { label: 'rio', value: 'rio' },
              { label: 'canivore', value: 'canivore' },
            ],
            defaultValue: 'rio',
          },
          {
            type: 'select',
            key: 'initStrategy',
            label: 'Init Strategy',
            options: [
              { label: 'Boot to Absolute Position', value: 'Boot to Absolute Position' },
              { label: 'Boot to Zero', value: 'Boot to Zero' },
            ],
            defaultValue: 'Boot to Absolute Position',
          },
        ],
      },
      {
        title: 'Sensor',
        helper: 'Align the magnet and measurement domain.',
        fields: [
          {
            type: 'number',
            key: 'magnetOffset',
            label: 'Magnet Offset (rotations)',
            step: 0.0001,
            defaultValue: 0,
          },
          {
            type: 'select',
            key: 'sensorDirection',
            label: 'Sensor Direction',
            options: [
              { label: 'Clockwise Positive', value: 'Clockwise Positive' },
              { label: 'Counter Clockwise Positive', value: 'Counter Clockwise Positive' },
            ],
            defaultValue: 'Counter Clockwise Positive',
          },
          {
            type: 'number',
            key: 'statusFrameRate',
            label: 'Status Frame Period (ms)',
            step: 1,
            defaultValue: 10,
          },
        ],
      },
    ],
    kotlinFactory: () => '',
  },
}
