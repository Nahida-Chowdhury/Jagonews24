// =================================================================
// SECTION: MOBILE NAVIGATION TOGGLE ENGINE
// =================================================================
document.addEventListener("DOMContentLoaded", function () {
        var toggleBtn = document.querySelector(".jago-menu-toggle");
        var menuList = document.querySelector(".jago-nav-links");

        if (toggleBtn && menuList) {
            toggleBtn.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Toggle via explicit JavaScript styling to force bypass any styling engines
                if (menuList.classList.contains("open-active")) {
                    menuList.classList.remove("open-active");
                    toggleBtn.classList.remove("open");
                } else {
                    menuList.classList.add("open-active");
                    toggleBtn.classList.add("open");
                }
            });
        }
    });