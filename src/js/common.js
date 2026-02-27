/**
 * Dwarkesh Construction – Global Components & Animations
 * Mobile Menu | WhatsApp | Back-to-Top | Scroll Reveal | Parallax | Counters | Navbar Shrink
 */
(function () {
    'use strict';

    /* ═══════════════════════════════════════════════════
       INJECT GLOBAL CSS
    ═══════════════════════════════════════════════════ */
    var style = document.createElement('style');
    style.textContent = `
        /* Scroll progress bar */
        #dwk-progress { position:fixed;top:0;left:0;width:0;height:3px;background:linear-gradient(90deg,#e09f3e,#f5c96e);z-index:9999;transition:width 0.1s linear;pointer-events:none; }
        /* Reveal animations */
        .dwk-reveal { opacity:0;transform:translateY(36px);transition:opacity 0.65s ease,transform 0.65s ease; }
        .dwk-reveal.dwk-visible { opacity:1;transform:none; }
        .dwk-reveal.dwk-from-left  { transform:translateX(-48px); }
        .dwk-reveal.dwk-from-right { transform:translateX(48px); }
        .dwk-reveal.dwk-scale      { transform:scale(0.88); }
        /* Stagger */
        .dwk-stagger > * { opacity:0;transform:translateY(28px);transition:opacity 0.5s ease,transform 0.5s ease; }
        .dwk-stagger.dwk-visible > *:nth-child(1){opacity:1;transform:none;transition-delay:0s;}
        .dwk-stagger.dwk-visible > *:nth-child(2){opacity:1;transform:none;transition-delay:0.12s;}
        .dwk-stagger.dwk-visible > *:nth-child(3){opacity:1;transform:none;transition-delay:0.24s;}
        .dwk-stagger.dwk-visible > *:nth-child(4){opacity:1;transform:none;transition-delay:0.36s;}
        .dwk-stagger.dwk-visible > *:nth-child(5){opacity:1;transform:none;transition-delay:0.48s;}
        .dwk-stagger.dwk-visible > *:nth-child(6){opacity:1;transform:none;transition-delay:0.60s;}
        /* WhatsApp pulse */
        @keyframes dwk-pulse { 0%{box-shadow:0 0 0 0 rgba(37,211,102,0.6);} 70%{box-shadow:0 0 0 14px rgba(37,211,102,0);} 100%{box-shadow:0 0 0 0 rgba(37,211,102,0);} }
        #dwk-whatsapp { animation:dwk-pulse 2.5s infinite; transition:transform 0.2s ease; }
        #dwk-whatsapp:hover { transform:scale(1.12); }
        #dwk-back-top { transition:opacity 0.3s ease,transform 0.2s ease; }
        #dwk-back-top:hover { transform:scale(1.1) translateY(-2px); }
        /* Mobile menu */
        #dwk-mobile-menu { transition:opacity 0.3s ease; }
        #dwk-mobile-menu.dwk-open { display:flex!important; }
        #dwk-mobile-menu a { transition:color 0.2s,letter-spacing 0.2s; }
        #dwk-mobile-menu a:hover { color:#e09f3e!important; letter-spacing:0.05em; }
        /* Hero parallax */
        .dwk-parallax { will-change:transform; }
        /* Counter glow */
        @keyframes dwk-count-in { from{opacity:0;transform:translateY(6px);} to{opacity:1;transform:none;} }
        .dwk-counted { animation:dwk-count-in 0.35s ease; }
    `;
    document.head.appendChild(style);

    /* ═══════════════════════════════════════════════════
       SCROLL PROGRESS BAR (all pages)
    ═══════════════════════════════════════════════════ */
    var prog = document.createElement('div');
    prog.id = 'dwk-progress';
    document.body.prepend(prog);
    window.addEventListener('scroll', function () {
        var pct = (window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)) * 100;
        prog.style.width = Math.min(pct, 100) + '%';
    }, { passive: true });

    /* ═══════════════════════════════════════════════════
       SCROLL REVEAL via IntersectionObserver (all pages)
    ═══════════════════════════════════════════════════ */
    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) {
                e.target.classList.add('dwk-visible');
                e.target.querySelectorAll('[data-counter]').forEach(runCounter);
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    // Auto-tag elements for reveal (sections, headings, cards)
    function tagForReveal() {
        var skip = ['header', 'footer', 'script', 'style', 'nav', '#dwk-mobile-menu', '#dwk-progress'];
        var skipSel = skip.join(',');

        // Sections
        document.querySelectorAll('main section, main > div').forEach(function (el) {
            if (!el.closest(skipSel) && !el.classList.contains('dwk-reveal')) {
                el.classList.add('dwk-reveal');
                io.observe(el);
            }
        });

        // Headings
        document.querySelectorAll('h2, h3').forEach(function (el) {
            if (!el.closest(skipSel) && !el.classList.contains('dwk-reveal')) {
                el.classList.add('dwk-reveal');
                io.observe(el);
            }
        });

        // Cards / rounded boxes
        document.querySelectorAll('[class*="rounded-xl"],[class*="rounded-2xl"],[class*="rounded-3xl"]').forEach(function (el) {
            if (!el.closest(skipSel) && !el.classList.contains('dwk-reveal') && !el.classList.contains('stagger-children') && !el.closest('#dwk-mobile-menu')) {
                el.classList.add('dwk-reveal');
                io.observe(el);
            }
        });

        // Existing stagger-children classes
        document.querySelectorAll('.stagger-children').forEach(function (el) {
            el.classList.add('dwk-stagger');
            io.observe(el);
        });

        // Hero content – already has .reveal class on index.html
        document.querySelectorAll('.reveal:not(.dwk-reveal)').forEach(function (el) {
            el.classList.add('dwk-reveal');
            io.observe(el);
        });
    }

    // Run after DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tagForReveal);
    } else {
        tagForReveal();
    }

    /* ═══════════════════════════════════════════════════
       ANIMATED COUNTERS
    ═══════════════════════════════════════════════════ */
    function runCounter(el) {
        if (el.dataset.counted) return;
        el.dataset.counted = '1';
        var target = parseInt(el.dataset.counter, 10);
        var suffix = el.dataset.suffix || '';
        var start = 0;
        var duration = 1400;
        var steps = 60;
        var inc = target / steps;
        var timer = setInterval(function () {
            start += inc;
            if (start >= target) {
                start = target;
                clearInterval(timer);
                el.classList.add('dwk-counted');
            }
            el.textContent = Math.floor(start) + suffix;
        }, duration / steps);
    }

    /* ═══════════════════════════════════════════════════
       HERO PARALLAX (auto-detect hero bg)
    ═══════════════════════════════════════════════════ */
    var heroBg = document.querySelector('#hero-bg')
        || document.querySelector('section [style*="background-image"]')
        || document.querySelector('.absolute.inset-0[style*="background"]');
    if (heroBg) {
        heroBg.classList.add('dwk-parallax');
        window.addEventListener('scroll', function () {
            if (window.scrollY < window.innerHeight * 1.2) {
                heroBg.style.transform = 'translateY(' + (window.scrollY * 0.3) + 'px)';
            }
        }, { passive: true });
    }

    /* ═══════════════════════════════════════════════════
       NAVBAR SHRINK on scroll
    ═══════════════════════════════════════════════════ */
    var header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (!header) return;
        if (window.scrollY > 60) {
            header.style.paddingTop = '0.5rem';
            header.style.paddingBottom = '0.5rem';
        } else {
            header.style.paddingTop = '';
            header.style.paddingBottom = '';
        }
    }, { passive: true });

    /* Active link highlight (desktop nav) */
    var curPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('header nav a[href]').forEach(function (a) {
        if (a.getAttribute('href') === curPage) {
            a.classList.add('text-primary');
        }
    });

    /* 3D tilt on cards */
    document.querySelectorAll('.group').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var r = card.getBoundingClientRect();
            var x = ((e.clientX - r.left) / r.width - 0.5) * 8;
            var y = ((e.clientY - r.top) / r.height - 0.5) * -8;
            card.style.transform = 'rotateY(' + x + 'deg) rotateX(' + y + 'deg) translateY(-3px)';
            card.style.transition = 'transform 0.08s ease';
        });
        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
            card.style.transition = 'transform 0.4s ease';
        });
    });

    /* ═══════════════════════════════════════════════════
       MOBILE MENU OVERLAY
    ═══════════════════════════════════════════════════ */
    var menuEl = document.createElement('div');
    menuEl.id = 'dwk-mobile-menu';
    menuEl.setAttribute('role', 'dialog');
    menuEl.setAttribute('aria-modal', 'true');
    menuEl.style.cssText = [
        'display:none',
        'position:fixed',
        'inset:0',
        'z-index:9998',
        'flex-direction:column',
        'align-items:center',
        'justify-content:center',
        'gap:2rem',
        'padding:2rem',
        'background:rgba(32,26,18,0.97)',
        'backdrop-filter:blur(14px)'
    ].join(';');

    menuEl.innerHTML = [
        '<button id="dwk-mobile-close" aria-label="Close menu" style="position:absolute;top:1.25rem;right:1.25rem;background:none;border:none;color:white;cursor:pointer;padding:0.5rem;border-radius:50%;transition:background 0.2s;" onmouseover="this.style.background=\'rgba(224,159,62,0.2)\'" onmouseout="this.style.background=\'none\'">',
        '  <span class="material-symbols-outlined" style="font-size:2.25rem;">close</span>',
        '</button>',
        '<div style="text-align:center;margin-bottom:0.5rem;">',
        '  <span class="material-symbols-outlined" style="font-size:2.5rem;color:#e09f3e;">architecture</span>',
        '  <p style="color:#e09f3e;font-weight:900;font-size:1rem;letter-spacing:0.08em;margin-top:0.2rem;">DWARKESH CONSTRUCTION</p>',
        '</div>',
        '<nav style="display:flex;flex-direction:column;align-items:center;gap:1.25rem;text-align:center;">',
        '  <a href="index.html"    style="color:white;font-size:1.6rem;font-weight:900;text-decoration:none;">Home</a>',
        '  <a href="about.html"   style="color:white;font-size:1.6rem;font-weight:900;text-decoration:none;">About</a>',
        '  <a href="services.html" style="color:white;font-size:1.6rem;font-weight:900;text-decoration:none;">Services</a>',
        '  <a href="portfolio.html" style="color:white;font-size:1.6rem;font-weight:900;text-decoration:none;">Projects</a>',
        '  <a href="contactus.html" style="color:white;font-size:1.6rem;font-weight:900;text-decoration:none;">Contact</a>',
        '</nav>',
        '<a href="contactus.html" style="background:#e09f3e;color:#201a12;font-weight:900;padding:0.85rem 2.5rem;border-radius:0.75rem;font-size:1rem;text-decoration:none;letter-spacing:0.04em;margin-top:0.5rem;">Get a Quote</a>'
    ].join('');

    document.body.appendChild(menuEl);

    /* Highlight current page in mobile menu */
    menuEl.querySelectorAll('nav a[href]').forEach(function (a) {
        if (a.getAttribute('href') === curPage) a.style.color = '#e09f3e';
    });

    function openMenu() {
        menuEl.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(function () { menuEl.style.opacity = '1'; }, 10);
    }
    function closeMenu() {
        menuEl.style.opacity = '0';
        setTimeout(function () {
            menuEl.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }

    /* Find hamburger – by id first, then by menu icon text */
    var hamburger = document.getElementById('dwk-hamburger');
    if (!hamburger) {
        /* Fallback: find any element containing the text "menu" in material icons */
        document.querySelectorAll('[class*="material-symbols"]').forEach(function (span) {
            if (span.textContent.trim() === 'menu') {
                hamburger = span.closest('button') || span.closest('div') || span.parentElement;
            }
        });
    }

    if (hamburger) {
        hamburger.style.cursor = 'pointer';
        hamburger.addEventListener('click', openMenu);
    }

    var closeBtn = document.getElementById('dwk-mobile-close');
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    menuEl.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMenu);
    });

    /* Close on Escape key */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });

    /* ═══════════════════════════════════════════════════
       WHATSAPP FLOATING BUTTON
    ═══════════════════════════════════════════════════ */
    var waBtn = document.createElement('a');
    waBtn.id = 'dwk-whatsapp';
    waBtn.href = 'https://wa.me/919825344756?text=Hi%20Dwarkesh%20Construction%2C%20I%20am%20interested%20in%20your%20construction%20services.';
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';
    waBtn.title = 'Chat on WhatsApp';
    waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    waBtn.style.cssText = 'position:fixed;bottom:6rem;right:1.5rem;z-index:9990;background:#25d366;color:white;width:3.5rem;height:3.5rem;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 28px rgba(37,211,102,0.45);text-decoration:none;';
    waBtn.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
    document.body.appendChild(waBtn);

    /* ═══════════════════════════════════════════════════
       BACK-TO-TOP BUTTON
    ═══════════════════════════════════════════════════ */
    var topBtn = document.createElement('button');
    topBtn.id = 'dwk-back-top';
    topBtn.title = 'Back to top';
    topBtn.setAttribute('aria-label', 'Back to top');
    topBtn.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;z-index:9990;background:#e09f3e;color:#201a12;width:3.5rem;height:3.5rem;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(224,159,62,0.4);border:none;cursor:pointer;opacity:0;pointer-events:none;';
    topBtn.innerHTML = '<span class="material-symbols-outlined" style="font-size:1.75rem;">keyboard_arrow_up</span>';
    document.body.appendChild(topBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 320) {
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
