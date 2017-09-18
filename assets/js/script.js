/* global Reflect */
/* jshint -W117 */
const w = window,
    cache = w.cache || {},
    noop = () => { },
    runAfterLib = () => {
        return window.runAfterLib && window.runAfterLib();
    },
    int = (i) => {
        return Number(i);
    };
let lastScrollTop = 0,
    scrollSpy = noop,
    lazyLoad = noop,
    interactiveMD = noop;

class DropZone {
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
}
class Modal {
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
            if (e.keyCode === int("27")) {
                this.onClose = this.onClose() === false ? this.onClose : destroy(dom);
            }
        });
        this.callback();
    }
}
class Swipe {
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
        this.xA = e.touches[int("0")].clientX;
        this.yA = e.touches[int("0")].clientY;
    }
    omega (e) {
        if (this.xA && this.yA) {
            let xB = this.xA - e.touches[int("0")].clientX,
                yB = this.yA - e.touches[int("0")].clientY;

            if (Math.abs(xB) < Math.abs(yB)) {
                yB = yB > int("0") ? this.onUp() : this.onDown();
            } else {
                xB = xB > int("0") ? this.onLeft() : this.onRight();
            }
            Reflect.deleteProperty(this, "xA");
            Reflect.deleteProperty(this, "yA");
        }
    }
}

window.afterLib.push(() => {
    w.DropZone = DropZone;
    w.Modal = Modal;
    w.Swipe = Swipe;
    w.NProgress.start();
    cache.menu = cache.menu || w.one(".menu");

    scrollSpy = () => {
        if (w.getViewport().w < int("960")) {
            const st = w.getScroll().y;

            if (cache.menu && st > lastScrollTop && st > cache.menu.clientHeight * int("2")) {
                w.addClass(cache.menu, "folded");
            } else {
                w.removeClass(cache.menu, "folded");
            }
            lastScrollTop = st;
        } else {
            w.removeClass(cache.menu, "folded");
        }
        lazyLoad();
    };
    scrollSpy();
    w.on(window, "scroll resize", scrollSpy);
    w.on(w.all(".row,.flex"), "scroll", scrollSpy);

    lazyLoad = () => {
        const g = w.all("img.lazyload");
        let i = g.length;

        while (i--) {
            if (w.isElementInViewport(g[i]) && g[i].dataset.src && g[i].src.indexOf("data:image") === int("0")) {
                g[i].src = g[i].dataset.src;
                Reflect.deleteProperty(g[i].dataset, "src");
                w.removeClass(g[i], "lazyload");
            }
        }
    };
    lazyLoad();
    w.on(w, "hashchange", lazyLoad);

    interactiveMD = () => {
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
                                w.addClass(tmp, `col-sm-1 col-md-1-${tmp[int("0")].parentNode.children.length}`);
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
                        ytsrc = src.toLowerCase().indexOf("youtube") >= int("0") && src.indexOf("?") < int("0") ? "?&autoplay=1&iv_load_policy=3&modestbranding=1&showinfo=0&rel=0&playsinline=1" : "";

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
                        e = new Modal({
                            "body": `${body}`,
                            "header": `<a target="_blank" href="${src}">${header}</a>`,
                            "className": `${className}`,
                        });
                        lazyLoad();

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
    interactiveMD();

    w.on(w.one(".rotator"), "click", () => {
        const main = w.one("main");

        w.addClass(w.one(".rotator"), "clicked");
        if (w.hasClass(main, "red")) {
            w.removeClass(main, "red");
            w.addClass(main, "green");
        } else if (w.hasClass(main, "green")) {
            w.removeClass(main, "green");
            w.addClass(main, "blue");
        } else if (w.hasClass(main, "blue")) {
            w.removeClass(main, "blue");
            w.addClass(main, "dark");
        } else if (w.hasClass(main, "dark")) {
            w.removeClass(main, "dark");
        } else {
            w.addClass(main, "red");
        }
        setTimeout(() => {
            w.removeClass(w.one(".rotator"), "clicked");
        }, int("400"));
    });

    w.NProgress.done();
});
runAfterLib();