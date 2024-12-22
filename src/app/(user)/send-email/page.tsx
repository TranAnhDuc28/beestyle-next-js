import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'Gmail',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, email, phone, message: msg } = req.body;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'anhvd2602@gmail.com',
            subject: 'New Contact Form Submission',
            html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Message: ${msg}</p>
      `,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Failed to send email.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed.' });
    }
}
