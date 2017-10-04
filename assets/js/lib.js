((w, d, h = d.documentElement, noop = () => { }, tmp = 0, Reflect = w.Reflect) => {
    w.DropZone = class DropZone {
        constructor (ctrl, face) {
            this.files = [];
            this.ctrl = ctrl;
            this.face = face;
            const isDone = (F, omega) => {
                    if (F.dataTXT && F.dataB64) {
                        this.files.push(F);
                        omega(F);
                    }
                },
                readFile = (F, alpha, omega) => {
                    let r = 0;

                    alpha = alpha || noop;
                    omega = omega || noop;
                    if (alpha(F, this.files) !== false) {
                        r = new FileReader();
                        r.onload = ((F) => {
                            return (D) => {
                                F.dataTXT = D.target.result;
                                isDone(F, omega);
                            };
                        })(F);
                        r.readAsText(F);
                        r = new FileReader();
                        r.onload = ((F) => {
                            return (D) => {
                                F.dataB64 = D.target.result;
                                isDone(F, omega);
                            };
                        })(F);
                        r.readAsDataURL(F);
                    }
                };

            this.fileHandler = (e, alpha, omega) => {
                if (e.type === "dragend") {
                    e.dataTransfer.clearData();
                } else
                if (e.type === "drop") {
                    [...e.dataTransfer.files].forEach((file) => {
                        readFile(file, alpha, omega);
                    });
                } else
                if (e.type === "change") {
                    [...e.target.files].forEach((file) => {
                        readFile(file, alpha, omega);
                    });
                    e.target.value = "";
                }
            };
        }
    };
    w.Modal = class Modal {
        constructor (opts, onClose, callback) {
            const dom = d.createElement("div"),
                rm = (dom) => {
                    return dom ? dom.parentNode.removeChild(dom) : dom;
                },
                on = (f, u, func) => {
                    tmp = f.addEventListener ? f.addEventListener(u, func) : noop;
                    tmp = f.attachEvent ? f.attachEvent(`on${u}`, func) : noop;
                },
                off = (f, u, func) => {
                    tmp = f.removeEventListener ? f.removeEventListener(u, func) : noop;
                    tmp = f.detachEvent ? f.detachEvent(`on${u}`, func) : noop;
                },
                $ = (e, $) => {
                    return ($ || d).getElementById(e);
                };

            this.id = opts ? opts.id : `Modal_${new Date().getTime()}`;
            this.className = opts ? opts.className : "";
            this.header = opts ? opts.header : "Header";
            this.body = opts ? opts.body : "Body goes here";
            this.onClose = onClose || noop;
            this.callback = callback || noop;
            this.close = (hasRun = false) => {
                if (hasRun) {
                    this.onClose = this.onClose() === false ? this.onClose : rm($(this.id));
                    off(d, "keydown", w.eKbd);
                } else {
                    rm($(this.id));
                }
            };
            this.close();
            dom.id = `${this.id}`;
            dom.className = `Modal ${this.className}`;
            dom.innerHTML = `
            <h1 id="${this.id}_Header" class="header">${this.header}</h1>
                <div id="${this.id}_Body" class="body">
                    <div>${this.body}</div>
                </div>
            <button id="${this.id}_Close" class="close">Close</button>
            `;
            d.body.appendChild(dom);
            w.eKbd = w.eKbd || ((e) => {
                if (e.keyCode === 27) {
                    this.close(true);
                }
            });
            on(d, "keydown", w.eKbd);
            on($(`${this.id}_Close`), "click", () => {
                this.close(true);
            });
            this.callback();
        }
    };
    w.Swipe = class Swipe {
        run (e, opts) {
            const alpha = (e) => {
                    this.xA = e.touches[0].clientX;
                    this.yA = e.touches[0].clientY;
                },
                omega = (e) => {
                    if (this.xA && this.yA) {
                        let xB = this.xA - e.touches[0].clientX,
                            yB = this.yA - e.touches[0].clientY;

                        if (Math.abs(xB) < Math.abs(yB)) {
                            yB = yB > 0 ? this.onUp() : this.onDown();
                        } else {
                            xB = xB > 0 ? this.onLeft() : this.onRight();
                        }
                        Reflect.deleteProperty(this, "xA");
                        Reflect.deleteProperty(this, "yA");
                    }
                };

            this.onUp = opts.onUp || noop;
            this.onDown = opts.onDown || noop;
            this.onLeft = opts.onLeft || noop;
            this.onRight = opts.onRight || noop;
            e = e && e.type === "touchstart" ? alpha(e) : e;
            e = e && e.type === "touchmove" ? omega(e) : e;
        }
    };

    w.eachNode = (arr, func) => {
        if (arr && func) {
            if (arr.nodeName || arr === w) {
                arr = [arr];
            } else
            if (arr.push || arr.forEach) {
                noop();
            }
            arr.forEach((i) => func(i));
        }
    };
    w.eachString = (arr, func, n = " ") => {
        if (arr && func) {
            arr = arr.split ? arr.split(n) : arr;
            arr.forEach((i) => {
                tmp = i === "" ? noop : func(i);
            });
        }
    };

    /* Node & DOM */
    w.one = (str, dom = d) => dom.querySelector(str);
    w.all = (str, dom = d) => [...dom.querySelectorAll(str)];
    w.fadeout = (dom, delay = 40) => {
        w.eachNode(dom, (i) => {
            i.style.opacity = i.style.opacity === "" ? 1 : i.style.opacity;
            if (i.style.opacity > 0) {
                setTimeout(() => {
                    i.style.opacity -= 0.1;
                    w.fadeout(i);
                }, delay);
            } else {
                i.style.opacity = 0;
            }
        });
    };
    w.fadein = (dom, delay = 40) => {
        w.eachNode(dom, (i) => {
            i.style.opacity = i.style.opacity === "" ? 0 : i.style.opacity;
            if (i.style.opacity < 1) {
                setTimeout(() => {
                    i.style.opacity -= -0.1;
                    w.fadein(i);
                }, delay);
            } else {
                i.style.opacity = 1;
            }
        });
    };
    w.hasClass = (dom, str) => {
        return new RegExp(` ${str} `).test(` ${dom.className} `);
    };
    w.eachNodeAndString = (dom, str, func) => {
        w.eachNode(dom, (f) => {
            w.eachString(str, (u) => {
                tmp = func ? func(f, u) : noop;
            });
        });
    };
    w.addClass = (dom, str) => {
        w.eachNodeAndString(dom, str, (f, u) => {
            tmp = f.classList ? f.classList.add(u) : f.className += ` ${u}`;
        });
    };
    w.removeClass = (dom, str) => {
        w.eachNodeAndString(dom, str, (f, u) => {
            tmp = f.classList ? f.classList.remove(u) : f.className = f.className.split(u).join("");
        });
    };
    w.toggleClass = (dom, str) => {
        w.eachNodeAndString(dom, str, (f, u) => {
            tmp = w.hasClass(f, u) ? w.removeClass(f, u) : w.addClass(f, u);
        });
    };
    // eslint-disable-next-line
    let _psv = false; try { w.addEventListener("test", null, Object.defineProperty({}, "passive", { "get": () => { _psv = {"passive": true};} }));} catch (e) {}
    w.off = (dom, evt, func, psv = _psv) => {
        w.eachNodeAndString(dom, evt, (f, u) => {
            tmp = f.removeEventListener ? f.removeEventListener(u, func, psv) : noop;
            tmp = f.detachEvent ? f.detachEvent(`on${u}`, func) : noop;
        });
    };
    w.on = (dom, evt, func, psv = _psv) => {
        w.eachNodeAndString(dom, evt, (f, u) => {
            tmp = f.addEventListener ? f.addEventListener(u, func, psv) : noop;
            tmp = f.attachEvent ? f.attachEvent(`on${u}`, func) : noop;
        });
    };
    w.getScroll = () => ({
        "x": w.scrollX || w.scrollLeft || 0,
        "y": w.scrollY || w.scrollTop || 0,
    });
    w.getViewport = () => ({
        "w": w.innerWidth || h.clientWidth || d.body.clientWidth || 0,
        "h": w.innerHeight || h.clientHeight || d.body.clientHeight || 0,
    });
    w.isElementInViewport = (dom, r = dom.getBoundingClientRect()) => r.top >= 0 && r.left >= 0 && r.bottom <= w.getViewport().h && r.right <= w.getViewport().w;
    w.b64EncodeUnicode = (str, cb) => {
        try {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
                return String.fromCharCode(`0x${p1}`);
            }));
        } catch (e) {
            return cb(str);
        }
    };
    w.b64DecodeUnicode = (str, cb) => {
        try {
            return decodeURIComponent(atob(str).split("").map((c) => {
                c = `00${c.charCodeAt(0).toString(16)}`.slice(-2);

                return `%${c}`;
            }).join(""));
        } catch (e) {
            return cb(str);
        }
    };

    /* XML, DOM, JSON & Injection Helper */
    w.xmlToJSON = (xml, opt) => {

        /* # modified to es6 method from https://github.com/metatribal/xmlToJSON */
        let vResult = {},
            vAttribs = {},
            vContent = {},
            oAttrib = null,
            attribName = "",
            nLength = 0,
            sCollectedTxt = "",
            tmp = 0;

        const options = {

            /* # extract cdata and merge with text */
                "mergeCDATA": true,

                /* # convert truthy attributes to boolean, etc */
                "grokAttr": true,

                /* # convert truthy text/attr to boolean, etc */
                "grokText": true,

                /* # collapse multiple spaces to single space */
                "normalize": true,

                /* # include namespaces as attribute in output */
                "xmlns": true,

                /* # tag name for namespace objects */
                "namespaceKey": "@NS",

                /* # tag name for text nodes */
                "textKey": "@TEXT",

                /* # tag name for attribute values */
                "valueKey": "@VALUE",

                /* # tag for attr groups */
                "attrKey": "@ATTR",

                /* # tag for cdata nodes (ignored if mergeCDATA is true) */
                "cdataKey": "@CDATA",

                /* # if false, key is used as prefix to name, set prefix to "" to merge children and attrs. */
                "attrsAsObject": true,

                /* # remove namespace prefixes from attributes */
                "stripAttrPrefix": true,

                /* # for elements of same name in diff namespaces, you can enable namespaces and access the nskey property */
                "stripElemPrefix": true,

                /* # force children into arrays */
                "childrenAsArray": false,
            },
            grokType = (sValue) => {
                if (/^\s*$/.test(sValue)) {
                    return null;
                }
                if (/^(?:true|false)$/i.test(sValue)) {
                    return sValue.toLowerCase() === "true";
                }
                if (isFinite(sValue)) {
                    return parseFloat(sValue);
                }

                return sValue;
            },
            isArray = (n) => n.constructor === Array,
            prefixMatch = new RegExp(/(?!xmlns)^.*:/),
            trimMatch = new RegExp(/^\s+|\s+$/g),
            parseAttr = () => {
                if (xml.attributes && xml.attributes.length > 0) {
                    vAttribs = {};
                    for (nLength; nLength < xml.attributes.length; nLength++) {
                        oAttrib = xml.attributes.item(nLength);
                        vContent = {};
                        attribName = "";
                        tmp = oAttrib.name;
                        attribName = options.stripAttrPrefix ? tmp.replace(prefixMatch, "") : tmp;
                        tmp = oAttrib.value.replace(trimMatch, "");
                        vContent[options.valueKey] = options.grokAttr ? grokType(tmp) : tmp;
                        if (options.xmlns && oAttrib.namespaceURI) {
                            vContent[options.namespaceKey] = oAttrib.namespaceURI;
                        }
                        if (options.attrsAsObject) {
                            vAttribs[attribName] = vContent;
                        } else {
                            vResult[options.attrKey + attribName] = vContent;
                        }
                    }
                    if (options.attrsAsObject) {
                        vResult[options.attrKey] = vAttribs;
                    }
                }
            },
            iterate = () => {
                if (xml.hasChildNodes()) {
                    for (let oNode, sProp, vContent, nItem = 0; nItem < xml.childNodes.length; nItem++) {
                        oNode = xml.childNodes.item(nItem);
                        if (oNode.nodeType === 4) {

                            /* # nodeType is "CDATASection" (4) */
                            if (options.mergeCDATA) {
                                sCollectedTxt += oNode.nodeValue;
                            } else
                            if (Reflect.has(vResult, options.cdataKey)) {
                                tmp = vResult[options.cdataKey];
                                vResult[options.cdataKey] = isArray(tmp) ? tmp : [tmp];
                                vResult[options.cdataKey].push(oNode.nodeValue);
                            } else
                            if (options.childrenAsArray) {
                                vResult[options.cdataKey] = [oNode.nodeValue];
                            } else {
                                vResult[options.cdataKey] = oNode.nodeValue;
                            }
                        } else
                        if (oNode.nodeType === 3) {

                            /* # nodeType is "Text" (3) */
                            sCollectedTxt += oNode.nodeValue;
                        } else
                        if (oNode.nodeType === 1) {

                            /* # nodeType is "Element" (1) */
                            vResult = nLength === 0 ? {} : vResult;
                            vContent = w.xmlToJSON(oNode);
                            sProp = options.stripElemPrefix ? oNode.nodeName.replace(prefixMatch, "") : oNode.nodeName;
                            if (Reflect.has(vResult, sProp)) {
                                vResult[sProp] = isArray(vResult[sProp]) ? vResult[sProp] : [vResult[sProp]];
                                vResult[sProp].push(vContent);
                            } else {
                                vResult[sProp] = options.childrenAsArray ? [vContent] : vContent;
                                nLength++;
                            }
                        }
                    }
                } else if (!sCollectedTxt) {
                    vResult[options.textKey] = options.childrenAsArray ? [null] : null;
                }
            },
            normalize = () => {
                if (sCollectedTxt) {
                    if (options.grokText) {
                        tmp = grokType(sCollectedTxt.replace(trimMatch, ""));
                        vResult[options.textKey] = tmp !== null && typeof tmp !== "undefined" ? tmp : vResult[options.textKey];
                    } else if (options.normalize) {
                        vResult[options.textKey] = sCollectedTxt.replace(trimMatch, "").replace(/\s+/g, " ");
                    } else {
                        vResult[options.textKey] = sCollectedTxt.replace(trimMatch, "");
                    }
                }
            };


            /* # initialize options */
        for (const key in opt) {
            if (Reflect.has(opt, key)) {
                options[key] = opt[key];
            }
        }


        /* # parse namespace information */
        if (options.xmlns && xml.namespaceURI) {
            vResult[options.namespaceKey] = xml.namespaceURI;
        }

        parseAttr();
        iterate();
        normalize();

        return vResult;
    };
    w.xmlToString = (xml) => {
        return xml.xml ? xml.xml : new XMLSerializer().serializeToString(xml);
    };
    w.stringToXML = (str) => {
        return new DOMParser().parseFromString(str, "text/xml");
    };
    w.stringToDOM = (str, r = d.createElement("div")) => {
        return (r.innerHTML = str) ? r.firstChild : noop();
    };
    w.stringToXMLToJSON = (str) => {
        return w.xmlToJSON(w.stringToXML(str));
    };
    w.deepMerge = (a, b) => {
        for (const p in b) {
            if (Reflect.has(b, p)) {
                try {
                    a[p] = b[p].constructor === Object ? w.deepMerge(a[p], b[p]) : a[p] = b[p];
                } catch (e) {
                    a[p] = b[p];
                }
            }
        }

        return a;
    };
    w.queryStringToJSON = (str = w.location.search) => {
        let r = noop,
            v = noop,
            t = noop,
            k = noop,
            j = noop,
            i = noop;

        r = str.split("&");
        v = r.length;
        str = {};
        while (v-- && (t = r[v].split("="))) {
            j = t[1] || "";
            k = t[0].split("?").join("").split("]").join("[").split("[[").join("[").split("[");
            try {
                j = JSON.parse(j.toLowerCase());
            } catch (e) {
                j = `"${decodeURIComponent(j)}"`;
            }
            while (k.length) {
                i = k.pop();
                j = i === "" ? j : `{"${i}":${j}}`;
            }
            w.deepMerge(str, JSON.parse(j));
        }

        return str;
    };
    w.jsonToQueryString = (json, n) => {
        return Object.keys(json).map((key) => {
            tmp = n ? `${n}[${key}]` : key;

            return typeof json[key] === "object" ? w.jsonToQueryString(json[key], tmp) : `${tmp}=${json[key]}`;
        }).join("&");
    };
    w.wrapDOM = (ref, wrap) => {
        ref.parentNode.insertBefore(wrap, ref);
        wrap.appendChild(ref);
    };
    w.jsonp = (url, r = d.createElement("script")) => {
        d.head.appendChild(r);
        r.src = url;
        r.parentNode.removeChild(r);
    };
    w.addCSS = (css, r = d.createElement("style")) => {
        d.head.appendChild(r);
        r.appendChild(d.createTextNode(css));
    };


    /* Misc */
    w.lazyLoad = ($ = "img.lazyload", className = "lazyload") => {
        w.all($).forEach((img) => {
            if (w.isElementInViewport(img) && img.dataset.src && img.src.indexOf("data:image") === 0) {
                img.src = img.dataset.src;
                Reflect.deleteProperty(img.dataset, "src");
                w.removeClass(img, className);
            }
        });
    };
    w.interactiveMD = () => {
        const cmd = {
                "find": (d, j) => {
                    const tag = (j.tag || "").trim().toUpperCase(),
                        className = j.className || "";
                    let loop = true,
                        tmp = 0;

                    d.tabIndex = -1;
                    while (loop && (d = d.parentNode)) {
                        if (d.tagName === tag) {
                            loop = false;
                            w.addClass(d, className);
                            if (tag === "TABLE" && w.hasClass(d, "responsive")) {
                                tmp = w.all("tr", d);
                                w.addClass(tmp, "row");
                                tmp = w.all("td,th", d);
                                w.addClass(tmp, `col-sm-1 col-md-1-${tmp[0].parentNode.children.length}`);
                                tmp = w.one("thead", d);
                                w.addClass(tmp, "hide");
                            }
                        }
                    }
                },
                "wrap": (d, j) => {
                    const tag = (j.tag || "").trim().toUpperCase(),
                        className = j.className || "",
                        attr = j.attr || "",
                        figcaption = j.figcaption || d.alt || d.title || "",
                        wrapper = tag.length ? w.stringToDOM(`<${tag} ${attr}></${tag}>`) : d;

                    w.addClass(wrapper, className);
                    if (wrapper !== d) {
                        w.wrapDOM(d, wrapper);
                        if (tag === "FIGURE" && figcaption.length) {
                            wrapper.appendChild(w.stringToDOM(`<figcaption ${attr}>${figcaption}</figcaption>`));
                        }
                    }
                },
                "audio": (d, j) => {
                    const src = j.src || d.src || d.href || "",
                        attr = j.attr || "",
                        audio = w.stringToDOM(`<audio src="${src}" ${attr}></audio>`);

                    d.parentNode.insertBefore(audio, d);
                    w.on(d, "click", (e) => {
                        e.preventDefault();
                        e = audio.paused ? audio.play() : audio.pause();

                        return false;
                    });
                },
                "embed": (d, j) => {
                    const src = j.src || d.src || d.href || "",
                        className = j.className || "embed ratio ratio-16-9",
                        attr = j.attr || "allowfullscreen frameborder='0'",
                        ytsrc = src.toLowerCase().indexOf("youtube") >= 0 && src.indexOf("?") < 0 ? "?&autoplay=1&iv_load_policy=3&modestbranding=1&showinfo=0&rel=0&playsinline=1" : "";

                    w.addClass(d, className);
                    w.on(d, "click", (e) => {
                        e.preventDefault();
                        w.removeClass(d, "embed");
                        d.parentNode.replaceChild(w.stringToDOM(`<span class="${className}"><iframe src="${src}${ytsrc}" ${attr}></iframe></span>`), d);

                        return false;
                    });
                },
                "modal": (d, j) => {
                    const src = j.src || d.src || d.href || "",
                        body = j.body || d.innerHTML || "Body",
                        header = j.header || "Header",
                        className = j.className || "";

                    w.on(d, "click", (e) => {
                        e.preventDefault();
                        e = new w.Modal({
                            "body": `${body}`,
                            "header": `<a target="_blank" href="${src}">${header}</a>`,
                            "className": `${className}`,
                        });
                        w.lazyLoad();

                        return false;
                    });
                },
            },
            el = w.all("body [title]");
        let i = el.length,
            j = noop,
            t = noop;

        while (i--) {
            try {
                t = JSON.parse(el[i].title);
                t = t.pop ? t : [t];
            } catch (error) {
                noop(error);
            }
            while (t.length && (j = t.pop())) {
                cmd[j[">"]](el[i], j);
                el[i].title = "";
            }
        }
    };

    /* # runDefer */
    w.runDefer = (delay = 500, retry = 0, maxRetry = 99, a = noop, i = noop) => {
        try {
            a = w.defer;
            while (a.length) {
                i = a[a.length - 1];
                i = i && i();
                a.pop();
            }
        } catch (error) {
            if (retry >= maxRetry) {
                return console.warn(`${String(retry).padStart(3)} > MAX`);
            }
            setTimeout(() => {
                w.runDefer(delay, ++retry, ((retry, error) => {
                    console.warn(`${String(retry).padStart(3)} > ${error.message}`);
                })(retry, error));
            }, delay);
        }

        return noop();
    };
    tmp = w.runDefer(500);

    return tmp;
})(this, document);