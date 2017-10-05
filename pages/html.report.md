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

<div id="report" data-is="report"></div>

---
<style>
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
<script>defer.push(() => {
  const mount = (data) => {
    setTimeout(() => {
      try {
        data = data.split("<\/script>").join(" ").split("<script>").join(" ");
        data = `<script type='riot\/tag'>${data}<\/script>`;
        window.one("[defer-script-and-style]").innerHTML += data;
        window.riot.mount("*");
      }catch(error){
        console.warn(`MOUNT>${error.message}`); mount(data);
      }
    }, 100);
  };
  fetch("{{ '/assets/js/html.report.html' | absolute_url }}")
  .then((data) => data.text())
  .then((data) => mount(data))
  .catch((error) => {
    console.warn(`FETCH>${error.message}`); mount(data);
  });
});
</script>
<!-- <script async="" defer="" src="{{ "/assets/js/html.report.js" | absolute_url }}"></script> -->