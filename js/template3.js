
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

/* Scroll reveal */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
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
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(target * progress);

            counter.textContent = value;

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

/* Appointment form demo */
const form = document.getElementById("appointmentForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    formMessage.textContent =
        "Demande enregistrée pour cette démonstration.";

    form.reset();
});
