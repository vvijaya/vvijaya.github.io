---
layout:         page
permalink:      /works/
title:          Works
menu_index:     3
---
# Works[](# "Find$ main$ blue align-center")

---

[Curriculum Vitae on PDF](https://gunawan.wijaya.cc/assets/docs/gunawan.wijaya.pdf)

Below is the list of my project, click the image to enlarge, or click the link to see the live site.<sup>✱</sup>

<small><sup>✱</sup> some of them is down ☹</small>

<div class="work-list align-left clearfix"><div class="row">
{% for q in site.data.timeline %} {% if q.detail %}
{% for detail in q.detail %} {% if detail.img and detail.desc %}
<div class="col-sm-1 col-md-1-2">
  <p> <span class="ratio ratio-16-9 {{ detail.live }}"> <a href="{{ detail.uri }}" title="Link$ Image Modal$ {{ detail.title }}">
  <img class="lazyload" data-src="{{ detail.img }}" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
  </a> </span> </p>
  <div> {{ detail.desc | markdownify }} </div>
</div>
{% endif %} {% endfor %}
{% endif %} {% endfor %}
</div></div>

---
