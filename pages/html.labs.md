---
permalink:      /labs/
title:          Labs
menu_index:     -1
defer:          |
  <script src="https://cdn.jsdelivr.net/npm/papaparse" async="" defer=""></script>
---
# Labs[](# '{">":"find","tag":"main","className":"align-center"}')

---
<style>
.gallery { margin: 0 -16px; position: relative; padding: 0 0 16px; }
.gallery .unload { opacity: 0; pointer-events: none; position: absolute; left: 0; top: 0; }
.gallery .waitload { opacity: .5; }
.gallery .nav { height: 100%; width: 100%; position: absolute; z-index: 1; }
.gallery, .gallery .image-list { border-radius: 0px; }
.gallery img { border-radius: inherit; }
.gallery figcaption { font-weight: 600; font-style: italic; }
.gallery .prev { left: 0 }
.gallery .next { right: 0 }
.gallery .prev,.gallery .next {
  cursor: pointer; text-align: center; position: absolute; line-height: 1em; background: #000; color: #FFF;
  margin: auto; border-radius: 0; font-size: 32px; height: 2em; width: 1em; bottom: 0; top: 0; z-index: 2; opacity: .3333;
}
@media screen and (min-width: 480px) {
  .gallery, .gallery .image-list { border-radius: 8px; }
  .gallery .image-list { border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; }
  .gallery { margin: auto; }
  .gallery .prev,.gallery .next { box-shadow: 0 0 0 3px; margin: auto -.125em; border-radius: 50%; font-size: 48px; height: 1em; }
  .gallery .prev:hover,.gallery .next:hover { background: #c03; opacity: 1; }
}
.gallery .prev:after, .gallery .next:after {
  content: ""; border: solid 1em transparent; margin: -1em; position: absolute;
  width: 0; height: 0; top: 50%; left: 50%; font-size: .2em;
}
.gallery .prev:after { border-right: solid 2em; border-left: 0; margin: -1em -1.25em; }
.gallery .next:after { border-right: 0; border-left: solid 2em; margin: -1em -0.75em; }
.gallery .bullet {
  display: inline-block; cursor: pointer; margin: 0 4px; background: transparent;
  border: solid 2px #ccc; border-radius: 50%; height: 1em; width: 1em;
}
.gallery .bullet:active,
.gallery .bullet:focus,
.gallery .bullet:hover,
.gallery .bullet.hover{
  background: #ccc;
}
</style>
## Swipeable Gallery
<div style="margin: 0 -16px;">
<div class="row align-left">
  <div class=" col-sm-1 col-md-1-2"><figure class="gallery" data-bullet data-caption data-idx="2" data-img='[
    "https://unsplash.it/600/900/",
    "https://unsplash.it/600/900/?random",
    "https://unsplash.it/g/600/900/?random",
    "https://unsplash.it/600/900/?blur",
    "https://unsplash.it/g/600/900/?blur"
    ]'>
      <div class="image-list ratio ratio-2-3">
        <div class="nav"><span class="prev no-print"></span><span class="next no-print"></span></div>
        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
      </div>
      <figcaption>My static caption</figcaption>
  </figure></div>
  <div class=" col-sm-1 col-md-1-2"><figure class="gallery" data-bullet data-caption data-img='[{
      "src":"https://unsplash.it/400/600/",
      "caption":"My first image"
    },{
      "src":"https://unsplash.it/400/600/?random",
      "caption":"This is the second one"
    },{
      "src":"https://unsplash.it/g/400/600/?random",
      "caption":"And the third"
    },{
      "src":"https://unsplash.it/400/600/?blur",
      "caption":"Fourth"
    },{
      "src":"https://unsplash.it/g/400/600/?blur",
      "caption":"And this is the last one"
    }]'>
      <div class="image-list ratio ratio-2-3">
        <div class="nav"><span class="prev no-print"></span><span class="next no-print"></span></div>
        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
      </div>
  </figure></div>
