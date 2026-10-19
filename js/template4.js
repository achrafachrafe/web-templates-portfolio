
// ========================================
// INFLUENCER PREMIUM 2026
// Main JavaScript
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // 1. Loader
    const loader = document.getElementById("loader");

    function hideLoader() {
        if (loader) {
            loader.classList.add("loaded");
        }
    }

    window.addEventListener("load", hideLoader);

    // Fallback if the load event has already fired
    // or an external image takes too long.
    window.setTimeout(hideLoader, 1800);

    // 2. Current year
    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 3. Mobile navigation
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        if (!menuToggle || !nav) return;

        nav.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.className = "fa-solid fa-bars";
        }
    }

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            const isOpen = nav.classList.toggle("open");

            document.body.classList.toggle("menu-open", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = isOpen
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";
            }
        });

        navLinks.forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 800) {
                closeMenu();
            }
        });
    }

    // 4. Header scroll effect
    const header = document.getElementById("header");

    function updateHeader() {
        if (!header) return;

        header.classList.toggle("scrolled", window.scrollY > 20);
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();

    // 5. Reveal animations
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

    // 6. Animated counters
    const counters = document.querySelectorAll(".counter");

    function animateCounter(element) {
        const target = Number(element.dataset.target);

        if (!Number.isFinite(target)) return;

        const duration = 1400;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            // Smooth ease-out animation
            const easedProgress = 1 - Math.pow(1 - progress, 3);

            element.textContent = Math.round(
                target * easedProgress
            ).toLocaleString("fr-FR");

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.5
            }
        );

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    } else {
        counters.forEach(function (counter) {
            counter.textContent = counter.dataset.target || "0";
        });
    }

    // 7. Portfolio filters
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const filter = button.dataset.filter;

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            portfolioItems.forEach(function (item) {
                const category = item.dataset.category;
                const matches = filter === "all" || category === filter;

                item.classList.toggle("hidden", !matches);
            });
        });
    });

    // 8. Contact form demo
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm && formMessage) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            formMessage.className = "form-message";
            formMessage.textContent = "";

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();

                formMessage.classList.add("error");
                formMessage.textContent =
                    "Veuillez remplir correctement tous les champs obligatoires.";

                return;
            }

            formMessage.classList.add("success");
            formMessage.textContent =
                "Démo uniquement : aucun message n'a été envoyé. " +
                "Connectez un backend ou un service de formulaire pour recevoir les demandes.";

            // This demo does not send or store personal information.
        });
    }

    // 9. Active navigation link while scrolling
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    const sectionId = entry.target.id;

                    navLinks.forEach(function (link) {
                        const isActive =
                            link.getAttribute("href") === "#" + sectionId;

                        link.classList.toggle("active", isActive);
                    });
                });
            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }
});
