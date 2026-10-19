
/* Loader */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 400);
    }, 700);
});

/* Custom cursor */
const cursor = document.querySelector(".cursor");

if (cursor && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });
}

/* Reveal on scroll */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
    revealObserver.observe(element);
});

/* Animated counters */
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);
        const startTime = performance.now();
        const duration = 1500;

        function update(now) {
            const progress = Math.min((now - startTime) / duration, 1);

            counter.textContent = Math.floor(target * progress);

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
        counterObserver.unobserve(counter);
    });
}, {
    threshold: 0.5
});

document.querySelectorAll(".counter").forEach(counter => {
    counterObserver.observe(counter);
});

/* Menu filtering */
const filterButtons = document.querySelectorAll(".filter-btn");
const menuCards = document.querySelectorAll(".menu-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        menuCards.forEach(card => {
            const show =
                filter === "all" ||
                card.dataset.category === filter;

            card.hidden = !show;
        });
    });
});

/* Minimum reservation date: today */
const reservationDate = document.getElementById("reservationDate");

if (reservationDate) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    reservationDate.min = `${year}-${month}-${day}`;
}

/* Reservation form demonstration */
const reservationForm = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");

reservationForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!reservationForm.checkValidity()) {
        reservationForm.reportValidity();
        return;
    }

    formMessage.textContent =
        "Votre demande a été validée dans cette démonstration. " +
        "Aucune réservation réelle n'a été envoyée.";

    reservationForm.reset();
});
