import { copy } from '../../utils'

document.addEventListener('click', (e) => {
  if (/(input|textarea|select|option|radio)/i.test(e.target.tagName)) return
  copy(e.target.innerText)
})
