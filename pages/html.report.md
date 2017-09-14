---
permalink:      /report/
title:          Interactive Reporting Tools
menu_index:     -1
header:         false
footer:         false
color_rotator:  false
defer:          |
  <script async="" defer="" src="https://unpkg.com/papaparse"></script>
  <script async="" defer="" src="https://unpkg.com/marked"></script>
  <!--
  <script async="" defer="" src="/assets/js/papaparse.min.js"></script>
  <script async="" defer="" src="/assets/js/marked.js"></script>
  <script async="" defer="" src="https://unpkg.com/lodash/lodash.min.js"></script>
  <script async="" defer="" src="https://cdn.rawgit.com/javve/list.js/master/dist/list.min.js"></script>
  -->
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
  #report ul {
    list-style: none;
    padding: 0;
  }
  #report .list .list{
    border-right: solid 24px transparent;
  }
  #report .list .list:nth-child(even){
    background: #eee;
  }
  #report .list .group{
    margin: 2em 0;
    box-shadow: 0 0 0 1px #999;
    border-left: solid 24px #ccc;
  }
  #report .list .group:nth-child(even){
    xbackground: #ddd;
    xborder-left: solid 24px #333;
  }
  #report p {
    margin: 0 4px;
    text-align: left;
  }
  #report label.group-check,
  #report label.list-check {
    position: absolute;
    cursor: pointer;
    line-height: 0;
    margin-top: -0.5em;
    top: 50%;
    margin-top: 0.25em;
    top: 0;
  }
  .input-control[type=checkbox] + label .input-face,
  .input-control[type=radio] + label .input-face,
  .input-control[type=checkbox] + .input-face,
  .input-control[type=radio] + .input-face{
    margin: 0;
  }
  #report label.group-check { left: -1.25em; }
  #report label.list-check { right: -1.25em; }
  #report input[type=checkbox]:checked + label + ul .list {
    overflow: hidden;
    height: 0;
  }
  #report input[type=checkbox]:checked + label + ul .list:first-child {
    overflow: visible;
    height: auto;
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
  <div id="report">
    <span class="meta"></span>
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
        if ( F.type !== 'text/csv'
          && F.type !== 'text/plain'
          && F.type !== 'application/vnd.ms-excel'
          && F.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          && F.type !== '' ) {
          new Modal({header:'Invalid file', body:'only accept CSV file, .txt based file'});
          return;
        } return true;
      }, /*= BEFORE READ =*/
      function (F, C) {
        var loadingModal = new Modal({className:'sticky',header:'Loading', body:'Please wait'});

        window.reportObj = Papa.parse(F.dataTXT, {
          header: true,
          skipEmptyLines: false,
        });

        var firstK = reportObj.meta.fields[0];
        window.reportGObj = (reportObj.data[0][firstK] === '') ? [] : false;

        if (!!reportGObj) {
          reportObj.data.forEach( function(rowCSV, index, array){
            if (rowCSV[firstK] === '') {
              var t = {
                meta:{length:0},
                data:[]
              };
              reportGObj.push(t);
            } else if (reportGObj.length > 0) {
              reportGObj[reportGObj.length-1].meta.length++;
              reportGObj[reportGObj.length-1].data.push(rowCSV);
            }
          });
        }

        goToStep(++step);

        loadingModal.close();
        one('#report .meta').innerHTML = `
        This report is ${(!!reportGObj) ? '' : 'not '}a Grouped Report ${(!!reportGObj) ? '(containing '+ reportGObj.length +' group(s)) ' : ''}
        `;
        one('#report .list').innerHTML = '';
        var listHTML = one('#report .list').innerHTML;

        var smartlink = function(str){
          return ( marked(`<${str}>`).includes('<a href="') && str.includes('@')) ? `<${str}>`: str;
        };

        if (!!reportGObj) {
          reportGObj.forEach(function(grp, gi, ga){
            listHTML += `<li class="group group-${gi}">`;
            listHTML += `<input id= "group_${gi}" class="input-control" type="checkbox"/>`;
            listHTML += `<label for="group_${gi}" class="group-check"><span class="input-face"></span></label>`;
            listHTML += '<ul>';
            grp.data.forEach(function(obj, ri, ra){
              listHTML += `<li class="clearfix list list-${ri}">`;
              listHTML += `<input id= "group_${gi}_${ri}" class="input-control" type="checkbox"/>`;
              listHTML += `<label for="group_${gi}_${ri}" class="list-check"><span class="input-face"></span></label>`;
              for (var key in obj) { if (obj.hasOwnProperty(key)) {
                var t = `${marked('**'+key+'** : '+smartlink(obj[key]))}`;
                listHTML += t.split('href=').join('target="_blank" href=');
              }}
              listHTML += '</li>';
            });
            listHTML += '</ul></li>';
          });
        } else {
          reportObj.data.forEach(function(obj, ri, ra){
            listHTML += `<li class="clearfix list list-${ri}">`;
            listHTML += `<input id= "list_${ri}" class="input-control" type="checkbox"/>`;
            listHTML += `<label for="list_${ri}" class="list-check"><span class="input-face"></span></label>`;
            for (var key in obj) { if (obj.hasOwnProperty(key)) {
              var t = `${marked('**'+key+'** : '+smartlink(obj[key]))}`;
              listHTML += t.split('href=').join('target="_blank" href=');
            }}
            listHTML += '</li>';
          });
        }
        one('#report .list').innerHTML = listHTML;

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
