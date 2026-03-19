# Passionates 🌟

> A full-stack social media application built with the MERN stack, designed to connect like-minded passionate people and build meaningful communities around shared interests.

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

## 📖 About

Passionates is a social networking platform that brings together individuals who share common interests, hobbies, and passions. Whether you're passionate about photography, coding, cooking, or any other interest, Passionates helps you find and connect with your tribe.

### Key Features

- **🎯 Passion-Based Discovery**: Find and connect with people who share your interests
- **📝 Share Posts**: Create and share text posts, images, and updates with your community
- **❤️ Engage**: Like, comment, and interact with posts from fellow passionate individuals
- **👥 Follow System**: Build your network by following users with similar interests
- **🔍 User Discovery**: Explore suggested users and discover new connections
- **👤 Profile Management**: Customize and manage your profile to showcase your passions
- **🔒 Secure Authentication**: Safe and secure user registration and login system

## 🛠️ Tech Stack

### Frontend

- **React.js**: Dynamic and responsive user interface
- **CSS3**: Custom styling for an engaging user experience
- **JavaScript (ES6+)**: Modern JavaScript features

### Backend

- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for flexible data storage
- **RESTful API**: Clean and efficient API architecture

## 🚀 Getting Started

### Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (running locally or MongoDB Atlas account)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/prasad-nikam/passionates.git
    cd passionates
    ```

2. **Install server dependencies**

    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies**

    ```bash
    cd ../client
    npm install
    ```

4. **Configure environment variables**

    Create a `.env` file in the `server` directory:

    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=5000
    ```

5. **Start MongoDB**

    Make sure MongoDB is running on your system or use MongoDB Atlas.

6. **Run the application**

    In the `server` directory:

    ```bash
    npm start
    ```

    In the `client` directory (in a new terminal):

    ```bash
    npm start
    ```

7. **Access the application**

    Open your browser and navigate to `http://localhost:3000`

## 📂 Project Structure

```
passionates/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS files
│   │   └── App.js         # Main App component
│   └── package.json
│
├── server/                 # Backend Node.js application
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Custom middleware
│   └── server.js          # Server entry point
│
└── README.md
```

## 🔑 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Users

- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `GET /api/users/suggested` - Get suggested users

### Posts

- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post
- `PUT /api/posts/:id/like` - Like/unlike a post

### Follow

- `PUT /api/users/:id/follow` - Follow/unfollow a user

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Prasad Nikam**

- GitHub: [@prasad-nikam](https://github.com/prasad-nikam)

## 🙏 Acknowledgments

- Thanks to all contributors who help improve this project
- Inspired by the need to connect passionate individuals worldwide

---

**Made with ❤️ by passionate developers for passionate people**
