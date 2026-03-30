/*
 * TECH PRO UNI SOLUTIONS - Optimization Engine v5.1
 * Optimized for PageSpeed & Ghana Network Performance
 */

(function() {
    const BRAND = "TECH PRO UNI SOLUTIONS";
    const PRIMARY_BLUE = "#004aad"; 
    const YEAR = "2026";
    const targetRegex = /LiteSpot|Templateify|SURE\s?BET\s?24\/7|Piki\s?Templates|AladdynKing/gi;

    // 1. Inject Styles ONCE (Optimized to prevent Layout Shift)
    function injectStyles() {
        if (document.getElementById('techpro-styles')) return;
        const style = document.createElement('style');
        style.id = 'techpro-styles';
        style.innerHTML = `
            :root { --main-color: ${PRIMARY_BLUE} !important; --button-bg: ${PRIMARY_BLUE} !important; }
            .blog-title, .blog-title a { color: ${PRIMARY_BLUE} !important; font-family: 'Raleway', sans-serif !important; font-weight: 800 !important; text-transform: uppercase; }
            .entry-category, .btn, .button, #back-top, .ticker-nav a { background: ${PRIMARY_BLUE} !important; color: #fff !important; }
            .footer-copyright, .footerbar { min-height: 50px; } /* Prevent footer jump */
        `;
        document.head.appendChild(style);
    }

    // 2. Optimized Text & Image Scrubber
    function cleanContent(rootNode) {
        // Scrub Text
        const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue.match(targetRegex)) {
                node.nodeValue = node.nodeValue.replace(targetRegex, BRAND);
            }
        }

        // Optimize Images (Only those not already processed)
        rootNode.querySelectorAll('img:not([data-opt])').forEach(img => {
            img.setAttribute('loading', 'lazy');
            img.setAttribute('data-opt', 'true');
            let src = img.getAttribute('src');
            if (src && src.includes('blogspot.com') && !src.includes('-rw')) {
                img.setAttribute('src', src.replace(/\/s[0-9]+(-c)?\//, '/s1600-rw/'));
            }
        });

        // Fixed Footer
        const footer = document.querySelector('.footer-copyright, #footer-copyright');
        if (footer && !footer.hasAttribute('data-fixed')) {
            footer.innerHTML = `Copyright © ${YEAR} ${BRAND}. All Rights Reserved.`;
            footer.setAttribute('data-fixed', 'true');
        }
    }

    // 3. Execution Logic
    injectStyles();
    
    // Run once when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => cleanContent(document.body));
    } else {
        cleanContent(document.body);
    }

    // 4. MutationObserver: Replaces the slow setInterval
    // This watches for new widgets/ads loading and cleans them instantly
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) cleanContent(node);
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    console.log("TECH PRO UNI SOLUTIONS: Performance Engine v5.1 Active");
})();
