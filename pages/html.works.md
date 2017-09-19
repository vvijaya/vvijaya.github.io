---
permalink:      /works/
title:          Works
menu_index:     2
defer:          |
  <script async="" defer="" src="https://unpkg.com/fuse.js/dist/fuse.min.js"></script>
  <script async="" defer="" src="https://unpkg.com/blueimp-md5/js/md5.min.js"></script>
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
      <div class="col-sm-1 col-md-1-2 work" data-id="{{ detail.uri }}">
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
<script async="" defer="" src="{{ "/assets/js/html.works.js" | absolute_url }}"></script>