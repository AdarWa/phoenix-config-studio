import type { DeviceDefinition, DeviceKey } from './devices'

export const deviceDefinitions: Record<DeviceKey, DeviceDefinition> = {
  motor: {
    key: 'motor',
    label: 'TalonFX',
    summary: 'Configure TalonFX Motor',
    sections: [
      {
        title: 'Motor Output Configs',
        helper:
          'Configs that directly affect motor output, including invert state, neutral mode, and limits.',
        fields: [
          {
            type: 'boolean',
            key: 'Inverted',
            label: 'Inverted',
            description: 'Invert state of the device as seen from the front of the motor.',
            defaultValue: false,
            falseLabel: 'CounterClockwise Positive',
            trueLabel: 'Clockwise Positive',
          },
          {
            type: 'boolean',
            key: 'NeutralMode',
            label: 'Neutral Mode',
            description: 'State of the motor controller bridge when output is neutral or disabled.',
            defaultValue: false,
            falseLabel: 'Coast',
            trueLabel: 'Brake',
          },
          {
            type: 'number',
            key: 'DutyCycleNeutralDeadband',
            label: 'Duty Cycle Neutral Deadband',
            description:
              'Configures the output deadband duty cycle during duty cycle and voltage based control modes.',
            defaultValue: 0,
            min: 0.0,
            max: 0.25,
            step: 0.01,
            suffix: 'fractional',
          },
          {
            type: 'number',
            key: 'PeakForwardDutyCycle',
            label: 'Peak Forward Duty Cycle',
            description: 'Maximum (forward) output during duty cycle based control modes.',
            defaultValue: 1,
            min: -1.0,
            max: 1.0,
            step: 0.01,
            suffix: 'fractional',
          },
          {
            type: 'number',
            key: 'PeakReverseDutyCycle',
            label: 'Peak Reverse Duty Cycle',
            description: 'Minimum (reverse) output during duty cycle based control modes.',
            defaultValue: -1,
            min: -1.0,
            max: 1.0,
            step: 0.01,
            suffix: 'fractional',
          },
          {
            type: 'number',
            key: 'ControlTimesyncFreqHz',
            label: 'Control Timesync Frequency',
            description:
              'Determines the time-synchronized frequency at which control requests are applied. When 0 Hz, timesync is disabled.',
            defaultValue: 0,
            min: 50,
            max: 500,
            step: 10,
            suffix: 'Hz',
          },
        ],
      },
      {
        title: 'Current Limits Configs',
        helper:
          'Configs that directly affect current limiting features, including supply and stator current thresholds and enable flags.',
        fields: [
          {
            type: 'number',
            key: 'StatorCurrentLimit',
            label: 'Stator Current Limit',
            description:
              'Amount of current allowed in the motor. Used to restrict torque output and prevent brownouts.',
            defaultValue: 120,
            min: 0.0,
            max: 800.0,
            step: 1,
            suffix: 'A',
          },
          {
            type: 'boolean',
            key: 'StatorCurrentLimitEnable',
            label: 'Enable Stator Current Limit',
            description: 'Enable motor stator current limiting.',
            defaultValue: true,
            trueLabel: 'Enabled',
            falseLabel: 'Disabled',
          },
          {
            type: 'number',
            key: 'SupplyCurrentLimit',
            label: 'Supply Current Limit',
            description:
              'Absolute maximum supply current allowed. Helps prevent breaker trips and brownouts.',
            defaultValue: 70,
            min: 0.0,
            max: 800.0,
            step: 1,
            suffix: 'A',
          },
          {
            type: 'boolean',
            key: 'SupplyCurrentLimitEnable',
            label: 'Enable Supply Current Limit',
            description: 'Enable motor supply current limiting.',
            defaultValue: true,
            trueLabel: 'Enabled',
            falseLabel: 'Disabled',
          },
          {
            type: 'number',
            key: 'SupplyCurrentLowerLimit',
            label: 'Supply Current Lower Limit',
            description:
              'Amount of supply current allowed after exceeding the main supply limit for a duration. Protects breakers.',
            defaultValue: 40,
            min: 0.0,
            max: 500.0,
            step: 1,
            suffix: 'A',
          },
          {
            type: 'number',
            key: 'SupplyCurrentLowerTime',
            label: 'Supply Current Lower Time',
            description:
              'Time after which supply current reduces to the lower limit. Ignored if set to 0.',
            defaultValue: 1.0,
            min: 0.0,
            max: 2.5,
            step: 0.1,
            suffix: 's',
          },
        ],
      },
      {
        title: 'Voltage Configs',
        helper:
          'Configs that affect voltage control types, including peak output voltages and voltage filtering parameters.',
        fields: [
          {
            type: 'number',
            key: 'SupplyVoltageTimeConstant',
            label: 'Supply Voltage Time Constant',
            description:
              'Time constant of the low-pass filter for the supply voltage. Affects reported voltage and control response.',
            defaultValue: 0,
            min: 0.0,
            max: 0.1,
            step: 0.001,
            suffix: 's',
          },
          {
            type: 'number',
            key: 'PeakForwardVoltage',
            label: 'Peak Forward Voltage',
            description: 'Maximum (forward) output during voltage based control modes.',
            defaultValue: 16,
            min: -16.0,
            max: 16.0,
            step: 0.1,
            suffix: 'V',
          },
          {
            type: 'number',
            key: 'PeakReverseVoltage',
            label: 'Peak Reverse Voltage',
            description: 'Minimum (reverse) output during voltage based control modes.',
            defaultValue: -16,
            min: -16.0,
            max: 16.0,
            step: 0.1,
            suffix: 'V',
          },
        ],
      },
      {
        title: 'Torque Current Configs',
        helper:
          'Configs that affect torque current control, including peak torque limits and deadband settings.',
        fields: [
          {
            type: 'number',
            key: 'PeakForwardTorqueCurrent',
            label: 'Peak Forward Torque Current',
            description: 'Maximum (forward) torque current during torque control modes.',
            defaultValue: 800,
            min: -800.0,
            max: 800.0,
            step: 1,
            suffix: 'A',
          },
          {
            type: 'number',
            key: 'PeakReverseTorqueCurrent',
            label: 'Peak Reverse Torque Current',
            description: 'Minimum (reverse) torque current during torque control modes.',
            defaultValue: -800,
            min: -800.0,
            max: 800.0,
            step: 1,
            suffix: 'A',
          },
          {
            type: 'number',
            key: 'TorqueNeutralDeadband',
            label: 'Torque Neutral Deadband',
            description: 'Output deadband during torque current based control modes.',
            defaultValue: 0.0,
            min: 0.0,
            max: 25.0,
            step: 0.1,
            suffix: 'A',
          },
        ],
      },
      {
        title: 'Feedback Configs',
        helper:
          'Configuration related to feedback sensors and ratios for closed-loop control in TalonFX.',
        fields: [
          {
            type: 'number',
            key: 'FeedbackRotorOffset',
            label: 'Feedback Rotor Offset',
            description:
              'Offset applied to the absolute integrated rotor sensor to zero the rotor position within one rotation.',
            defaultValue: 0.0,
            min: -1.0,
            max: 1.0,
            step: 0.01,
            suffix: 'rotations',
          },
          {
            type: 'number',
            key: 'SensorToMechanismRatio',
            label: 'Sensor to Mechanism Ratio',
            description:
              'Ratio of sensor rotations to mechanism output, where a ratio greater than 1 is a reduction.',
            defaultValue: 1.0,
            min: -1000.0,
            max: 1000.0,
            step: 0.1,
            suffix: 'scalar',
          },
          {
            type: 'number',
            key: 'RotorToSensorRatio',
            label: 'Rotor to Sensor Ratio',
            description:
              'Ratio of motor rotor rotations to remote sensor rotations, where a ratio greater than 1 is a reduction.',
            defaultValue: 1.0,
            min: -1000.0,
            max: 1000.0,
            step: 0.1,
            suffix: 'scalar',
          },
          {
            type: 'select',
            key: 'FeedbackSensorSource',
            label: 'Feedback Sensor Source',
            description: 'Selects the sensor source used by closed-loop and limit features.',
            defaultValue: 'RotorSensor',
            options: [
              { label: 'Rotor Sensor', value: 'RotorSensor' },
              { label: 'Remote CANcoder', value: 'RemoteCANcoder' },
              { label: 'Remote Pigeon2 Yaw', value: 'RemotePigeon2_Yaw' },
              { label: 'Remote Pigeon2 Pitch', value: 'RemotePigeon2_Pitch' },
              { label: 'Remote Pigeon2 Roll', value: 'RemotePigeon2_Roll' },
              { label: 'Fused CANcoder (Phoenix Pro)', value: 'FusedCANcoder' },
              { label: 'Sync CANcoder (Phoenix Pro)', value: 'SyncCANcoder' },
              { label: 'Remote CANdi PWM 1', value: 'RemoteCANdiPWM1' },
              { label: 'Remote CANdi PWM 2', value: 'RemoteCANdiPWM2' },
              { label: 'Remote CANdi Quadrature', value: 'RemoteCANdiQuadrature' },
              { label: 'Fused CANdi PWM 1 (Phoenix Pro)', value: 'FusedCANdiPWM1' },
              { label: 'Fused CANdi PWM 2 (Phoenix Pro)', value: 'FusedCANdiPWM2' },
              { label: 'Fused CANdi Quadrature (Phoenix Pro)', value: 'FusedCANdiQuadrature' },
              { label: 'Sync CANdi PWM 1 (Phoenix Pro)', value: 'SyncCANdiPWM1' },
              { label: 'Sync CANdi PWM 2 (Phoenix Pro)', value: 'SyncCANdiPWM2' },
            ],
          },
          {
            type: 'number',
            key: 'FeedbackRemoteSensorID',
            label: 'Feedback Remote Sensor ID',
            description:
              'Device ID of the remote sensor to use. Ignored if using the internal rotor sensor.',
            defaultValue: 0,
            min: 0,
            max: 62,
            step: 1,
          },
          {
            type: 'number',
            key: 'VelocityFilterTimeConstant',
            label: 'Velocity Filter Time Constant',
            description:
              'Time constant of the Kalman velocity filter. Controls the low-pass behavior of velocity estimation.',
            defaultValue: 0.0,
            min: 0.0,
            max: 1.0,
            step: 0.01,
            suffix: 's',
          },
        ],
      },
      {
        title: 'Differential Sensors Configs',
        helper: 'Configuration related to sensors used for differential control of a mechanism.',
        fields: [
          {
            type: 'select',
            key: 'DifferentialSensorSource',
            label: 'Differential Sensor Source',
            description:
              'Selects the source used for differential control. Default is Disabled. Other options require setting the appropriate remote sensor IDs.',
            defaultValue: 'Disabled',
            options: [
              { label: 'Disabled', value: 'Disabled' },
              { label: 'Remote TalonFX Diff', value: 'RemoteTalonFX_Diff' },
              { label: 'Remote CANcoder', value: 'RemoteCANcoder' },
              { label: 'Remote Pigeon2 Yaw', value: 'RemotePigeon2_Yaw' },
              { label: 'Remote Pigeon2 Pitch', value: 'RemotePigeon2_Pitch' },
              { label: 'Remote Pigeon2 Roll', value: 'RemotePigeon2_Roll' },
            ],
          },
          {
            type: 'number',
            key: 'DifferentialTalonFXSensorID',
            label: 'Differential TalonFX Sensor ID',
            description:
              'Device ID of the remote TalonFX used for differential control when Differential Sensor Source is not Disabled.',
            defaultValue: 0,
            min: 0,
            max: 62,
            step: 1,
          },
          {
            type: 'number',
            key: 'DifferentialRemoteSensorID',
            label: 'Differential Remote Sensor ID',
            description:
              'Device ID of the remote sensor used on the differential axis when the Differential Sensor Source is not RemoteTalonFX_Diff.',
            defaultValue: 0,
            min: 0,
            max: 62,
            step: 1,
          },
        ],
      },
      {
        title: 'Differential Constants Configs',
        helper:
          'Configuration for constants used in differential control, including peak outputs for duty cycle, voltage, and torque current modes.',
        fields: [
          {
            type: 'number',
            key: 'PeakDifferentialDutyCycle',
            label: 'Peak Differential Duty Cycle',
            description:
              'Maximum differential output during duty cycle based differential control modes.',
            defaultValue: 2,
            min: 0.0,
            max: 2.0,
            step: 0.01,
            suffix: 'fractional',
          },
          {
            type: 'number',
            key: 'PeakDifferentialVoltage',
            label: 'Peak Differential Voltage',
            description:
              'Maximum differential output during voltage based differential control modes.',
            defaultValue: 32,
            min: 0.0,
            max: 32.0,
            step: 0.1,
            suffix: 'V',
          },
          {
            type: 'number',
            key: 'PeakDifferentialTorqueCurrent',
            label: 'Peak Differential Torque Current',
            description:
              'Maximum differential output during torque current based differential control modes.',
            defaultValue: 1600,
            min: 0.0,
            max: 1600.0,
            step: 1,
            suffix: 'A',
          },
        ],
      },
      {
        title: 'Open Loop Ramps Configs',
        helper:
          'Configuration for open-loop ramp rates for various control types, limiting acceleration and jerk.',
        fields: [
          {
            type: 'number',
            key: 'DutyCycleOpenLoopRampPeriod',
            label: 'Duty Cycle Open Loop Ramp Period',
            description: 'Time to ramp from 0% to 100% output during open-loop DutyCycle control.',
            defaultValue: 0,
            min: 0,
            max: 1,
            step: 0.01,
            suffix: 's',
          },
          {
            type: 'number',
            key: 'VoltageOpenLoopRampPeriod',
            label: 'Voltage Open Loop Ramp Period',
            description: 'Time to ramp from 0V to 12V output during open-loop Voltage control.',
            defaultValue: 0,
            min: 0,
            max: 1,
            step: 0.01,
            suffix: 's',
          },
          {
            type: 'number',
            key: 'TorqueOpenLoopRampPeriod',
            label: 'Torque Open Loop Ramp Period',
            description:
              'Time to ramp from 0A to 300A output during open-loop TorqueCurrent control.',
            defaultValue: 0,
            min: 0,
            max: 10,
            step: 0.01,
            suffix: 's',
          },
        ],
      },
      {
        title: 'Closed Loop Ramps Configs',
        helper:
          'Configuration for closed-loop ramp rates for various control types, limiting acceleration and jerk.',
        fields: [
          {
            type: 'number',
            key: 'DutyCycleClosedLoopRampPeriod',
            label: 'Duty Cycle Closed Loop Ramp Period',
            description:
              'Time to ramp from 0% to 100% output during closed-loop DutyCycle control modes.',
            defaultValue: 0,
            min: 0,
            max: 1,
            step: 0.01,
            suffix: 's',
          },
          {
            type: 'number',
            key: 'VoltageClosedLoopRampPeriod',
            label: 'Voltage Closed Loop Ramp Period',
            description:
              'Time to ramp from 0V to 12V output during closed-loop Voltage control modes.',
            defaultValue: 0,
            min: 0,
            max: 1,
            step: 0.01,
            suffix: 's',
          },
          {
            type: 'number',
            key: 'TorqueClosedLoopRampPeriod',
            label: 'Torque Closed Loop Ramp Period',
            description:
              'Time to ramp from 0A to 300A output during closed-loop TorqueCurrent control modes.',
            defaultValue: 0,
            min: 0,
            max: 10,
            step: 0.01,
            suffix: 's',
          },
        ],
      },
      {
        title: 'Hardware Limit Switch Configs',
        helper:
          'Configurations for motor controller behavior with forward and reverse limit switches, including enabling, autoset positions, and remote sources.',
        fields: [
          {
            type: 'select',
            key: 'ForwardLimitSource',
            label: 'Forward Limit Source',
            description: 'Where to poll the forward limit switch.',
            defaultValue: 'LimitSwitchPin',
            options: [
              { label: 'Limit Switch Pin', value: 'LimitSwitchPin' },
              { label: 'Remote Talon FX', value: 'RemoteTalonFX' },
              { label: 'Remote CANifier', value: 'RemoteCANifier' },
              { label: 'Remote CANcoder', value: 'RemoteCANcoder' },
              { label: 'Remote CANrange', value: 'RemoteCANrange' },
              { label: 'Remote CANdi S1', value: 'RemoteCANdiS1' },
              { label: 'Remote CANdi S2', value: 'RemoteCANdiS2' },
              { label: 'Disabled', value: 'Disabled' },
            ],
          },
          {
            type: 'boolean',
            key: 'ForwardLimitAutosetPositionEnable',
            label: 'Forward Limit Autoset Position Enable',
            description:
              'Automatically set position to ForwardLimitAutosetPositionValue when forward limit switch is asserted.',
            defaultValue: false,
            trueLabel: 'Enabled',
            falseLabel: 'Disabled',
          },
          {
            type: 'number',
            key: 'ForwardLimitAutosetPositionValue',
            label: 'Forward Limit Autoset Position Value',
            description: 'Position to set when forward limit switch is asserted.',
            defaultValue: 0,
            min: -3.4e38,
            max: 3.4e38,
            step: 0.01,
            suffix: 'rotations',
          },
          {
            type: 'boolean',
            key: 'ForwardLimitEnable',
            label: 'Forward Limit Enable',
            description:
              'Motor output is set to neutral when forward limit switch is asserted and positive output is requested.',
            defaultValue: true,
            trueLabel: 'Enabled',
            falseLabel: 'Disabled',
          },
          {
            type: 'select',
            key: 'ForwardLimitSource',
            label: 'Forward Limit Source',
            description: 'Where to poll the forward limit switch.',
            defaultValue: 'LimitSwitchPin',
            options: [
              { label: 'Limit Switch Pin', value: 'LimitSwitchPin' },
              { label: 'Remote Talon FX', value: 'RemoteTalonFX' },
              { label: 'Remote CANifier', value: 'RemoteCANifier' },
              { label: 'Remote CANcoder', value: 'RemoteCANcoder' },
            ],
          },
          {
            type: 'number',
            key: 'ForwardLimitRemoteSensorID',
            label: 'Forward Limit Remote Sensor ID',
            description: 'Device ID of remote device if using remote forward limit switch.',
            defaultValue: 0,
            min: 0,
            max: 62,
            step: 1,
          },
          {
            type: 'select',
            key: 'ReverseLimitType',
            label: 'Reverse Limit Type',
            description:
              'Determines if the reverse limit switch is normally-open or normally-closed.',
            defaultValue: 'NormallyOpen',
            options: [
              { label: 'Normally Open', value: 'NormallyOpen' },
              { label: 'Normally Closed', value: 'NormallyClosed' },
            ],
          },
          {
            type: 'boolean',
            key: 'ReverseLimitAutosetPositionEnable',
            label: 'Reverse Limit Autoset Position Enable',
            description:
              'Automatically set position to ReverseLimitAutosetPositionValue when reverse limit switch is asserted.',
            defaultValue: false,
            trueLabel: 'Enabled',
            falseLabel: 'Disabled',
          },
          {
            type: 'number',
            key: 'ReverseLimitAutosetPositionValue',
            label: 'Reverse Limit Autoset Position Value',
            description: 'Position to set when reverse limit switch is asserted.',
            defaultValue: 0,
            min: -3.4e38,
            max: 3.4e38,
            step: 0.01,
            suffix: 'rotations',
          },
          {
            type: 'boolean',
            key: 'ReverseLimitEnable',
            label: 'Reverse Limit Enable',
            description:
              'Motor output is set to neutral when reverse limit switch is asserted and negative output is requested.',
            defaultValue: true,
            trueLabel: 'Enabled',
            falseLabel: 'Disabled',
          },
          {
            type: 'select',
            key: 'ReverseLimitSource',
            label: 'Reverse Limit Source',
            description: 'Where to poll the reverse limit switch.',
            defaultValue: 'LimitSwitchPin',
            options: [
              { label: 'Limit Switch Pin', value: 'LimitSwitchPin' },
              { label: 'Remote Talon FX', value: 'RemoteTalonFX' },
              { label: 'Remote CANifier', value: 'RemoteCANifier' },
              { label: 'Remote CANcoder', value: 'RemoteCANcoder' },
              { label: 'Remote CANrange', value: 'RemoteCANrange' },
              { label: 'Remote CANdi S1', value: 'RemoteCANdiS1' },
              { label: 'Remote CANdi S2', value: 'RemoteCANdiS2' },
              { label: 'Disabled', value: 'Disabled' },
            ],
          },
          {
            type: 'number',
            key: 'ReverseLimitRemoteSensorID',
            label: 'Reverse Limit Remote Sensor ID',
            description: 'Device ID of remote device if using remote reverse limit switch.',
            defaultValue: 0,
            min: 0,
            max: 62,
            step: 1,
          },
        ],
      },
      {
        title: 'Software Limit Switch Configs',
        helper:
          'Configs that affect how software-limit switches behave. Includes enabling software-limit switches and the threshold at which they are tripped.',
        fields: [
          {
            key: 'ForwardSoftLimitEnable',
            type: 'boolean',
            label: 'Enable Forward Soft Limit',
            description:
              'If enabled, the motor output is set to neutral if position exceeds ForwardSoftLimitThreshold and forward output is requested.',
            defaultValue: false,
            trueLabel: 'Enabled',
            falseLabel: 'Disabled',
          },
          {
            key: 'ReverseSoftLimitEnable',
            type: 'boolean',
            label: 'Enable Reverse Soft Limit',
            description:
              'If enabled, the motor output is set to neutral if position exceeds ReverseSoftLimitThreshold and reverse output is requested.',
            defaultValue: false,
            trueLabel: 'Enabled',
            falseLabel: 'Disabled',
          },
          {
            key: 'ForwardSoftLimitThreshold',
            type: 'number',
            label: 'Forward Soft Limit Threshold',
            description:
              'Position threshold for forward soft limit features. ForwardSoftLimitEnable must be enabled for this to take effect.',
            defaultValue: 0,
            min: -3.4e38,
            max: 3.4e38,
            suffix: 'rotations',
          },
          {
            key: 'ReverseSoftLimitThreshold',
            type: 'number',
            label: 'Reverse Soft Limit Threshold',
            description:
              'Position threshold for reverse soft limit features. ReverseSoftLimitEnable must be enabled for this to take effect.',
            defaultValue: 0,
            min: -3.4e38,
            max: 3.4e38,
            suffix: 'rotations',
          },
        ],
      },
      {
        title: 'Motion Magic Configs',
        helper:
          'Configs for Motion Magic®. Includes Velocity, Acceleration, Jerk, and Expo parameters.',
        fields: [
          {
            key: 'MotionMagicCruiseVelocity',
            type: 'number',
            label: 'Cruise Velocity',
            description:
              'Maximum velocity Motion Magic® based control modes are allowed to use. Motion Magic® Expo control modes do not use this config. Setting to 0 allows max possible velocity based on Expo_kV.',
            defaultValue: 0,
            min: 0,
            max: 9999,
            suffix: 'rot per sec',
          },
          {
            key: 'MotionMagicAcceleration',
            type: 'number',
            label: 'Acceleration',
            description:
              'Target acceleration Motion Magic® based control modes are allowed to use. Motion Magic® Expo control modes do not use this config.',
            defaultValue: 0,
            min: 0,
            max: 9999,
            suffix: 'rot per sec²',
          },
          {
            key: 'MotionMagicJerk',
            type: 'number',
            label: 'Jerk',
            description:
              'Target jerk (acceleration derivative) Motion Magic® based control modes are allowed to use. Allows S-Curve profiles. If 0, no jerk limit is applied.',
            defaultValue: 0,
            min: 0,
            max: 9999,
            suffix: 'rot per sec³',
          },
          {
            key: 'MotionMagicExpo_kV',
            type: 'number',
            label: 'Expo kV',
            description:
              'Target kV used only by Motion Magic® Expo control modes. Represents voltage needed to hold a velocity. Higher kV results in slower maximum velocity.',
            defaultValue: 0.12,
            min: 0.001,
            max: 100,
            suffix: 'V/rps',
          },
          {
            key: 'MotionMagicExpo_kA',
            type: 'number',
            label: 'Expo kA',
            description:
              'Target kA used only by Motion Magic® Expo control modes. Represents voltage needed to achieve acceleration. Higher kA results in slower acceleration.',
            defaultValue: 0.1,
            min: 0.00001,
            max: 100,
            suffix: 'V/rps²',
          },
        ],
      },
      {
        title: 'Custom Params',
        helper:
          'Custom parameters that have no real impact on controller. Provided to allow end-applications to store persistent information in the device.',
        fields: [
          {
            key: 'CustomParam0',
            type: 'number',
            label: 'Custom Parameter 0',
            description:
              'Custom parameter 0. Provided to allow end-applications to store persistent information in the device.',
            defaultValue: 0,
            min: -32768,
            max: 32767,
          },
          {
            key: 'CustomParam1',
            type: 'number',
            label: 'Custom Parameter 1',
            description:
              'Custom parameter 1. Provided to allow end-applications to store persistent information in the device.',
            defaultValue: 0,
            min: -32768,
            max: 32767,
          },
        ],
      },
      {
        title: 'Closed Loop General Configs',
        helper:
          'Configs that affect general behavior during closed-looping. Includes Continuous Wrap features.',
        fields: [
          {
            key: 'ContinuousWrap',
            type: 'boolean',
            label: 'Continuous Wrap',
            description:
              'Wrap position error within [-0.5,+0.5) mechanism rotations. Typically used for continuous position closed-loops like swerve azimuth. Uses mechanism rotation value; apply SensorToMechanismRatio if needed.',
            defaultValue: false,
            trueLabel: 'Enabled',
            falseLabel: 'Disabled',
          },
        ],
      },
      {
        title: 'Slot 0 Gains',
        helper:
          'Gains for the specified slot. If this slot is selected, these gains are used in closed loop control requests.',
        fields: [
          {
            key: 'kP',
            type: 'number',
            label: 'Proportional Gain (kP)',
            description:
              'Proportional Gain. Units depend on control mode; output per unit input error.',
            defaultValue: 0,
            min: 0,
            max: 3.4e38,
          },
          {
            key: 'kI',
            type: 'number',
            label: 'Integral Gain (kI)',
            description:
              'Integral Gain. Units depend on control mode; output per unit integrated input error.',
            defaultValue: 0,
            min: 0,
            max: 3.4e38,
          },
          {
            key: 'kD',
            type: 'number',
            label: 'Derivative Gain (kD)',
            description:
              'Derivative Gain. Units depend on control mode; output per unit differentiated input error.',
            defaultValue: 0,
            min: 0,
            max: 3.4e38,
          },
          {
            key: 'kS',
            type: 'number',
            label: 'Static Feedforward (kS)',
            description:
              'Static Feedforward Gain. Added to closed loop output. Units depend on control mode.',
            defaultValue: 0,
            min: -512,
            max: 511,
          },
          {
            key: 'kV',
            type: 'number',
            label: 'Velocity Feedforward (kV)',
            description:
              'Velocity Feedforward Gain. Units depend on control mode; output per unit requested velocity.',
            defaultValue: 0,
            min: 0,
            max: 3.4e38,
          },
          {
            key: 'kA',
            type: 'number',
            label: 'Acceleration Feedforward (kA)',
            description:
              'Acceleration Feedforward Gain. Units depend on control mode; output per unit requested acceleration.',
            defaultValue: 0,
            min: 0,
            max: 3.4e38,
          },
          {
            key: 'kG',
            type: 'number',
            label: 'Gravity Feedforward (kG)',
            description:
              'Gravity Feedforward/Feedback Gain. Added to closed loop output. Units depend on control mode.',
            defaultValue: 0,
            min: -512,
            max: 511,
          },
          {
            key: 'GravityType',
            type: 'select',
            label: 'Gravity Feedforward Type',
            description:
              'Determines type of gravity feedforward/feedback. Elevator_Static = constant, Arm_Cosine = varies with mechanism angle.',
            defaultValue: 'Elevator_Static',
            options: [
              { label: 'Elevator_Static', value: 'Elevator_Static' },
              { label: 'Arm_Cosine', value: 'Arm_Cosine' },
            ],
          },
          {
            key: 'StaticFeedforwardSign',
            type: 'select',
            label: 'Static Feedforward Sign',
            description:
              'Determines sign of applied kS during position closed-loop. Default uses velocity reference sign.',
            defaultValue: 'UseVelocitySign',
            options: [
              { label: 'UseVelocitySign', value: 'UseVelocitySign' },
              { label: 'UseErrorSign', value: 'UseErrorSign' },
            ],
          },
        ],
      },
      {
        title: 'Slot 1 Gains',
        helper:
          'Gains for the specified slot. If this slot is selected, these gains are used in closed loop control requests.',
        fields: [
          {
            key: 'kP',
            type: 'number',
            label: 'Proportional Gain (kP)',
            description:
              'Proportional Gain. Units depend on control mode; output per unit input error.',
            defaultValue: 0,
            min: 0,
            max: 3.4e38,
          },
          {
            key: 'kI',
            type: 'number',
            label: 'Integral Gain (kI)',
            description:
              'Integral Gain. Units depend on control mode; output per unit integrated input error.',
            defaultValue: 0,
            min: 0,
            max: 3.4e38,
          },
          {
            key: 'kD',
            type: 'number',
            label: 'Derivative Gain (kD)',
            description:
              'Derivative Gain. Units depend on control mode; output per unit differentiated input error.',
            defaultValue: 0,
            min: 0,
            max: 3.4e38,
          },
          {
            key: 'kS',
            type: 'number',
            label: 'Static Feedforward (kS)',
            description:
              'Static Feedforward Gain. Added to closed loop output. Units depend on control mode.',
            defaultValue: 0,
            min: -512,
            max: 511,
          },
          {
            key: 'kV',
            type: 'number',
            label: 'Velocity Feedforward (kV)',
            description:
              'Velocity Feedforward Gain. Units depend on control mode; output per unit requested velocity.',
            defaultValue: 0,
            min: 0,
            max: 3.4e38,
          },
          {
            key: 'kA',
            type: 'number',
            label: 'Acceleration Feedforward (kA)',
            description:
              'Acceleration Feedforward Gain. Units depend on control mode; output per unit requested acceleration.',
            defaultValue: 0,
            min: 0,
            max: 3.4e38,
          },
          {
            key: 'kG',
            type: 'number',
            label: 'Gravity Feedforward (kG)',
            description:
              'Gravity Feedforward/Feedback Gain. Added to closed loop output. Units depend on control mode.',
            defaultValue: 0,
            min: -512,
            max: 511,
          },
          {
            key: 'GravityType',
            type: 'select',
            label: 'Gravity Feedforward Type',
            description:
              'Determines type of gravity feedforward/feedback. Elevator_Static = constant, Arm_Cosine = varies with mechanism angle.',
            defaultValue: 'Elevator_Static',
            options: [
              { label: 'Elevator_Static', value: 'Elevator_Static' },
              { label: 'Arm_Cosine', value: 'Arm_Cosine' },
            ],
          },
          {
            key: 'StaticFeedforwardSign',
            type: 'select',
            label: 'Static Feedforward Sign',
            description:
              'Determines sign of applied kS during position closed-loop. Default uses velocity reference sign.',
            defaultValue: 'UseVelocitySign',
            options: [
              { label: 'UseVelocitySign', value: 'UseVelocitySign' },
              { label: 'UseErrorSign', value: 'UseErrorSign' },
            ],
          },
        ],
      },
      {
        title: 'Slot 2 Gains',
        helper:
          'Gains for the specified slot. If this slot is selected, these gains are used in closed loop control requests.',
        fields: [
          {
            key: 'kP',
            type: 'number',
            label: 'Proportional Gain (kP)',
            description:
              'Proportional Gain. Units depend on control mode; output per unit input error.',
            defaultValue: 0,
            min: 0,
            max: 3.4e38,
          },
          {
            key: 'kI',
            type: 'number',
            label: 'Integral Gain (kI)',
            description:
              'Integral Gain. Units depend on control mode; output per unit integrated input error.',
            defaultValue: 0,
            min: 0,
            max: 3.4e38,
          },
          {
            key: 'kD',
            type: 'number',
            label: 'Derivative Gain (kD)',
            description:
              'Derivative Gain. Units depend on control mode; output per unit differentiated input error.',
            defaultValue: 0,
            min: 0,
            max: 3.4e38,
          },
          {
            key: 'kS',
            type: 'number',
            label: 'Static Feedforward (kS)',
            description:
              'Static Feedforward Gain. Added to closed loop output. Units depend on control mode.',
            defaultValue: 0,
            min: -512,
            max: 511,
          },
          {
            key: 'kV',
            type: 'number',
            label: 'Velocity Feedforward (kV)',
            description:
              'Velocity Feedforward Gain. Units depend on control mode; output per unit requested velocity.',
            defaultValue: 0,
            min: 0,
            max: 3.4e38,
          },
          {
            key: 'kA',
            type: 'number',
            label: 'Acceleration Feedforward (kA)',
            description:
              'Acceleration Feedforward Gain. Units depend on control mode; output per unit requested acceleration.',
            defaultValue: 0,
            min: 0,
            max: 3.4e38,
          },
          {
            key: 'kG',
            type: 'number',
            label: 'Gravity Feedforward (kG)',
            description:
              'Gravity Feedforward/Feedback Gain. Added to closed loop output. Units depend on control mode.',
            defaultValue: 0,
            min: -512,
            max: 511,
          },
          {
            key: 'GravityType',
            type: 'select',
            label: 'Gravity Feedforward Type',
            description:
              'Determines type of gravity feedforward/feedback. Elevator_Static = constant, Arm_Cosine = varies with mechanism angle.',
            defaultValue: 'Elevator_Static',
            options: [
              { label: 'Elevator_Static', value: 'Elevator_Static' },
              { label: 'Arm_Cosine', value: 'Arm_Cosine' },
            ],
          },
          {
            key: 'StaticFeedforwardSign',
            type: 'select',
            label: 'Static Feedforward Sign',
            description:
              'Determines sign of applied kS during position closed-loop. Default uses velocity reference sign.',
            defaultValue: 'UseVelocitySign',
            options: [
              { label: 'UseVelocitySign', value: 'UseVelocitySign' },
              { label: 'UseErrorSign', value: 'UseErrorSign' },
            ],
          },
        ],
      },
    ],
    kotlinFactory: () => '',
  },
  cancoder: {
    key: 'cancoder',
    label: 'CANCoder',
    summary: 'Configure CANCoder',
    sections: [
      {
        title: 'Magnet Sensor Configs',
        helper:
          'Configs that affect the magnet sensor and how to interpret it, including sensor direction, discontinuity point, and magnet offset.',
        fields: [
          {
            key: 'SensorDirection',
            type: 'select',
            label: 'Sensor Direction',
            description:
              'Direction of the sensor to determine positive rotation, as seen facing the LED side of the CANcoder.',
            defaultValue: 'CounterClockwise_Positive',
            options: [
              { label: 'CounterClockwise_Positive', value: 'CounterClockwise_Positive' },
              { label: 'Clockwise_Positive', value: 'Clockwise_Positive' },
            ],
          },
          {
            key: 'MagnetOffset',
            type: 'number',
            label: 'Magnet Offset',
            description:
              'Offset added to the reported position, allowing trimming of the zero position. Default zero aligns zero when magnet north pole aligns with the LED.',
            defaultValue: 0,
            min: -1,
            max: 1,
            suffix: 'rotations',
          },
          {
            key: 'AbsoluteSensorDiscontinuityPoint',
            type: 'number',
            label: 'Absolute Sensor Discontinuity Point',
            description:
              'Positive discontinuity point of the absolute sensor in rotations, determining the wrap-around range. For example, 0.5 makes the range [-0.5, 0.5).',
            defaultValue: 0.5,
            min: 0.0,
            max: 1.0,
            suffix: 'rotations',
          },
        ],
      },
      {
        title: 'Custom Params',
        helper:
          'Custom parameters that have no real impact on controller, used to store persistent information in the device.',
        fields: [
          {
            key: 'CustomParam0',
            type: 'number',
            label: 'Custom Parameter 0',
            description: 'Allows end-applications to store persistent information in the device.',
            defaultValue: 0,
            min: -32768,
            max: 32767,
          },
          {
            key: 'CustomParam1',
            type: 'number',
            label: 'Custom Parameter 1',
            description: 'Allows end-applications to store persistent information in the device.',
            defaultValue: 0,
            min: -32768,
            max: 32767,
          },
        ],
      },
    ],
  },
}
