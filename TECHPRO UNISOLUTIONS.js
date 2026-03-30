/*
 * TECH PRO UNI SOLUTIONS - Site Engine v4.0
 * Location: Ghana | Author: owusuamankwahjohnson-bit
 * Function: Professional Branding, PageSpeed, and AdSense Preparation
 */

(function() {
    const BRAND_NAME = "TECH PRO UNI SOLUTIONS";
    const PRIMARY_COLOR = "#004aad"; // Deep Professional Tech Blue
    const ACCENT_COLOR = "#00d2ff";  // Modern Cyan Accent
    const YEAR = "2026";

    function applyProfessionalStyling() {
        // 1. INJECT PROFESSIONAL COLORS (Overriding XML defaults)
        const style = document.createElement('style');
        style.innerHTML = `
            :root {
                --main-color: ${PRIMARY_COLOR} !important;
                --button-bg: ${PRIMARY_COLOR} !important;
                --title-hover-color: ${ACCENT_COLOR} !important;
            }
            /* Header and Brand Bar */
            .header-header { border-bottom: 3px solid ${PRIMARY_COLOR} !important; }
            .main-logo .blog-title, .main-logo .blog-title a { color: ${PRIMARY_COLOR} !important; font-weight: 800 !important; text-transform: uppercase; }
            
            /* Buttons and Categories */
            .entry-category, .btn, .button, #back-top, .ticker .widget-title .title { 
                background-color: ${PRIMARY_COLOR} !important; 
                color: #ffffff !important; 
                border-radius: 4px !important;
                transition: 0.3s ease;
            }
            .btn:hover, .button:hover { background-color: ${ACCENT_COLOR} !important; }
            
            /* Links and Post Style */
            a { color: ${PRIMARY_COLOR}; }
            .entry-title a:hover { color: ${ACCENT_COLOR} !important; }
            
            /* AdSense Safe UI */
            .error-msg, .queryEmpty { border: 1px solid #eee; background: #f9f9f9; padding: 20px; border-radius: 8px; }
        `;
        document.head.appendChild(style);

        // 2. SCRUB ALL OLD NAMES (LiteSpot, Templateify, Sure Bet)
        function scrubText() {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
            let node;
            const targetNames = /LiteSpot|Templateify|SURE\s?BET\s?24\/7|Piki\s?Templates|SureBet/gi;
            
            while (node = walker.nextNode()) {
                if (node.nodeValue.match(targetNames)) {
                    node.nodeValue = node.nodeValue.replace(targetNames, BRAND_NAME);
                }
            }
            
            // Fix Browser Tab Title
            if (document.title.match(targetNames)) {
                document.title = document.title.replace(targetNames, BRAND_NAME);
            }
        }

        // 3. PAGESPEED: CONVERT IMAGES TO WEBP & ENFORCE LAZY LOADING
        document.querySelectorAll('img').forEach(img => {
            img.setAttribute('loading', 'lazy');
            let src = img.getAttribute('src');
            if (src && src.includes('blogspot.com')) {
                // Blogger -rw parameter forces WebP images for faster loading in Ghana
                if (!src.includes('-rw')) {
                    img.setAttribute('src', src.replace(/\/s[0-9]+(-c)?\//, '/s1600-rw/'));
                }
            }
        });

        // 4. STANDARDIZE FOOTER COPYRIGHT
        const footerText = document.querySelector('.footer-copyright, #footer-copyright, .copyright-text');
        if (footerText) {
            footerText.innerHTML = `Copyright © ${YEAR} <a href="/">${BRAND_NAME}</a>. All Rights Reserved.`;
        }

        scrubText();
    }

    // Run immediately
    applyProfessionalStyling();

    // Run again after 3 seconds to catch widgets that load late
    setTimeout(applyProfessionalStyling, 3000);
    
    // Log for verification
    console.log(BRAND_NAME + " Optimization Loaded Successfully.");
})();
