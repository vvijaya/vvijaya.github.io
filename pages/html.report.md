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
  <script async="" defer="" src="https://unpkg.com/fuse.js/dist/fuse.min.js"></script>
---
# Interactive Reporting Tools[](# '{">":"find","tag":"main","className":"align-center"}')

---
<style>
  #dz_face {
    padding: 1em 2em;
    width: 100%;
    max-width: 100%;
  }
  #dz_face.hover {
    border-color: #36f; background: #cdf;
  }
  .step-loading {
    opacity: .3;
    pointer-events: none;
    user-select: none;
  }
  #report ul {
    list-style: none;
    padding: 0;
  }
  #report .data-group-list .list{
    border-top: solid 1px #999;
    border-right: solid 24px transparent;
    background: #eee;
  }
  #report .data-group-list .list:first-child{
    border-top: solid 0;
  }
  #report .data-group-list .list:nth-child(even){
    background: #fafafa;
  }
  #report .data-group-list .group{
    margin: 1.5em 0;
    box-shadow: 0 0 0 1px #999;
    border-left: solid .5em;
    border-top: solid 1.5em;
    border-color: #abc;
  }
  #report .data-group-list .group:nth-child(even){
    border-color: #cab;
  }
  #report .data-group-list .group .group-meta {
    position: absolute;
    left: 0;
    top: -1.5em;
    text-align: left;
  }
  #report .data-group-list .group .group-meta * {
    margin: 0;
    font-size: 1em;
  }
  #report .data-group-list .group ul {
    overflow: hidden;
  }
  #report .data-group-list p {
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
  #report label.group-face { top: -1.5em;  right: 0.25em; }
  #report label.list-face { right: -1.25em; }
  #report input[type=checkbox].group-list-ctrl:checked + label + ul.data-group-list .group,
  #report input[type=checkbox].group-ctrl:checked + label + ul .list {
      position: absolute;
      right: 0;
      clip: rect(1px 1px 1px 1px);
      clip: rect(1px,1px,1px,1px);
  }
  #report input[type=checkbox].group-list-ctrl:checked + label + ul.data-group-list .group:first-child,
  #report input[type=checkbox].group-ctrl:checked + label + ul .list:first-child {
    position: relative;
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

<div class="step">
  <h2>1. Prepare CSV File</h2>

  <p><span>Clickable, Drag'N'Drop CSV File < 10MB</span></p>

  <p><label>
    <input id="dz_ctrl" class="input-control" type="file" multiple="multiple" accept=".csv" title=""/>
    <span id="dz_face" class="input-face"> No File </span>
  </label></p>
</div>

<div class="step hide"><br><hr>
  <h2>2. Review Data</h2>

  <p><label><input id='full_container' class='input-control' type='checkbox'/><span class='input-face'></span>
  <span>Full container</span></label></p>

  <!-- <p><label>
  <button class="step-back">◁ Back</button>
  <button class="step-next">Next ▷</button>
  </label></p> -->

  <div id="report"></div>
</div>

---
<script async="" defer="" src="{{ "/assets/js/html.report.js" | absolute_url }}"></script>