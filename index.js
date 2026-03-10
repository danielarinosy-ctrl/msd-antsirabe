const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Serveur MSD Backend opérationnel !');
});

app.post('/send-email', async (req, res) => {
    const { nom, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Port 587 utilise STARTTLS
        auth: {
            user: 'danielarinosy@gmail.com',
            pass: 'stgktftkixgffils'
        },
        // FORCE IPV4 ICI
        family: 4 
    });

    const mailOptions = {
        from: 'danielarinosy@gmail.com',
        to: 'danielarinosy@gmail.com',
        replyTo: email,
        subject: `Message de ${nom} (Site MSD)`,
        text: `Nom: ${nom}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email envoyé !");
        res.status(200).json({ message: "Succès" });
    } catch (error) {
        console.error("❌ Erreur:", error.message);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Port ${PORT}`));
