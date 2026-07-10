// =================================================================
// MOBILE MENU
// =================================================================
document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.querySelector(".jago-mobile-header .jago-menu-toggle");
    const mobileMenu = document.querySelector(".jago-mobile-menu");
    const closeBtn = document.querySelector(".mobile-close");

    const desktopMenu = document.querySelector(".jago-nav-links");
    const mobileGrid = document.querySelector(".mobile-menu-grid");

    /* ---------- OPEN ---------- */

    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener("click", function () {

            mobileMenu.classList.add("open");
            document.body.style.overflow = "hidden";

        });

    }

    /* ---------- CLOSE ---------- */

    if (closeBtn && mobileMenu) {

        closeBtn.addEventListener("click", function () {

            mobileMenu.classList.remove("open");
            document.body.style.overflow = "";

        });

    }

    /* ---------- BUILD MOBILE MENU ---------- */

    if (desktopMenu && mobileGrid) {

        mobileGrid.innerHTML = "";

        desktopMenu.querySelectorAll(":scope>li").forEach(function (item) {

            if (item.classList.contains("active")) return;

            const firstLink = item.querySelector(":scope>a");

            if (!firstLink) return;

            const cell = document.createElement("div");
            cell.className = "mobile-menu-item";

            const newLink = document.createElement("a");
            newLink.href = firstLink.getAttribute("href") || "#";
            newLink.textContent = firstLink.childNodes[0].textContent.trim();

            cell.appendChild(newLink);

            const submenu = item.querySelector(".dropdown-submenu,.mega-dropdown-menu");

            if (submenu) {

                cell.classList.add("has-child");

                const child = document.createElement("div");
                child.className = "mobile-child-menu";

                submenu.querySelectorAll("a").forEach(function (a) {

                    const ca = document.createElement("a");
                    ca.href = a.href;
                    ca.innerHTML = a.innerHTML;
                    child.appendChild(ca);

                });

                cell.appendChild(child);

                newLink.addEventListener("click", function (e) {

                    e.preventDefault();
                    cell.classList.toggle("open");

                });

            }

            mobileGrid.appendChild(cell);

        });

    }

});


/* ================= PHOTO GALLERY SECTION - CAROUSEL JS START ================= */
/* Wrapped in DOMContentLoaded so it works regardless of script load order.
   Also force-overrides loading="lazy" on carousel images at runtime — this
   defends against a CMS/template layer that auto-injects lazy-loading on
   every <img> tag site-wide, which is why the attribute keeps reappearing
   even after manually removing it from the HTML each time. */
document.addEventListener("DOMContentLoaded", function () {
    var carousel = document.getElementById('photoCarousel');
    if (!carousel) return;

    var track = carousel.querySelector('.carousel-track');
    var items = carousel.querySelectorAll('.carousel-item');
    var prevBtn = carousel.querySelector('.carousel-arrow-left');
    var nextBtn = carousel.querySelector('.carousel-arrow-right');
    var total = items.length;
    var index = 0;

    if (!track || total === 0) return;

    // --- FAILSAFE: force every slide image to load immediately ---
    items.forEach(function (item) {
        var img = item.querySelector('img');
        if (!img) return;
        img.loading = 'eager';   // overrides lazy attribute regardless of source
        img.decoding = 'sync';
        // If the browser already deferred it and it's not loaded/broken, re-trigger a fetch
        if (!img.complete || img.naturalWidth === 0) {
            var src = img.src;
            img.src = '';
            img.src = src;
        }
    });

    function goTo(i) {
        index = (i + total) % total;
        track.style.transform = 'translateX(' + (-index * 100) + '%)';
        items.forEach(function (item, idx) {
            item.classList.toggle('active', idx === index);
        });
    }

    if (prevBtn) prevBtn.addEventListener('click', function (e) {
        e.preventDefault();
        goTo(index - 1);
        restartAutoplay();
    });
    if (nextBtn) nextBtn.addEventListener('click', function (e) {
        e.preventDefault();
        goTo(index + 1);
        restartAutoplay();
    });

    var startX;
    track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
        var endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) { goTo(index + 1); restartAutoplay(); }
        else if (endX - startX > 50) { goTo(index - 1); restartAutoplay(); }
    }, { passive: true });

    // --- Auto sliding ---
    var AUTOPLAY_DELAY = 4000; // ms between auto slides; set to 0 to disable
    var autoplayTimer = null;

    function startAutoplay() {
        if (AUTOPLAY_DELAY > 0) {
            autoplayTimer = setInterval(function () { goTo(index + 1); }, AUTOPLAY_DELAY);
        }
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Pause while the user is interacting with the carousel
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    carousel.addEventListener('touchstart', stopAutoplay, { passive: true });
    carousel.addEventListener('touchend', function () {
        // small delay so a swipe's own restartAutoplay() call above isn't immediately cancelled
        setTimeout(startAutoplay, 100);
    }, { passive: true });

    goTo(0);
    startAutoplay();
});
/* ================= PHOTO GALLERY SECTION - CAROUSEL JS END ================= */