# ✨ Mystery Messages

> A modern anonymous messaging platform that allows users to receive honest feedback and anonymous messages through a unique personal link.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 🌐 Live Demo

🔗 **https://mystry-messages-drab.vercel.app/**

---

## 📖 Overview

**Mystery Messages** is a full-stack web application that enables users to receive anonymous messages from anyone while keeping the sender's identity completely private.

Users simply create an account, receive a unique public profile link, and share it with friends or on social media. Anyone with the link can send anonymous messages without logging in.

The application focuses on privacy, simplicity, and a modern user experience while providing users with complete control over their inbox.

---

## ✨ Features

- 🔐 Secure User Authentication
- 👤 Personalized Public Profile Link
- 💬 Send Anonymous Messages
- 📥 Private Dashboard to Manage Messages
- 🗑️ Delete Messages Anytime
- 🔄 Real-Time User Experience
- 📱 Fully Responsive Design
- 🌙 Clean & Modern UI
- ⚡ Fast Performance with Next.js App Router
- 🛡️ Secure Backend APIs

---



## 🛠 Tech Stack

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

### Backend

- Next.js Server Actions
- API Routes
- MongoDB
- Mongoose

### Authentication

- NextAuth.js (Auth.js)

### Validation

- Zod
- React Hook Form

### Deployment

- Vercel

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/mystery-messages.git

cd mystery-messages
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file.

```env
MONGODB_URI=

NEXTAUTH_SECRET=

NEXTAUTH_URL=http://localhost:3000

RESEND_API_KEY=

EMAIL_FROM=
```

### Run the Development Server

```bash
npm run dev
```

Visit

```
http://localhost:3000
```

---

## 📂 Project Structure

```
.
├── app
├── components
├── lib
├── models
├── hooks
├── schemas
├── types
├── public
└── utils
```

---

## 🔄 Application Flow

1. User creates an account.
2. A unique public profile link is generated.
3. User shares the link.
4. Visitors send anonymous messages.
5. Messages are stored securely.
6. The owner manages messages from their private dashboard.

---

## 🔒 Security

- Passwords are securely hashed.
- Anonymous sender identity is never exposed.
- Protected API routes.
- Server-side validation.
- Secure authentication using Auth.js.

---

## 💡 Future Improvements

- ❤️ Message reactions
- 📌 Pin important messages
- 🔍 Search messages
- 🏷️ Categories & Tags
- 📊 Dashboard Analytics
- 🔔 Email Notifications
- 📱 Progressive Web App (PWA)
- 🌍 Multi-language Support

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push the branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Anmol Yadav**

GitHub: https://github.com/Anmoly6422

---

## ⭐ Support

If you found this project helpful, please consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and motivates future development.

---

> Built with ❤️ using Next.js, TypeScript, MongoDB, and Tailwind CSS.
