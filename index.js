// jscs:disable
/* https://github.com/cferdinandi/smooth-scroll */
!function(e,t){"function"==typeof define&&define.amd?define([],t(e)):"object"==typeof exports?module.exports=t(e):e.smoothScroll=t(e)}("undefined"!=typeof global?global:this.window||this.global,function(e){"use strict";var t,n,r,o,a,c={},u="querySelector"in document&&"addEventListener"in e,i={selector:"[data-scroll]",selectorHeader:"[data-scroll-header]",speed:500,easing:"easeInOutCubic",offset:0,updateURL:!0,callback:function(){}},l=function(){var e={},t=!1,n=0,r=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],n++);for(var o=function(n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t&&"[object Object]"===Object.prototype.toString.call(n[r])?e[r]=l(!0,e[r],n[r]):e[r]=n[r])};r>n;n++){var a=arguments[n];o(a)}return e},s=function(e){return Math.max(e.scrollHeight,e.offsetHeight,e.clientHeight)},f=function(e,t){var n,r,o=t.charAt(0),a="classList"in document.documentElement;for("["===o&&(t=t.substr(1,t.length-2),n=t.split("="),n.length>1&&(r=!0,n[1]=n[1].replace(/"/g,"").replace(/"/g,"")));e&&e!==document;e=e.parentNode){if("."===o)if(a){if(e.classList.contains(t.substr(1)))return e}else if(new RegExp("(^|\\s)"+t.substr(1)+"(\\s|$)").test(e.className))return e;if("#"===o&&e.id===t.substr(1))return e;if("["===o&&e.hasAttribute(n[0])){if(!r)return e;if(e.getAttribute(n[0])===n[1])return e}if(e.tagName.toLowerCase()===t)return e}return null};c.escapeCharacters=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),r=n.length,o=-1,a="",c=n.charCodeAt(0);++o<r;){if(t=n.charCodeAt(o),0===t)throw new InvalidCharacterError("Invalid character: the input contains U+0000.");a+=t>=1&&31>=t||127==t||0===o&&t>=48&&57>=t||1===o&&t>=48&&57>=t&&45===c?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&57>=t||t>=65&&90>=t||t>=97&&122>=t?n.charAt(o):"\\"+n.charAt(o)}return"#"+a};var d=function(e,t){var n;return"easeInQuad"===e&&(n=t*t),"easeOutQuad"===e&&(n=t*(2-t)),"easeInOutQuad"===e&&(n=.5>t?2*t*t:-1+(4-2*t)*t),"easeInCubic"===e&&(n=t*t*t),"easeOutCubic"===e&&(n=--t*t*t+1),"easeInOutCubic"===e&&(n=.5>t?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e&&(n=t*t*t*t),"easeOutQuart"===e&&(n=1- --t*t*t*t),"easeInOutQuart"===e&&(n=.5>t?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e&&(n=t*t*t*t*t),"easeOutQuint"===e&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e&&(n=.5>t?16*t*t*t*t*t:1+16*--t*t*t*t*t),n||t},h=function(e,t,n){var r=0;if(e.offsetParent)do r+=e.offsetTop,e=e.offsetParent;while(e);return r=r-t-n,r>=0?r:0},m=function(){return Math.max(e.document.body.scrollHeight,e.document.documentElement.scrollHeight,e.document.body.offsetHeight,e.document.documentElement.offsetHeight,e.document.body.clientHeight,e.document.documentElement.clientHeight)},p=function(e){return e&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(e):{}},g=function(t,n){e.history.pushState&&(n||"true"===n)&&"file:"!==e.location.protocol&&e.history.pushState(null,null,[e.location.protocol,"//",e.location.host,e.location.pathname,e.location.search,t].join(""))},b=function(e){return null===e?0:s(e)+e.offsetTop};c.animateScroll=function(n,c,u){var s=p(c?c.getAttribute("data-options"):null),f=l(t||i,u||{},s),v="[object Number]"===Object.prototype.toString.call(n)?!0:!1,y=v?null:"#"===n?e.document.documentElement:e.document.querySelector(n);if(v||y){var O=e.pageYOffset;r||(r=e.document.querySelector(f.selectorHeader)),o||(o=b(r));var S,I,H=v?n:h(y,o,parseInt(f.offset,10)),E=H-O,j=m(),C=0;v||g(n,f.updateURL);var L=function(t,r,o){var a=e.pageYOffset;(t==r||a==r||e.innerHeight+a>=j)&&(clearInterval(o),v||y.focus(),f.callback(n,c))},w=function(){C+=16,S=C/parseInt(f.speed,10),S=S>1?1:S,I=O+E*d(f.easing,S),e.scrollTo(0,Math.floor(I)),L(I,H,a)},A=function(){clearInterval(a),a=setInterval(w,16)};0===e.pageYOffset&&e.scrollTo(0,0),A()}};var v=function(e){if(0===e.button&&!e.metaKey&&!e.ctrlKey){var n=f(e.target,t.selector);if(n&&"a"===n.tagName.toLowerCase()){e.preventDefault();var r=c.escapeCharacters(n.hash);c.animateScroll(r,n,t)}}},y=function(e){n||(n=setTimeout(function(){n=null,o=b(r)},66))};return c.destroy=function(){t&&(e.document.removeEventListener("click",v,!1),e.removeEventListener("resize",y,!1),t=null,n=null,r=null,o=null,a=null)},c.init=function(n){u&&(c.destroy(),t=l(i,n||{}),r=e.document.querySelector(t.selectorHeader),o=b(r),e.document.addEventListener("click",v,!1),r&&e.addEventListener("resize",y,!1))},c});
function addClass(s,e){s.classList?s.classList.add(e):s.className+=" "+e}
function removeClass(s,e){s.classList?s.classList.remove(e):s.className=s.className.replace(RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")}
function hasClass(s,e){return RegExp(" "+e+" ").test(" "+s.className+" ")}
function toggleClass(s,e){hasClass(s,e)?removeClass(s,e):addClass(s,e)}
function on(s,e,n){s.addEventListener(e,n)}
function off(s,e,n){s.removeEventListener(e,n)}
function one(a,d){;return (d||document).querySelector(a);}
function all(a,d){;return (d||document).querySelectorAll(a);}
function setCookie(e,s,t){var i,n=new Date;t?(n.setTime(n.getTime()+24*t*60*60*1e3),i="; expires="+n.toGMTString()):i="",document.cookie=encodeURIComponent(e)+"="+s+i+"; path=/"}
function getCookie(e){var t,s=e+"=",n=document.cookie.split(";");for(i=0;i<n.length;i++){for(t=n[i];" "===t.charAt(0);)t=t.substring(1,t.length);if(0===t.indexOf(s))return decodeURIComponent(t.substring(s.length,t.length))}return null}
function eraseCookie(name){setCookie(name,"",-1)}
function get(s,e,n,t){var a=new XMLHttpRequest;a.onerror=function(){t&&t()},a.onload=function(){a.status>=200&&a.status<400&&e?e(a.responseText):n&&n()},a.open("GET",s,!0),a.send()}
function post(d,s,e,n,t){var a=new XMLHttpRequest;a.onerror=function(){t&&t()},a.onload=function(){a.status>=200&&a.status<400&&e?e(a.responseText):n&&n()},a.open("POST",s,!0),a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),a.send(d)}
function jsonp(src,e){e = document.createElement('script');document.head.appendChild(e);e.src = src;e.parentNode.removeChild(e);}
function json2qs(j){return "?" + Object.keys(j).map(function(k) {return encodeURIComponent(k) + "=" +encodeURIComponent(j[k]);}).join("&");}
function stringToDOM(a){return new DOMParser().parseFromString(a,'text/html');}
var qs = (function(q,v,k,p,i){k=q.split("&");for(i=0;i<k.length;i++){p=k[i].split("=");v[p[0]]=p[1];}return v;}(window.location.search.substring(1),{}));
// jscs:enable
function wait() {
  if (window.getComputedStyle(one("h1")).getPropertyValue("font-style")=="normal") {
    setTimeout(wait, 100);
  } else {
    removeClass(document.documentElement, "jsload");
  }
}wait();

var loadDeferredStyles = function() {
  var defer, tmp, i;
  function menuClicked (e){
    el = this; while (el.parentNode) {
      el = el.parentNode;if (el === one(".menu")) { break; }
    } toggleClass(el, "close");
  }
  var menuToggle = all(".menu-toggle, .menu-item");
  for (i = 0; i < menuToggle.length; i++) { on(menuToggle[i], "click", menuClicked); }
  smoothScroll.init();

  defer = one("#deferred-styles");
  tmp = document.createElement("var");
  tmp.innerHTML = defer.textContent;
  document.head.appendChild(tmp)
  defer.parentElement.removeChild(defer);

  /* Google Analytics */
  (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","https://www.google-analytics.com/analytics.js","ga");
  ga("set", "userId", "USER_ID");
  ga("create", "UA-67065348-1", "auto");
  ga("send", "pageview");

  /* Heap Analytics */
  window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=t.forceSSL||"https:"===document.location.protocol,a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=(r?"https:":"http:")+"//cdn.heapanalytics.com/js/heap-"+e+".js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(a,n);for(var o=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","removeEventProperty","setEventProperties","track","unsetEventProperty"],c=0;c<p.length;c++)heap[p[c]]=o(p[c])};
  heap.load("852533275");

  /* Mixpanel Analytics */
  (function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
  0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
  for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
  mixpanel.init("8104be8963c319b2d6aef0fd2da80da3");mixpanel.track("Page load");

};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
else window.addEventListener("load", loadDeferredStyles);
