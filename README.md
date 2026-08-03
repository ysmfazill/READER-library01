# Smart Library Recommendation System

A modern, full-stack application built to intelligently manage and recommend books. The system features a responsive UI, advanced reading analytics, gamification (achievements & leaderboards), and algorithmic recommendations based on user history and personalized interests.

## 🚀 Features

- **Personalized Recommendations**: Dynamic algorithmic book suggestions tailored to your reading history and selected interests.
- **Reading Analytics & Gamification**: Track your reading streaks, unlock achievements, and compete on the global leaderboard.
- **Robust User Profiles**: Customizable profiles with a built-in avatar picker and detailed reading history.
- **Admin Dashboard**: Manage library collections, import massive datasets securely via JSON/CSV, and oversee user activity.
- **Dark/Light Mode Support**: Native Tailwind-powered dark mode integration.
- **Secure Authentication**: Role-based access control with stateless JWTs.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TypeScript, TailwindCSS 4, React Router DOM, Axios.
- **Backend**: Spring Boot 3, Java 21, Spring Security, Spring Data JPA, Hibernate, JWT.
- **Database**: MySQL 8.0.

## 📦 Project Structure

This is a monorepo containing both the frontend and backend:
- `/smart-library` - The React/Vite Frontend
- `/smart-library-backend` - The Spring Boot Backend

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- Java 21 (JDK)
- Maven
- MySQL 8.0+

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd smart-library-backend
   ```
2. Set up your `.env` file (see `.env.example` for details) to configure MySQL and your JWT secret.
3. Build and run:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd smart-library
   ```
2. Create a `.env` file from the `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies and start the development server:
   ```bash
   npm install
   npm run dev
   ```

## 🤝 Contributing
Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
