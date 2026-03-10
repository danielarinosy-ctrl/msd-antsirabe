const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Route de test
app.get('/', (req, res) => {
    res.send('Serveur MSD Backend opérationnel !');
});

app.post('/send-email', async (req, res) => {
    const { nom, email, message } = req.body;

    // CONFIGURATION RADICALE : IP DIRECTE IPV4
    const transporter = nodemailer.createTransport({
        host: "64.233.184.108", // IP directe de smtp.gmail.com
        port: 465,
        secure: true,
        auth: {
            user: 'danielarinosy@gmail.com',
            pass: 'stgktftkixgffils'
        },
        tls: {
            // Obligatoire quand on utilise une IP directe au lieu du nom de domaine
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: 'danielarinosy@gmail.com',
        to: 'danielarinosy@gmail.com',
        replyTo: email,
        subject: `Message de ${nom} (Site MSD)`,
        text: `Nom: ${nom}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        console.log("Tentative d'envoi via IP directe...");
        await transporter.sendMail(mailOptions);
        console.log("✅ Email envoyé !");
        res.status(200).json({ message: "Succès" });
    } catch (error) {
        console.error("❌ Erreur finale:", error.message);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Serveur sur port ${PORT}`);
});
