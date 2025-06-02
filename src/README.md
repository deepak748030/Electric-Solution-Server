
# ⚡ Electric Solution Server – Backend API

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Multer-FCA121?style=for-the-badge&logo=upload&logoColor=white" />
  <img src="https://img.shields.io/badge/SendGrid-00B2FF?style=for-the-badge&logo=sendgrid&logoColor=white" />
</div>

<div align="center">
  <h3>🔧 Backend API for Managing Appliance Repair Services, Built for Speed, Scalability & Simplicity</h3>
  <p><strong>GitHub Repo:</strong> <a href="https://github.com/deepak748030/Electric-Solution-Server.git">Electric-Solution-Server</a></p>
</div>

---

## 📖 Table of Contents

* [🚀 Features](#-features)
* [🛠 Tech Stack](#-tech-stack)
* [⚙️ Installation](#️-installation)
* [📡 API Endpoints](#-api-endpoints)
* [📁 Folder Structure](#-folder-structure)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)
* [👨‍💻 Author](#-author)

---

## 🚀 Features

* ✅ Full **CRUD** functionality for Categories, Services, Reviews, and Comments
* ✅ **Image Uploads** powered by Multer
* ✅ **MongoDB** with Mongoose for flexible schema and validation
* ✅ **Secure APIs** with JWT Authentication
* ✅ **Razorpay Integration** for payments
* ✅ Robust **Error Handling** for smooth operations
* ✅ **Environment Configurations** via `.env`
* ✅ Clean and Scalable Folder Architecture

---

## 🛠 Tech Stack

| Technology | Description                     |
| ---------- | ------------------------------- |
| Node.js    | JavaScript runtime              |
| Express.js | Web framework for Node.js       |
| MongoDB    | NoSQL database                  |
| Mongoose   | MongoDB ODM                     |
| Multer     | Image/file upload middleware    |
| JWT        | Authentication                  |
| SendGrid   | Email service                   |
| Razorpay   | Payment gateway                 |
| Dotenv     | Environment variable management |

---

## ⚙️ Installation

### 📦 Prerequisites

* Node.js ≥ 16.x
* MongoDB instance or Atlas URI
* npm (or yarn)

### 🔧 Setup

```bash
# Clone the repository
git clone https://github.com/deepak748030/Electric-Solution-Server.git
cd Electric-Solution-Server

# Install dependencies
npm install

# Setup environment variables
touch .env
```

Add the following to your `.env` file:

```env
PORT=3000
MONGO_URI=mongodb+srv://deepakkushwah748930:Deepak900@cluster0.0ykgp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-secret-key
IMAGE_UPLOAD_URL=http://localhost:3000
OTP_API_KEY=d1d0b51fc1263df73270ffb35da32b59
OTP_SALT=91a80781ff475d111f08a19864b5e8ce2e39b629c06d7de7faf3f3e5cca678fd
RAZORPAY_KEY_ID=jjadhewhdi32238r4rh4294jr442904
RAZORPAY_KEY_SECRET=ew935tjjt4g953tj53059t5t9t09t959945t905j
```

### 🚀 Start the Server

```bash
npm run dev
```

---

## 📡 API Endpoints

### 🔖 Categories

* `POST /api/categories` – Add new category
* `GET /api/categories` – Fetch all categories
* `GET /api/categories/:id` – Fetch category by ID
* `PATCH /api/categories/:id` – Update category
* `DELETE /api/categories/:id` – Remove category

### 🛠 Services

* `POST /api/services` – Create service (supports image upload)
* `GET /api/services` – Fetch all services
* `GET /api/services/:id` – Fetch service by ID
* `PATCH /api/services/:id` – Update service
* `DELETE /api/services/:id` – Remove service

### ⭐ Reviews

* `POST /api/reviews` – Add a review
* `GET /api/reviews` – Get all reviews
* `GET /api/reviews/:id` – Get review by ID
* `PATCH /api/reviews/:id` – Edit review
* `DELETE /api/reviews/:id` – Delete review

### 💬 Comments

* `POST /api/comments` – Add comment
* `GET /api/comments` – Fetch all comments
* `GET /api/comments/:id` – Fetch comment by ID
* `PATCH /api/comments/:id` – Update comment
* `DELETE /api/comments/:id` – Remove comment

---

## 📁 Folder Structure

```bash
Electric-Solution-Server/
├── public/
│   └── uploads/               # Image storage
├── src/
│   ├── config/                # DB and environment config
│   │   ├── db.js
│   │   └── env.js
│   ├── controllers/           # Business logic
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API route definitions
│   └── app.js                 # Express app entry
├── .env                       # Environment variables
├── package.json
```

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/featureName`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/featureName`)
5. Create a new Pull Request

---

## 📄 License

Licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Made with ❤️ by **[Deepak Kushwah](https://github.com/deepak748030)**
[🔗 GitHub Repository](https://github.com/deepak748030/Electric-Solution-Server.git)
