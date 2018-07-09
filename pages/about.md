---
permalink:      /about/
menu_index:     2
---
# About

---

90's boy, half normal, half stupid, yet still alive — 🌏 🦄 ⚡️ 🔥 ✨ 🐉

|[](# '{">":"find","tag":"table","className":"responsive card photo"}')|
|:---:|:---:|
| ![Avatar][Avatar]Figure 1.1 — Avatar | ![Close Up][Close Up]Figure 1.2 — Close Up |

PROS: have strong sense of justice, firm heart and beauty-lover.

CONS: weak against kryptonite and those piercing eyes of yours.

Timeline (not so accurate, but well, why not)

[Avatar]: https://gunawan.wijaya.cc/assets/images/avatar.jpg '{">":"wrap","tag":"span","className":"block avatar embed ratio"}'
[Close Up]: https://gunawan.wijaya.cc/assets/images/closeup.jpg '{">":"wrap","tag":"span","className":"block closeup embed ratio"}'

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
