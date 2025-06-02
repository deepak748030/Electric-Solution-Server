
# ⚡ Electric-Solution-Server (Repair Guru Backend)

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Multer-FF0000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens" />
</div>

<div align="center">
  <h3>🔧 Powerful & Scalable Backend for Home Appliance Repair Services</h3>
  <p><strong>Repository:</strong> <a href="https://github.com/deepak748030/Electric-Solution-Server">Electric-Solution-Server</a></p>
</div>

---

## 📖 Table of Contents

* [🚀 Features](#-features)
* [🧰 Tech Stack](#-tech-stack)
* [📦 Installation](#-installation)
* [📡 API Endpoints](#-api-endpoints)
* [📁 Folder Structure](#-folder-structure)
* [🔐 Environment Variables](#-environment-variables)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)
* [👨‍💻 Author](#-author)

---

## 🚀 Features

* ✅ **CRUD APIs** for Categories, Services, Reviews, and Comments
* ✅ **Image Upload** with Multer
* ✅ **JWT Authentication** for secure endpoints
* ✅ **Mongoose Validation** for schema-level integrity
* ✅ **RESTful Architecture**
* ✅ **Razorpay Integration** for Payments
* ✅ **OTP Verification** with Secure API Key & Salt
* ✅ **Centralized Error Handling**

---

## 🧰 Tech Stack

| Category        | Tech Used                        |
| --------------- | -------------------------------- |
| Backend Runtime | Node.js                          |
| Framework       | Express.js                       |
| Database        | MongoDB with Mongoose ORM        |
| Authentication  | JSON Web Tokens (JWT)            |
| File Upload     | Multer                           |
| Payments        | Razorpay API                     |
| Mail Services   | SendGrid                         |
| OTP Services    | External API (via OTP\_API\_KEY) |
| Env Management  | dotenv                           |

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/deepak748030/Electric-Solution-Server.git
cd Electric-Solution-Server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file in the root directory

```env
PORT=3000
MONGO_URI=
JWT_SECRET=your-secret-key
IMAGE_UPLOAD_URL=http://localhost:3000
OTP_API_KEY=
OTP_SALT=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### 4. Run the development server

```bash
npm run dev
```

---

## 📡 API Endpoints

### 🔷 Categories

* `POST /api/categories` – Create a new category
* `GET /api/categories` – Get all categories
* `GET /api/categories/:id` – Get a category by ID
* `PATCH /api/categories/:id` – Update a category
* `DELETE /api/categories/:id` – Delete a category

### 🔷 Services (with Image Upload)

* `POST /api/services` – Create a new service
* `GET /api/services` – Get all services
* `GET /api/services/:id` – Get a service by ID
* `PATCH /api/services/:id` – Update a service
* `DELETE /api/services/:id` – Delete a service

### 🔷 Reviews

* `POST /api/reviews` – Create a new review
* `GET /api/reviews` – Get all reviews
* `GET /api/reviews/:id` – Get a review by ID
* `PATCH /api/reviews/:id` – Update a review
* `DELETE /api/reviews/:id` – Delete a review

### 🔷 Comments

* `POST /api/comments` – Create a new comment
* `GET /api/comments` – Get all comments
* `GET /api/comments/:id` – Get a comment by ID
* `PATCH /api/comments/:id` – Update a comment
* `DELETE /api/comments/:id` – Delete a comment

---

## 📁 Folder Structure

```bash
Electric-Solution-Server/
├── public/
│   └── uploads/              # Uploaded images
├── src/
│   ├── config/
│   │   ├── db.js             # MongoDB connection
│   │   └── env.js            # Environment loader
│   ├── controllers/          # Route handlers
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Express routes
│   ├── app.js                # Main Express app
├── .env                      # Environment variables
└── package.json              # Project metadata & dependencies
```

---

## 🔐 Environment Variables

| Key                   | Description                |
| --------------------- | -------------------------- |
| `PORT`                | Server port                |
| `MONGO_URI`           | MongoDB connection string  |
| `JWT_SECRET`          | Secret key for JWT auth    |
| `IMAGE_UPLOAD_URL`    | Base URL for image uploads |
| `OTP_API_KEY`         | OTP service API key        |
| `OTP_SALT`            | Salt for OTP generation    |
| `RAZORPAY_KEY_ID`     | Razorpay public key        |
| `RAZORPAY_KEY_SECRET` | Razorpay private key       |

---

## 🤝 Contributing

We welcome all contributions! Please:

1. Fork this repo
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit and push (`git commit -am 'add new feature' && git push`)
5. Open a pull request 🙌

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Deepak Kushwah**
🔗 [GitHub](https://github.com/deepak748030)
🛠️ Passionate MERN Stack Developer
❤️ Building scalable backend solutions
