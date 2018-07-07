---
permalink:      /works/
menu_index:     3
---
# Works

---

[Curriculum Vitae on PDF][cv-pdf]

Below is the list of my project, click the image to enlarge, or click the link to see the live site.<sup>✱</sup>

<small><sup>✱</sup> some of them is down ☹</small>

<div class="card white no-print">
  <h2>Search</h2>
  <p><input id="omnibox" type="search" placeholder='Type "2017"'/></p>
</div>

<div>
  <div class="work-list align-left">
    <div class="row"><!--
      {% for q in site.data.timeline %} {% if q.detail %}
      {% for detail in q.detail %} {% if detail.img and detail.desc %}
      --><div class="col-sm-1 col-md-1-2 work" data-id="{{ detail.uri }}">
        <p> <span class="ratio ratio-16-9 {{ detail.live }}">
          <a href="{{ detail.uri }}" title='{">":"modal","header":"{{ detail.title | smartify }}","className":"full align-center"}'>
            <img class="lazyload" data-src="{{ detail.img }}" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
          </a>
        </span> </p>
        <div> {{ detail.desc | markdownify }} </div>
      </div><!--
      {% endif %} {% endfor %}
      {% endif %} {% endfor %}
      --></div>
  </div>
</div>

---
[cv-pdf]: /assets/docs/gunawan.wijaya.pdf ' '