</div>
</div>
<script>afterLib.push(function(){
  window.updateGallery = function (G, idx = 1) {
    var list = JSON.parse(G.dataset.img), src,
        caption = G.dataset.caption==='',
        last = list.length-1, oldImg, newImg;
    idx = (idx===1*idx) ? idx+(1*G.dataset.idx || 0) : (1*idx || 0);
    idx = (idx < 0) ? last : (idx>last) ? 0 : idx;
    src = list[1*G.dataset.idx];
    src = src.src?src.src:src;
    oldImg = one('img[src="'+src+'"]', G) || one('img', G);
    src = list[idx];
    caption = caption ? (src.caption?src.caption:' ') : false;
    if (caption) one('.caption', G).innerHTML = caption;
    src = src.src?src.src:src;
    newImg = one('img[src="'+src+'"]', G);
    if (!newImg) {
      newImg = str2DOM(`<img alt="Gallery image" class="ease waitload unload">`);
      newImg.src = src; oldImg.parentNode.appendChild(newImg);
      addClass(oldImg,'waitload');
      on(newImg, 'load', function (oldImg,newImg) { return function (data) {
        removeClass([oldImg,newImg],'waitload');
      } }(oldImg,newImg));
    } G.dataset.idx = idx;
    removeClass(all('.bullet', G), 'hover');
    addClass(one('.bullet[data-idx="'+idx+'"]', G), 'hover');
    removeClass(newImg,'unload');
    addClass(oldImg,'unload');
  };

  on(all('.gallery .unload'), 'load', function (data) { removeClass(this,'unload'); });
  on(all('.gallery .prev, .gallery .next'), 'click', function (e) {
    e.preventDefault();
    e=this;
    while(!hasClass(e,'gallery')&&(e=e.parentNode)) {};
    hasClass(this,'prev')?updateGallery(e,-1):updateGallery(e,1);
    return false;
  });

  var allGallery = all('.gallery');
  while (G = allGallery.pop()) {
    var B, F, list = [], t = new Swipe();
    try { list = JSON.parse(G.dataset.img) } catch (e) {}

    on(G, 'touchstart touchmove',function(G){return function(e){
      t.invoke(e, {
        onRight:function(){e.preventDefault();updateGallery(G,-1)},
        onLeft: function(){e.preventDefault();updateGallery(G, 1)},
      });
    }}(G));

    if (G.dataset.caption==='' && !one('.caption', G)) {
      G.appendChild(str2DOM(`<figcaption class="caption"></figcaption>`));
    }

    if (G.dataset.bullet==='' && !one('.bullet', G)) {
      F = str2DOM(`<figcaption></figcaption>`);
      for(var i=0; i<list.length ;i++) {
        B = str2DOM(`<span class="bullet" data-idx="`+i+`"></span>`);
        on(B, 'click', function (G,i) {return function (e) {
          e.preventDefault(); updateGallery(G, i+'');
        }}(G,i));
        F.appendChild(B);
      } G.appendChild(F);
    }

    G.dataset.idx = G.dataset.idx || '0';
    updateGallery(G, G.dataset.idx);
  } /*= END OF GALLERY LOOP =*/
});</script>
<style>
  #dz_face.hover { border-color: #36f; background: #cdf; }
</style>
<span>Clickable Drag'N'Drop CSV File < 10MB</span>
<p><label>
  <input id="dz_ctrl" class="input-control" type="file" multiple="multiple" accept=".csv" title=""/>
  <span id="dz_face" class="input-face"> No File </span>
</label></p>
<script>afterLib.push(function(){
  window.dz = new DropZone(one('#dz_ctrl'), one('#dz_face'));
  on([dz.ctrl, dz.face], 'drop dragover dragend dragleave change', function (e) {
    dz.fileHandler(
      (function (e) {
        e.preventDefault();
        if (e.type === 'dragover') {addClass(dz.face,'hover')} else
        if (e.type === 'dragend') {removeClass(dz.face,'hover')} else
        if (e.type === 'dragleave') {removeClass(dz.face,'hover')} else
        if (e.type === 'drop') {removeClass(dz.face,'hover')}
        return e;
      })(e), /*= EVENT HANDLER =*/
      function (F, C) {
        var r = C.length;
        while (r--) { if (C[r].name == F.name) {
          new Modal().invoke({header:'Duplicate', body:'Oh boy, there’s a duplicate file, try renaming first'});
          return;
        }}
        if ( F.size > 10e6 ) {
          new Modal().invoke({header:'File too big', body:'MAN~~ try smaller file; max 10MB, okay?'});
          return;
        }
        if ( F.type!=='' ) {
          new Modal().invoke({header:'Invalid file', body:'only CSV file, .txt based file'});
          return;
        } return true;
      }, /*= BEFORE READ =*/
      function (F, C) {
        if (dz.face.innerHTML.indexOf('</div>')<0) { dz.face.innerHTML = '' }
        dz.face.innerHTML+= '<div title="' + F.name + '"> • ' + F.name + '</div>';
      } /*= AFTER READ =*/
    );
  });
});</script>

