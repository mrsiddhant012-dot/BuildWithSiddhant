document.addEventListener("DOMContentLoaded", () => {

    /* Scroll reveal */
    const revealElements = document.querySelectorAll(
        ".section, .card, .about, .contact"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });


    /* Active navigation link */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        link.classList.remove("active");
                    });

                    const activeLink = document.querySelector(
                        `.nav-links a[href="#${entry.target.id}"]`
                    );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }
                }
            });
        },
        {
            threshold: 0.45
        }
    );

    sections.forEach((section) => {
        navObserver.observe(section);
    });


    /* Card tilt effect — desktop only */
    if (window.matchMedia("(min-width: 851px)").matches) {

        document.querySelectorAll(".card").forEach((card) => {

            card.addEventListener("mousemove", (event) => {

                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const rotateX =
                    ((y / rect.height) - 0.5) * -5;

                const rotateY =
                    ((x / rect.width) - 0.5) * 5;

                card.style.transform =
                    `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }

});
