
![BANNER](https://github.com/Technological-University-of-the-Bloom/Web-Backend/blob/master/banner.png?raw=true)
---
<div align="center">
<img src="https://nestjs.com/img/logo-small.svg" alt="nest" height="150"/>
<img src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" alt="docker" height="150"/> 
<img src="https://nodejs.org/static/logos/jsIconGreen.svg" alt="docker" height="150"/> 
</div>
<div align="center">
<img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" alt="nest" width="400"/>
</div>


> **Frontend**: [UTR Webpage Repo](https://astro.build/)  

---

## Table of Contents

- [🚀 Project Overview](#-project-overview)
- [📦 Tech Stack](#-tech-stack)
- [🔧 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🚦 Running the Backend](#-running-the-backend)
- [🔌 Microservices](#-microservices)
- [⚙️ Configuration](#%EF%B8%8F-configuration)
- [🛠️ Useful Commands](#%EF%B8%8F-useful-commands)
- [📡 API Endpoints](#-api-endpoints)
- [🐞 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)

---

## 🚀 Project Overview

This backend powers a web application that brings all university services under one roof. 🎓 From managing student IDs to hosting a blog and image library, our NestJS-powered backend has everything you need for an efficient, scalable solution!

> 🛠️ **Built with microservices** for modularity and scalability!  
> 🌐 **Server-side rendering** for optimized performance!  
> 🔐 **OAuth authentication** for secure login!  
> 📈 **Real-time notifications** and **user activity tracking**!

---

## 📦 Tech Stack

- **NestJS**: For building the scalable and modular backend architecture
- **TypeScript**: Writing safer and cleaner code
- **Docker**: Containerizing the app for easy deployment
- **MongoDB**: Document based database
- **OAuth**: Secure authentication

---

## 🔧 Getting Started

### Prerequisites

To get started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com&)
- [Redis](https://redis.io/)

### Installation Steps

1. **Clone the repo**:

   ```bash
   git clone https://github.com/yourusername/centralized-services-backend.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd Web-Backend
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Create environment variables**:

   Copy the `.env.example` file and rename it to `.env`. Make sure to add your database credentials and other necessary secrets.

   ```bash
   cp .env.example .env
   ```

---

## 📁 Project Structure
### Breakdown:
```
`📦 project-root
 ┣ 📂 src                   # Main source code directory
 ┃ ┣ 📂 image-upload         # Module for image upload functionality
 ┃ ┣ 📂 test                 # Unit and integration tests
 ┣ 📂 uploads               # Directory where uploaded images are stored
 ┣ 📜 .dockerignore          # Ignore file for Docker builds
 ┣ 📜 .eslintrc.js           # ESLint configuration
 ┣ 📜 .gitignore             # Git ignore file
 ┣ 📜 .prettierrc            # Prettier configuration for code formatting
 ┣ 📜 README.md              # Readme file for project documentation
 ┣ 📜 docker-compose.yml     # Docker Compose configuration file
 ┣ 📜 dockerfile             # Dockerfile for building the project image
 ┣ 📜 nest-cli.json          # NestJS CLI configuration
 ┣ 📜 package.json           # Project dependencies and scripts
 ┣ 📜 pnpm-lock.yaml         # Lock file for package dependencies (PNPM)
 ┣ 📜 tsconfig.build.json    # TypeScript configuration for build
 ┣ 📜 tsconfig.json          # Base TypeScript configuration` 
```
---

## 🚦 Running the Backend

To run the backend locally:

```bash
docker-compose up --build
```

This will spin up the NestJS app along with the PostgreSQL and Redis services!

### 🧪 Running in Development Mode

```bash
npm run start:dev
```

> 💡 **Pro Tip**: Use `npm run start:debug` to enable live reloading and debugging while developing.

---

## 🔌 Microservices

Our backend is composed of multiple **microservices** to make it modular and scalable. Here’s what we’ve got under the hood:

- **Blog Microservice**: For creating and managing blog posts 📖.
- **Student ID Microservice**: For student profile and ID management 🆔.
- **Notifications Microservice**: Real-time notifications 🚨.
- **Image Library Microservice**: Handles image uploads and storage 🖼️.
- **Authentication Microservice**: OAuth authentication and user sessions 🔐.

Each service runs independently but communicates through internal APIs. Neat, right? 😎

---

## ⚙️ Configuration

Environment variables are managed using the `.env` file. Here are some important variables you’ll want to configure:

```ini
PORT=3000                # Backend server port
DB_HOST=172.16.21.12         # Database host
DB_PORT=5432              # Database port
REDIS_HOST=172.16.21.12      # Redis host for caching
REDIS_PORT=6379           # Redis port
OAUTH_CLIENT_ID=xxxxxxxx  # OAuth client ID
OAUTH_CLIENT_SECRET=xxxx  # OAuth client secret
```

---

## 🛠️ Useful Commands

### Start the app in development mode:

```bash
npm run start:dev
```

### Run the app with Docker:

```bash
docker-compose up
```

### Run tests:

```bash
npm run test
```

### Build for production:

```bash
npm run build
```


## 🤝 Contributing

We love contributions! 🥳 If you want to help us improve the backend, here’s how you can contribute:

1. **Fork the repo**
2. **Create a feature branch** (`git checkout -b feature/new-feature`)
3. **Commit your changes** (`git commit -m 'Add new feature'`)
4. **Push to the branch** (`git push origin feature/new-feature`)
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License. Check out the [LICENSE](LICENSE) file for more details.

## 📬 Contact

Have questions, suggestions, or just want to chat? Reach out to us!

- **Project Manager: Daniel Téllez Girón** - [danieltellezgiron81@gmail.com]
- **IT Department, Universidad Tecnológica el Retoño**

---

**Happy coding!** 🎉
