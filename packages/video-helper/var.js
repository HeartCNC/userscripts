import { lastVideoKey } from './util'

const paths = [
  {
    name: 'ovvo',
    url: 'https://json.ovvo.pro/jx.php?url={{url}}'
  },
  {
    name: 'JSON',
    url: 'https://jx.jsonplayer.com/player/?url={{url}}'
  },
  {
    name: 'XM',
    url: 'https://dm.xmflv.com:4433/?url={{url}}'
  },
  {
    name: 'JY',
    url: 'https://jx.playerjy.com/?url={{url}}'
  },
  {
    name: 'jiexila',
    url: 'https://jx.jiexila.com/?url={{url}}'
  }
]

const url = localStorage.getItem(lastVideoKey)

if (url) {
  paths.unshift({
    name: '上次使用',
    url
  })
}

export { paths }

export const controls = [
  {
    name: '+30s',
    type: 'currentTime',
    value: 30
  },
  {
    name: '+15s',
    type: 'currentTime',
    value: 15
  },
  {
    name: '+5s',
    type: 'currentTime',
    value: 5
  },
  {
    name: '2.0',
    type: 'playbackRate',
    value: 2
  },
  {
    name: '1.75',
    type: 'playbackRate',
    value: 1.75
  },
  {
    name: '1.5',
    type: 'playbackRate',
    value: 1.5
  },
  {
    name: '1.25',
    type: 'playbackRate',
    value: 1.25
  },
  {
    name: '1',
    type: 'playbackRate',
    value: 1
  }
]
