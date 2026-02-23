# 🌐 BeyondDualism — Creator Funding Platform  
A full-stack web application built using **Next.js**, **MongoDB**, **NextAuth**, and **Razorpay API** that enables creators to register, showcase their work, and receive financial contributions directly from supporters.

BeyondDualism is inspired by platforms like Patreon, but built with a deeper intention — to support philosophical and truth-oriented creators who want to raise funds transparently and independently!

---

## 🚀 Features

### 🔐 Authentication & User Management
- GitHub OAuth authentication using **NextAuth**
- Protected routes with server-side session validation
- User onboarding with MongoDB persistence

### 💳 Creator Payment Integration
- Integrated **Razorpay Payment Gateway**
- Creators can receive funds using **their own Razorpay credentials**
- Secure API routes for payment verification

### 🧾 Creator Dashboard
- Creator registration and profile management
- Display creator details, mission, and work
- User/Supporter interface for making contributions

### 🗄️ Database & Models
- MongoDB database with **Mongoose** schemas
- Schema validation for creators, users, and transactions

### 🎨 Modern UI/UX
- Fully responsive design using **Tailwind CSS**
- UI components powered by **Flowbite**
- Real-time alerts using **react-toastify**

### ☁️ Deployment
- Entire app deployed on **Vercel** with environment-based configuration

---

## 🏗️ Tech Stack

### **Frontend**
- Next.js 14 (App Router)
- React
- Tailwind CSS
- Flowbite UI

### **Backend**
- Next.js Server Actions & API Routes
- MongoDB + Mongoose ORM
- Razorpay Payment API
- NextAuth (GitHub Provider and Google Provider)

### **Dev Tools**
- TypeScript
- Vercel (Hosting)
- ESLint & Prettier
- GitHub