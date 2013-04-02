define({_eventMap:{"init.core":["setFilters(!render|globalFilters)","loadTrackSystems(!render|systems)"]},params:{globalFilters:{mobile:function(){var e=this.getCurrpage();return"mobile"===e.device_type_cssVar&&"mobile"===e.device_type_userAgent},desktop:function(){var e=this.getCurrpage();return"desktop"===e.device_type_cssVar&&"desktop"===e.device_type_userAgent},tablet:function(){var e=this.getCurrpage();return"tablet"===e.device_type_cssVar&&"tablet"===e.device_type_userAgent}},systems:{GoogleAnalytics:{system_req_id:"./GoogleAnalytics",_eventMap:{"system.GoogleAnalytics.init":"loadLibrary(libraryGA)","system.ga.library.loaded":["initSystemConfig(initSystemConfig)","setCustomVar(setCustomVar)","track_pi","subscribeExternalEvents(externalEvts)"]},params:{externalEvts:{"start.video.flowplayer":"trackEvent","pause.video.flowplayer":"trackEvent","resume.video.flowplayer":"trackEvent","beforseek.video.flowplayer":"trackEvent","seek.video.flowplayer":"trackEvent","stop.video.flowplayer":"trackEvent","finish.video.flowplayer":"trackEvent","fullscreen.video.flowplayer":"trackEvent","beforefullscreen.video.flowplayer":"trackEvent","fullscreenexited.video.flowplayer":"trackEvent"},initSystemConfig:[["_setAccount","UA-11018706-3"],["_setDomainName",".chip.de"],["_setAllowHash",!1]],setCustomVar:[[1,"ABC","{{{currpage.abc}}}",3],[2,"BArt","{{{currpage.bart_name}}}",3],[3,"IVW","{{{currpage.ivwkat}}}",3]],libraryGA:{url:"http://www.google-analytics.com/ga.js",eventName:"system.ga.library.loaded"}}},Omniture:{system_req_id:"./Omniture",_eventMap:{"system.Omniture.init":["initSystemConfig(initSystemConfig)","set(set)","track_pi"]},params:{initSystemConfig:{s_account:"cxochipde-prod"},set:[["pageName","{{{currpage.container_id}}}_{{{currpage.pagetitle}}}"],["server","beste-apps.chip.de"],["channel","{{{currpage.channel}}}"],["prop2","{{{currpage.abc}}}"],["prop3","{{{currpage.bart_name}}}"],["prop8","{{{currpage.layout_name}}}"],["prop10","{{{currpage.subsubchannel}}}"],["prop19","{{{currpage.dachzeile}}}"],["prop28","{{{currpage.canonical_tag}}}"],["prop29",function(){var e,t=escape(document.referrer),n="";return"http://www.google."===t.substring(0,18)&&t.split("cd=").length>=2&&(e=t.split("cd=")[1],e.split("&").length>=1&&(n=e.split("&")[0])),n}],["prop30","{{{currpage.match_mode}}}"],["prop36","{{{currpage.mobile-device}}}"],["prop38","{{{currpage.google_prerender}}}"],["prop48","{{{currpage.sales_belegungseinheit}}}"],["prop49","{{{currpage.ivwkat}}}"],["prop50",function(){var e,t,n,i="";for(document.getElementsByName&&(e=document.getElementsByName("robots")),t=0,n=e.length;n>t;t+=1)""!==e[t].content&&(i=e[t].content);return i}]]}},Rholive:{system_req_id:"./Rholive",_eventMap:{"system.Rholive.init":["init(init)","track_pi(track_pi)"]},params:{track_pi:{lid:null,man:"c1",url:"r.chip.de",cid:"{{{currpage.container_id}}}",bid:"{{{currpage.beitrags_id}}}",tit:"{{{currpage.pagetitle}}}",tp:function(){return 1===this.treeNavIds.length?"":this.treeNavIds.splice(this.treeNavIds.length,1).join(";")},tc:function(){return this.treeNavIds.join(";")},tpn:function(){return 1===this.treeNavNames.length?"":this.treeNavNames.splice(this.treeNavNames.length,1).join(";")},r2sz:function(){return screen.width+"x"+screen.height+"x"+screen.colorDepth},ran:function(){return(+new Date).toString(36)},ref:function(){return escape(document.referrer)||" "},con:function(){return navigator.cookieEnabled?1:0}},init:{treeNavIds:function(e){return e.currpage.tree_nav_id},treeNavNames:function(e){return e.currpage.tree_nav_name}}}},IVW:{system_req_id:"./Ivw",_eventMap:{"system.IVW.init":"track_pi(track_pi)"},params:{track_pi:{kat:"{{{currpage.ivwkat}}}",url:"chip.ivwbox.de",typ:"CP",ran:(+new Date).toString(36),ref:encodeURIComponent(document.referrer||" ")}}},"mobile|MobileAgof":{system_req_id:"./MobileAgof",_eventMap:{"system.MobileAgof.init":"loadLibrary(library_agof)","system.mobileAGOF.library.loaded":"track_pi(track_pi)"},params:{track_pi:{s:"m-chipde",cp:function(){return document.location.host+document.location.pathname},url:function(){return document.location.href}},library_agof:{url:"vendor/tracking/springm.v1",eventName:"system.mobileAGOF.library.loaded"}}},vInsight:{system_req_id:"./vInsight",_eventMap:{"system.vInsight.init":["loadLibrary(library_valiton)"],"system.valiton.library.loaded":["subscribeExternalEvents(external_evts)","set(track_pi)","track_pi"]},params:{external_evts:{"ad_load.wstv3":"collect(ad_load_queue_id)","ad_view.wstv3":"collect(ad_view_queue_id)"},track_pi:{section_1:"{{{currpage.pagetitle}}}"},library_valiton:{url:"http://static.vinsight.de/chip/web/layer.min.js",eventName:"system.valiton.library.loaded"}}},"mobile|SZM":{system_req_id:"./SZM",_eventMap:{"init.core":"track_pi(pi)"},params:{pi:{kat:"{{currpage.ivwkat}}",szm:"mobchip"}}}}}});