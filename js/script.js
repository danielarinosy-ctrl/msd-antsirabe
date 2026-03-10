document.addEventListener('DOMContentLoaded', () => {
    // Système de détection pour les animations au défilement
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Cibler les éléments à animer
    const elementsToAnimate = document.querySelectorAll('.main-glass-container, .history-card, .footer-card');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal'); // Ajoute la classe de base
        observer.observe(el);       // Commence l'observation
    });
});
