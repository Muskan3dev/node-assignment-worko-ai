 # User API

This is a simple User API built with Node.js, Express, and MongoDB. The API allows you to list all users, get user details by ID, and create a new user,update user details and delete user.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

  
git clone https://github.com/yourusername/user-api.git

2. Navigate to the project directory:

cd user-api


3.Install the dependencies:

npm install


4.Create a .env file in the root directory and add your MongoDB URI and JWT secret:

DB_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret


Running the API
1.Start the server:

npm start


2.Running Tests


To run the tests, use the following command:

npm test


API Endpoints:


List All Users
URL: /worko/user
Method: GET
Headers:
Authorization: Bearer <token>
Response:
200 OK - Returns a list of all users



Get User Details by ID
URL: /worko/user/:id
Method: GET
Headers:
Authorization: Bearer <token>
Response:
200 OK - Returns the user details



Create a New User
URL: /worko/user
Method: POST
Headers:
Authorization: Bearer <token>
Body:
email (string) - User's email
name (string) - User's name
age (number) - User's age
city (string) - User's city
zipCode (string) - User's zip code
password (string) - User's password

Response:
201 Created - Returns the created user's token

Technologies Used
Node.js

Express

MongoDB

Mongoose

JWT

Supertest

Jest
