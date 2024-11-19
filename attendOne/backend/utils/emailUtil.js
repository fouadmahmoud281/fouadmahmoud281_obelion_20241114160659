const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'heshamtarek184@gmail.com',
            pass: 'txtgopkiezqtjdym'
        }
    });

    const mailOptions = {
        from: 'Obelion',
        to: to,
        subject: subject,
        text: text,
    };

    await transporter.sendMail(mailOptions);
};
const generateVerificationCode = () => {
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += Math.floor(Math.random() * 10).toString();
    }
    return code;
};


module.exports = {
    sendEmail,
    generateVerificationCode
};