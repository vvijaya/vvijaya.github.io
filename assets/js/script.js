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
    if (getViewport().w < 960) {
      var st = getScroll().y;
      if (cache.menu && st > lastScrollTop && st > cache.menu.clientHeight*2) {
        addClass(cache.menu,'folded');  // scroll down
      } else {
        removeClass(cache.menu,'folded');  // scroll up
      } lastScrollTop = st;
    } else {
      removeClass(cache.menu,'folded');
    }
    lazyLoad();
  } scrollspy();
  on(window, 'scroll resize', scrollspy);
  on(all('.row,.flex'), 'scroll', scrollspy);
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
              // TABLE.responsive
              tmp = all('tr', d);     addClass(tmp, 'row');
              tmp = all('td,th', d);  addClass(tmp, 'col-sm-1 col-md-1-' + tmp[0].parentNode.children.length);
              tmp = one('thead', d);  addClass(tmp, 'hide');
            } else {

            }
          } // e.tagName === tag
        } // loop
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
  // MD interactive

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
