((w, d, h = d.documentElement, noop = () => { }, tmp = noop) => {
    w.DropZone = class DropZone {
        constructor (ctrl, face) {
            this.files = [];
            this.ctrl = ctrl;
            this.face = face;
            let r = 0;
            const isDone = (F, afterRead) => {
                    if (F.dataTXT && F.dataB64) {
                        this.files.push(F);
                        afterRead(F);
                    }
                },
                readFile = (F, beforeRead, afterRead) => {

                    beforeRead = beforeRead || noop;
                    afterRead = afterRead || noop;
                    if (beforeRead(F) !== false) {
                        r = new FileReader();
                        r.onload = ((F) => {
                            return (D) => {
                                F.dataTXT = D.target.result;
                                isDone(F, afterRead);
                            };
                        })(F);
                        r.readAsText(F);

                        r = new FileReader();
                        r.onload = ((F) => {
                            return (D) => {
                                F.dataB64 = D.target.result;
                                isDone(F, afterRead);
                            };
                        })(F);
                        r.readAsDataURL(F);
                    }
                };

            this.fileHandler = (e, beforeRead, afterRead) => {
                if (e.type === "dragend") {
                    e.dataTransfer.clearData();
                } else
                if (e.type === "drop") {
                    Array.from(e.dataTransfer.files).forEach((file) => {
                        readFile(file, beforeRead, afterRead);
                    });
                } else
                if (e.type === "change") {
                    Array.from(e.target.files).forEach((file) => {
                        readFile(file, beforeRead, afterRead);
                    });
                    e.target.value = "";
                }
            };
        }
    };
    w.Modal = class Modal {
        constructor (opts, onClose, callback) {
            opts = Object.assign({
                "id": `Modal_${new Date().getTime()}`,
                "status": 0,
                "className": "",
                "header": "Header",
                "body": "Body goes here",
                "onClose": onClose || noop,
                "callback": callback || noop,
            }, opts);
            Object.assign(this, opts);

            const dom = document.createElement("div"),
                destroy = (dom) => {
                    return dom ? dom.parentNode.removeChild(dom) : dom;
                },
                findById = (e, d) => {
                    return (d || document).getElementById(e);
                },
                x_on = (f, u, n) => {
                    const attach = f.attachEvent ? f.attachEvent(`on${u}`, n) : false;

                    return f.addEventListener ? f.addEventListener(u, n) : attach;
                };

            this.close = () => {
                destroy(findById(this.id));
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
            document.body.appendChild(dom);

            x_on(findById(`${this.id}_Close`), "click", () => {
                this.onClose = this.onClose() === false ? this.onClose : destroy(dom);
            });
            x_on(document, "keydown", (e) => {
                if (e.keyCode === 27) {
                    this.onClose = this.onClose() === false ? this.onClose : destroy(dom);
                }
            });
            this.callback();
        }
    };
    w.Swipe = class Swipe {
        run (e, opts) {
            opts = Object.assign({
                "onUp": noop,
                "onDown": noop,
                "onLeft": noop,
                "onRight": noop,
            }, opts);
            Object.assign(this, opts);
            e = e && e.type === "touchstart" ? this.alpha(e) : e;
            e = e && e.type === "touchmove" ? this.omega(e) : e;
        }
        alpha (e) {
            this.xA = e.touches[0].clientX;
            this.yA = e.touches[0].clientY;
        }
        omega (e) {
            if (this.xA && this.yA) {
                let xB = this.xA - e.touches[0].clientX,
                    yB = this.yA - e.touches[0].clientY;

                if (Math.abs(xB) < Math.abs(yB)) {
                    yB = yB > 0 ? this.onUp() : this.onDown();
                } else {
                    xB = xB > 0 ? this.onLeft() : this.onRight();
                }
                w.Reflect.deleteProperty(this, "xA");
                w.Reflect.deleteProperty(this, "yA");
            }
        }
    };

    w.eachNode = (arr, func) => {
        if (arr && func) {
            if (arr.nodeName || arr === w) {
                arr = [arr];
            } else if (arr.push || arr.forEach) {
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
    w.all = (str, dom = d) => Array.from(dom.querySelectorAll(str));
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
        return RegExp(` ${str} `).test(` ${dom.className} `);
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
    w.off = (dom, evt, func) => {
        w.eachNodeAndString(dom, evt, (f, u) => {
            tmp = f.removeEventListener ? f.removeEventListener(u, func) : noop;
            tmp = f.detachEvent ? f.detachEvent(`on${u}`, func) : noop;
        });
    };
    w.on = (dom, evt, func) => {
        w.eachNodeAndString(dom, evt, (f, u) => {
            tmp = f.addEventListener ? f.addEventListener(u, func) : noop;
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
    w.wrapDOM = (ref, wrap) => {
        ref.parentNode.insertBefore(wrap, ref);
        wrap.appendChild(ref);
    };

    /* Injection */
    w.jsonp = (url, r = d.createElement("script")) => {
        d.head.appendChild(r);
        r.src = url;
        r.parentNode.removeChild(r);
    };
    w.addCSS = (css, r = d.createElement("style")) => {
        d.head.appendChild(r);
        r.appendChild(d.createTextNode(css));
    };
    w.str2DOM = (str, r = d.createElement("div")) => {
        r.innerHTML = str;

        return r.firstChild;
    };

    /* Object */
    w.objMerge = (a, b) => {
        for (const p in b) {
            if (w.Reflect.has(b, p)) {
                try {
                    a[p] = b[p].constructor === Object ? w.objMerge(a[p], b[p]) : a[p] = b[p];
                } catch (e) {
                    a[p] = b[p];
                }
            }
        }

        return a;
    };
    w.qs2obj = (f = w.location.search) => {
        let r = noop,
            v = noop,
            t = noop,
            k = noop,
            j = noop,
            i = noop;

        r = f.split("&");
        v = r.length;
        f = {};
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
            w.objMerge(f, JSON.parse(j));
        }

        return f;
    };
    w.obj2qs = (f, n) => {
        return Object.keys(f).map((k) => {
            const r = n ? `${n}[${k}]` : k;

            return typeof f[k] === "object" ? w.obj2qs(f[k], r) : `${r}=${f[k]}`;
        }).join("&");
    };

    /* # Helper */
    w.lazyLoad = ($ = "img.lazyload", className = "lazyload") => {
        w.all($).forEach((img) => {
            if (w.isElementInViewport(img) && img.dataset.src && img.src.indexOf("data:image") === 0) {
                img.src = img.dataset.src;
                w.Reflect.deleteProperty(img.dataset, "src");
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
                        wrapper = tag.length ? w.str2DOM(`<${tag} ${attr}></${tag}>`) : d;

                    w.addClass(wrapper, className);
                    if (wrapper !== d) {
                        w.wrapDOM(d, wrapper);
                        if (tag === "FIGURE" && figcaption.length) {
                            wrapper.appendChild(w.str2DOM(`<figcaption ${attr}>${figcaption}</figcaption>`));
                        }
                    }
                },
                "audio": (d, j) => {
                    const src = j.src || d.src || d.href || "",
                        attr = j.attr || "",
                        audio = w.str2DOM(`<audio src="${src}" ${attr}></audio>`);

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
                        d.parentNode.replaceChild(w.str2DOM(`<span class="${className}"><iframe src="${src}${ytsrc}" ${attr}></iframe></span>`), d);

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