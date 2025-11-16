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
    const { name, timestamp } = req.body;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    // Convert to IST (Indian Standard Time)
    const visitTime = timestamp
      ? new Date(timestamp).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
          timeStyle: "long",
        })
      : new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
          timeStyle: "long",
        });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `👋 New Visitor Alert - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            }
            .header {
              background: rgba(255,255,255,0.1);
              padding: 30px;
              text-align: center;
              border-bottom: 2px solid rgba(255,255,255,0.2);
            }
            .header h1 {
              color: white;
              margin: 0;
              font-size: 28px;
              text-shadow: 0 2px 10px rgba(0,0,0,0.2);
            }
            .emoji {
              font-size: 60px;
              margin-bottom: 15px;
              display: block;
              animation: wave 1s ease-in-out infinite;
            }
            @keyframes wave {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(20deg); }
              75% { transform: rotate(-20deg); }
            }
            .content {
              background: white;
              padding: 40px 30px;
            }
            .visitor-info {
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              padding: 25px;
              border-radius: 15px;
              margin: 20px 0;
              color: white;
              box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            .visitor-name {
              font-size: 32px;
              font-weight: bold;
              margin: 0 0 10px 0;
              text-shadow: 0 2px 5px rgba(0,0,0,0.2);
            }
            .visit-time {
              font-size: 14px;
              opacity: 0.9;
              margin: 5px 0;
            }
            .message {
              background: #f8f9fa;
              padding: 20px;
              border-left: 4px solid #667eea;
              border-radius: 8px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              padding: 20px;
              background: #f8f9fa;
              color: #666;
              font-size: 12px;
            }
            .badge {
              display: inline-block;
              background: #4CAF50;
              color: white;
              padding: 5px 15px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <span class="emoji">👋</span>
              <h1>New Visitor Alert!</h1>
            </div>
            <div class="content">
              <div class="visitor-info">
                <p class="visitor-name">🎯 ${name}</p>
                <p class="visit-time">⏰ Visited: ${visitTime}</p>
                <span class="badge">NEW VISITOR</span>
              </div>
              
              <div class="message">
                <p><strong>📍 Action:</strong> A new visitor just entered your Friendship Tiers website!</p>
                <p><strong>💡 Tip:</strong> They might be exploring different tiers right now.</p>
              </div>

              <p style="text-align: center; margin-top: 30px; color: #666;">
                <em>This is an automated notification from your Friendship Offers™ system.</em>
              </p>
            </div>
            <div class="footer">
              <p>Friendship Offers™ • Making Connections Count 💖</p>
              <p>Built with ❤️, ☕ & Code by Shailav Malik</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Visitor Alert! 👋

Visitor Name: ${name}
Visit Time: ${visitTime}

A new visitor just entered your Friendship Tiers website!

---
Friendship Offers™
Built with ❤️, ☕ & Code by Shailav Malik
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Visitor notification sent successfully",
    });
  } catch (error) {
    console.error("Error sending visitor notification:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send notification",
      error: error.message,
    });
  }
}
