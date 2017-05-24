// jscs:disable
/*! smooth-scroll v11.0.2 | (c) 2017 Chris Ferdinandi | GPL-3.0 License | http://github.com/cferdinandi/smooth-scroll */
!(function(e,t){"function"==typeof define&&define.amd?define([],t(e)):"object"==typeof exports?module.exports=t(e):e.smoothScroll=t(e)})("undefined"!=typeof global?global:this.window||this.global,(function(e){"use strict";var t,n,o,r,a,i,c,l={},s="querySelector"in document&&"addEventListener"in e,u={selector:"[data-scroll]",selectorHeader:null,speed:500,offset:0,easing:"easeInOutCubic",easingPatterns:{},before:function(){},after:function(){}},f=function(){var e={},t=!1,n=0,o=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],n++);for(;n<o;n++){var r=arguments[n];!(function(n){for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t&&"[object Object]"===Object.prototype.toString.call(n[o])?e[o]=f(!0,e[o],n[o]):e[o]=n[o])})(r)}return e},d=function(e){return Math.max(e.scrollHeight,e.offsetHeight,e.clientHeight)},h=function(e,t){for(Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length;--n>=0&&t.item(n)!==this;);return n>-1});e&&e!==document;e=e.parentNode)if(e.matches(t))return e;return null},m=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,r=-1,a="",i=n.charCodeAt(0);++r<o;){if(0===(t=n.charCodeAt(r)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");t>=1&&t<=31||127==t||0===r&&t>=48&&t<=57||1===r&&t>=48&&t<=57&&45===i?a+="\\"+t.toString(16)+" ":a+=t>=128||45===t||95===t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122?n.charAt(r):"\\"+n.charAt(r)}return"#"+a},p=function(e,t){var n;return"easeInQuad"===e.easing&&(n=t*t),"easeOutQuad"===e.easing&&(n=t*(2-t)),"easeInOutQuad"===e.easing&&(n=t<.5?2*t*t:(4-2*t)*t-1),"easeInCubic"===e.easing&&(n=t*t*t),"easeOutCubic"===e.easing&&(n=--t*t*t+1),"easeInOutCubic"===e.easing&&(n=t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e.easing&&(n=t*t*t*t),"easeOutQuart"===e.easing&&(n=1- --t*t*t*t),"easeInOutQuart"===e.easing&&(n=t<.5?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e.easing&&(n=t*t*t*t*t),"easeOutQuint"===e.easing&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e.easing&&(n=t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t),e.easingPatterns[e.easing]&&(n=e.easingPatterns[e.easing](t)),n||t},g=function(e,t,n){var o=0;if(e.offsetParent)do{o+=e.offsetTop,e=e.offsetParent}while(e);return o=Math.max(o-t-n,0),Math.min(o,y()-b())},b=function(){return Math.max(document.documentElement.clientHeight,e.innerHeight||0)},y=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},v=function(e){return e&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(e):{}},O=function(e){return e?d(e)+e.offsetTop:0},S=function(t,n,o){o||(t.focus(),document.activeElement.id!==t.id&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),e.scrollTo(0,n))};l.animateScroll=function(n,o,i){var l=v(o?o.getAttribute("data-options"):null),s=f(t||u,i||{},l),d="[object Number]"===Object.prototype.toString.call(n),h=d||!n.tagName?null:n;if(d||h){var m=e.pageYOffset;s.selectorHeader&&!r&&(r=document.querySelector(s.selectorHeader)),a||(a=O(r));var b,E,I=d?n:g(h,a,parseInt("function"==typeof s.offset?s.offset():s.offset,10)),H=I-m,A=y(),j=0,C=function(t,r,a){var i=e.pageYOffset;(t==r||i==r||e.innerHeight+i>=A)&&(clearInterval(a),S(n,r,d),s.after(n,o))},M=function(){j+=16,b=j/parseInt(s.speed,10),b=b>1?1:b,E=m+H*p(s,b),e.scrollTo(0,Math.floor(E)),C(E,I,c)};0===e.pageYOffset&&e.scrollTo(0,0),s.before(n,o),(function(){clearInterval(c),c=setInterval(M,16)})()}};var E=function(t){try{m(decodeURIComponent(e.location.hash))}catch(t){m(e.location.hash)}n&&(n.id=n.getAttribute("data-scroll-id"),l.animateScroll(n,o),n=null,o=null)},I=function(r){if(0===r.button&&!r.metaKey&&!r.ctrlKey&&(o=h(r.target,t.selector))&&"a"===o.tagName.toLowerCase()&&o.hostname===e.location.hostname&&o.pathname===e.location.pathname&&/#/.test(o.href)){var a;try{a=m(decodeURIComponent(o.hash))}catch(e){a=m(o.hash)}if("#"===a){r.preventDefault(),n=document.body;var i=n.id?n.id:"smooth-scroll-top";return n.setAttribute("data-scroll-id",i),n.id="",void(e.location.hash.substring(1)===i?E():e.location.hash=i)}n=document.querySelector(a),n&&(n.setAttribute("data-scroll-id",n.id),n.id="",o.hash===e.location.hash&&(r.preventDefault(),E()))}},H=function(e){i||(i=setTimeout((function(){i=null,a=O(r)}),66))};return l.destroy=function(){t&&(document.removeEventListener("click",I,!1),e.removeEventListener("resize",H,!1),t=null,n=null,o=null,r=null,a=null,i=null,c=null)},l.init=function(n){s&&(l.destroy(),t=f(u,n||{}),r=t.selectorHeader?document.querySelector(t.selectorHeader):null,a=O(r),document.addEventListener("click",I,!1),e.addEventListener("hashchange",E,!1),r&&e.addEventListener("resize",H,!1))},l}));
function fadeout(e){""==e.style.opacity&&(e.style.opacity=1),(e.style.opacity-=.1)>0&&setTimeout(function(){fadeout(e)},40)}
function fadein(e){""==e.style.opacity&&(e.style.opacity=0),(e.style.opacity-=-.1)<1&&setTimeout(function(){fadein(e)},40)}
function addClass(e,t){e.classList?e.classList.add(t):e.className+=" "+t}
function hasClass(e,t){return RegExp(" "+t+" ").test(" "+e.className+" ")}
function removeClass(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")}
function toggleClass(s,e){hasClass(s,e)?removeClass(s,e):addClass(s,e)}
function setCookie(e,t,n){var o,i=new Date;n?(i.setTime(i.getTime()+24*n*60*60*1e3),o="; expires="+i.toGMTString()):o="",document.cookie=encodeURIComponent(e)+"="+t+o+"; path=/"}
function getCookie(e){var t,n=e+"=",o=document.cookie.split(";");for(i=0;i<o.length;i++){for(t=o[i];" "===t.charAt(0);)t=t.substring(1,t.length);if(0===t.indexOf(n))return decodeURIComponent(t.substring(n.length,t.length))}return null}
function eraseCookie(e){setCookie(e,"",-1)}
function off(e,t,n){e.removeEventListener(t,n)}
function on(e,t,n){e.addEventListener(t,n)}
function one(a,d){;return (d||document).querySelector(a);}
function all(a,d){;return (d||document).querySelectorAll(a);}
function getScroll(){return{x:window.scrollX||window.scrollLeft||0,y:window.scrollY||window.scrollTop||0}}
function get(s,e,n,t,h,p){var a=new XMLHttpRequest;a.onerror=function(){t&&t()},a.onload=function(){a.status>=200&&a.status<400&&e?e(a.responseText,p):n&&n()},a.open("GET",s,!0);for(var k in h){if(h.hasOwnProperty(k))a.setRequestHeader(k,h[k])};a.send()}
function post(d,s,e,n,t,h,p){var a=new XMLHttpRequest;a.onerror=function(){t&&t()},a.onload=function(){a.status>=200&&a.status<400&&e?e(a.responseText,p):n&&n()},a.open("POST",s,!0);for(var k in h){if(h.hasOwnProperty(k))a.setRequestHeader(k,h[k])};a.send(d)}
function json2qs(j){return "?" + Object.keys(j).map(function(k) {return encodeURIComponent(k) + "=" +encodeURIComponent(j[k]);}).join("&");}
function jsonp(src,e){e = document.createElement('script');document.head.appendChild(e);e.src = src;e.parentNode.removeChild(e);}
function injectCSS(e,t,n){n=document,t=n.createElement("style"),n.head.appendChild(t),t.appendChild(n.createTextNode(e))}
function stringToDOM(a){return new DOMParser().parseFromString(a,'text/html');}
var qs = (function(q,v,k,p,i){k=q.split("&");for(i=0;i<k.length;i++){p=k[i].split("=");v[p[0]]=p[1];}return v;}(window.location.search.substring(1),{}));
function first(e,t,n){for(n in e)if(e.hasOwnProperty(n))return t?n:e[n]}
function arrayToObject(e,t,n){for(t={},n=0;n<e.length;++n)void 0!==e[n]&&(t[e[n].id||n]=e[n]);return t}
function objectToArray(e){return Object.keys(e).map(function(t){return e[t]})}
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
      el = el.parentNode;if (el === one(".accordion-menu")) { break; }
    } toggleClass(el, "close");
  }
  var menuToggle = all(".menu-toggle, .menu-item");
  for (i = 0; i < menuToggle.length; i++) { on(menuToggle[i], "click", menuClicked); }
  smoothScroll.init({before: function (anchor, toggle){}});

  defer = one("#deferred-styles");
  tmp = document.createElement("var");
  tmp.innerHTML = defer.textContent;
  document.head.appendChild(tmp)
  defer.parentElement.removeChild(defer);

};
var raf = requestAnimationFrame || mozRequestAnimationFrame ||
webkitRequestAnimationFrame || msRequestAnimationFrame;
if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
else window.addEventListener("load", loadDeferredStyles);
