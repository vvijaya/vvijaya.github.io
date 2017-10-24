---
permalink:      /barcode/
title:          Barcode Generator
menu_index:     -1
header:         false
footer:         false
color_rotator:  false
defer:          |
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
        if (!(w.queryStringToJSON && w.queryStringToJSON().val)) {
            w.location.search = '?val=8886001038011'
        }
        w.JsBarcode("#barcode", w.queryStringToJSON().val);
    });
})(window);
</script>
<script async="" defer="" src="{{ "/assets/js/JsBarcode.all.min.js" | absolute_url }}"></script>

---
