export function camelize(s) {
  return s.replace(/-([a-z])/g, (a, v) => v.toUpperCase())
}