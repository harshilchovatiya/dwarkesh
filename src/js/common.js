/**
 * Dwarkesh Construction – Global UI Components
 * Injects: Mobile Menu | WhatsApp Button | Back-to-Top Button
 */
(function () {

    /* ─────────────────────────────────────────
       1. INJECT CSS
    ───────────────────────────────────────── */
    var style = document.createElement('style');
    style.textContent = `
        #dwk-mobile-menu { transition: opacity 0.3s ease, transform 0.3s ease; }
        #dwk-mobile-menu.hidden { display: none !important; }
        #dwk-mobile-menu a { position: relative; }
        #dwk-mobile-menu a::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:2px; background:#e09f3e; transition:width 0.3s ease; }
        #dwk-mobile-menu a:hover::after { width:100%; }
        #dwk-back-top { transition: opacity 0.3s ease, transform 0.3s ease; }
        #dwk-back-top:hover { transform: scale(1.1) translateY(-2px); }
        #dwk-whatsapp:hover { transform: scale(1.1); }
        #dwk-whatsapp { transition: transform 0.2s ease; }
        @keyframes pulse-ring {
            0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.7); }
            70% { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
            100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
        }
        #dwk-whatsapp { animation: pulse-ring 2.5s infinite; }
    `;
    document.head.appendChild(style);

    /* ─────────────────────────────────────────
       2. MOBILE MENU OVERLAY
    ───────────────────────────────────────── */
    var menuEl = document.createElement('div');
    menuEl.id = 'dwk-mobile-menu';
    menuEl.className = 'hidden fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 px-6';
    menuEl.style.cssText = 'background: rgba(32,26,18,0.97); backdrop-filter: blur(12px);';
    menuEl.innerHTML = `
        <button id="dwk-mobile-close" style="position:absolute;top:1.5rem;right:1.5rem;color:white;background:none;border:none;cursor:pointer;" aria-label="Close menu">
            <span class="material-symbols-outlined" style="font-size:2.5rem;">close</span>
        </button>
        <div style="text-align:center;">
            <span class="material-symbols-outlined" style="font-size:2.5rem;color:#e09f3e;">architecture</span>
            <p style="color:#e09f3e;font-weight:900;font-size:1.1rem;margin-top:0.25rem;letter-spacing:0.05em;">DWARKESH CONSTRUCTION</p>
        </div>
        <nav style="display:flex;flex-direction:column;align-items:center;gap:1.5rem;text-align:center;">
            <a href="index.html" style="color:white;font-size:1.75rem;font-weight:900;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#e09f3e'" onmouseout="this.style.color='white'">Home</a>
            <a href="about.html" style="color:white;font-size:1.75rem;font-weight:900;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#e09f3e'" onmouseout="this.style.color='white'">About</a>
            <a href="services.html" style="color:white;font-size:1.75rem;font-weight:900;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#e09f3e'" onmouseout="this.style.color='white'">Services</a>
            <a href="portfolio.html" style="color:white;font-size:1.75rem;font-weight:900;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#e09f3e'" onmouseout="this.style.color='white'">Projects</a>
            <a href="contactus.html" style="color:white;font-size:1.75rem;font-weight:900;text-decoration:none;transition:color 0.2s;" onmouseover="this.style.color='#e09f3e'" onmouseout="this.style.color='white'">Contact</a>
        </nav>
        <a href="contactus.html" style="background:#e09f3e;color:#201a12;font-weight:900;padding:1rem 2.5rem;border-radius:0.75rem;font-size:1.1rem;text-decoration:none;margin-top:0.5rem;transition:filter 0.2s;" onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter='none'">
            Get a Quote
        </a>
    `;
    document.body.appendChild(menuEl);

    /* Highlight current page in mobile menu */
    var curPage = location.pathname.split('/').pop() || 'index.html';
    menuEl.querySelectorAll('a[href]').forEach(function (a) {
        if (a.getAttribute('href') === curPage) {
            a.style.color = '#e09f3e';
        }
    });

    /* ─────────────────────────────────────────
       3. WHATSAPP FLOATING BUTTON
    ───────────────────────────────────────── */
    var waBtn = document.createElement('a');
    waBtn.id = 'dwk-whatsapp';
    waBtn.href = 'https://wa.me/919825344756?text=Hi%20Dwarkesh%20Construction%2C%20I%20am%20interested%20in%20your%20construction%20services.';
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';
    waBtn.title = 'Chat with us on WhatsApp';
    waBtn.setAttribute('aria-label', 'WhatsApp');
    waBtn.style.cssText = 'position:fixed;bottom:6rem;right:1.5rem;z-index:150;background:#25d366;color:white;width:3.5rem;height:3.5rem;border-radius:9999px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 24px rgba(37,211,102,0.5);text-decoration:none;';
    waBtn.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`;
    document.body.appendChild(waBtn);

    /* ─────────────────────────────────────────
       4. BACK-TO-TOP BUTTON
    ───────────────────────────────────────── */
    var topBtn = document.createElement('button');
    topBtn.id = 'dwk-back-top';
    topBtn.title = 'Back to top';
    topBtn.setAttribute('aria-label', 'Back to top');
    topBtn.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;z-index:150;background:#e09f3e;color:#201a12;width:3.5rem;height:3.5rem;border-radius:9999px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(224,159,62,0.4);border:none;cursor:pointer;opacity:0;pointer-events:none;';
    topBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size:1.75rem;">keyboard_arrow_up</span>`;
    document.body.appendChild(topBtn);

    /* ─────────────────────────────────────────
       5. EVENT LISTENERS
    ───────────────────────────────────────── */

    /* Hamburger → open mobile menu */
    var hamburger = null;
    document.querySelectorAll('button, [role="button"]').forEach(function (b) {
        var icon = b.querySelector('.material-symbols-outlined');
        if (icon && icon.textContent.trim() === 'menu') hamburger = b;
    });

    if (hamburger) {
        hamburger.addEventListener('click', function () {
            menuEl.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    }

    var closeBtn2 = document.getElementById('dwk-mobile-close');
    if (closeBtn2) {
        closeBtn2.addEventListener('click', function () {
            menuEl.classList.add('hidden');
            document.body.style.overflow = '';
        });
    }

    menuEl.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
            menuEl.classList.add('hidden');
            document.body.style.overflow = '';
        });
    });

    /* Back to top scroll listener */
    window.addEventListener('scroll', function () {
        if (window.scrollY > 350) {
            topBtn.style.opacity = '1';
            topBtn.style.pointerEvents = 'auto';
        } else {
            topBtn.style.opacity = '0';
            topBtn.style.pointerEvents = 'none';
        }
    }, { passive: true });

    topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

})();
