---
layout:         page
permalink:      /about/
title:          About
menu_index:     2
---
# About[](# "Find$ main$ green align-center")

---

90's boy, half normal, half stupid, yet still alive — 🌏 🦄 ⚡️ 🔥 ✨ 🐉

|[](# "Find$ table$ responsive figure")|
|:---:|:---:|
| ![Avatar][Avatar]Figure 1.1 — Avatar | ![Close Up][Close Up]Figure 1.2 — Close Up |

PROS: have strong sense of justice, firm heart and beauty-lover.

CONS: weak against kryptonite and those piercing eyes of yours.

Timeline (not so accurate, but well, why not)

<div class="card-list">
{% for q in site.data.timeline %} <div class="card"> {% capture md %}
{{ q.date }}

{{ q.md }}
{% if q.detail %}{% for detail in q.detail %} - <small class="{{ detail.live }}"><{{ detail.uri }}></small>
{% endfor %}{% endif %}
{% endcapture %} {{ md | markdownify }} </div> {% endfor %}
</div>

---

[Avatar]: https://gunawan.wijaya.cc/assets/images/avatar.jpg "Image$ block avatar"
[Close Up]: https://gunawan.wijaya.cc/assets/images/closeup.jpg "Image$ block closeup"
