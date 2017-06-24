---
permalink:      /about/
title:          About
menu_index:     1
defer:          |
  <script src="https://cdn.jsdelivr.net/npm/fuse.js" async="" defer=""></script>
---
# About[](# '{">":"find","tag":"main","className":"green align-center"}')

---

90's boy, half normal, half stupid, yet still alive — 🌏 🦄 ⚡️ 🔥 ✨ 🐉

|[](# '{">":"find","tag":"table","className":"responsive card"}')|
|:---:|:---:|
| ![Avatar][Avatar]Figure 1.1 — Avatar | ![Close Up][Close Up]Figure 1.2 — Close Up |

PROS: have strong sense of justice, firm heart and beauty-lover.

CONS: weak against kryptonite and those piercing eyes of yours.

Timeline (not so accurate, but well, why not)

[Avatar]: https://gunawan.wijaya.cc/assets/images/avatar.jpg '{">":"wrap","tag":"span","className":"block avatar"}'
[Close Up]: https://gunawan.wijaya.cc/assets/images/closeup.jpg '{">":"wrap","tag":"span","className":"block closeup"}'

<div class="card-list">
  <div class="card white no-print">
    <h2>Search</h2>
    <p><input id="omnibox" type="search" disabled="disabled"/></p>
  </div>
{% for q in site.data.timeline %} <div class="card black" data-id="{{ q.date }}"> {% capture md %}
{{ q.date }}

{{ q.md }}
{% if q.detail %}{% for detail in q.detail %} - <small class="{{ detail.live }}"><{{ detail.uri }}></small>
{% endfor %}{% endif %}
{% endcapture %} {{ md | markdownify }} </div> {% endfor %}
</div>

---

<script>
afterLib.push(function(){
  var id=all('[data-id]'),i=id.length;while(i--){id[i].id='X-'+md5(id[i].dataset.id);delete id[i].dataset.id}
  fetch('https://gunawan.wijaya.cc/api/timeline.json')
  .then(function(e){return(e.text()||e);})
  .then(function(e){
    var list = (JSON.parse(e)),
        ob = one('#omnibox');
    ob.removeAttribute('disabled');
    on(ob, 'input propertychange change', function(e) {
      if (window.Fuse && this.value.length) {
        var res = (new Fuse(list, {
          shouldSort: true,
          threshold: 0.2,
          location: 0,
          distance: 1000,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [
            { weight: 0.7, name: 'date' },
            { weight: 0.6, name: 'md' },
            { weight: 0.5, name: 'detail.uri' }
          ]
        }).search(this.value)), i = res.length;
        addClass(all('.card-list .card[id]'),'hide');
        while (i--) { removeClass(one('#X-'+md5(res[i].date)),'hide'); }
      } else { removeClass(all('.card-list .card[id]'),'hide'); }
    }); /*= omnibox changed =*/
  });
});
</script>
