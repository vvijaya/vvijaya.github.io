---
permalink:      /labs/
title:          Labs
menu_index:     -1
---
# Labs[](# '{">":"find","tag":"main","className":"align-center"}')

---



<!--
leaderboard(728x90)
banner(468x60)
half banner(234x60)
button(125x125)
skyscraper(120x600)
wide skyscraper(160x600)
small rectangle(180x150)
vertical banner(120x240)
small square(200x200)
square(250x250)
medium rectangle(300x250)
large rectangle(336x280)
half page(300x600)
portrait(300x1050)
mobile banner(320x50)
large leaderboard(970x90)
billboard(970x250)
-->

<style>
.gallery {
  margin: 0 -16px;
  position: relative;
}
.gallery .nav,
.gallery img {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
}
.gallery .waitload { opacity: .5; }
.gallery .unload { opacity: 0; pointer-events: none; position: absolute; left: 0; top: 0; }
/*.gallery div:not(.ratio) .unload { width: 0; height: 0; }*/
.gallery .nav { height: 100%; width: 100%; position: absolute; z-index: 1; }
.gallery .caption { padding: 16px; font-weight: 600; font-style: italic; }
.gallery .prev,.gallery .next {
  cursor: pointer;
  text-align: center;
  position: absolute;
  line-height: 1em;
  background: #000;
  color: #FFF;
  margin: auto;
  border-radius: 0;
  font-size: 32px;
  height: 100%;
  width: 1em;
  bottom: 0;
  top: 0;
  z-index: 2;
  opacity: .5;
}
@media screen and (min-width: 480px){
  .gallery { margin: auto; }
  .gallery .caption { padding: 16px 0; }
  .gallery .prev,.gallery .next {
    box-shadow: 0 0 0 3px;
    margin: auto -.25em;
    border-radius: 50%;
    font-size: 48px;
    height: 1em;
  }
}
.gallery .prev:hover,.gallery .next:hover {
  background: #c03;
  opacity: 1;
}

.gallery .prev { left: 0 }
.gallery .next { right: 0 }
.gallery .prev:after, .gallery .next:after {
  content: "◀︎▶︎"; content: "";
  border: solid 1em transparent;
  margin: -1em; position: absolute;
  width: 0; height: 0;
  top: 50%; left: 50%;
  font-size: .2em;
}
.gallery .prev:after { border-right: solid 2em; border-left: 0; margin: -1em -1.25em; }
.gallery .next:after { border-right: 0; border-left: solid 2em; margin: -1em -0.75em; }
</style>
<div class="card align-left">
<div class="gallery" data-img='[
"https://unsplash.it/600/900/",
"https://unsplash.it/600/900/?random",
"https://unsplash.it/g/600/900/?random",
"https://unsplash.it/600/900/?blur",
"https://unsplash.it/g/600/900/?blur"
]'>
<div class="imageList ratio ratio-2-3">
  <div class="nav"><span class="prev no-print"></span><span class="next no-print"></span></div>
  <img alt="Gallery image" class="ease unload lazyload" data-src="https://unsplash.it/600/900/" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
</div>
<div class="caption"><span>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</span></div>
</div>
</div>
<script>afterLib.push(function () {
  function updateGallery(G, idx = 1) {
    var list = JSON.parse(G.dataset.img),
        last = list.length-1, oldImg, newImg;
    idx += (1*G.dataset.idx || 0);
    idx = (idx < 0) ? last : (idx>last) ? 0 : idx;
    oldImg = one('img:not([class~=unload])') || one('img', G);
    newImg = one('img[src="'+list[idx]+'"]', G);
    if (!newImg) {
      newImg = str2DOM(`<img alt="Gallery image" class="ease unload">`);
      newImg.src = list[idx];
      oldImg.parentNode.appendChild(newImg);
      addClass(oldImg,'waitload');
      on(newImg, 'load', function (data) {
        removeClass(oldImg,'waitload');
        addClass(all('img', G),'unload');
        removeClass(newImg,'unload');
      });
    } else {
      addClass(all('img', G),'unload');
      removeClass(newImg,'unload');
    } G.dataset.idx = idx;
  }

  on(all('.gallery .unload'), 'load', function (data) { removeClass(this,'unload'); });
  on(all('.gallery .prev, .gallery .next'), 'click', function(e) {
    e.preventDefault();
    e=this; while(!hasClass(e,'gallery')&&(e=e.parentNode)){}
    hasClass(this, 'prev') ? updateGallery(e, -1) : updateGallery(e, 1) ;
    return false;
  });
  on(one('.gallery'), 'touchstart touchmove', SWIPE
  .onRight(function(){ updateGallery(SWIPE.this, -1) })
  .onLeft(function(){ updateGallery(SWIPE.this, 1) })
  .invoke);
});</script>

