document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Récupération des données du formulaire
            const formData = {
                nom: document.getElementById('nom').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Affichage de l'état "En cours"
            const btn = contactForm.querySelector('button');
            const originalBtnText = btn.innerText;
            btn.innerText = "Envoi en cours...";
            btn.disabled = true;

            try {
                // APPEL À TON NOUVEAU BACKEND VERCEL
                const response = await fetch('https://msd-antsirabe.vercel.app/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    alert("✅ Message envoyé avec succès !");
                    contactForm.reset();
                } else {
                    throw new Error(result.error || "Erreur lors de l'envoi");
                }
            } catch (error) {
                console.error("Erreur:", error);
                alert("❌ Erreur : " + error.message);
            } finally {
                // Remise à zéro du bouton
                btn.innerText = originalBtnText;
                btn.disabled = false;
            }
        });
    }
});
