/*jslint browser:true, plusplus: true, sloppy: true, regexp: true, maxerr: 100, nomen: true */
/*global addJSStyle, stripURL, sheet, getId, getTag, getClass, getOne, getAll, smoothScroll, log, err */
/*global ismobile, remCookie, getCookie, setCookie, noCallback, addCls, remCls, hasCls */
/*global setTxt, getTxt, setVal, getVal, getQs, bindEvent, insertAfter, c_relative */
var tmp, i, j, k, l, eventListener;
var injectCSS = function () {
    for (i = 9; i >= 0; i--) {
        if (i<6) {
            l = String((3*i).toString(16));
            l += l+l;
            addJSStyle('.bc-'+l+',.bc-'+l+' *{background-color:#'+l+' !important;}');
            addJSStyle('.bc-'+l+'-alt:hover,.bc-'+l+'-alt:focus,.bc-'+l+'-alt:active{background-color:#'+l+' !important;opacity:1;}');
            addJSStyle('.fc-'+l+',.fc-'+l+' *{color:#'+l+' !important;}');
            addJSStyle('.fc-'+l+'-alt:hover,.fc-'+l+'-alt:focus,.fc-'+l+'-alt:active{color:#'+l+' !important;opacity:1;}');
        }
        for (j = 9; j >= 0; j--) {
            // for (k = 9; k >= 0; k--) {
            //     if (i<6 && j<6 && k<6) {
            //         l = '';
            //         l += String((3*i).toString(16));
            //         l += String((3*j).toString(16));
            //         l += String((3*k).toString(16));
            //         // addJSStyle('.bc-'+l+',.bc-'+l+' *{background-color:#'+l+' !important;}');
            //         // addJSStyle('.bc-'+l+'-alt:hover,.bc-'+l+'-alt:focus,.bc-'+l+'-alt:active{background-color:#'+l+' !important;}');
            //         // addJSStyle('.fc-'+l+',.fc-'+l+' *{color:#'+l+' !important;}');
            //         // addJSStyle('.fc-'+l+'-alt:hover,.fc-'+l+'-alt:focus,.fc-'+l+'-alt:active{color:#'+l+' !important;}');
            //     }
            // }
            l = String(i)+j;
            if (i>0 && j>0 && j>i) {
                addJSStyle('.tr-'+l+'{'+
                    '-webkit-transition: all ' + (i / j) + 's ease;'+
                    '-moz-transition: all ' + (i / j) + 's ease;'+
                    '-o-transition: all ' + (i / j) + 's ease;'+
                    'transition: all ' + (i / j) + 's ease;}');
            }
            if (i<2) {
                addJSStyle('.rotp-'+l+'{'+
                    '-webkit-transform: rotate('+l+'deg);'+
                    '-ms-transform: rotate('+l+'deg);'+
                    'transform: rotate('+l+'deg);}');
                addJSStyle('.rotn-'+l+'{'+
                    '-webkit-transform: rotate(-'+l+'deg);'+
                    '-ms-transform: rotate(-'+l+'deg);'+
                    'transform: rotate(-'+l+'deg);}');
                if (j>0) {
                    addJSStyle('.rotp-'+l+':hover,.rotp-'+l+':focus,.rotp-'+l+':active{'+
                        '-webkit-transform: rotate(-'+l+'deg);'+
                        '-ms-transform: rotate(-'+l+'deg);'+
                        'transform: rotate(-'+l+'deg);}');
                    addJSStyle('.rotn-'+l+':hover,.rotn-'+l+':focus,.rotn-'+l+':active{'+
                        '-webkit-transform: rotate('+l+'deg);'+
                        '-ms-transform: rotate('+l+'deg);'+
                        'transform: rotate('+l+'deg);}');
                }
            }
        }
    }
};
injectCSS();

