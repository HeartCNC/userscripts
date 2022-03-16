const style = '.hparse{--primary-color:#2196f3;position:fixed;left:0;top:50%;transform:translateY(-50%);color:#fff;font-size:14px;z-index:99999999999}.hparse-item{position:relative;padding:8px;text-align:center;background-color:var(--primary-color);cursor:pointer}.hparse-item:nth-child(n+2){margin-top:8px}.hparse-item:hover .hparse-path-list,.hparse-item:hover .hparse-speed-list{display:block}.hparse-path-list,.hparse-speed-list{display:none;position:absolute;top:50%;right:0;width:100px;border-left:8px solid transparent;transform:translate(100%,-50%)}.hparse-path-wrap,.hparse-speed-wrap{border:1px solid var(--primary-color);background-color:var(--primary-color)}.hparse-path-item,.hparse-speed-item{padding:8px 0;text-align:center;transition:all linear .2s;overflow:hidden}.hparse-path-item:hover:not(.blur),.hparse-speed-item:hover:not(.blur){background-color:#fff;color:var(--primary-color)}.hparse-speed-control{display:inline-block;width:28px;height:28px;line-height:28px}.hparse-speed-control:hover{background-color:rgba(255,255,255,.3)}'

export function createStyle() {
  const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '//at.alicdn.com/t/font_2320142_alfk2527dul.css'
    const styleEl = document.createElement('style')
    styleEl.innerHTML = style
    document.head.appendChild(link)
    document.head.appendChild(styleEl)
}
