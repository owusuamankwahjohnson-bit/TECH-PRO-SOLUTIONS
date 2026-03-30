/*
 * TECH PRO UNI SOLUTIONS - Corporate Site Engine
 * Version: 5.0
 * Author: owusuamankwahjohnson-bit
 */

(function() {
    const BRAND = "TECH PRO UNI SOLUTIONS";
    const PRIMARY_BLUE = "#004aad"; // Professional Tech Blue
    const ACCENT_CYAN = "#00d2ff";  // Modern Accent
    const YEAR = "2026";

    function applyLiveCorrections() {
        // 1. INJECT PROFESSIONAL STYLING (The "Catching" Colors)
        const style = document.createElement('style');
        style.innerHTML = `
            :root {
                --main-color: ${PRIMARY_BLUE} !important;
                --button-bg: ${PRIMARY_BLUE} !important;
                --title-hover-color: ${ACCENT_CYAN} !important;
                --keycolor: ${PRIMARY_BLUE} !important;
            }
            /* Header Professional Branding */
            .main-logo .blog-title a, .blog-title { 
                color: ${PRIMARY_BLUE} !important; 
                font-family: 'Raleway', sans-serif !important;
                font-weight: 800 !important;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .header-header { border-bottom: 3px solid ${PRIMARY_BLUE} !important; }
            
            /* Category & Navigation Styling */
            .entry-category, .btn, .button, #back-top, .ticker-nav a, .ticker .widget-title .title { 
                background: ${PRIMARY_BLUE} !important; 
                color: #ffffff !important; 
                border: none !important;
            }
            
            /* AdSense Quick Approval Clean-up */
            .error-msg, .queryEmpty { 
                border: 2px dashed ${PRIMARY_BLUE}; 
                background: rgba(0, 74, 173, 0.05); 
                padding: 30px; 
                text-align: center;
                border-radius: 12px;
            }
        `;
        document.head.appendChild(style);

        // 2. AUTOMATIC BRANDING SCRUBBER
        // Replaces all old template names and demo text with your brand
        const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        const targetRegex = /LiteSpot|Templateify|SURE\s?BET\s?24\/7|Piki\s?Templates|AladdynKing/gi;
        
        while (node = walk.nextNode()) {
            if (node.nodeValue.match(targetRegex)) {
                node.nodeValue = node.nodeValue.replace(targetRegex, BRAND);
            }
        }
        
        // Correct Browser Tab Title
        if (document.title.match(targetRegex)) {
            document.title = document.title.replace(targetRegex, BRAND);
        }

        // 3. PAGESPEED ENFORCEMENT (Ghana Network Optimization)
        document.querySelectorAll('img').forEach(img => {
            img.setAttribute('loading', 'lazy'); // Native Lazy Load
            let src = img.getAttribute('src');
            if (src && src.includes('blogspot.com') && !src.includes('-rw')) {
                // Forces Blogger to serve WebP (-rw) which is 50% smaller/faster
                img.setAttribute('src', src.replace(/\/s[0-9]+(-c)?\//, '/s1600-rw/'));
            }
        });

        // 4. FOOTER & COPYRIGHT FIX
        const footer = document.querySelector('.footer-copyright, #footer-copyright, .footerbar .container');
        if (footer) {
            footer.innerHTML = `<p style="margin:0; padding:10px 0;">Copyright © ${YEAR} <a href="/" style="color:${PRIMARY_BLUE}; font-weight:bold;">${BRAND}</a>. All Rights Reserved.</p>`;
        }
    }

    // Execute multiple times to catch dynamic widgets
    applyLiveCorrections();
    window.addEventListener('DOMContentLoaded', applyLiveCorrections);
    window.addEventListener('load', applyLiveCorrections);
    setInterval(applyLiveCorrections, 3000);

    console.log("TECH PRO UNI SOLUTIONS: Optimization Engine Active.");
})();
