// ==UserScript==
// @name         Video Helper
// @namespace    http://tampermonkey.net/
// @version      0.1.10
// @description  优酷、爱奇艺、芒果TV、腾讯视频、哔哩哔哩VIP助手
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
// @include      *.bilibili.com/bangumi/play/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  var lastVideoKey = '_heart_video_last_url';

  var platforms = {
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
      wrap: '#flashbox'
    },
    youku: {
      flag: /youku/,
      wrap: '#player'
    },
    bilibili: {
      flag: /bilibili/,
      wrap: '#bilibili-player'
    }
  };

  var platform = (function (host) {
    if ( host === void 0 ) host = window.location.host;

    for (var k in platforms) {
      if (platforms[k].flag.test(host)) {
        return k
      }
    }
    return null
  })();

  function addStyleText(style) {
    var styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);
  }

  function addStyleLink(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  addStyleLink('//at.alicdn.com/t/font_2320142_alfk2527dul.css');

  var style = '.hparse{--primary-color:#2196f3;position:fixed;left:0;top:50%;transform:translateY(-50%);color:#fff;font-size:14px;z-index:99999999999}.hparse-item{position:relative;padding:8px;text-align:center;background-color:var(--primary-color);cursor:pointer}.hparse-item:nth-child(n+2){margin-top:8px}.hparse-item:hover .hparse-path-list,.hparse-item:hover .hparse-speed-list{display:block}.hparse-path-list,.hparse-speed-list{display:none;position:absolute;top:50%;right:0;width:100px;border-left:8px solid transparent;transform:translate(100%,-50%)}.hparse-path-wrap,.hparse-speed-wrap{border:1px solid var(--primary-color);background-color:var(--primary-color)}.hparse-path-item,.hparse-speed-item{padding:8px 0;text-align:center;transition:all linear .2s;overflow:hidden}.hparse-path-item:hover:not(.blur),.hparse-speed-item:hover:not(.blur){background-color:#fff;color:var(--primary-color)}.hparse-speed-control{display:inline-block;width:28px;height:28px;line-height:28px}.hparse-speed-control:hover{background-color:rgba(255,255,255,.3)}';

  addStyleText(style);

  if (platform === 'qq') {
    addStyleText("\n  #app .playlist-intro,\n  #app .playlist-intro__detail,\n  #app .playlist-top\n  {margin:0;}\n  \n  ");
  }

  var paths = [
    {
      name: 'JSON',
      url: 'https://jx.jsonplayer.com/player/?url={{url}}'
    },
    {
      name: 'XM',
      url: 'https://dm.xmflv.com:4433/?url={{url}}'
    },
    {
      name: 'Mao',
      url: 'https://www.mtosz.com/erzi.php?url={{url}}'
    },
    {
      name: 'NX',
      url: 'https://www.nxflv.com/?url={{url}}'
    },
    {
      name: '4K',
      url: 'https://jx.4kdv.com/?url={{url}}'
    },
    {
      name: 'okjx',
      url: 'https://okjx.cc/?url={{url}}'
    },
    {
      name: 'B站-1',
      url: 'https://vip.parwix.com:4433/player/analysis.php?v={{url}}'
    },
    {
      name: 'JY',
      url: 'https://jx.playerjy.com/?url={{url}}'
    },
    {
      name: 'jiexila',
      url: 'https://www.jiexila.com/?url={{url}}'
    }
  ];

  var url = localStorage.getItem(lastVideoKey);

  if (url) {
    paths.unshift({
      name: '上次使用',
      url: url
    });
  }

  var controls = [
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
  ];

  function getPath() {
    var filter = [];
    for (var i = 0, l = paths.length; i < l; i++) {
      var item = paths[i];
      if (!item.hide || item.hide.length === 0 || item.hide.indexOf(platform) === -1) {
        filter.push(item);
      }
    }
    return filter
  }

  function createView() {
    var hparse = document.createElement('div');
    hparse.className = 'hparse';
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
      + '</div>';

    var path = getPath();
    var pathWrap = hparse.querySelector('.hparse-path-wrap');
    path.forEach(function (item, index) {
      var node = document.createElement('div');
      node.className = 'hparse-path-item';
      node.textContent = item.name;
      node.dataset.index = index;
      pathWrap.appendChild(node);
    });
    pathWrap.addEventListener('click', function (e) {
      var el = e.srcElement || e.target;
      var parse = path[el.dataset.index];
      setFrameVideo(parse);
    });

    var addcontrols = controls.concat();
    var speedWrap = hparse.querySelector('.hparse-speed-wrap');
    addcontrols.forEach(function (item, index) {
      var node = document.createElement('div');
      node.className = 'hparse-speed-item';
      node.textContent = item.name;
      node.dataset.index = index;
      speedWrap.appendChild(node);
    });
    speedWrap.addEventListener('click', function (e) {
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
  }

  var _frame = document.createElement('iframe');
  _frame.allowFullscreen = 'true';
  _frame.frameBorder = '0';
  _frame.allowfullscreen = 'true';
  _frame.width = '100%';
  _frame.height = '100%';

  function setFrameVideo(parse) {
    if (!platform) { return }
    var playurl = formatter(parse.url, 'url', window.location.origin + window.location.pathname);
    if (parse.type === 'link') {
      window.open(playurl, '_blank');
      return
    }
    clear();
    _frame.src = playurl;
    localStorage.setItem(lastVideoKey, parse.url);
    var videoWrap = document.querySelector(platforms[platform].wrap);
    if (videoWrap) {
      videoWrap.innerHTML = '';
      videoWrap.appendChild(_frame);
    }
  }

  function clear() {
    if (platform === 'iqiyi') {
      var e = document.querySelector('.qy-player-vippay-popup');
      if (e) {
        document.body.removeChild(e.parentElement);
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

  createView();

  // document.addEventListener('click', function(e) {
  //   const el = e.srcElement || e.target
  //   if (el && el.href && !/^javascript/.test(String(el.href))) {
  //     window.location.href = el.href
  //   }
  // })

  if (platform === 'qq') {
    $('.playlist-rect__col [data-vid]').off('click').on('click', function() {
      location.href = "https://v.qq.com/x/cover/" + (this.dataset.cid) + "/" + (this.dataset.vid) + ".html";
    });
  }

  // qq
  // let url = 'https://pbaccess.video.qq.com/trpc.universal_backend_service.page_server_rpc.PageServer/GetPageData?video_appid=3000010&vplatform=2&vversion_name=8.2.96'
  // data {"page_params":{"req_from":"web_vsite","page_id":"vsite_episode_list","page_type":"detail_operation","id_type":"1","page_size":"","cid":"mzc00200q0sewxi","vid":"z0044divzwu","lid":"","page_num":"","page_context":"","detail_page_type":"1"},"has_cache":1}
  // $.ajax({url,type:'post',dataType:'json',data:a,contentType: "application/json",success(d){console.log(d)}})

})();
