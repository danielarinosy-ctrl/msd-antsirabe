const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Configuration CORS pour autoriser ton site GitHub Pages
app.use(cors());
app.use(bodyParser.json());

// Configuration SMTP pour Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'danielarinosy@gmail.com',
        // Utilisation de ton mot de passe d'application direct pour le test
        pass: 'stgk tftk ixgf fils' 
    }
});

// Route pour l'envoi de l'email
app.post('/send-email', (req, res) => {
    const { nom, email, message } = req.body;

    const mailOptions = {
        from: 'danielarinosy@gmail.com', 
        to: 'danielarinosy@gmail.com',   
        replyTo: email,                  
        subject: `MSD Antsirabe : Message de ${nom}`,
        text: `Nom: ${nom}\nEmail du visiteur: ${email}\n\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("❌ Erreur SMTP :", error);
            return res.status(500).json({ error: error.message });
        }
        console.log('✅ Email envoyé avec succès !');
        res.status(200).json({ message: "Succès" });
    });
});

// MODIFICATION ICI : process.env.PORT est requis pour le déploiement (Render, Heroku, etc.)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`
    ===========================================
    🚀 SERVEUR SMTP MSD EN LIGNE
    📧 Email : danielarinosy@gmail.com
    🌐 Port : ${PORT}
    ===========================================
    `);
});
