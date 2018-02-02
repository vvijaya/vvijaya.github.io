window.defer.push(() => {
    const w = window,
        ob = w.one('#omnibox')

    w.all('[data-id]').forEach((dataID) => {
        dataID.id = `X-${w.md5(dataID.dataset.id)}`
        w.Reflect.deleteProperty(dataID.dataset, 'id')
    })
    fetch('https://gunawan.wijaya.cc/api/timeline.json')
        .then((data) => data.json())
        .then((data) => {
            ob.removeAttribute('disabled')
            w.on(ob, 'input propertychange change', () => {
                if (w.Fuse && ob.value.length) {
                    const result = new w.Fuse(data, {
                        shouldSort: true,
                        threshold: 0.2,
                        location: 0,
                        distance: 1000,
                        maxPatternLength: 32,
                        minMatchCharLength: 1,
                        keys: [{
                            weight: 0.7,
                            name: 'date'
                        }, {
                            weight: 0.6,
                            name: 'md'
                        }, {
                            weight: 0.5,
                            name: 'detail.uri'
                        }]
                    }).search(ob.value)

                    w.addClass(w.all('.card-list .card[id]'), 'hide')
                    result.forEach((single) => {
                        w.removeClass(w.one(`#X-${w.md5(single.date)}`), 'hide')
                    })
                } else {
                    w.removeClass(w.all('.card-list .card[id]'), 'hide')
                }
            })
        })
})
if (window.runDefer) {
    window.runDefer()
}