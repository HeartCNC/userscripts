import './style'
import { platform } from './util'
import { createView } from './view'

createView()

// document.addEventListener('click', function(e) {
//   const el = e.srcElement || e.target
//   if (el && el.href && !/^javascript/.test(String(el.href))) {
//     window.location.href = el.href
//   }
// })

if (platform === 'qq') {
  $('.playlist-rect__col [data-vid]').off('click').on('click', function() {
    location.href = `https://v.qq.com/x/cover/${this.dataset.cid}/${this.dataset.vid}.html`
  })
}

// qq
// let url = 'https://pbaccess.video.qq.com/trpc.universal_backend_service.page_server_rpc.PageServer/GetPageData?video_appid=3000010&vplatform=2&vversion_name=8.2.96'
// data {"page_params":{"req_from":"web_vsite","page_id":"vsite_episode_list","page_type":"detail_operation","id_type":"1","page_size":"","cid":"mzc00200q0sewxi","vid":"z0044divzwu","lid":"","page_num":"","page_context":"","detail_page_type":"1"},"has_cache":1}
// $.ajax({url,type:'post',dataType:'json',data:a,contentType: "application/json",success(d){console.log(d)}})