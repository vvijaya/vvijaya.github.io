window.defer.push(() => {
    const w = window;
    let lastScrollTop = 0,
        scrollSpy = () => { };

    w.NProgress.start();
    scrollSpy = () => {
        if (w.getViewport().w < 960) {
            const st = w.getScroll().y;

            if (w.one('.menu') && st > lastScrollTop && st > w.one('.menu').clientHeight * 2) {
                w.addClass(w.one('.menu'), 'folded');
            } else {
                w.removeClass(w.one('.menu'), 'folded');
            }
            lastScrollTop = st;
        } else {
            w.removeClass(w.one('.menu'), 'folded');
        }
        w.lazyLoad();
    };
    scrollSpy();
    w.on(w, 'scroll resize', scrollSpy);
    w.on(w.all('.row,.flex'), 'scroll', scrollSpy);
    w.lazyLoad();
    w.on(w, 'hashchange', w.lazyLoad);
    w.interactiveMD();
    w.on(w.one('.rotator'), 'click', () => {
        const main = w.one('main');

        w.addClass(w.one('.rotator'), 'clicked');
        if (w.hasClass(main, 'red')) {
            w.removeClass(main, 'red');
            w.addClass(main, 'green');
        } else if (w.hasClass(main, 'green')) {
            w.removeClass(main, 'green');
            w.addClass(main, 'blue');
        } else if (w.hasClass(main, 'blue')) {
            w.removeClass(main, 'blue');
            w.addClass(main, 'dark');
        } else if (w.hasClass(main, 'dark')) {
            w.removeClass(main, 'dark');
        } else {
            w.addClass(main, 'red');
        }
        setTimeout(() => {
            w.removeClass(w.one('.rotator'), 'clicked');
        }, 400);
    });
    w.NProgress.done();
});
if (window.runDefer) {
    window.runDefer();
}