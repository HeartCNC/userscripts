import { lastVideoKey, platform, platforms } from './util'
import { paths, controls } from './var'

function getPath() {
  const filter = []
  for (let i = 0, l = paths.length; i < l; i++) {
    const item = paths[i]
    if (!item.hide || item.hide.length === 0 || item.hide.indexOf(platform) === -1) {
      filter.push(item)
    }
  }
  return filter
}

export function createView() {
  const hparse = document.createElement('div')
  hparse.className = 'hparse'
  hparse.innerHTML = ''
    + '<div class="hparse-item"><i class="h5-icon icon-you-tube"></i>'
    + '<div class="hparse-path-list">'
    + '<div class="hparse-path-wrap"></div>'
    + '</div>'
    + '</div>'

    + '<div class="hparse-item"><i class="h5-icon icon-sudu"></i>'
    + '<div class="hparse-speed-list">'
    + '<div class="hparse-speed-wrap"></div>'
    + '</div>'
    + '</div>'

  const path = getPath()
  const pathWrap = hparse.querySelector('.hparse-path-wrap')
  path.forEach(function (item, index) {
    const node = document.createElement('div')
    node.className = 'hparse-path-item'
    node.textContent = item.name
    node.dataset.index = index
    pathWrap.appendChild(node)
  })
  pathWrap.addEventListener('click', function (e) {
    const el = e.srcElement || e.target
    const parse = path[el.dataset.index]
    setFrameVideo(parse)
  })

  const addcontrols = controls.concat()
  const speedWrap = hparse.querySelector('.hparse-speed-wrap')
  addcontrols.forEach(function (item, index) {
    const node = document.createElement('div')
    node.className = 'hparse-speed-item'
    node.textContent = item.name
    node.dataset.index = index
    speedWrap.appendChild(node)
  })
  speedWrap.addEventListener('click', function (e) {
    const el = e.srcElement || e.target
    const control = addcontrols[el.dataset.index]
    const video = getCurrentVideo()
    if (video) {
      if (control.type === 'currentTime') {
        video.currentTime += control.value
      } else {
        video.playbackRate = control.value
      }
    }
  })
  document.body.appendChild(hparse)
}

const _frame = document.createElement('iframe')
_frame.allowFullscreen = 'true'
_frame.frameBorder = '0'
_frame.allowfullscreen = 'true'
_frame.width = '100%'
_frame.height = '100%'

function setFrameVideo(parse) {
  if (!platform) return
  const playurl = formatter(parse.url, 'url', window.location.origin + window.location.pathname)
  if (parse.type === 'link') {
    window.open(playurl, '_blank')
    return
  }
  clear()
  _frame.src = playurl
  localStorage.setItem(lastVideoKey, parse.url)
  const videoWrap = document.querySelector(platforms[platform].wrap)
  if (videoWrap) {
    videoWrap.innerHTML = ''
    videoWrap.appendChild(_frame)
  }
}

function clear() {
  if (platform === 'iqiyi') {
    const e = document.querySelector('.qy-player-vippay-popup')
    if (e) {
      document.body.removeChild(e.parentElement)
    }
  }
}

function getCurrentVideo() {
  // Fix youku.com
  return document.querySelector('.h5-ext-layer video') || document.querySelector('video')
}

function formatter(s, fs, v) {
  return s.replaceAll('{{' + fs + '}}', v)
}