// api/sendEmail.js

res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'POST');

const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { receiver, amount, gcashName, gcashNumber, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'medhyve0410@gmail.com', // Replace with your Gmail email address
        pass: 'v8X2+7B*.7Q^', // Replace with your Gmail email password or App Password
      }
    });

    const info = await transporter.sendMail({
      from: 'medhyve0410@gmail.com',
      to: 'catayoc.allanbrando@gmail.com',
      subject: 'New Withdrawal Form Submission',
      html: `
        <h1>New Withdrawal Form Submission</h1>
        <p><strong>Receiver:</strong> ${receiver}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>GCash Name:</strong> ${gcashName}</p>
        <p><strong>GCash Number:</strong> ${gcashNumber}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


