---
permalink: /posts/
title: Posts
menu_index: -1
---

# Posts

---

<style>
.post-title {
    font-size: 1.5em;
    font-weight: normal;
}
.post-meta {
    margin-top: -1em;
    display: block;
}
.post-meta .button {
    width: auto;
    font-size: .8em;
    padding: .25em .5em;
}
</style>

{% for post in site.posts %}

<article itemid="{{ post.id | absolute_url }}" itemscope itemtype="http://schema.org/BlogPosting">
    <h2 class="post-title" itemprop="headline">
        <a href="{{ post.url | absolute_url }}" itemprop="url">
            {{ post.title | escape }}
        </a>
    </h2>
    <div class="post-meta">
        <p><small>
            <time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished">
                {{ post.date | date: "%b %-d, %Y" }}
            </time>
            {% if post.author %}
            by <span itemprop="author" itemscope itemtype="http://schema.org/Person">
                <span itemprop="name">{{ post.author }}</span>
            </span>
            {% endif %}
        </small></p>
        {% if post.tags %}<p>
            {% for tag in post.tags %}
                <a href="#" class="button">#{{ tag }}</a>
            {% endfor %}</p>
        {% endif %}
    </div>
    <div>
        {% if post.excerpt %}
            {{ post.excerpt }}
        {% endif %}
    </div>
</article>
{% endfor %}

---

<p class="align-center">
    subscribe <a class="rss-link" href="{{ "/feed.xml" | absolute_url }}">via RSS</a>
</p>
