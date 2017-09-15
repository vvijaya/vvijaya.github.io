---
permalink:      /barcode/
title:          Barcode Generator
menu_index:     -1
header:         false
footer:         false
color_rotator:  false
defer:          |
  <script async="" defer="" src="https://unpkg.com/jsbarcode/dist/JsBarcode.all.min.js"></script>
---
# Barcode Generator[](# '{">":"find","tag":"main","className":"align-center"}')

---
<style>
  #barcode{
    display: inline-block;
    line-height: 0;
  }
</style>

<span id="barcode"><svg></svg></span>

<script>afterLib.push(function(){
    JsBarcode("#barcode svg", qs2obj().val || 8886001038011);
});</script>
---
