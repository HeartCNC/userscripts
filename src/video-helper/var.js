export const planform = {
  mg: {
    flag: /mgtv/,
    wrap: '#mgtv-player-wrap'
  },
  qq: {
    flag: /v.qq/,
    wrap: '#mod_player'
  },
  iqiyi: {
    flag: /iqiyi/,
    wrap: '#flashbox'
  },
  youku: {
    flag: /youku/,
    wrap: '#player'
  }
}

export const paths = [
  {
    name: '芒果专线-1',
    url: 'https://titan.mgtv.com.janan.net/mgtv1206/?url={{url}}',
    hide: ['qq', 'iqiyi', 'youku']
  },
  {
    name: '芒果专线-2',
    url: 'https://plamgtvcache.ccyjjd.com/play.php?url={{url}}',
    hide: ['qq', 'iqiyi', 'youku']
  },
  {
    name: 'B站-1',
    url: 'https://vip.parwix.com:4433/player/analysis.php?v={{url}}',
    hide: ['mg', 'qq']
  },
  {
    name: 'B站-2',
    url: 'https://jx.nitian.info/cs.php?url={{url}}',
    hide: ['mg', 'qq']
  },
  {
    name: '久播',
    url: 'https://jx.jiubojx.com/vip.php?url={{url}}'
  },
  {
    name: '蜜蜂',
    url: 'https://api.dabaotv.cn/?url={{url}}'
  },
  {
    name: 'ELW',
    url: 'https://jx.elwtc.com/vip/?url={{url}}'
  },
  {
    name: '月亮云',
    url: 'https://api.yueliangjx.com/?url={{url}}'
  },
  {
    name: '云解析',
    url: 'https://api.qianhaijishi.net/?url={{url}}'
  },
  {
    name: '解析啦',
    url: 'https://api.jiexi.la/?url={{url}}'
  },
  {
    name: 'CK',
    url: 'https://ckplayer.gdkaman.com/jiexi/?url={{url}}',
    hide: ['mg']
  },
  {
    name: '播放器',
    url: 'http://www.dayunbo.com/v/?url={{url}}',
    type: 'link'
  }
]

export const controls = [
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

export const style = '.hparse{--primary-color:#2196f3;position:fixed;left:0;top:50%;transform:translateY(-50%);color:#fff;font-size:14px;z-index:99999999999}.hparse-item{position:relative;padding:8px;text-align:center;background-color:var(--primary-color);cursor:pointer}.hparse-item:nth-child(n+2){margin-top:8px}.hparse-item:hover .hparse-path-list,.hparse-item:hover .hparse-speed-list{display:block}.hparse-path-list,.hparse-speed-list{display:none;position:absolute;top:50%;right:0;width:100px;border-left:8px solid transparent;transform:translate(100%,-50%)}.hparse-path-wrap,.hparse-speed-wrap{border:1px solid var(--primary-color);background-color:var(--primary-color)}.hparse-path-item,.hparse-speed-item{padding:8px 0;text-align:center;transition:all linear .2s;overflow:hidden}.hparse-path-item:hover:not(.blur),.hparse-speed-item:hover:not(.blur){background-color:#fff;color:var(--primary-color)}.hparse-speed-control{display:inline-block;width:28px;height:28px;line-height:28px}.hparse-speed-control:hover{background-color:rgba(255,255,255,.3)}'