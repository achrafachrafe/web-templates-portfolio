
document.addEventListener("DOMContentLoaded", () => {
    // Mobile navigation
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const menuIcon = menuToggle.querySelector("i");

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuIcon.classList.toggle("fa-bars", !isOpen);
        menuIcon.classList.toggle("fa-xmark", isOpen);
    });

    // Close the menu when clicking a navigation link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        });
    });

    // Header shadow on scroll
    const header = document.getElementById("header");

    function updateHeader() {
        header.classList.toggle("scrolled", window.scrollY > 20);
    }

    window.addEventListener("scroll", updateHeader);
    updateHeader();

    // Portfolio filtering
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            projectCards.forEach(card => {
                const matches =
                    filter === "all" ||
                    card.dataset.category === filter;

                card.classList.toggle("hidden", !matches);
            });
        });
    });

    // Automatic footer year
    document.getElementById("year").textContent =
        new Date().getFullYear();

    // Contact form: open the visitor's email application
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value.trim();

        // Replace with your real email address
        const recipient = "hello@example.com";

        const emailSubject = encodeURIComponent(
            `${subject} - Message from ${name}`
        );

        const emailBody = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Project: ${subject}\n\n` +
            `Message:\n${message}`
        );

        formStatus.textContent =
            "Opening your email application...";

        window.location.href =
            `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
    });
});
