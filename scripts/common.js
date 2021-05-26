export function camelize(s) {
  return s.replace(/-([a-z])/g, (a, v) => {
    return v.toUpperCase()
  })
}