<style>
fieldset p label span:first-child {
  width: 100px;
  display: inline-block;
}
.input-control, button, input, optgroup, select, textarea, meter { width: 100%; }
@media screen and (min-width: 480px){
  fieldset p label span:first-child { text-align: right; }
  .input-control, button, input, optgroup, select, textarea, meter { width: 200px; }
}
</style>

<form class="card align-left">
  <fieldset>
    <legend>legend:</legend>
    <p><label><span>text:</span>
      <input type="text"/>
    </label></p>
    <p><label><span>email:</span>
      <input type="email"/>
    </label></p>
    <p><label><span>password:</span>
      <input type="password"/>
    </label></p>
    <p><label><span>tel:</span>
      <input type="tel"/>
    </label></p>
    <p><label><span>file:</span>
      <input type="file"/>
    </label></p>
    <p><label><span>color:</span>
      <input type="color"/>
    </label></p>
    <p><label><span>datetime:</span>
      <input type="datetime-local"/>
    </label></p>
    <p><label><span>date:</span>
      <input type="date"/>
    </label></p>
    <p><label><span>month:</span>
      <input type="month"/>
    </label></p>
    <p><label><span>time:</span>
      <input type="time"/>
    </label></p>
    <p><label><span>week:</span>
      <input type="week"/>
    </label></p>
    <p><label><span>url:</span>
      <input type="url"/>
    </label></p>
    <p><label><span>number:</span>
      <input type="number"/>
    </label></p>
    <p><label><span>radio:</span>
      <input type="radio"/><span class="input-control"></span>
    </label></p>
    <p><label><span>checkbox:</span>
      <input type="checkbox"/><span class="input-control"></span>
    </label></p>
    <p><label><span>range:</span>
      <input type="range"/>
    </label></p>
    <p><label><span>search:</span>
      <input type="search"/>
    </label></p>
    <p><label><span>btn</span>
      <button>btn</button>
    </label></p>
    <p><label><span>button:</span>
      <input type="button"/>
    </label></p>
    <p><label><span>reset:</span>
      <input type="reset"/>
    </label></p>
    <p><label><span>image:</span>
      <input type="image"/>
    </label></p>
    <p><label><span>submit:</span>
      <input type="submit"/>
    </label></p>
    <p><label><span>Date of birth:</span>
      <input type="date"/>
    </label></p>
    <p><label><span>optgroup</span>
      <select>
        <optgroup label="Swedish Cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
        </optgroup>
        <optgroup label="German Cars">
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </optgroup>
      </select>
    </label></p>
    <p><label><span>textarea</span>
      <textarea></textarea>
    </label></p>
    <p><label><span>datalist</span>
      <input list="browsers">
      <datalist id="browsers">
        <option value="Internet Explorer"/>
        <option value="Firefox"/>
        <option value="Chrome"/>
        <option value="Opera"/>
        <option value="Safari"/>
      </datalist>
    </label></p>
    <p>lorem</p>
    <p><label><span>meter 1</span>
      <meter value="2" min="0" max="10">2 out of 10</meter>
    </label></p>
    <p><label><span>meter 2</span>
      <meter value="0.6">60%</meter>
    </label></p>
  </fieldset>
</form>

---
