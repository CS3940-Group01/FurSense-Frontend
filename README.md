# 🐾 FurSense Frontend – React Native App

This is the **mobile frontend** for **FurSense** – a smart pet care application developed to support Sri Lankan pet owners in managing their pets' health, vaccination schedules, emergency services, and more.

---

## 📄 Overview

The FurSense frontend is built with **React Native** using **Expo** and provides a cross-platform experience for both Android and iOS users. It connects to a microservices-based backend and includes:

- Smooth and modern UI with utility-based styling using Tailwind
- Custom navigation with `expo-router`
- Integrated support for authentication, pet management, AI chatbot (FurBot), reminders, and lost pet alerts
- Maps integration with toggle filters for veterinary services and pharmacies
- Seamless notification system using Expo push services

The frontend is modular, well-structured, and supports both local state and global context to manage user sessions and app data efficiently.

---

## 📱 Features

- 🐶 Register and manage multiple pets 
- 📅 Auto-scheduled vaccination reminders
- 💬 AI-powered chatbot (**FurBot**) for pet health queries
- 🗺️ Toggle-based map to find nearby veterinarians and pharmacies
- 📚 Tips section for pet care, grooming, and nutrition
- 🔔 Push notifications for reminders and alerts
- 🚨 Lost pet alert system to notify the local pet community

---

## ⚙️ Tech Stack

- **React Native** with **Expo**
- **Tailwind CSS** 
- **React Navigation** (`expo-router`)
- **Axios** for API communication
- **Expo Push Notifications**

---

## 🧱 Folder Structure
```
frontend/
├── app/
│ ├── index.tsx # Home screen
│ |     └── details/ # Pet details
│ ├── (auth)/ # SignIn / SignUp
│ ├── register/ # Pet registration
│ ├── chatbot/ # FurBot chat screen
│ ├── findvet/ # Map screen
│ ├── tips/ # Pet care articles

```

---

## 🚀 Getting Started

### ✅ Prerequisites

- **Node.js** v18 or above
- **Expo CLI** (install globally)

```bash
npm install -g expo-cli
```
---

## 🔧 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/CS3940-Group01/FurSense-Frontend.git
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```
### 3. start the app
```bash
npx expo start
```
---
## 👥 Team

- **210194H** - Gunasekara S.L.
- **210302P** - Kulasekara K.M.S.N.
- **210306G** - Kulathunga K.A.J.T.
- **210314E** - Kumarasekara G.K.
- **210434V** - Niroshan G.

---

**Built with ❤️ for pet owners in Sri Lanka**
