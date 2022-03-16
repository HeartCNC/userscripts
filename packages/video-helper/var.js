export const paths = [
  {
    name: '芒果专线-1',
    url: 'https://plamgtvcache.ccyjjd.com/play.php?url={{url}}',
    hide: [
      'qq',
      'iqiyi',
      'youku'
    ]
  },
  {
    name: 'B站-1',
    url: 'https://vip.parwix.com:4433/player/analysis.php?v={{url}}',
    hide: [
      'mg',
      'qq'
    ]
  },
  {
    name: 'B站-2',
    url: 'https://jx.nitian.info/cs.php?url={{url}}',
    hide: [
      'mg',
      'qq'
    ]
  },
  {
    name: '解析啦',
    url: 'https://api.jiexi.la/?url={{url}}'
  },
  {
    name: 'CK',
    url: 'https://ckplayer.gdkaman.com/jiexi/?url={{url}}',
    hide: [
      'mg'
    ]
  }
]

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