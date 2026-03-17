const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Gestion du CORS pour que ton site puisse appeler l'API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { nom, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'danielarinosy@gmail.com',
            pass: 'stgktftkixgffils' // Ton mot de passe d'application
        }
    });

    try {
        await transporter.sendMail({
            from: 'danielarinosy@gmail.com',
            to: 'danielarinosy@gmail.com',
            replyTo: email,
            subject: `Contact MSD - ${nom}`,
            text: `Nom: ${nom}\nEmail: ${email}\n\nMessage: ${message}`
        });
        return res.status(200).json({ message: "Succès" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
