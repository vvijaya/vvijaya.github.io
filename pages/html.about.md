---
permalink: /about/
title: About
menu_index: 1
defer: |
  <script async="" defer="" src="https://unpkg.com/fuse.js"></script>
  <script async="" defer="" src="https://unpkg.com/blueimp-md5/js/md5.min.js"></script>
---

# About[](# '{">":"find","tag":"main","className":"green align-center"}')

---

90's boy, half normal, half stupid, yet still alive — 🌏 🦄 ⚡️ 🔥 ✨ 🐉

| [](# '{">":"find","tag":"table","className":"responsive card photo"}') |
| :--------------------------------------------------------------------: |
|                  ![Avatar][avatar]Figure 1.1 — Avatar                  | ![Close Up][close up]Figure 1.2 — Close Up |

PROS: have strong sense of justice, firm heart and beauty-lover.

CONS: weak against kryptonite and those piercing eyes of yours.

Timeline (not so accurate, but well, why not)

[avatar]: https://gunawan.wijaya.cc/assets/images/avatar.jpg '{">":"wrap","tag":"span","className":"block avatar embed ratio"}'
[close up]: https://gunawan.wijaya.cc/assets/images/closeup.jpg '{">":"wrap","tag":"span","className":"block closeup embed ratio"}'

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

<script async="" defer="" src="{{ "/assets/js/html.about.js" | absolute_url }}"></script>
