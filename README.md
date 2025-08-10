# Store Rating Application

This is a full-stack web application built as a coding challenge for Roxiler Systems. It allows users to sign up, view a list of stores, and submit ratings. The application features three distinct user roles: System Administrator, Normal User, and Store Owner, each with its own set of permissions and functionalities.

---

## Features

### 1. System Administrator
- **Dashboard:** View key statistics, including the total number of users, stores, and ratings.
- **User Management:** Add new users (including other admins) and view a filterable and sortable list of all registered users.
- **Store Management:** Add new stores to the platform and view a complete list of all stores.

### 2. Normal User
- **Authentication:** Sign up for a new account and log in.
- **Store Viewing:** View a list of all registered stores and search for them by name or address.
- **Rating System:** Submit a star rating (1-5) for any store and modify existing ratings.

### 3. Store Owner
- **Dashboard:** View a list of all users who have rated their specific store.
- **Analytics:** See the store's current average rating based on all user submissions.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JSON Web Tokens (JWT)

---

## Getting Started

Follow these instructions to get a local copy of the project up and running for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/SatvikXV/Roxiler-Systems.git](https://github.com/SatvikXV/Roxiler-Systems.git)
    cd Roxiler-Systems
    ```

2.  **Backend Setup:**
    - Navigate to the server directory: `cd server`
    - Install dependencies: `npm install`
    - Set up your database:
        - Make sure your PostgreSQL server is running.
        - Open `server/config/config.json` and update the `development` section with your PostgreSQL username and password.
    - Create and initialize the database tables: `npx sequelize-cli db:create && npx sequelize-cli db:migrate`
    - Start the backend server: `npm start`
      (The server will run on `http://localhost:5000`)

3.  **Frontend Setup:**
    - Open a **new terminal** and navigate to the client directory: `cd client`
    - Install dependencies: `npm install`
    - Start the frontend development server: `npm start`
      (The application will open in your browser at `http://localhost:3000`)

---

## Application Screenshots

**User Dashboard (Viewing Stores)**
<img width="1920" height="869" alt="image (2)" src="https://github.com/user-attachments/assets/4107bf12-9d42-4707-8c74-91c87beddb07" />

**Login Page**

<img width="1920" height="861" alt="image (1)" src="https://github.com/user-attachments/assets/938e4c1f-43ba-4dea-9e26-2b1c7a30b3fe" />

**Welcome / Landing Page**
<img width="1920" height="870" alt="image" src="https://github.com/user-attachments/assets/c39ea9ad-59ab-49b1-b946-20d729658827" />

