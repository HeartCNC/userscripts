export const lastVideoKey = '_heart_video_last_url'

export const platforms = {
  mg: {
    flag: /mgtv/,
    wrap: '#mgtv-player-wrap'
  },
  qq: {
    flag: /v.qq/,
    wrap: '#player-container'
  },
  iqiyi: {
    flag: /iqiyi/,
    wrap: '#video'
  },
  youku: {
    flag: /youku/,
    wrap: '#player'
  },
  bilibili: {
    flag: /bilibili/,
    wrap: '#bilibili-player'
  },
  sohu: {
    flag: /sohu/,
    wrap: '#player'
  }
}

export const platform = (function (host = window.location.host) {
  for (const k in platforms) {
    if (platforms[k].flag.test(host)) {
      return k
    }
  }
  return null
})()

export function addStyleText(style) {
  const styleEl = document.createElement('style')
  styleEl.innerHTML = style
  document.head.appendChild(styleEl)
}

export function addStyleLink(href) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}