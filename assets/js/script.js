"use strict";
function polyfillsAreLoaded() {
  var tmp, i, w = window, d=document;
  /*= SWIPE =*/
  w.Swipe = function(){
    this.invoke = function(e,Z){
      if(e.type === "touchstart")this._A(this,e,Z);
      if(e.type === "touchmove")this._B(this,e,Z);
      return this
    }
    ,this.xA
    ,this.yA
    ,this._A = function(_this,e,Z){ _this.xA = e.touches[0].clientX; _this.yA = e.touches[0].clientY }
    ,this._B = function(_this,e,Z){
      if ( _this.xA && _this.yA ){
        var xB = _this.xA - e.touches[0].clientX, yB = _this.yA - e.touches[0].clientY;
        if ( Math.abs( xB ) < Math.abs( yB ) ) {
          (yB>0) ? Z.onUp&&Z.onUp() : Z.onDown&&Z.onDown();
        } else {
          (xB>0) ? Z.onLeft&&Z.onLeft() : Z.onRight&&Z.onRight();
        }
        _this.xA = _this.yA = void 0;
      }
    }
  };
  /*= DROPZONE =*/
  w.DropZone = function(ctrl, face) {
    this.files = [];
    this.ctrl = ctrl;
    this.face = face;
    var readFile = function(F, C, beforeRead, afterRead) {
      if (beforeRead && beforeRead(F, C)) {
        var r; function isDone(F) { if (F.dataTXT && F.dataB64) { C.push(F); afterRead && afterRead(F, C); } }
        r=new FileReader(); r.onload=function(F){return function(D){ F.dataTXT=D.target.result;isDone(F) }}(F); r.readAsText(F);
        r=new FileReader(); r.onload=function(F){return function(D){ F.dataB64=D.target.result;isDone(F) }}(F); r.readAsDataURL(F);
      }
    };
    this.fileHandler = function(e, beforeRead, afterRead) {
      if (e.type === "dragend") { e.dataTransfer.clearData();
      } else
      if (e.type === "drop") { var files = e.dataTransfer.files;
        for (var i = 0, f; f = files[i]; i++) { readFile(f, this.files, beforeRead, afterRead) }
      } else
      if (e.type === "change") { var files = e.target.files;
        for (var i = 0, f; f = files[i]; i++) { readFile(f, this.files, beforeRead, afterRead) }
        e.target.value = "";
      }
    };
  };
  /*= MODAL =*/
  w.Modal = function(opts,onClose,callback){
    var i,_default = { id:"Modal", status:0, className:"Modal", header:"Header", body:"Body goes here" },
        _on=function(f,u,n){ f.addEventListener?f.addEventListener(u,n):f.attachEvent?f.attachEvent("on"+u,n):0 },
        _id=function(e,d){ return(d||document).getElementById(e) },
        close=function(e){ e&&e.parentNode.removeChild(e) },
        n=Object.assign(_default,opts);
    close(_id(n.id));
    if(!_id(n.id)){
      i=document.createElement("div");
      i.id=n.id;
      i.className+=n.id+" "+n.className;
      i.innerHTML=` `+`
      <h1 id="`+n.id+`_Header" class="header">`+n.header+`</h1>
      <div id="`+n.id+`_Body" class="body">
      <div>`+n.body+`</div>
      </div>
      <button id="`+n.id+`_Close" class="close">Close</button>`;
      document.body.appendChild(i);
      onClose=onClose||function(){}
      _on(_id(n.id+"_Close"),"click",function(){
        if(onClose&&(onClose()!==false)) close(_id(n.id));
      });
      _on(document,"keydown",function(e){
        if((27==e.keyCode)&&onClose&&(onClose()!==false)) close(_id(n.id));
      });
      callback&&callback();
    }
  };

  NProgress.start();
  /*= scrollspy =*/
  var lastScrollTop = 0;
  w.cache = w.cache || {};
  cache.menu = cache.menu || one('.menu');
  function scrollspy(e) {
    if (getViewport().w < 960) {
      var st = getScroll().y;
      if (cache.menu && st > lastScrollTop && st > cache.menu.clientHeight*2) {
        addClass(cache.menu,'folded');  /*= scroll down =*/
      } else {
        removeClass(cache.menu,'folded');  /*= scroll up =*/
      } lastScrollTop = st;
    } else {
      removeClass(cache.menu,'folded');
    }
    lazyLoad();
  } scrollspy();
  on(window, 'scroll resize', scrollspy);
  on(all('.row,.flex'), 'scroll', scrollspy);
  /*= scrollspy =*/

  /*= lazyload image + gallery =*/
  function lazyLoad() {
    var g = all('img.lazyload'); i = g.length;
    while (i--) {
      if(isElementInViewport(g[i]) && g[i].dataset.src && g[i].src.indexOf('data:image')==0) {
        g[i].src = g[i].dataset.src;
        delete g[i].dataset.src;
        removeClass(g[i], 'lazyload');
      }
    }
  } lazyLoad(); on(w,'hashchange',lazyLoad);
  /*= lazyload image + gallery =*/

  /*= MD interactive =*/
  (function () {
    var  cmd = {
      find  : function (d,j) {
        var loop = 1,
            tmp,
            tag = (j.tag || '').trim().toUpperCase(),
            className = (j.className || '');
        d.tabIndex = -1;
        while (loop && (d=d.parentNode)) {
          if (d.tagName === tag) {
            loop = 0; addClass(d, className);
            if (tag === 'TABLE' && hasClass(d,'responsive')) {
              /*= TABLE.responsive =*/
              tmp = all('tr', d);     addClass(tmp, 'row');
              tmp = all('td,th', d);  addClass(tmp, 'col-sm-1 col-md-1-' + tmp[0].parentNode.children.length);
              tmp = one('thead', d);  addClass(tmp, 'hide');
            } else {

            }
          } /*= e.tagName === tag =*/
        } /*= loop =*/
      },
      wrap  : function (d,j) {
        var tag = (j.tag || '').trim().toUpperCase(),
            className = (j.className || ''),
            figcaption = (j.figcaption || d.alt || d.title || ''),
            wrapper = tag.length ? str2DOM(
              `<`+tag+`></`+tag+`>`
            ) : d;
        addClass(wrapper, className);
        if (wrapper!==d) {
          wrapDOM(d, wrapper);
          if (tag==='FIGURE' && figcaption.length) {
            wrapper.appendChild(str2DOM(
              `<figcaption>`+figcaption+`</figcaption>`
            ));
          }
        }
      },
      audio : function (d,j) {
        var src = (j.src || d.src || d.href || ''),
            attr = (j.attr || ''),
            audio = str2DOM(
              `<audio src="`+src+`" `+attr+`></audio>`
            );
        d.parentNode.insertBefore(audio,d);
        on(d,'click', function (e) {
          e.preventDefault();
          audio.paused ? audio.play() : audio.pause();
          return false;
        });
      },
      embed : function (d,j) {
        var src = (j.src || d.src || d.href || ''),
            className = (j.className || 'embed ratio ratio-16-9');
        src.toLowerCase().indexOf('youtube')>=0 && src.indexOf('?')<0 ? (src+='?&autoplay=1&iv_load_policy=3&modestbranding=1&showinfo=0&rel=0&playsinline=1') : 0;
        addClass(d, className);
        on(d,'click', function (e) {
          e.preventDefault();
          removeClass(d,'embed');
          d.parentNode.replaceChild(str2DOM(
            `<span class="`+className+`"><iframe src="`+src+`" allowfullscreen frameborder="0"></iframe></span>`
          ), d);
          return false;
        });
      },
      modal : function (d,j) {
        var src = (j.src || d.src || d.href || ''),
            body = (j.body || d.innerHTML || 'Body'),
            header = (j.header || 'Header'),
            className = (j.className || '');
        on(d,'click', function (e) {
          e.preventDefault();
          modal.invoke({
            body: body,
            header: `<a target="_blank" href="`+src+`">`+header+`</a>`,
            className: className,
          });
          lazyLoad();
          return false;
        });
      },
    }, el = all('body [title]'), i = el.length;
    while(i--){
      var j, t; try { t = JSON.parse(el[i].title); t = t.pop ? t : [t]; } catch (e) {}
      while (t && ( j = t.pop() ) ) { cmd[j['>']](el[i],j); el[i].title=""; }
    }
  }());
  /*= MD interactive =*/

  on(one('.rotator'), 'click', function() {
    var main = one('main');
    addClass(this,'clicked');
    if (hasClass(main,'red')) {
      removeClass(main,'red');
      addClass(main,'green');
    } else if (hasClass(main,'green')) {
      removeClass(main,'green');
      addClass(main,'blue');
    } else if (hasClass(main,'blue')) {
      removeClass(main,'blue');
      addClass(main,'dark');
    } else if (hasClass(main,'dark')) {
      removeClass(main,'dark');
    } else {
      addClass(main,'red');
    }
    setTimeout(function(){
      removeClass(one('.rotator'),'clicked');
    },400);
  });

  NProgress.done();
} window.afterLib.push(polyfillsAreLoaded);
window.runAfterLib&&runAfterLib();
