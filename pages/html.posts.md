---
permalink:      /posts/
title:          Posts
menu_index:     -1
---
# Posts

---

<style>
.post-meta {
  margin-top: -1.5em;
  display: block;
}
</style>

{% for post in site.posts %}
<article itemid="{{ post.id | absolute_url }}" itemscope itemtype="http://schema.org/BlogPosting">
  <h2 class="post-title" itemprop="headline">
    <a href="{{ post.url | absolute_url }}" itemprop="url">
      {{ post.title | escape }}
    </a>
  </h2>
  <small class="post-meta">
    <time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished">
      {{ post.date | date: "%b %-d, %Y" }}
    </time>

    {% if post.author %}
    <span itemprop="author" itemscope itemtype="http://schema.org/Person">
      <span itemprop="name">{{ post.author }}</span>
    </span>
    {% endif %}

    {% if post.tags %}<br>
    {% for tag in post.tags %}
    [ {{ tag }} ]
    {% endfor %}
    {% endif %}
  </small>
</article>
{% endfor %}
<p>
  subscribe <a class="rss-link" href="{{ "/feed.xml" | absolute_url }}">via RSS</a>
</p>

---
