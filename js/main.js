const year = document.getElementById('year');

if (year) {
    year.textContent = String(new Date().getFullYear());
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
    const root = document.documentElement;
    let pointerFrame = 0;

    window.addEventListener('pointermove', (event) => {
        if (pointerFrame) {
            return;
        }

        pointerFrame = window.requestAnimationFrame(() => {
            root.style.setProperty('--mx', `${event.clientX}px`);
            root.style.setProperty('--my', `${event.clientY}px`);
            pointerFrame = 0;
        });
    });

    document.querySelectorAll('.card').forEach((card) => {
        card.addEventListener('pointermove', (event) => {
            const bounds = card.getBoundingClientRect();
            card.style.setProperty('--cx', `${event.clientX - bounds.left}px`);
            card.style.setProperty('--cy', `${event.clientY - bounds.top}px`);
        });
    });
}
