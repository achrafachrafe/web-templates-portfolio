
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // Loader
    const loader = document.getElementById("loader");

    function hideLoader() {
        if (loader) {
            loader.classList.add("loaded");
        }
    }

    window.addEventListener("load", hideLoader);
    window.setTimeout(hideLoader, 1800);

    // Footer year
    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Mobile menu
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        if (!nav || !menuToggle) return;

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
            const open = nav.classList.toggle("open");

            document.body.classList.toggle("menu-open", open);
            menuToggle.setAttribute("aria-expanded", String(open));

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.className = open
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

    // Header scroll effect
    const header = document.getElementById("header");

    function updateHeader() {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 20);
        }
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();

    // Reveal animation
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
            { threshold: 0.12 }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }

    // Animated counters
    const counters = document.querySelectorAll(".counter");

    function animateCounter(element) {
        const target = Number(element.dataset.target);

        if (!Number.isFinite(target)) return;

        const duration = 1400;
        const start = performance.now();

        function update(time) {
            const progress = Math.min((time - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            element.textContent = Math.round(target * ease)
                .toLocaleString("fr-FR");

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
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
            { threshold: 0.5 }
        );

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    } else {
        counters.forEach(function (counter) {
            counter.textContent = counter.dataset.target || "0";
        });
    }

    // Portfolio filters
    const filterButtons = document.querySelectorAll(".filter-btn");
    const workCards = document.querySelectorAll(".work-card");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const filter = button.dataset.filter;

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            workCards.forEach(function (card) {
                const category = card.dataset.category;
                const show = filter === "all" || filter === category;

                card.classList.toggle("hidden", !show);
            });
        });
    });

    // Contact form demonstration
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
                    "Veuillez compléter correctement tous les champs.";
                return;
            }

            formMessage.classList.add("success");
            formMessage.textContent =
                "Démo uniquement : aucun message n'a été envoyé. " +
                "Un backend est nécessaire pour recevoir les demandes.";

            // No personal data is sent or stored by this demo.
        });
    }

    // Active navigation
    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    const id = entry.target.id;

                    navLinks.forEach(function (link) {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + id
                        );
                    });
                });
            },
            { rootMargin: "-35% 0px -55% 0px" }
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }
});
