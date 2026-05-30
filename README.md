# 📝 Full‑Stack Modern MERN Blog App

A comprehensive, robust **full-stack blog application** built with the **MERN Stack (MongoDB, Express.js, React, Node.js)**. 
Supports **rich text post creation**, comprehensive **JWT authentication (including Google OAuth)**, a fully-featured **comments system**, **dark mode**, and role-based access control across intuitive **dashboards**.

---

## 📖 Table of Contents

- [Features](#-features)
- [Documentation](#-documentation)
- [Usage (Role-Based Access)](#-usage-role-based-access)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Commit History Highlights](#-commit-history-highlights)
- [Future Enhancements](#️-future-enhancements)
- [Contributing](#-contributing)
- [Contact](#-contact)

---

## ✨ Features

### 🖥️ Frontend (React + Tailwind CSS + Flowbite)
- **Responsive & Modern UI:** Fully styled responsive user interface utilizing **Tailwind CSS** and **Flowbite React** components.
- **Dark Mode:** Built-in dark/light mode toggle for an optimal reading and user experience.
- **Global State Management:** Implemented **Redux Toolkit** and **Redux Persist** for seamless state retention across sessions.
- **Interactive Dashboards:** Private, protected dashboards featuring an intuitive sidebar, infinite scrolling ("show more" functionality), and dynamic data rendering.
- **Global Search & Filter:** Dedicated search page to filter posts by search term, category, and sorting order.

### ⚙️ Backend & API (Node.js + Express)
- **Robust API Routing:** Dedicated RESTful API routes for Authentication, Users, Posts, and Comments.
- **Advanced Authentication:** Seamless standard Sign Up / Sign In using **httpOnly cookies** and **JWT**, alongside **Google OAuth Integration** (via Firebase) for quick social logins.
- **Role-Based Access Control (RBAC):** Secure routes and controllers that isolate capabilities based on the user's role (Admin, Author, Reader).
- **Cloud Image Uploads:** Integrated **Cloudinary** for seamless and secure cover image and profile picture uploads.

### 📦 Content & Interactions
- **Rich Text Editor:** Integrated `react-quill-new` for dynamic blog post formatting.
- **Comments System:** Users can leave comments on posts, like comments, and edit/delete their own comments.
- **Dynamic Database Models:** Mongoose schemas mapping complex relations between Users, Posts, and Comments (including like counts and timestamps).

---

## 📚 Documentation
Here's a list of all the primary API routes derived from the application structure and what each path does.

**Authentication Routes**
- `POST /api/auth/signup` - Creates a new user in the database.
- `POST /api/auth/signin` - Authenticates an existing user and sets an httpOnly JWT cookie.
- `POST /api/auth/google` - Handles OAuth login/signup via Firebase.
- `POST /api/auth/signout` - Clears the user's session/cookies.

**User Routes**
- `GET /api/user/getusers` - (Admin) Retrieves a paginated list of all users.
- `GET /api/user/:userId` - Retrieves a specific user's public profile data.
- `PUT /api/user/update/:userId` - Updates user profile data and avatar.
- `DELETE /api/user/delete/:userId` - Deletes a user account entirely.

**Post Routes**
- `POST /api/post/create` - (Author/Admin) Creates a new blog post with an image and rich text content.
- `GET /api/post/getposts` - Fetches a paginated list of posts (supports filters, search terms, and "Show More").
- `PUT /api/post/updatepost/:postId/:userId` - (Author/Admin) Updates an existing post's content or image.
- `DELETE /api/post/deletepost/:postId/:userId` - (Author/Admin) Removes a post from the database.

**Comment Routes**
- `POST /api/comment/create` - (Author/Admin) Adds a comment to a specific post.
- `GET /api/comment/getPostComments/:postId` - Fetches all comments for a specific post.
- `PUT /api/comment/likeComment/:commentId` - Toggles a like on a comment.
- `PUT /api/comment/editComment/:commentId` - (Author/Admin) Edits an existing comment.
- `DELETE /api/comment/deleteComment/:commentId` - (Author/Admin) Deletes a comment.
- `GET /api/comment/getcomments` - (Admin) Fetches a paginated list of all comments for the dashboard.

**Upload Routes**
- `POST /api/upload-image` - Uploads an image file to Cloudinary and returns the secure URL.

---

## 👥 Usage (Role-Based Access)
The application handles permissions across three distinct tiers:

- **Readers (Unauthenticated):** Can browse available blog posts, toggle dark mode, use the global search/filter tool, read full articles, and view comment threads.
- **Authors (Authenticated Users):** Can sign up via standard email or Google OAuth. They can update their profile picture, write new blog posts, and **edit/delete ONLY their own articles and comments** through their private dashboard. They can also like comments.
- **Admins:** Have elevated dashboard access enabling them to view the entire user base, oversee all platform content, view system-wide metrics (total users, posts, comments), and moderate (delete/edit) ANY posts, comments, or users as necessary.

---

## 🚀 Tech Stack

**Frontend:**  
- React.js (Vite)
- Tailwind CSS & Flowbite-React (UI Components)
- Redux Toolkit & Redux Persist (State Management)
- React Router DOM (Client-side routing)
- Firebase (Google OAuth)

**Backend:**  
- Node.js & Express.js
- MongoDB & Mongoose (Database & ORM)
- JSON Web Tokens (JWT) & bcryptjs (Security)
- Cloudinary & Multer (Image Storage)

---

## 📂 Project Structure

```text
blog-app/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI (Header, Footer, DashSidebar, CommentSection)
│   │   ├── pages/              # App routes (SignIn, SignUp, Dashboard, PostPage, Search)
│   │   ├── redux/              # Redux slices (theme, user) and store configuration
│   │   └── firebase.js         # Firebase OAuth initialization
├── api/                        # Node.js Express Backend
│   ├── controllers/            # Business logic (auth, user, post, comment)
│   ├── models/                 # Database Schemas (User, Post, Comment)
│   ├── routes/                 # API Endpoints definition
│   ├── utils/                  # Middleware (Error handlers, verifyToken)
│   └── index.js                # Server entry point and DB connection
└── package.json                # Project dependencies and scripts

---

## 🔧 Getting Started

### 1. Install dependencies
Run this in both your `client` and backend root directories.
```bash
npm install

### 2. Run the development servers

**Backend:**
```bash
npm run dev

**Frontend:**
```bash
cd client
npm run dev
```
The React client runs on `http://localhost:5173` (Vite) and the API proxy targets the backend on `http://localhost:3000`.

---

## 🌐 Environment Variables

Create a `.env` file in your root backend directory to map the following variables:

| Variable                    | Description                         | Example                               |
| --------------------------- | ----------------------------------- | ------------------------------------- |
| `PORT`                      | Server port                         | `3000`                                |
| `MONGO`                     | Database Connection URI             | `mongodb+srv://<user>:<pwd>@cluster...` |
| `JWT_SECRET`                | Secret for Auth Tokens              | `supersecret123`                      |
| `CLOUDINARY_CLOUD_NAME`     | Cloudinary Name                     | `your_cloud_name`                     |
| `CLOUDINARY_API_KEY`        | Cloudinary API Key                  | `123456789012345`                     |
| `CLOUDINARY_API_SECRET`     | Cloudinary Secret                   | `abcdefghijklmnopqrstuvwxyz`          |

*(Note: You will also need your Firebase configuration keys inside `client/src/firebase.js` for OAuth to function).*

---

## 📈 Commit History Highlights
- **Foundation & UI:** Initialized React, Tailwind CSS, and Flowbite scaffolding to lay out the core UI concepts.
- **Database & Auth Integration:** Integrated MongoDB, created schemas, and established a secure, custom Auth loop alongside Google OAuth integration.
- **State Management:** Incorporated Redux Toolkit and Redux Persist for flawless client-side data management (theme switching, current user session).
- **Role-Based Dashboards:** Built protected user dashboards featuring customizable profiles, dark mode toggles, and rich-image uploading functionality.
- **Content Management:** Scaled the application by adding a full CRUD API for blog posts and integrating "Show More" pagination logic.
- **Community Features:** Added a complete comments system allowing authenticated users to comment, like, and edit their interactions.
- **Admin & Author Permissions:** Finalized logic allowing users to act as Authors (managing their own posts/comments), while granting Admins supreme moderation capabilities over the entire platform.

---

## 🛠️ Future Enhancements
- 🚀 **Deployment:** Host the frontend on Vercel/Netlify, the backend on Render/Heroku, and the database on MongoDB Atlas.
- 🔖 **Bookmarks/Saved Posts:** Allow users to save their favorite articles to a private reading list.
- ✉️ **Newsletter Subscription:** Capture reader emails for regular content updates.

---

## 🤝 Contributing
Contributions are welcome. Please fork the repository and open a pull request. For major changes, open an issue first to discuss what you would like to change.

---

## 📧 Contact
For support or inquiries, please open an issue or email: [ramnath2544@gmail.com](mailto:ramnath2544@gmail.com).