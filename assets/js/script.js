"use strict";
function polyfillsAreLoaded() {
  var tmp, i, w = window, d=document;
  gumshoe.init({selectorHeader: '[data-gumshoe]'});
  smoothScroll.init({selectorHeader: '[data-gumshoe]'});
  NProgress.start();

  // scrollspy
  var lastScrollTop = 0;
  w.cache = w.cache || {};
  cache.menu = cache.menu || one('.menu');
  function scrollspy(e) {
    if (getViewport().w < 480) {
      var st = getScroll().y;
      if (st > lastScrollTop && st > cache.menu.clientHeight*2) {
        addClass(cache.menu,'folded');  // scroll down
      } else {
        removeClass(cache.menu,'folded');  // scroll up
      } lastScrollTop = st;
    } else {
      removeClass(cache.menu,'folded');
    }
    lazyLoad();
  } scrollspy(); on(window, 'scroll resize', scrollspy);
  // scrollspy

  // lazyload image + gallery
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
  // lazyload image + gallery

  // MD interactive
  (function () {
    var  cmd = {
      find  : function (e,p) {
        var loop = 1,
            ref = e,
            tmp,
            tag = (p[1]||'').replace(/ /g, '').toUpperCase(),
            cls = (p[2]||'');
        e.tabIndex = -1;
        while (loop && p[1] && (e=e.parentNode)) {
          if (e.tagName === tag) { loop = 0; addClass(e, cls);
            if (tag === 'TABLE' && hasClass(e,'responsive')) {
              // TABLE.responsive
              tmp = all('tr', e);     addClass(tmp, 'row');
              tmp = all('td,th', e);  addClass(tmp, 'col-sm-1 col-md-1-' + tmp[0].parentNode.children.length);
              tmp = one('thead', e);  addClass(tmp, 'hide');
            } else {

            }
          } // e.tagName === tag
        } // loop
      },
      image : function (e,p) {
        var tag = (p[1]||'').replace(/ /g, '').toUpperCase(),
            cls = (p[2]||'');
        wrapDOM(e, str2DOM(
          `<`+tag+`></`+tag+`>`
        ));
        addClass(e.parentNode, cls);
        if (tag==='FIGURE') {
          e.parentNode.appendChild(str2DOM(
            `<figcaption>`+e.alt+`</figcaption>`
          ));
        }
        e.title = '';
      },
      link  : function (e,p) {
        if (p[1].indexOf('► youtube embed')>=0) {
          // ► youtube embed
          addClass(e,'block');
          on(e,'click', function (e) {
            e.preventDefault();
            e = this;
            e.href.indexOf('?')<0 ? (e.href+='?&autoplay=1&iv_load_policy=3&modestbranding=1&showinfo=0&rel=0&playsinline=1') : 0;
            e.parentNode.replaceChild(str2DOM(
              `<span class="ratio ratio-16-9"><iframe src="`+e.href+`" allowfullscreen frameborder="0"></iframe></span>`
            ), e);
            return false;
          });
        } else if (p[1].indexOf('audio')>=0) {
          // audio
          e.parentNode.insertBefore(str2DOM(
            `<audio src="`+e.href+`" `+p[2]+`></audio>`
          ),e);
          on(e,'click', function (e) {
            e.preventDefault();
            e = one('audio[src="'+this.href+'"]', e.parentNode);
            e.paused ? e.play() : e.pause();
            return false;
          });
        } else if (p[1].indexOf('image modal')>=0) {
          // image modal
          on(e,'click', function (e) {
            e.preventDefault();
            modal.invoke({
              show: 1,
              body: this.innerHTML,
              header: `<a target="_blank" href="`+this.href+`">`+p[2]+`</a>`,
              className: 'full align-center',
            });
            return false;
          });
        } else if (p[1].indexOf('class')>=0) {
          // class
          addClass(e, p[2]);
        } else {
          // ELSE
        }
        e.title = '';
      },
    }, c = all('body [title]'), i = c.length;
    while(i--){
      var r, p = c[i].title.toLowerCase().split('$');
      r = cmd[p[0]];
      r&&r(c[i], p);
    }
  }());
  // MD interactive
  NProgress.done();
} window.afterLib.push(polyfillsAreLoaded);
window.runAfterLib&&runAfterLib();
