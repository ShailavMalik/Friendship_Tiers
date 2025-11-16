import nodemailer from "nodemailer";

/**
 * Configure Nodemailer transporter
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  // Set CORS headers
  const allowedOrigins = [
    "https://friendship-tiers.vercel.app",
    "https://friends.shailavmalik.me",
    "http://localhost:3000",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, message, mobile, tier, price } = req.body;

    // Validate required fields
    if (!name || !tier) {
      return res.status(400).json({
        success: false,
        message: "Name and tier are required",
      });
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `🎉 New Friendship Tier Request: ${tier}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: white; margin: 0;">Friendship Offers™</h1>
            <p style="color: white; margin-top: 10px;">New Tier Request Received!</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px;">
            <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Request Details</h2>
            
            <div style="margin-top: 20px;">
              <p><strong>Selected Tier:</strong> ${tier}</p>
              <p><strong>Price:</strong> ${price}</p>
              <p><strong>Name:</strong> ${name}</p>
              ${mobile ? `<p><strong>Mobile:</strong> ${mobile}</p>` : ""}
              ${
                message ? `<p><strong>Message:</strong><br/>${message}</p>` : ""
              }
              <p><strong>Submitted Time (IST):</strong> ${new Date().toLocaleString(
                "en-IN",
                {
                  timeZone: "Asia/Kolkata",
                  dateStyle: "full",
                  timeStyle: "long",
                }
              )}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #f0f0f0; border-radius: 8px;">
              <p style="margin: 0; font-size: 14px; color: #666;">
                Someone wants to be your friend! 🎉
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
            <p>© 2025 Friendship Offers™ by Shailav Malik</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Tier request submitted successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit tier request. Please try again.",
      error: error.message,
    });
  }
}
