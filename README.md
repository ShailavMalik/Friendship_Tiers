# 🎉 Friendship Offers™ by Shailav Malik

A modern, vibrant single-page React application showcasing friendship tiers with beautiful gradients, smooth animations, and an intuitive user experience.

![Friendship Tiers](https://img.shields.io/badge/Made%20with-%E2%98%95%20%26%20%F0%9F%92%96-purple)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-cyan)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.16.4-pink)

## ✨ Features

- 🎨 **Vibrant Gradients** - Eye-catching gradient cards for each friendship tier
- 🎭 **Smooth Animations** - Powered by Framer Motion for delightful user interactions
- 📱 **Fully Responsive** - Mobile-first design that works on all devices
- 🎯 **Interactive Modals** - Beautiful modal forms for tier selection
- 📧 **Email Integration** - Backend with Nodemailer to send tier requests
- 🔒 **Smart Logic** - GF tier unlocks the exclusive Soulmate tier
- 🎨 **Modern UI/UX** - Clean, intuitive interface with college/friendship theme

## 🏆 Friendship Tiers

1. **👻 Anonymous** (Free) - Stay in the shadows
2. **☕ Just Knowing** (1 Cutting Chai) - Basic acquaintance
3. **☕☕☕☕☕ Friends** (5 Cutting Chai Runs) - Regular hangout buddy
4. **🍛 Close Friends** (10 Irani Cafe Snacks) - Premium tier with deep connection
5. **💖 GF** (Lifetime Commitment) - Ultra premium single pass (Currently taken)
6. **👑 Soulmate** (VIP) - Ultimate lifetime tier (Requires GF tier)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Gmail account (for email functionality)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Friendship-Tiers
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy the example env file:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your email credentials:

   ```env
   PORT=5000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   RECIPIENT_EMAIL=shailav.malik@example.com
   ```

   **Important:** For Gmail, you need to use an App Password:

   - Go to your Google Account
   - Navigate to Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `EMAIL_PASS`

### Running the Application

1. **Start the backend server** (in one terminal):

   ```bash
   npm run server
   ```

   Server will run on `http://localhost:5000`

2. **Start the React development server** (in another terminal):

   ```bash
   npm run dev
   ```

   Application will open at `http://localhost:3000`

3. **Build for production**:
   ```bash
   npm run build
   npm run preview
   ```

## 📁 Project Structure

```
Friendship-Tiers/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with title and tagline
│   │   ├── TierCard.jsx        # Individual tier card component
│   │   ├── ModalForm.jsx       # Modal form for user input
│   │   └── Footer.jsx          # App footer
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles with Tailwind
├── server/
│   └── index.js                # Express + Nodemailer backend
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Project dependencies
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## 🎨 Tech Stack

- **Frontend:**

  - React 18.2
  - Tailwind CSS 3.3
  - Framer Motion 10.16
  - Vite 5.0

- **Backend:**
  - Node.js
  - Express 4.18
  - Nodemailer 6.9
  - CORS & Dotenv

## 🎯 Key Features Explained

### Tier Cards

- Each tier has a unique gradient background
- Animated emoji icons that rotate periodically
- Hover effects with scale and elevation
- Disabled states for locked tiers (GF and Soulmate)
- Premium badges for special tiers

### Modal Form

- Beautiful animated entrance/exit
- Form validation
- Loading states during submission
- Success/error messages with animations
- Gradient header matching the selected tier

### Backend Integration

- RESTful API endpoint for form submissions
- Email notifications to Shailav
- Confirmation emails to users
- HTML-formatted emails with branding
- Error handling and validation

### Responsive Design

- Mobile-first approach
- Flexible grid layout (1 column → 2 columns → 3 columns)
- Touch-friendly buttons and interactions
- Readable text sizes on all devices

## 🎭 Customization

### Changing Tier Data

Edit the `tiers` array in `src/App.jsx`:

```javascript
const tiers = [
  {
    id: 1,
    name: 'Your Tier Name',
    price: 'Your Price',
    emoji: '🎉',
    perks: ['Perk 1', 'Perk 2', ...],
    buttonText: 'Your Button Text',
    gradient: 'linear-gradient(135deg, #color1 0%, #color2 100%)',
    disabled: false,
    badge: 'OPTIONAL BADGE'
  },
  // ... more tiers
];
```

### Changing Colors

Edit `tailwind.config.js` or component gradient strings.

### Email Templates

Modify email HTML in `server/index.js` under `mailOptions`.

## 📧 Email Configuration

The app supports multiple email providers:

**Gmail:**

```javascript
service: "gmail";
```

**Outlook:**

```javascript
service: "outlook";
```

**Custom SMTP:**

```javascript
host: 'smtp.example.com',
port: 587,
secure: false
```

## 🐛 Troubleshooting

### Email not sending

- Verify Gmail App Password is correct
- Check if 2-Step Verification is enabled
- Ensure `.env` file exists and has correct values
- Check server console for error messages

### Port already in use

- Change `PORT` in `.env` file
- Update API endpoint in `src/components/ModalForm.jsx`

### Build errors

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Clear Vite cache: `rm -rf node_modules/.vite`

## 📝 License

This project is open source and available for personal and educational use.

## 🙏 Credits

Made with ☕ and 💖 by **Shailav Malik**

_Actual friendship quality may vary based on mood, time, and chai availability_ 😄

---

**Need help?** Open an issue or reach out to Shailav!

**Want to contribute?** PRs are welcome! 🎉
