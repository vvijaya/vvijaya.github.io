---
permalink:      /works/
title:          Works
menu_index:     2
defer:          |
  <script src="https://cdn.jsdelivr.net/npm/fuse.js@3.0.4/dist/fuse.min.js" async="" defer=""></script>
---
# Works[](# "Find$ main$ blue align-center")

---

[Curriculum Vitae on PDF](https://gunawan.wijaya.cc/assets/docs/gunawan.wijaya.pdf)

Below is the list of my project, click the image to enlarge, or click the link to see the live site.<sup>✱</sup>

<small><sup>✱</sup> some of them is down ☹</small>

<div class="card" style="background: #eee; border-color: #ccc;">
  <h2 style="font-weight: 600; margin-top: 0; color: #666;">Search</h2>
  <input id="omnibox" type="search" disabled="disabled"/>
</div>

<div class="work-list align-left clearfix"><div class="flex">
{% for q in site.data.timeline %} {% if q.detail %}
{% for detail in q.detail %} {% if detail.img and detail.desc %}
<div class="col-sm-1 col-md-1-2" data-uri="{{ detail.uri }}">
  <p> <span class="ratio ratio-16-9 {{ detail.live }}"> <a href="{{ detail.uri }}" title="Link$ Image Modal$ {{ detail.title }}">
  <img class="lazyload" data-src="{{ detail.img }}" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
  </a> </span> </p>
  <div> {{ detail.desc | markdownify }} </div>
</div>
{% endif %} {% endfor %}
{% endif %} {% endfor %}
</div></div>
<script>
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

    var options = {
      shouldSort: true,
      /*
      findAllMatches: true,
      includeScore: true,
      includeMatches: true,
      */
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
    };

    var ob = document.getElementById('omnibox');
    ob.removeAttribute('disabled');
    on(ob, 'input propertychange change', function(e) {
      if (this.value.length) {
        var res = (new Fuse(detail, options).search(this.value)), i = res.length;
        addClass(all('.work-list [id]'),'hide');
        while (i--) {
          /*removeClass(one('#card-'+md5(res[i].item.date)),'hide');*/
          removeClass(one('#item-'+md5(res[i].uri)),'hide');
        }
      } else {
        removeClass(all('.work-list [id]'),'hide');
      }
    }); /* omnibox changed */
  });
});
</script>
---
