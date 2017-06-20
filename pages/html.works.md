---
permalink:      /works/
title:          Works
menu_index:     2
defer:          |
  <script src="https://cdn.jsdelivr.net/npm/fuse.js@3.0.4/dist/fuse.min.js" async="" defer=""></script>
---

# Works[](# '{">":"find","tag":"main","className":"blue align-center"}')

---

[Curriculum Vitae on PDF](https://gunawan.wijaya.cc/assets/docs/gunawan.wijaya.pdf)

Below is the list of my project, click the image to enlarge, or click the link to see the live site.<sup>✱</sup>

<small><sup>✱</sup> some of them is down ☹</small>

<div class="card white no-print">
  <h2>Search</h2>
  <p><input id="omnibox" type="search" disabled="disabled"/></p>
</div>

<div style="overflow:hidden;">
  <div class="work-list align-left" style="margin:0 -16px;margin-bottom:-20px;">
    <div class="row x_nowrap" style="padding-bottom:20px;">
      {% for q in site.data.timeline %} {% if q.detail %}
      {% for detail in q.detail %} {% if detail.img and detail.desc %}
      <div class="col-sm-1 col-md-1-2" data-uri="{{ detail.uri }}">
        <p> <span class="ratio ratio-16-9 {{ detail.live }}">

          <a href="{{ detail.uri }}" title='{">":"modal","header":"{{ detail.title | smartify }}","className":"full align-center"}'>
            <img class="lazyload" data-src="{{ detail.img }}" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
          </a>

        </span> </p>
        <div> {{ detail.desc | markdownify }} </div>
      </div>
      {% endif %} {% endfor %}
      {% endif %} {% endfor %}
    </div>
  </div>
</div>

---

<script>

function _SmoothScroll(o,r,t){var e=[o.scrollLeft,o.scrollTop],n=[r[0]-e[0],r[1]-e[1]],l=0,u=20;Math.easeInOutQuad=function(o,r,t,e){return o/=e/2,1>o?t/2*o*o+r:(o--,-t/2*(o*(o-2)-1)+r)};var s=function(){l+=u,o.scrollLeft=Math.easeInOutQuad(l,e[0],n[0],t),o.scrollTop=Math.easeInOutQuad(l,e[1],n[1],t),t>l&&setTimeout(s,u)};s()}


afterLib.push(function(){
  var dataUri = all('[data-uri]'), i = dataUri.length;
  while (i--) {
    dataUri[i].id = 'item-'+md5(dataUri[i].dataset.uri);
    dataUri[i].removeAttribute('data-uri');
  }
  fetch('https://gunawan.wijaya.cc/api/timeline.json')
  .then(function(e){return(e.text()||e);})
  .then(function(e){
    var list = (JSON.parse(e));
    var detail = [];
    list.map(function(list){ if (list.detail) {
      list.detail.map(function(e){ if (e.img) { detail.push(e); } });
    } });
    var ob = document.getElementById('omnibox');
    ob.removeAttribute('disabled');
    on(ob, 'input propertychange change', function(e) {
      if (this.value.length) {
        var res = (new Fuse(detail, {
          shouldSort: true,
          threshold: 0.2,
          location: 0,
          distance: 4000,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [
            { weight: 0.7, name: 'title' },
            { weight: 0.6, name: 'desc' },
            { weight: 0.5, name: 'uri' },
            { weight: 0.4, name: 'live' },
          ]
        }).search(this.value)), i = res.length;
        addClass(all('.work-list [id]'),'col-sm-0 col-md-0');
        while (i--) { removeClass(one('#item-'+md5(res[i].uri)),'col-sm-0 col-md-0'); }
      } else {
        removeClass(all('.work-list [id]'),'col-sm-0 col-md-0');
      }
    }); /*= omnibox changed =*/
  });
});
</script>
