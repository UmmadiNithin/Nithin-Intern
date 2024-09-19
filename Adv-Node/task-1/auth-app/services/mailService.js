const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nithinmoonu@gmail.com',
        pass: 'tmtr merv gijt rgmg'
    }
});

const sendLoginMail = async (userEmail) => {
    try {
        await transporter.sendMail({
            from: '"My App" <your_email@gmail.com>',
            to: userEmail,
            subject: 'Login Notification',
            text: `Hello, you've successfully logged in!`,
        });
        console.log('Email sent to:', userEmail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendLoginMail };
