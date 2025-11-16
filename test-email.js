import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

console.log("🧪 Testing Email Configuration...\n");

// Check if environment variables are set
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ Error: EMAIL_USER and EMAIL_PASS must be set in .env file");
  console.log("\n📝 Steps to fix:");
  console.log("1. Copy .env.example to .env");
  console.log("2. Add your Gmail credentials");
  console.log("3. Use App Password (not regular password)");
  process.exit(1);
}

console.log("✅ Environment variables found");
console.log(`📧 Email User: ${process.env.EMAIL_USER}`);
console.log(
  `📬 Recipient: ${process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER}\n`
);

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test email
const testMail = {
  from: process.env.EMAIL_USER,
  to: process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER,
  subject: "🧪 Friendship Offers™ - Email Test",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
        <h1 style="color: white; margin: 0;">✅ Email Test Successful!</h1>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; border: 1px solid #e0e0e0;">
        <h2 style="color: #667eea;">Congratulations! 🎉</h2>
        <p>Your email configuration is working correctly.</p>
        <p><strong>This means:</strong></p>
        <ul>
          <li>✅ Gmail credentials are valid</li>
          <li>✅ Nodemailer is configured properly</li>
          <li>✅ Ready for deployment to Vercel</li>
        </ul>
        
        <div style="margin-top: 30px; padding: 20px; background-color: #e3f2fd; border-radius: 8px;">
          <p style="margin: 0; color: #1976d2;">
            <strong>Next Steps:</strong><br>
            1. Deploy to Vercel<br>
            2. Add environment variables in Vercel dashboard<br>
            3. Test the live site
          </p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
        <p>Friendship Offers™ by Shailav Malik</p>
      </div>
    </div>
  `,
};

console.log("📤 Sending test email...");

transporter.sendMail(testMail, (error, info) => {
  if (error) {
    console.error("\n❌ Email sending failed:");
    console.error(error.message);
    console.log("\n🔍 Common issues:");
    console.log("- App Password incorrect (must be 16 characters, no spaces)");
    console.log("- 2-Step Verification not enabled");
    console.log("- EMAIL_USER doesn't match Gmail account");
    console.log("- Less secure app access blocked");
    process.exit(1);
  }

  console.log("\n✅ Test email sent successfully!");
  console.log(`📬 Message ID: ${info.messageId}`);
  console.log(
    `\n🎉 Check your inbox at ${
      process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER
    }`
  );
  console.log("\n🚀 You're ready to deploy to Vercel!");
});
