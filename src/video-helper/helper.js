import {
  style,
  controls,
  paths
} from './var'

const planform = (function(host = window.location.host) {
  for(var k in _planformRule) {
    if (_planformRule[k].flag.test(host)) {
      return k
    }
  }
  return null
})()

function getPath() {
  var filter = []
  for(var i = 0, l = paths.length; i < l; i++) {
    var item = paths[i]
    if (!item.hide || item.hide.length === 0 || item.hide.indexOf(planform) === -1) {
      filter.push(item)
    }
  }
  return filter
}

class Helper {
  constructor() {
    this.initStyle()
    this.initControl()
    this.initEvent()
  }
  initStyle() {
    var link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '//at.alicdn.com/t/font_2320142_alfk2527dul.css'
    var styleEl = document.createElement('style')
    styleEl.innerHTML = style
  }
  initControl() {
    var hparse = document.createElement('div')
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

    var path = getPath()
    var pathWrap = hparse.querySelector('.hparse-path-wrap')
    path.forEach(function(item, index) {
      var node = document.createElement('div')
      node.className = 'hparse-path-item'
      node.textContent = item.name
      node.dataset.index = index
      pathWrap.appendChild(node)
    })
    pathWrap.addEventListener('click', function(e) {
      var el = e.srcElement || e.target
      var parse = path[el.dataset.index]
      setFrameVideo(parse)
    })

    var controls = controls.concat()
    var speedWrap = hparse.querySelector('.hparse-speed-wrap')
    controls.forEach(function(item, index) {
      var node = document.createElement('div')
      node.className = 'hparse-speed-item'
      node.textContent = item.name
      node.dataset.index = index
      speedWrap.appendChild(node)
    })
    speedWrap.addEventListener('click', function(e) {
      var el = e.srcElement || e.target
      var control = controls[el.dataset.index]
      var video = getCurrentVideo()
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
  initEvent() {
    document.addEventListener('click', function(e) {
      var el = e.srcElement || e.target
      if (el && el.href) {
        window.location.href = el.href
      }
    })
  }
}

function setFrameVideo(parse) {
  const playurl = formatter(parse.url, 'url', window.location.origin + window.location.pathname)
  if (parse.type === 'link') {
    window.open(playurl, '_blank')
    return
  }
  clear()
  _frame.src = playurl
  var videoWrap = document.querySelector(_planformRule[Parse.planform].wrap)
  console.warn(_planformRule[Parse.planform].wrap, videoWrap)
  if (videoWrap) {
    videoWrap.innerHTML = ''
    videoWrap.appendChild(_frame)
  }
}

function clear() {
  if (Parse.planform === 'iqiyi') {
    var e = document.querySelector('.qy-player-vippay-popup')
    if (e) {
      document.body.removeChild(e.parentElement)
    }
  }
}

function getCurrentVideo() {
  return document.querySelector('video')
}

function formatter(s, fs, v) {
  return s.replaceAll('{{' + fs + '}}', v)
}

export default Helper