// Création des étoiles scintillantes en arrière-plan
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.appendChild(starsContainer);

    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1; // 1 à 4px
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Création des étoiles filantes
function createShootingStars() {
    setInterval(() => {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        // Position horizontale de départ aléatoire
        const startX = Math.random() * 100;
        star.style.setProperty('--start-x', startX + '%');
        // Durée de chute aléatoire
        const duration = Math.random() * 3 + 2; // 2 à 5 secondes
        star.style.setProperty('--duration', duration + 's');
        // Taille aléatoire
        const size = Math.random() * 3 + 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        document.body.appendChild(star);

        // Supprimer l'élément après l'animation pour éviter l'accumulation
        setTimeout(() => {
            star.remove();
        }, duration * 1000);
    }, 500); // Nouvelle étoile toutes les 500ms
}

// Lancer au chargement de la page
window.addEventListener('load', () => {
    createStars();
    createShootingStars();
});
