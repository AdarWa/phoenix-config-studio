type JsonValue = string | number | boolean | JsonObject
type JsonObject = { [key: string]: JsonValue | JsonObject }

const enumCase = (token: string) => token.replace(/\s+/g, '_')

function formatNumber(num: number): string {
  if (Number.isInteger(num)) {
    return num.toFixed(1)
  }
  return num.toString()
}

export function toKotlinValue(value: JsonValue, key: string): string {
  if (typeof value === 'string') {
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(value)) {
      value = enumCase(value)
    }
    return `${key}Value.${value}`
  }
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'number') {
    if (key.includes('Param') || key.includes('ID')) {
      return String(value)
    }
    return formatNumber(value)
  }
  return String(value)
}

export function formatIdentifier(key: string): string {
  if (key.includes(' ')) {
    return key
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')
  }
  return key
}

export function jsonToKotlin(json: JsonObject, rootName = 'TalonFXConfiguration'): string {
  const lines: string[] = []
  lines.push(`${rootName}().apply {`)
  const indent = '    '

  function processObject(obj: JsonObject, depth = 1) {
    const pad = indent.repeat(depth)
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const className = formatIdentifier(key)
        lines.push(`${pad}${className.replace(/Configs$/, '')} = ${className}().apply {`)
        processObject(value as JsonObject, depth + 1)
        lines.push(`${pad}}`)
      } else {
        lines.push(`${pad}${key} = ${toKotlinValue(value as JsonValue, key)}`)
      }
    }
  }

  processObject(json, 1)
  lines.push('}')
  return lines.join('\n')
}
