---
permalink:      /report/
title:          Interactive Reporting Tools
menu_index:     -1
header:         false
footer:         false
color_rotator:  false
defer:          |
  <script async="" defer="" src="https://unpkg.com/lodash/lodash.min.js"></script>
  <script async="" defer="" src="https://unpkg.com/marked/marked.min.js"></script>
  <script async="" defer="" src="https://unpkg.com/fuse.js/dist/fuse.min.js"></script>
  <script async="" defer="" src="https://unpkg.com/riot/riot+compiler.min.js"></script>
  <script async="" defer="" src="https://unpkg.com/blueimp-md5/js/md5.min.js"></script>
  <script async="" defer="" src="https://unpkg.com/papaparse/papaparse.min.js"></script>
---
# Interactive Reporting Tools[](# '{">":"find","tag":"main","className":"align-center"}')

---
<link rel="stylesheet" type="text/css" href="{{ "/assets/css/html.report.css" | absolute_url }}">

<div class="step">
  <h2>1. Prepare CSV File</h2>

  <p><span>Clickable, Drag'N'Drop CSV File < 10MB</span></p>

  <p><label>
    <input id="dz_ctrl" class="input-control" type="file" multiple="multiple" accept=".csv" title=""/>
    <span id="dz_face" class="input-face"> No File </span>
  </label></p>
</div>

<div class="step"><br><hr>
  <h2>2. Review Data</h2>

  <p><label><input id='full_container' class='input-control' type='checkbox'/><span class='input-face'></span>
  <span>Full container</span></label></p>

  <!-- <p><label>
  <button class="step-back">◁ Back</button>
  <button class="step-next">Next ▷</button>
  </label></p> -->

  <div id="report" data-is="report"></div>
</div>

---
<script>defer.push(() => {
  const mount = (data) => {
    setTimeout(() => {
      try {
        data = data.split("<\/script>").join(" ").split("<script>").join(" ");
        data = `<script type='riot\/tag'>${data}<\/script>`;
        window.one("[defer-script-and-style]").innerHTML += data;
        window.riot.mount("*");
      }catch(error){
        console.warn(error); mount(data);
      }
    }, 100);
  };

  fetch("{{ '/assets/js/html.report.tag' | absolute_url }}")
  .then((data) => data.text())
  .then((data) => mount(data))
  .catch((error) => {
    console.warn(error); mount(data);
  });
});
</script>
<!-- <script async="" defer="" src="{{ "/assets/js/html.report.js" | absolute_url }}"></script> -->