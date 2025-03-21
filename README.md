# University Course Registration System

## Introduction
This project is a modern, interactive university course registration system designed to streamline course enrollment and management. It addresses common issues like schedule conflicts, real-time seat availability, and prerequisite checking, making the process smoother for both students and administrators.

## Features
- **Student Dashboard:**
  - Login with roll number.
  - Interactive weekly schedule with real-time conflict checking.
  - Real-time seat availability updates.
  - Course filtering by department, level, and search.
  - Prerequisite validation: students must pass prerequisite courses before registering.

- **Admin Dashboard:**
  - Secure admin login.
  - Manage courses: add, update, and delete courses.
  - Manage student registrations: view and override registrations.
  - Generate reports and download them as formatted text files.

## Technologies
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB

## Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with your MongoDB connection string:

MONGO_URI=<your-mongodb-connection-string> PORT=5000

4. Start the server with `node server.js` or `npx nodemon server.js`.
5. Open the frontend pages in your browser.

## Usage
- **Students:** Log in using your roll number and register for courses via the interactive dashboard.
- **Admins:** Log in using your admin credentials to manage courses, registrations, and generate reports.

## License
This project is provided as-is under the MIT License.

