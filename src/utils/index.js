// @flow
let lazyObserver
export const loadImage = (el: HTMLElement) => {
    const src = el.getAttribute('data-src')
    if (src) {
        el.setAttribute('src', src)
    }
    el.removeAttribute('data-src')
}

export const getLazyObserver = () => {
    if ('IntersectionObserver' in window && !lazyObserver) {
        lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const el = entry.target
                    loadImage(el)
                    lazyObserver.unobserve(el)
                }
            })
        })
    }

    return lazyObserver
}
