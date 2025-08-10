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
![User Dashboard](https://i.imgur.com/c3795e5f-609f-47a9-b30b-c811ca8f93da.png)

**Login Page**
![Login Page](https://i.imgur.com/ee07f216-ea6a-4682-a9cb-0bd8fc9dedbd.png)

**Welcome / Landing Page**
![Welcome Page](https://i.imgur.com/26dc6ed6-401a-4b85-9f59-fb3760148633.png)
