**Vacation Packages Management System**

Full-Stack Web Application built with React (Frontend) and Node.js + Express (Backend),
providing a complete solution for managing and booking vacation packages abroad.

**Overview:**

This project enables users to browse, book, and manage vacation packages with features such as package management, order processing, authentication, and role-based access control. The system provides a modern, intuitive UI and a secure, scalable backend.

**Features:**

For Administrators
Vacation Package Management: Add, update, and delete vacation packages (destination, price, description, availability).
Destination Management: Organize and filter packages by continent or destination.
User & Order Control: Manage users, view orders, and monitor system activity.

**For Users:**

Browse Packages: View available vacation packages with details such as price (adult/child), services, and availability.
Book Vacations: Place new orders, including number of participants, meal plans, and discount codes.
Order Management: Update or cancel existing bookings.
Real-Time Pricing: Automatic calculation of total price based on participants and options.

**Technology Stack:**

Frontend (React):

-React + React Router
-Context API for user authentication & state management
-Dynamic forms and real-time price calculation
-Modern UI with responsive design

Backend (Node.js & Express):

-RESTful API with modular architecture
-JWT Authentication with role-based authorization
-Middleware for token verification and refresh
-Controllers for destinations, users, and orders

Database & Data Handling:

-Add here: MySQL 
-Data models with clean separation between logic and persistence

DevOps & Tools:

-Git & GitHub for version control
-Postman for API testing
-Environment variables for secure configuration

**Security:**

-JWT-based authentication & authorization
-Role-based access control (Admin/User)
-Token renewal for expired sessions

**How to Run:**

Clone the repository
[git clone](https://github.com/avigail-levy/Airganization-project)
Install dependencies
cd server && npm install
cd client && npm install

Configure environment variables (.env)

Run backend & frontend
npm run dev
