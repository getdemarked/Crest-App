import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, amount, transactionType, uid } = req.body;

    // Create a nodemailer transporter using your email provider settings
    const transporter = nodemailer.createTransport({
      service: "YourEmailProvider",
      auth: {
        user: "your@email.com",
        pass: "yourPassword",
      },
    });

    // Email content
    const mailOptions = {
      from: "your@email.com",
      to: "sales@demarked.io", // Specify the destination email address
      subject: "Cash In / Cash Out Form Submission",
      html: `
        <h2>Name: ${name}</h2>
        <h2>Email: ${email}</h2>
        <h2>Amount: ${amount}</h2>
        <h2>UID: ${uid}</h2>
        <h2>Transaction Type: ${transactionType}</h2>
      `,
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email" });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}
