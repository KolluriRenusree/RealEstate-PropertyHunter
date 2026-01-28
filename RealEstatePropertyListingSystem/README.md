Real Estate Property Listing System

A MERN stack-based web application enabling seamless interaction between property buyers and sellers, eliminating the need for third-party agents.

This system provides a secure platform for listing, browsing, and managing real estate properties with role-based access.

🛠️ Tech Stack
Layer	Technology
Frontend	React.js (Bootstrap / Tailwind CSS)
Backend	Node.js + Express.js
Database	MongoDB Atlas
Authentication	JWT (JSON Web Tokens)
File Uploads	Multer + Cloudinary
Deployment	Render / Vercel
✨ Core Features
Authentication & Authorization

Secure login & signup with JWT

Role-based access control (Buyer, Seller, Admin)

Protected routes with middleware

Seller Features

Create property listings with images

Update property details

Delete properties

Manage uploaded images (Cloudinary)

Buyer Features

Browse all properties

Search & filter properties (location, price, type, etc.)

View detailed property pages

Contact seller (email/message module)

Admin Features

Approve or reject property listings

Manage users and listings

📂 Backend Folder Structure
backend/
│── package.json
│── package-lock.json
│── server.js
└── src/
    ├── config/
    │   └── cloudinary.js
    │
    ├── controllers/
    │   ├── authController.js
    │   └── propertyController.js
    │
    ├── middleware/
    │   ├── authMiddleware.js
    │   ├── roleMiddleware.js
    │   └── uploadMiddleware.js
    │
    ├── models/
    │   ├── Property.js
    │   └── User.js
    │
    └── routes/
        ├── authRoutes.js
        └── propertyRoutes.js


The entire backend is fully implemented, including:

Database models

Controllers for all business logic

Middleware for authentication/authorization

Cloudinary integration

Complete routing system

🚀 Project Status: Backend Completed
✔️ Completed:

Backend environment setup

All models, controllers, routes

JWT authentication + role middleware

Property CRUD operations

Cloudinary file upload system

API tested with Postman

Project folder structure finalized

🔜 Next Steps (Frontend Phase):

Connect frontend to backend APIs

Build property listing UI

Build property detail page

Implement user dashboards (Buyer/Seller/Admin)

Integrate search & filtering UI

Finalize responsive design

👥 Team Members

Nirupama Rajana

Sarode Mamata Subhash

Prajakta Pandurang Derle

Kolluri Renusree

Swathi Simbothula