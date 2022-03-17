import { createStyle } from './style'
import { createView } from './view'

createStyle()
createView()

document.addEventListener('click', function(e) {
  const el = e.srcElement || e.target
  if (el && el.href && !/^javascript/.test(String(el.href))) {
    window.location.href = el.href
  }
})