eventListener = function (e) {
//ONLOAD, PUT LOGIC IN THIS METHOD
    noCallback(e);
    
    e = getClass('header')[0];
    if (e) { e = e.clientHeight || e.offsetHeight || e.scrollHeight; }
    getClass('section')[0].style.marginTop = e + 'px';

    setTimeout(function () {
        remCls(getTag('html')[0], 'load');
        remCls(getTag('body')[0], 'load');
        if (smoothScroll && gumshoe) {
            smoothScroll.init({offset: -1});
            gumshoe.init({
                callbackAfter: function (nav) {
                    var now = nav.target.id;
                    var next = '_';
                    if(history.pushState) {
                        history.pushState(null, null, '#'+now);
                    }else{
                        if (!ismobile()) {
                            location.hash = now;
                        }
                    }
                    remCls(getId('next').parentNode,'rotp-180');
                    if (now=='_') {
                        next = '_works';
                    }else if (now=='_works') {
                        next = '_about';
                    }else if (now=='_about') {
                        next = '_contact';
                    }else{
                         addCls(getId('next').parentNode,'rotp-180');
                    }
                    getId('next').href = '#'+next;
                }
            });
        }
    }, 500);
    if (ismobile()) {
        tmp = getClass('w-lc');
        for (i = tmp.length - 1; i >= 0; i--) {
            addCls(tmp[i], 'w-lc-m');
            remCls(tmp[i], 'w-lc');
        }
    }
    getId('host').innerHTML = '<a href="' + stripURL(window.location.href) + '"">wijaya.cc</a>';
    getId('year').innerHTML = new Date().getFullYear();
};
bindEvent(w, 'resize', eventListener);
bindEvent(w, 'load', eventListener);

eventListener = function (e) {noCallback(e);};
bindEvent(w, 'hashchange', eventListener);

(function(){
    if (self !== top) { top.location = self.location; }
    if (!window.location.hash) { window.location = '#_'; }

    var p='aaas$aaa$acap$adiumxtra$afp$aim$app$apt$attachment$aw$barion$beshare$bitcoin$bolo$callto$chrome$chrome-extension$cid$coap$coaps$content$crid$cvs$data$dict$dns$ed2k$facetime$fax$feed$file$finger$fish$geo$gg$git$gizmoproject$go$gopher$gtalk$h323$hcp$iax$im$imap$irc$irc6$ircs$jar$keyparc$lastfm$ldap$ldaps$magnet$mailto$maps$market$mid$mms$ms-help$msnim$mumble$mvn$news$nntp$notes$palm$paparazzi$platform$pop$pres$proxy$psyc$query$reload$res$resource$rmi$rsync$rtmfp$rtmp$secondlife$session$sftp$sgn$sip$sips$skype$smb$sms$snmp$soldat$spotify$ssh$steam$stun$stuns$svn$svn+ssh$tag$teamspeak$tel$telnet$things$turn$turns$udp$unreal$urn$ut2004$ventrilo$view-source$wais$webcal$ws$wtai$wyciwyg$xfire$xmpp$xri$ymsgr$z39.50r$z39.50s$doi$javascript$jdbc$stratum+tcp$stratum+udp';
    p = p.split('$');

    var args, txtA, txtB;
    tmp = document.body.innerHTML.split('<a>_');
    for (i = tmp.length - 1; i >= 0; i--) {
        tmp[i] = tmp[i].split('_</a>');
        if (tmp[i][1]) {
            args = tmp[i][0].split(',');
            attr = (args[2]) ? args[2] : 'data-hash-' + (new Date().getTime());
            text = (args[1]) ? args[1] : args+'';
            href = (args[0]) ? args[0].replace(/ /g,'') : args+'';

            text = (text.replace(/ /g,'') === '$') ? href : text;
            
            if(text.split(':')[1]){
                text = text.split(':');
                for (j = p.length - 1; j >= 0; j--) {
                    if(p[j] === text[0].replace(/ /g,'')){
                        delete text[0]; break;
                    }
                }
                text = (text[0]) ? text.join(':') : text[1];
            }

            txtA = '<a>_' + args + '_</a>';
            txtB = '<a href="' + href + '" ' + attr + '>' + text + '</a>';
            document.body.innerHTML = document.body.innerHTML.split(txtA).join(txtB);
        }
    }
}());
