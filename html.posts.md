---
layout:         page
permalink:      /posts/
title:          Posts
---
# Posts

---

<style>
.post-title {
  margin-bottom: -.25em;
}
.post-meta {
  margin-left: .5em;
}
</style>

{% for post in site.posts %}
<article>
  <h2 class="post-title">
    <a href="{{ post.url | absolute_url }}">
      {{ post.title | escape }}
    </a>
  </h2>
  <small class="post-meta">
    <a href="{{ post.url | absolute_url }}">
      {{ post.date | date: "%b %-d, %Y" }}
    </a>
  </small>
</article>
{% endfor %}
<p>
  subscribe <a class="rss-link" href="{{ "/feed.xml" | absolute_url }}">via RSS</a>
</p>

---
