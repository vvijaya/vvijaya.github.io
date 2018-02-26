/* eslint require-jsdoc: 0 */
window.defer.push(() => {
    window.NativeUtils.merge(window, window.NativeUtils)
    const w = window
    let lastScrollTop = 0,
        scrollSpy = () => { }

    w.NProgress.start()
    scrollSpy = () => {
        if (w.getViewportDimension().w < 960) {
            const st = w.getScrollPosition().y

            if (w.oneDOM('.menu') && st > lastScrollTop && st > w.oneDOM('.menu').clientHeight * 2) {
                w.addClass(w.oneDOM('.menu'), 'folded')
            } else {
                w.removeClass(w.oneDOM('.menu'), 'folded')
            }
            lastScrollTop = st
        } else {
            w.removeClass(w.oneDOM('.menu'), 'folded')
        }
        w.lazyLoad()
    }
    scrollSpy()
    w.on(w, 'scroll resize', scrollSpy)
    w.on(w.allDOM('.row,.flex'), 'scroll', scrollSpy)
    w.lazyLoad()
    w.on(w, 'hashchange', w.lazyLoad)
    w.interactiveMD()
    w.on(w.oneDOM('.rotator'), 'click', () => {
        const main = w.oneDOM('main')

        w.addClass(w.oneDOM('.rotator'), 'clicked')
        if (w.hasClass(main, 'red')) {
            w.removeClass(main, 'red')
            w.addClass(main, 'green')
        } else if (w.hasClass(main, 'green')) {
            w.removeClass(main, 'green')
            w.addClass(main, 'blue')
        } else if (w.hasClass(main, 'blue')) {
            w.removeClass(main, 'blue')
            w.addClass(main, 'dark')
        } else if (w.hasClass(main, 'dark')) {
            w.removeClass(main, 'dark')
        } else {
            w.addClass(main, 'red')
        }
        setTimeout(() => {
            w.removeClass(w.oneDOM('.rotator'), 'clicked')
        }, 400)
    })
    w.NProgress.done()
})
if (window.runDefer) {
    window.runDefer()
}