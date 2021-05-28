// ==UserScript==
// @name         Video Helper
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  try to take over the world!
// @include      *.youku.com/v*
// @include      *m.youku.com/*
// @include      *.iqiyi.com/v_*
// @include      *.iqiyi.com/w_*
// @include      *.iqiyi.com/a_*
// @include      *v.qq.com/x/*
// @include      *v.qq.com/p*
// @include      *v.qq.com/cover*
// @include      *v.qq.com/tv/*
// @include      *.mgtv.com/b/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  var planforms = {
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
  };

  var paths = [
    {
      name: '芒果专线-1',
      url: 'https://titan.mgtv.com.janan.net/mgtv1206/?url={{url}}',
      hide: [
        'qq',
        'iqiyi',
        'youku'
      ]
    },
    {
      name: '芒果专线-2',
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
      hide: [
        'mg'
      ]
    },
    {
      name: '播放器',
      url: 'http://www.dayunbo.com/v/?url={{url}}',
      type: 'link'
    }
  ];

  var controls = [
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
  ];

  var style = '.hparse{--primary-color:#2196f3;position:fixed;left:0;top:50%;transform:translateY(-50%);color:#fff;font-size:14px;z-index:99999999999}.hparse-item{position:relative;padding:8px;text-align:center;background-color:var(--primary-color);cursor:pointer}.hparse-item:nth-child(n+2){margin-top:8px}.hparse-item:hover .hparse-path-list,.hparse-item:hover .hparse-speed-list{display:block}.hparse-path-list,.hparse-speed-list{display:none;position:absolute;top:50%;right:0;width:100px;border-left:8px solid transparent;transform:translate(100%,-50%)}.hparse-path-wrap,.hparse-speed-wrap{border:1px solid var(--primary-color);background-color:var(--primary-color)}.hparse-path-item,.hparse-speed-item{padding:8px 0;text-align:center;transition:all linear .2s;overflow:hidden}.hparse-path-item:hover:not(.blur),.hparse-speed-item:hover:not(.blur){background-color:#fff;color:var(--primary-color)}.hparse-speed-control{display:inline-block;width:28px;height:28px;line-height:28px}.hparse-speed-control:hover{background-color:rgba(255,255,255,.3)}';

  var planform = (function(host) {
    if ( host === void 0 ) host = window.location.host;

    for (var k in planforms) {
      if (planforms[k].flag.test(host)) {
        return k
      }
    }
    return null
  })();

  function getPath() {
    var filter = [];
    for (var i = 0, l = paths.length; i < l; i++) {
      var item = paths[i];
      if (!item.hide || item.hide.length === 0 || item.hide.indexOf(planform) === -1) {
        filter.push(item);
      }
    }
    return filter
  }

  var Helper = function Helper() {
    this.initStyle();
    this.initControl();
    this.initEvent();
  };

  Helper.prototype.initStyle = function initStyle () {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '//at.alicdn.com/t/font_2320142_alfk2527dul.css';
    var styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    document.head.appendChild(link);
    document.head.appendChild(styleEl);
  };

  Helper.prototype.initControl = function initControl () {
    var hparse = document.createElement('div');
    hparse.className = 'hparse';
    hparse.innerHTML = '' +
      '<div class="hparse-item"><i class="h5-icon icon-you-tube"></i>' +
      '<div class="hparse-path-list">' +
      '<div class="hparse-path-wrap"></div>' +
      '</div>' +
      '</div>' +

      '<div class="hparse-item"><i class="h5-icon icon-sudu"></i>' +
      '<div class="hparse-speed-list">' +
      '<div class="hparse-speed-wrap"></div>' +
      '</div>' +
      '</div>';

    var path = getPath();
    var pathWrap = hparse.querySelector('.hparse-path-wrap');
    path.forEach(function(item, index) {
      var node = document.createElement('div');
      node.className = 'hparse-path-item';
      node.textContent = item.name;
      node.dataset.index = index;
      pathWrap.appendChild(node);
    });
    pathWrap.addEventListener('click', function(e) {
      var el = e.srcElement || e.target;
      var parse = path[el.dataset.index];
      setFrameVideo(parse);
    });

    var addcontrols = controls.concat();
    var speedWrap = hparse.querySelector('.hparse-speed-wrap');
    addcontrols.forEach(function(item, index) {
      var node = document.createElement('div');
      node.className = 'hparse-speed-item';
      node.textContent = item.name;
      node.dataset.index = index;
      speedWrap.appendChild(node);
    });
    speedWrap.addEventListener('click', function(e) {
      var el = e.srcElement || e.target;
      var control = addcontrols[el.dataset.index];
      var video = getCurrentVideo();
      if (video) {
        if (control.type === 'currentTime') {
          video.currentTime += control.value;
        } else {
          video.playbackRate = control.value;
        }
      }
    });
    document.body.appendChild(hparse);
  };

  Helper.prototype.initEvent = function initEvent () {
    document.addEventListener('click', function(e) {
      var el = e.srcElement || e.target;
      if (el && el.href) {
        window.location.href = el.href;
      }
    });
  };
  var _frame = document.createElement('iframe');
  _frame.allowFullscreen = 'true';
  _frame.frameBorder = '0';
  _frame.allowfullscreen = 'true';
  _frame.width = '100%';
  _frame.height = '100%';

  function setFrameVideo(parse) {
    var playurl = formatter(parse.url, 'url', window.location.origin + window.location.pathname);
    if (parse.type === 'link') {
      window.open(playurl, '_blank');
      return
    }
    clear();
    _frame.src = playurl;
    var videoWrap = document.querySelector(planforms[planform].wrap);
    console.warn(planforms[planform].wrap, videoWrap);
    if (videoWrap) {
      videoWrap.innerHTML = '';
      videoWrap.appendChild(_frame);
    }
  }

  function clear() {
    if (planform === 'iqiyi') {
      var e = document.querySelector('.qy-player-vippay-popup');
      if (e) {
        document.body.removeChild(e.parentElement);
      }
    }
  }

  function getCurrentVideo() {
    return document.querySelector('video')
  }

  function formatter(s, fs, v) {
    return s.replaceAll('{{' + fs + '}}', v)
  }

  /* eslint-disable no-new */
  new Helper();

}());