<form class="card align-left">
  <fieldset>
    <style>
      fieldset p label span:first-child { width: 100px; display: inline-block; }
      .input-control + .input-face, button, input, optgroup, select, textarea, meter, progress { width: 480px; max-width: 100%; }
      @media screen and (min-width: 480px) {
        fieldset p label span:first-child { text-align: right; }
        .input-control + .input-face, button, input, optgroup, select, textarea, meter, progress { width: 200px; }
      }
    </style>
    <legend>legend:</legend>
    <p><label><span>meter 1</span>
      <meter class="" value="2" min="0" max="10">2 out of 10</meter>
    </label></p>
    <p><label><span>meter 2</span>
      <meter class="" value="0.6">60%</meter>
    </label></p>
    <p><label><span>progress:</span>
      <progress class="" value="0.5">50%</progress>
    </label></p>
    <p><label><span>text:</span>
      <input class="" type="text"/>
    </label></p>
    <p><label><span>email:</span>
      <input class="" type="email"/>
    </label></p>
    <p><label><span>password:</span>
      <input class="" type="password"/>
    </label></p>
    <p><label><span>tel:</span>
      <input class="" type="tel"/>
    </label></p>
    <p><label><span>file:</span>
      <input class="" type="file"/><span class="input-face"></span>
    </label></p>
    <p><label><span>color:</span>
      <input class="" type="color" value="#3366ff"/>
    </label></p>
    <p><label><span>datetime:</span>
      <input class="" type="datetime-local"/>
    </label></p>
    <p><label><span>date:</span>
      <input class="" type="date"/>
    </label></p>
    <p><label><span>month:</span>
      <input class="" type="month"/>
    </label></p>
    <p><label><span>time:</span>
      <input class="" type="time"/>
    </label></p>
    <p><label><span>week:</span>
      <input class="" type="week"/>
    </label></p>
    <p><label><span>url:</span>
      <input class="" type="url"/>
    </label></p>
    <p><label><span>number:</span>
      <input class="" type="number"/>
    </label></p>
    <p><label><span>radio:</span>
      <input class="input-control" type="radio"/><span class="input-face"></span>
    </label></p>
    <p><label><span>checkbox:</span>
      <input class="input-control" type="checkbox"/><span class="input-face"></span>
    </label></p>
    <p><label><span>range:</span>
      <input class="" type="range"/>
    </label></p>
    <p><label><span>search:</span>
      <input class="" type="search"/>
    </label></p>
    <p><label><span>optgroup</span>
      <select class="">
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
    <p><label><span>datalist</span>
      <input class="" list="browsers">
      <datalist id="browsers">
        <option value="Internet Explorer"/>
        <option value="Firefox"/>
        <option value="Chrome"/>
        <option value="Opera"/>
        <option value="Safari"/>
      </datalist>
    </label></p>
    <p><label><span>textarea</span>
      <textarea class=""></textarea>
    </label></p>
    <p>lorem</p>
    <p><label><span>btn</span>
      <button class="">btn</button>
    </label></p>
    <p><label><span>button:</span>
      <input class="" type="button"/>
    </label></p>
    <p><label><span>reset:</span>
      <input class="" type="reset"/>
    </label></p>
    <p><label><span>image:</span>
      <input class="" type="image"/>
    </label></p>
    <p><label><span>submit:</span>
      <input class="" type="submit"/>
    </label></p>
  </fieldset>
</form>
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
---
