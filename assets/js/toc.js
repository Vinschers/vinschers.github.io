function setupToc() {
    const toc = document.querySelector('.toc');
    if (!toc) return;

    const headings = Array.from(document.querySelectorAll('h1[id], h2[id], h3[id], h4[id]'));
    if (headings.length === 0) return;

    const idToLink = new Map();
    document.querySelectorAll('.toc a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            idToLink.set(href.substring(1), link);
        }
    });

    let activeLink = null;

    function onScroll() {
        const scrollPos = window.scrollY || document.documentElement.scrollTop;
        
        const headerOffset = window.innerHeight / 2;

        let currentHeading = null;
        
        for (let i = 0; i < headings.length; i++) {
            const heading = headings[i];
            const headingTop = heading.getBoundingClientRect().top + scrollPos;
            
            // Checks if the heading is above the middle of the screen
            if (headingTop - headerOffset <= scrollPos) {
                currentHeading = heading;
            } else {
                break;
            }
        }

        if (currentHeading) {
            const id = currentHeading.getAttribute('id');
            const newActiveLink = idToLink.get(id);

            if (newActiveLink !== activeLink) {
                if (activeLink) activeLink.classList.remove('active');
                if (newActiveLink) newActiveLink.classList.add('active');
                activeLink = newActiveLink;
            }
        } else {
            if (activeLink) {
                activeLink.classList.remove('active');
                activeLink = null;
            }
        }
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                onScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Also update on resize, since screen height changes
    window.addEventListener('resize', onScroll);

    onScroll();
}

document.addEventListener("DOMContentLoaded", () => {
    setupToc();
});
