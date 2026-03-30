/*
 * TECH PRO UNI SOLUTIONS - Optimization Engine v5.2
 * Fixed: Compatibility with Theme Dark Mode & Search
 */

(function() {
    const BRAND = "TECH PRO UNI SOLUTIONS";
    const PRIMARY_BLUE = "#004aad"; 
    const YEAR = "2026";
    const targetRegex = /LiteSpot|Templateify|SURE\s?BET\s?24\/7|Piki\s?Templates|AladdynKing/gi;

    function runOptimization() {
        // 1. Scrub Text (Branding)
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue.match(targetRegex)) {
                node.nodeValue = node.nodeValue.replace(targetRegex, BRAND);
            }
        }

        // 2. Optimize Images
        document.querySelectorAll('img:not([data-opt])').forEach(img => {
            img.setAttribute('loading', 'lazy');
            img.setAttribute('data-opt', 'true');
            let src = img.getAttribute('src');
            if (src && src.includes('blogspot.com') && !src.includes('-rw')) {
                img.setAttribute('src', src.replace(/\/s[0-9]+(-c)?\//, '/s1600-rw/'));
            }
        });

        // 3. Fix Footer Without Breaking Event Listeners
        const footerText = document.querySelector('.footer-copyright, #footer-copyright');
        if (footerText && !footerText.hasAttribute('data-fixed')) {
            footerText.innerHTML = `Copyright © ${YEAR} <a href="/" style="color:inherit;font-weight:bold;">${BRAND}</a>. All Rights Reserved.`;
            footerText.setAttribute('data-fixed', 'true');
        }
    }

    // CSS Injection (Static - does not interfere with JS logic)
    const style = document.createElement('style');
    style.innerHTML = `
        :root { --main-color: ${PRIMARY_BLUE} !important; --button-bg: ${PRIMARY_BLUE} !important; }
        .blog-title, .blog-title a { color: ${PRIMARY_BLUE} !important; font-family: 'Raleway', sans-serif !important; font-weight: 800 !important; }
        .entry-category, .btn, .button, #back-top { background: ${PRIMARY_BLUE} !important; color: #fff !important; }
    `;
    document.head.appendChild(style);

    // Initialization
    if (document.readyState === 'complete') {
        runOptimization();
    } else {
        window.addEventListener('load', runOptimization);
    }

    // Watch for dynamic content (Ads/Widgets)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) runOptimization();
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

})();
