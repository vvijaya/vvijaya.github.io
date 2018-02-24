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

<img id="barcode"/>

<script>
((w) => {
    w.defer.push(() => {
        const qs = w.queryStringToObject(w.location.search.substr(1));
        if (!(qs && qs.val)) {
            w.location.search = '?val=8886001038011'
        }
        w.JsBarcode("#barcode", qs.val);
    });
})(window);
</script>

---
