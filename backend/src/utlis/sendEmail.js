const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

const run = async (subject, body, toEmailId) => {
  try {
    const info = await transporter.sendMail({
      from: `"CODEMATE" <${process.env.EMAIL_USER}>`,
      to: 'bittu26346@gmail.com',
      subject: subject,
      text: "This is the text format email",
      html: `<h1>${body}</h1>`,
    });

    return info;
  } catch (err) {
    console.error("Email error:", err);
    throw err;
  }
};

module.exports = { run };
