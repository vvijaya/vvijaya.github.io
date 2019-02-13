window.defer.push(() => {
    window.NativeUtils.merge(window, window.NativeUtils)
    const w = window,
        omnibox = w.oneDOM('#omnibox')

    w.eachDOM('[data-id]', (dataID) => {
        dataID.id = `X-${w.md5(dataID.dataset.id)}`
        w.Reflect.deleteProperty(dataID.dataset, 'id')
    })
    fetch('/api/timeline.json')
        .then((data) => data.json())
        .then((data) => {
            omnibox.removeAttribute('disabled')
            w.on(omnibox, 'input propertychange change', () => {
                if (w.Fuse && omnibox.value.length) {
                    const result = new w.Fuse(data, {
                        shouldSort: true,
                        threshold: 0.2,
                        location: 0,
                        distance: 4000,
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
                    }).search(omnibox.value)

                    w.addClass(w.allDOM('.card-list .card[id]'), 'hide')
                    result.forEach((single) => {
                        w.removeClass(w.oneDOM(`#X-${w.md5(single.date)}`), 'hide')
                    })
                } else {
                    w.removeClass(w.allDOM('.card-list .card[id]'), 'hide')
                }
            }, false)
        })
})
if (window.runDefer) {
    window.runDefer()
}