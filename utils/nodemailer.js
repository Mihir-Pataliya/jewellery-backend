const mailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        user: "mihirpataliya11@gmail.com",
        pass: "kdkz xtwm xqzz hoas" 
      }
    });

    const mailOptions = {
      from: 'mihirpataliya11@gmail.com',
      to: to,
      subject: subject,
      text: text
      
  };

    const info = await transporter.sendMail(mailOptions); 
    console.log("Email sent:", info.response);
    return info;

  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
