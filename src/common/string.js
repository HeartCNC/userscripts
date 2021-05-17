

export function formatter(s, o) {

}

export function camel(s) {
  return s.replace(/-([a-z])/g, (a, v) => v.toUpperCase())
}