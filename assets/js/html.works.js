window.defer.push(() => {
    window.NativeUtils.merge(window, window.NativeUtils)
    const w = window,
        omnibox = w.oneDOM('#omnibox'),
        details = []

    w.eachDOM('[data-id]', (dataID) => {
        dataID.id = `X-${w.md5(dataID.dataset.id)}`
        w.Reflect.deleteProperty(dataID.dataset, 'id')
    })

    fetch('https://gunawan.wijaya.cc/api/timeline.json')
        .then((data) => data.json())
        .then((data) => {
            data.map((list) => {
                return list.detail && list.detail.map((detail) => {
                    return detail.img && details.push(detail)
                })
            })

            omnibox.removeAttribute('disabled')
            w.on(omnibox, 'input propertychange change', () => {
                if (window.Fuse && omnibox.value.length) {
                    const result = new w.Fuse(details, {
                        shouldSort: true,
                        threshold: 0.2,
                        location: 0,
                        distance: 4000,
                        maxPatternLength: 32,
                        minMatchCharLength: 1,
                        keys: [{
                            weight: 0.7,
                            name: 'title'
                        }, {
                            weight: 0.6,
                            name: 'desc'
                        }, {
                            weight: 0.5,
                            name: 'uri'
                        }, {
                            weight: 0.4,
                            name: 'live'
                        }]
                    }).search(omnibox.value)

                    w.addClass(w.allDOM('.work-list .work[id]'), 'col-sm-0 col-md-0')
                    result.forEach((single) => {
                        w.removeClass(w.oneDOM(`#X-${w.md5(single.uri)}`), 'col-sm-0 col-md-0')
                    })
                } else {
                    w.removeClass(w.allDOM('.work-list .work[id]'), 'col-sm-0 col-md-0')
                }
            })
        })
})
if (window.runDefer) {
    window.runDefer()
}