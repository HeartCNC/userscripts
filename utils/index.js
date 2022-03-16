import ClipboardJS from 'clipboard/dist/clipboard.min.js'
export function copy(text) {
  if (!ClipboardJS.isSupported()) {
    return
  }
  const button = document.createElement('button')
  const clipboard = new ClipboardJS(button)
  button.setAttribute('data-text', text)
  button.setAttribute('data-clipboard-text', text)
  clipboard.on('success', function(e) {
    clipboard.destroy()
  })
  clipboard.on('error', function(e) {})
  button.click()
}
