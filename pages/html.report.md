---
permalink:      /report/
title:          Interactive Reporting Tools
menu_index:     -1
defer:          |
  <script src="https://unpkg.com/papaparse/papaparse.min.js" async="" defer=""></script>
  <script src="https://unpkg.com/lodash/lodash.min.js" async="" defer=""></script>
  <script src="https://cdn.rawgit.com/javve/list.js/master/dist/list.min.js" async="" defer=""></script>
---
# Interactive Reporting Tools[](# '{">":"find","tag":"main","className":"align-center"}')

---
<style>
  #dz_face {
      padding: 1em 2em;
      width: 100%;
      max-width: 100%;
  }
  #dz_face.hover { border-color: #36f; background: #cdf; }
  .step-loading {
    opacity: .3;
    pointer-events: none;
    user-select: none;
  }
</style>

<div class="step hide">
  <h2>1. Prepare CSV File</h2>
  <span>Clickable, Drag'N'Drop CSV File < 10MB</span>
  <p><label>
    <input id="dz_ctrl" class="input-control" type="file" multiple="multiple" accept=".csv" title=""/>
    <span id="dz_face" class="input-face"> No File </span>
  </label></p>
</div>

<div class="step hide">
  <p><label>
    <button class="step-back">◁ Back</button>
  </label></p>
  <div id="report_list">
    <ul class="list"></ul>
  </div>
</div>

<script>afterLib.push(function(){
  window.step = 0;
  window.goToStep = function(step) {
    if (window.dz) {
      dz.files = (step === 0) ? [] : dz.files;
    }
    var allStep = all('.step'), i = allStep.length;
    while (i--){ addClass(allStep[i], 'hide'); }
    removeClass(allStep[step], 'hide');
  };
  goToStep(step);
  on(all('.step-back'), 'click', function (e) {
    goToStep(--step);
  });

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
          new Modal({header:'Duplicate', body:'Oh boy, there’s a duplicate file, try renaming first'});
          return;
        }}
        if ( F.size > 10e6 ) {
          new Modal({header:'File too big', body:'MAN~~ try smaller file; max 10MB, okay?'});
          return;
        }
        if ( F.type!=='text/csv' &&  F.type!=='text/plain' &&  F.type!=='' ) {
          new Modal({header:'Invalid file', body:'only accept CSV file, .txt based file'});
          return;
        }
        /*= LOADING FILE =*/
        
        return true;
      }, /*= BEFORE READ =*/
      function (F, C) {
        window.reportObj = Papa.parse(F.dataTXT, {
          header: true,
          skipEmptyLines: false,
        });
        

        window.reportList = new List('report_list', {
          valueNames: reportObj.meta.fields,
          item: '<li> <span class="' + reportObj.meta.fields.join('"></span><span class="') + '"></span> </li>'
        }, reportObj.data);

        console.log(reportObj);        
        goToStep(++step);        
        /*
        reportObj.meta.fields;
        
        if (dz.face.innerHTML.indexOf('</div>')<0) { dz.face.innerHTML = '' }
        dz.face.innerHTML+= '<div title="' + F.name + '"> • ' + F.name + '</div>';
        */
      } /*= AFTER READ =*/
    );
  });
});</script>

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
