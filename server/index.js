import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * Configure Nodemailer transporter
 * Update these settings with your email credentials
 */
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

/**
 * API endpoint to handle tier selection submissions
 */
app.post("/api/submit-tier", async (req, res) => {
  try {
    const { name, message, mobile, tier, price } = req.body;

    // Validate required fields
    if (!name || !tier) {
      return res.status(400).json({
        success: false,
        message: "Name and tier are required",
      });
    }

    // Email content for Shailav
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

    // Send email notification
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
    });
  }
});

/**
 * API endpoint to handle "Show More" clicks
 */
app.post("/api/show-more", async (req, res) => {
  try {
    const { userName, tierName } = req.body;

    // Email content for Shailav
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
      subject: `👀 ${userName} viewed ${tierName} features`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7f7f7;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="color: white; margin: 0;">Friendship Offers™</h1>
            <p style="color: white; margin-top: 10px;">User Engagement Notification</p>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px;">
            <h2 style="color: #667eea; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Activity Details</h2>
            
            <div style="margin-top: 20px;">
              <p><strong>User Name:</strong> ${userName}</p>
              <p><strong>Action:</strong> Clicked "Show More" on ${tierName} tier</p>
              <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #e3f2fd; border-radius: 8px;">
              <p style="margin: 0; font-size: 14px; color: #1976d2;">
                <strong>${userName}</strong> is interested in learning more about the <strong>${tierName}</strong> tier! 👀
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
            <p>© 2025 Friendship Offers™ by Shailav Malik</p>
          </div>
        </div>
      `,
    };

    // Send email notification
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Show more tracked successfully!",
    });
  } catch (error) {
    console.error("Error sending show-more notification:", error);
    res.status(200).json({
      success: true,
      message: "Tracked locally",
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Server is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📧 Ready to receive friendship tier requests!`);
});
