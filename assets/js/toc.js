// NOTE use closure instead of DOMContentLoaded because of InstantClick,
// every page loaded by InstantClick should run the <script> tags again.

function setupToc() {
    if (window.scrollListeners) {
        for (const listener of scrollListeners) {
            window.removeEventListener('scroll', listener)
        }
    }
    window.scrollListeners = [];

    if (!document.querySelector('.toc')) {
        console.log('no toc found, ignore toc scroll')
        return
    }
    // console.log('enable toc scroll')

    // always get an array here
    const scrollListeners = window.scrollListeners
    const headings = document.querySelectorAll('h1[id],h2[id],h3[id],h4[id],h5[id]');
    const activeClass = 'active';

    // Make the first header active
    let activeHeading = headings[0];
    getLinkByHeading(activeHeading).classList.add(activeClass);

    const onScroll = () => {
        const passedHeadings = [];
        for (const h of headings) {
            // 5 px as a buffer
            if (getOffsetTop(h) < 5) {
                passedHeadings.push(h)
            } else {
                break;
            }
        }
        if (passedHeadings.length > 0) {
            newActiveHeading = passedHeadings[passedHeadings.length - 1];
        } else {
            newActiveHeading = headings[0];
        }
        if (activeHeading != newActiveHeading) {
            getLinkByHeading(activeHeading).classList.remove(activeClass);
            activeHeading = newActiveHeading;
            getLinkByHeading(activeHeading).classList.add(activeClass);
        }
    }

    const scrollListener = () => {
        onScroll();
    }
    window.addEventListener('scroll', scrollListener, false);
    scrollListeners.push(scrollListener)

    function getLinkByHeading(heading) {
        const id = encodeURI(heading.getAttribute('id')).toLowerCase();
        return document.querySelector(`.toc ul li a[href="#${id}"]`);
    }

    function getOffsetTop(heading) {
        if (!heading.getClientRects().length) {
            return 0;
        }
        let rect = heading.getBoundingClientRect();
        return rect.top
    }
};

document.addEventListener("DOMContentLoaded", (event) => {
    setupToc();
});
