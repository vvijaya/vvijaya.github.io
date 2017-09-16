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
  <script async="" defer="" src="https://unpkg.com/lodash/lodash.min.js"></script>
  <!--
  <script async="" defer="" src="/assets/js/papaparse.min.js"></script>
  <script async="" defer="" src="/assets/js/marked.js"></script>
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
    border-top: solid 1px #999;
    border-right: solid 24px transparent;
    background: #fafafa;
  }
  #report .list .list:first-child{
    border-top: solid 0;
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
    border-left: solid 24px #999;
  }
  #report .list li.group ul {
    overflow: hidden;
  }
  #report p {
    margin: 0 4px;
    text-align: left;
  }
  #report label.group-face,
  #report label.list-face {
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
  #report label.group-face { left: -1.25em; }
  #report label.list-face { right: -1.25em; }
  #report input[type=checkbox].group-ctrl:checked + label + ul .list {
    border-top: 0;
    overflow: hidden;
    height: 0;
  }
  #report input[type=checkbox].group-ctrl:checked + label + ul .list:first-child {
    overflow: visible;
    height: auto;
  }
  #report input[type=checkbox].list-ctrl + label + span.data-list{
    display: block;
    max-height: 6em;    
  }
  #report input[type=checkbox].list-ctrl:checked + label + span.data-list{
    max-height: none;
  }
  .Modal.loading #nprogress::after {
    content: 'Please wait...'
  }
  .Modal.loading #nprogress .spinner {
    top: 50%;
    left: 50%;
    right: auto;
    overflow: visible;
  }
  .Modal.loading #nprogress .spinner-icon {
    width: 10em;
    height: 10em;
    border-width: 1em;
    margin: -50%;
    opacity: .5;
  }
</style>

<div class="step hide">
  <h2>1. Prepare CSV File</h2>
  <p><label><span>Swap rows &amp; columns</span>
    <input id="swap_rows_cols" class="input-control" type="checkbox"/><span class="input-face"></span>
  </label></p>
  <p><span>Clickable, Drag'N'Drop CSV File < 10MB</span></p>
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
        }
        window.reportModal = new Modal({id:'reportModal',className:'sticky loading',header:'Loading', body:'<div id="nprogress"><div class="spinner" role="spinner"><div class="spinner-icon"></div></div></div>'});
        return true;
      }, /*= BEFORE READ =*/
      function (F, C) {
        try {
          if (one("#swap_rows_cols").checked) {
            F.dataTXT = F.dataTXT.split('\n');
            F.dataTXT.forEach(function(row, i){
              F.dataTXT[i] = row.split(',');
            });
            F.dataTXT = _.unzip(F.dataTXT);
            F.dataTXT.forEach(function(row, i){
              F.dataTXT[i] = row.join(',');
            });
            F.dataTXT = F.dataTXT.join('\n');
          }
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

          reportModal.close();
          one('#report .meta').innerHTML = `
          This is ${(!!reportGObj) ? '' : '<b>NOT</b> '}a Grouped Report ${(!!reportGObj) ? '<i>(containing <b>'+reportGObj.length+'</b> group(s))</i>' : ''} from <b>${reportObj.data.length-(reportGObj.length || 0)}</b> data.<br>

          `;
          one('#report .list').innerHTML = '';
          var listHTML = one('#report .list').innerHTML;

          var smartlink = function(str){
            return ( marked(`<${str}>`).includes('<a href="') && str.includes('@')) ? `<${str}>`: str;
          };

          var limit = qs2obj.limit * 1 || 100;

          if (!!reportGObj) {
            reportGObj.forEach(function(grp, gi, ga){
              if (gi < limit){
                listHTML += `
                  <li class="group group-${gi}">
                  <input id= "group_${gi}" class="group-ctrl input-control" type="checkbox"/>
                  <label for="group_${gi}" class="group-face"><span class="input-face"></span></label>
                  <ul>
                `;
                grp.data.forEach(function(obj, ri, ra){
                  if (ri < limit){
                    listHTML += `
                      <li class="clearfix list list-${ri}">
                        <input id= "group_${gi}_${ri}" class="list-ctrl input-control" type="checkbox"/>
                        <label for="group_${gi}_${ri}" class="list-face"><span class="input-face"></span></label>
                        <span class="data-list">
                    `;
                    for (var key in obj) { if (obj.hasOwnProperty(key)) {
                      var t = `${marked('**'+key+'** : '+smartlink(obj[key]))}`;
                      listHTML += t.split('href=').join('target="_blank" href=');
                    }}
                    listHTML += `
                        </span>
                      </li>
                    `;
                  }
                });
                listHTML += '</ul></li>';
              }
            });
          } else {
            listHTML += `
              <li class="group group-0">
              <ul>
            `;
            reportObj.data.forEach(function(obj, ri, ra){
              if (ri < limit){
                listHTML += `
                  <li class="clearfix list list-${ri}">
                    <input id= "list_${ri}" class="list-ctrl input-control" type="checkbox"/>
                    <label for="list_${ri}" class="list-face"><span class="input-face"></span></label>
                    <span class="data-list">
                `;
                for (var key in obj) { if (obj.hasOwnProperty(key)) {
                  var t = `${marked('**'+key+'** : '+smartlink(obj[key]))}`;
                  listHTML += t.split('href=').join('target="_blank" href=');
                }}
                listHTML += `
                    </span>
                  </li>
                `;
              }
            });
            listHTML += `
              </ul>
              </li>
            `;
          }
          one('#report .list').innerHTML = listHTML;
        } catch(e) {
          reportModal = new Modal({id:'reportModal',header:'Error', body:`Close this modal to refresh this page<br><br><b>${e}</b>`}, function(){location+='';});
        }
        /*
        reportObj.meta.fields;
        
        if (dz.face.innerHTML.indexOf('</div>')<0) { dz.face.innerHTML = '' }
        dz.face.innerHTML+= '<div title="' + F.name + '"> • ' + F.name + '</div>';
        */
      }
    );
  });
});</script>
---
