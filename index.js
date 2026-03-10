const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Route de test pour vérifier si le serveur est réveillé
app.get('/', (req, res) => {
    res.send('Serveur MSD Backend opérationnel !');
});

app.post('/send-email', async (req, res) => {
    const { nom, email, message } = req.body;

    // Configuration optimisée pour éviter l'erreur ENETUNREACH sur Render
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Utilise SSL
        auth: {
            user: 'danielarinosy@gmail.com',
            pass: 'stgktftkixgffils' // Ton code de 16 caractères sans espaces
        },
        connectionTimeout: 10000, // 10 secondes
    });

    const mailOptions = {
        from: 'danielarinosy@gmail.com',
        to: 'danielarinosy@gmail.com',
        replyTo: email,
        subject: `Nouveau message de ${nom} (Site MSD)`,
        text: `Expéditeur : ${nom}\nEmail : ${email}\n\nMessage :\n${message}`
    };

    try {
        console.log(`Tentative d'envoi pour ${nom}...`);
        await transporter.sendMail(mailOptions);
        console.log("✅ Email envoyé avec succès !");
        res.status(200).json({ message: "Succès" });
    } catch (error) {
        console.error("❌ Erreur SMTP détaillée:", error);
        res.status(500).json({ 
            message: "Erreur lors de l'envoi", 
            details: error.message 
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
