/*jslint browser:true, plusplus: true, sloppy: true, regexp: true, maxerr: 100, nomen: true */

!function(e,t){"function"==typeof define&&define.amd?define("smoothScroll",t(e)):"object"==typeof exports?module.exports=t(e):e.smoothScroll=t(e)}(window||this,function(e){"use strict";var t,n,o,r,a={},c=!!document.querySelector&&!!e.addEventListener,u={speed:500,easing:"easeInOutCubic",offset:0,updateURL:!0,callbackBefore:function(){},callbackAfter:function(){}},i=function(e,t,n){if("[object Object]"===Object.prototype.toString.call(e))for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(n,e[o],o,e);else for(var r=0,a=e.length;a>r;r++)t.call(n,e[r],r,e)},l=function(e,t){var n={};return i(e,function(t,o){n[o]=e[o]}),i(t,function(e,o){n[o]=t[o]}),n},s=function(e,t){for(var n=t.charAt(0);e&&e!==document;e=e.parentNode)if("."===n){if(e.classList.contains(t.substr(1)))return e}else if("#"===n){if(e.id===t.substr(1))return e}else if("["===n&&e.hasAttribute(t.substr(1,t.length-2)))return e;return!1},f=function(e){return Math.max(e.scrollHeight,e.offsetHeight,e.clientHeight)},d=function(e){for(var t,n=String(e),o=n.length,r=-1,a="",c=n.charCodeAt(0);++r<o;){if(t=n.charCodeAt(r),0===t)throw new InvalidCharacterError("Invalid character: the input contains U+0000.");a+=t>=1&&31>=t||127==t||0===r&&t>=48&&57>=t||1===r&&t>=48&&57>=t&&45===c?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&57>=t||t>=65&&90>=t||t>=97&&122>=t?n.charAt(r):"\\"+n.charAt(r)}return a},h=function(e,t){var n;return"easeInQuad"===e&&(n=t*t),"easeOutQuad"===e&&(n=t*(2-t)),"easeInOutQuad"===e&&(n=.5>t?2*t*t:-1+(4-2*t)*t),"easeInCubic"===e&&(n=t*t*t),"easeOutCubic"===e&&(n=--t*t*t+1),"easeInOutCubic"===e&&(n=.5>t?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e&&(n=t*t*t*t),"easeOutQuart"===e&&(n=1- --t*t*t*t),"easeInOutQuart"===e&&(n=.5>t?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e&&(n=t*t*t*t*t),"easeOutQuint"===e&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e&&(n=.5>t?16*t*t*t*t*t:1+16*--t*t*t*t*t),n||t},m=function(e,t,n){var o=0;if(e.offsetParent)do o+=e.offsetTop,e=e.offsetParent;while(e);return o=o-t-n,o>=0?o:0},p=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},v=function(e){return e&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(e):{}},g=function(t,n){history.pushState&&(n||"true"===n)&&history.pushState(null,null,[e.location.protocol,"//",e.location.host,e.location.pathname,e.location.search,t].join(""))},b=function(e){return null===e?0:f(e)+e.offsetTop};a.animateScroll=function(t,n,a){var c=l(c||u,a||{}),i=v(t?t.getAttribute("data-options"):null);c=l(c,i),n="#"+d(n.substr(1));var s="#"===n?document.documentElement:document.querySelector(n),f=e.pageYOffset;o||(o=document.querySelector("[data-scroll-header]")),r||(r=b(o));var O,y,S,I=m(s,r,parseInt(c.offset,10)),E=I-f,H=p(),A=0;g(n,c.updateURL);var L=function(o,r,a){var u=e.pageYOffset;(o==r||u==r||e.innerHeight+u>=H)&&(clearInterval(a),s.focus(),c.callbackAfter(t,n))},Q=function(){A+=16,y=A/parseInt(c.speed,10),y=y>1?1:y,S=f+E*h(c.easing,y),e.scrollTo(0,Math.floor(S)),L(S,I,O)},C=function(){c.callbackBefore(t,n),O=setInterval(Q,16)};0===e.pageYOffset&&e.scrollTo(0,0),C()};var O=function(e){var n=s(e.target,"[data-scroll]");n&&"a"===n.tagName.toLowerCase()&&(e.preventDefault(),a.animateScroll(n,n.hash,t))},y=function(){n||(n=setTimeout(function(){n=null,r=b(o)},66))};return a.destroy=function(){t&&(document.removeEventListener("click",O,!1),e.removeEventListener("resize",y,!1),t=null,n=null,o=null,r=null)},a.init=function(n){c&&(a.destroy(),t=l(u,n||{}),o=document.querySelector("[data-scroll-header]"),r=b(o),document.addEventListener("click",O,!1),o&&e.addEventListener("resize",y,!1))},a});
"document"in self&&!("classList"in document.createElement("_"))&&!function(t){"use strict";if("Element"in t){var e="classList",n="prototype",i=t.Element[n],r=Object,s=String[n].trim||function(){return this.replace(/^\s+|\s+$/g,"")},a=Array[n].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1},o=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},u=function(t,e){if(""===e)throw new o("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(e))throw new o("INVALID_CHARACTER_ERR","String contains an invalid character");return a.call(t,e)},c=function(t){for(var e=s.call(t.getAttribute("class")||""),n=e?e.split(/\s+/):[],i=0,r=n.length;r>i;i++)this.push(n[i]);this._updateClassName=function(){t.setAttribute("class",this.toString())}},l=c[n]=[],h=function(){return new c(this)};if(o[n]=Error[n],l.item=function(t){return this[t]||null},l.contains=function(t){return t+="",-1!==u(this,t)},l.add=function(){var t,e=arguments,n=0,i=e.length,r=!1;do t=e[n]+"",-1===u(this,t)&&(this.push(t),r=!0);while(++n<i);r&&this._updateClassName()},l.remove=function(){var t,e=arguments,n=0,i=e.length,r=!1;do{t=e[n]+"";var s=u(this,t);-1!==s&&(this.splice(s,1),r=!0)}while(++n<i);r&&this._updateClassName()},l.toggle=function(t,e){t+="";var n=this.contains(t),i=n?e!==!0&&"remove":e!==!1&&"add";return i&&this[i](t),!n},l.toString=function(){return this.join(" ")},r.defineProperty){var f={get:h,enumerable:!0,configurable:!0};try{r.defineProperty(i,e,f)}catch(d){-2146823252===d.number&&(f.enumerable=!1,r.defineProperty(i,e,f))}}else r[n].__defineGetter__&&i.__defineGetter__(e,h)}}(self);
!function(e,t){"function"==typeof define&&define.amd?define([],t(e)):"object"==typeof exports?module.exports=t(e):e.gumshoe=t(e)}(this,function(e){"use strict";var t,n,a,r,o,c,i={},s=!!document.querySelector&&!!e.addEventListener,l=[],u={offset:0,activeClass:"active",callbackBefore:function(){},callbackAfter:function(){}},f=function(e,t,n){if("[object Object]"===Object.prototype.toString.call(e))for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.call(n,e[a],a,e);else for(var r=0,o=e.length;o>r;r++)t.call(n,e[r],r,e)},d=function(e,t){var n={};return f(e,function(t,a){n[a]=e[a]}),f(t,function(e,a){n[a]=t[a]}),n},v=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},m=function(e){return Math.max(e.scrollHeight,e.offsetHeight,e.clientHeight)},h=function(e){var n=0;if(e.offsetParent)do n+=e.offsetTop,e=e.offsetParent;while(e);return n=n-o-t.offset,n>=0?n:0},g=function(){l.sort(function(e,t){return e.distance>t.distance?-1:e.distance<t.distance?1:0})};i.setDistances=function(){a=v(),o=r?m(r)+h(r):0,f(l,function(e){e.distance=h(e.target)}),g()};var p=function(){var e=document.querySelectorAll("[data-gumshoe] a");f(e,function(e){e.hash&&l.push({nav:e,target:document.querySelector(e.hash),parent:"li"===e.parentNode.tagName.toLowerCase()?e.parentNode:null,distance:0})})},y=function(e){c&&(c.nav.classList.remove(t.activeClass),c.parent&&c.parent.classList.remove(t.activeClass)),t.callbackBefore(e),e.nav.classList.add(t.activeClass),e.parent&&e.parent.classList.add(t.activeClass),t.callbackAfter(e),c={nav:e.nav,parent:e.parent}};i.getCurrentNav=function(){var t=e.pageYOffset;if(e.innerHeight+t>=a)return y(l[0]);for(var n=0,r=l.length;r>n;n++){var o=l[n];if(o.distance<t)return y(o)}};var b=function(){f(l,function(e){e.nav.classList.contains(t.activeClass)&&(c={nav:e.nav,parent:e.parent})})};i.destroy=function(){t&&(e.removeEventListener("resize",C,!1),e.removeEventListener("scroll",C,!1),l=[],t=null,n=null,a=null,r=null,o=null,c=null)};var C=function(e){n||(n=setTimeout(function(){n=null,"scroll"===e.type&&i.getCurrentNav(),"resize"===e.type&&(i.setDistances(),i.getCurrentNav())},66))};return i.init=function(n){s&&(i.destroy(),t=d(u,n||{}),r=document.querySelector("[data-gumshoe-header]"),p(),0!==l.length&&(b(),i.setDistances(),i.getCurrentNav(),e.addEventListener("resize",C,!1),e.addEventListener("scroll",C,!1)))},i});

var u = void 0, t = !0, f = !1, o = null, w = this, tmp;
var addJSStyle = function (css) {
        var styleElement = document.getElementById('styles_js');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = 'styles_js';
            document.getElementsByTagName('head')[0].appendChild(styleElement);
        }
        styleElement.appendChild(document.createTextNode(css));
    },
    stripURL = function (url) {
        return url.split("?")[0].split("#")[0];
    },
    noCallback = function (e) {
        (e.preventDefault) ? e.preventDefault() : e.returnValue = false;
    },
    insertAfter = function (n, e) {
        e.parentNode.insertBefore(n, e.nextSibling);
    },
    bindEvent = function (e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n);
    },
    getQs = function (e) {
        var t = location.search.match(RegExp("[?&]" + e + "=([^&]*)(&?)", "i"));
        return t ? t[1] : t
    },
    getId = function (e) {
        return document.getElementById(e);
    },
    getTag = function (e) {
        return document.getElementsByTagName(e);
    },
    getClass = function (e) {
        return document.getElementsByClassName(e);
    },
    getAll = function (e) {
        return document.querySelectorAll(e);
    },
    getOne = function (e) {
        return document.querySelector(e);
    },
    getVal = function (e) {
        return e.value;
    },
    getTxt = function (e) {
        return e.innerHTML;
    },
    setVal = function (e, t) {
        e.value = t;
    },
    setTxt = function (e, t) {
        e.innerHTML = t;
    },
    addCls = function (e, t) {
        e.classList ? e.classList.add(t) : e.className += " " + t;
    },
    remCls = function (e, t) {
        e.classList ? e.classList.remove(t) : e.className = e.className.replace(new RegExp("(^|\\b)" + t.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    },
    hasCls = function (e, t) {
        return new RegExp(" " + t + " ").test(" " + e.className + " ");
    },
    setCookie = function (e, t, n) {
        var o, i = new Date();
        n ? (i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3), o = "; expires=" + i.toGMTString()) : o = "", document.cookie = e + "=" + t + o + "; path=/"
    },
    getCookie = function (e) {
        var t, n = e + "=",
            o = document.cookie.split(";");
        for (i = 0; i < o.length; i++) {
            for (t = o[i];
                " " === t.charAt(0);) t = t.substring(1, t.length);
            if (0 === t.indexOf(n)) return t.substring(n.length, t.length);
        }
        return null
    },
    remCookie = function (e) {
        setCookie(e, "", -1);
    },
    ismobile = function () {
        if (sessionStorage.desktop){return false}
        else if (localStorage.mobile){return true}
        var mobile = ['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile']; 
        for (var i in mobile) if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) return true;
        return false;
    },
    log = function (e, f) {
        if(!f) { console.log(e); }
    },
    err = function (e, f) {
        if(!f) { console.error(e); }
    },
    c_relative = function (e) {
        var d_b = document.body, d_e = document.documentElement, tmp, pos = {},
        el = e.target || e.srcElement, elP = {x: 0, y: 0}, eP = {x: 0, y: 0};
        if ('number' === typeof e.clientX) { 
            eP.x = e.clientX + d_b.scrollLeft + d_e.scrollLeft;
            eP.y = e.clientY + d_b.scrollTop + d_e.scrollTop;
        }else if ('number' === typeof e.pageX) { eP.x = e.pageX; eP.y = e.pageY; }
        if (el.offsetParent) {
            tmp = el; elP.x = tmp.offsetLeft; elP.y = tmp.offsetTop;
            while (tmp = tmp.offsetParent) { elP.x += tmp.offsetLeft; elP.y += tmp.offsetTop; }
        }

        pos.c_x = Math.round(eP.x - elP.x); pos.d_x = el.clientWidth;  pos.r_x = Math.round(eP.x - elP.x) / el.clientWidth;
        pos.c_y = Math.round(eP.y - elP.y); pos.d_y = el.clientHeight; pos.r_y = Math.round(eP.y - elP.y) / el.clientHeight;
        return pos;
    }
document.getElementsByClassName || (document.getElementsByClassName = function (t) {
    for (var n = [], o = RegExp("(^| )" + t + "( |$)"), i = document.getElementsByTagName("*"), a = 0, s = i.length; s > a; a++){
        o.test(i[a].className) && n.push(i[a]);
    } return n
});
Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
