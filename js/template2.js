
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

/* Reveal animations */
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
        const duration = 1500;
        const startTime = performance.now();

        function update(now) {
            const progress = Math.min(
                (now - startTime) / duration,
                1
            );

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

/* Consultation form demonstration */
const form = document.getElementById("consultationForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    formMessage.textContent =
        "Votre demande a été validée pour cette démonstration. " +
        "Aucun message n'a été envoyé au cabinet.";

    form.reset();
});
