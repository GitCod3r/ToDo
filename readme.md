# Todo App

A simple Todo application built with Node.js, Express, MongoDB, and TypeScript. This application includes user registration, login, and JWT authentication.

## Table of Contents
- [Task Definition](#task-definition)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing the Application](#testing-the-application)
- [API Endpoints](#api-endpoints)
- [Resources](#resources)


## Task Definition

Task:
You are challenged to do a simple To-Do app, using Node.JS (using Typescript
would be a bonus), where a user logs in, can post a note, can get/view his notes,
and can delete them, etc. No frontend is required (that would be a bonus too). The
idea is to use this app using Postman.

---


## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>= 12.x)
- npm (>= 6.x)
- MongoDB

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/GitCoder/todo.git
    cd todo
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB URI and JWT secret:

    ```plaintext
    MONGODB_URI=mongodb://yourUsername:yourPassword@yourHost:yourPort/yourDatabase?authSource=admin&ssl=true
    PORT=3000
    JWT_SECRET=your_jwt_secret
    ```

## Running the Application

Start the development server:

```sh
npm start
```

The server will start on http://localhost:3000.



### Testing the Application


```sh
npm test
```

### API Endpoints


User Endpoints

1.	Register a New User
	•	Endpoint: `POST /api/users/register`
	•	Description: Register a new user.
    ```json
	•	Body:
            {
                "username": "yourUsername",
                "email": "yourEmail@example.com",
                "password": "yourPassword"
            }
	•	Response:
            {
                "_id": "userId",
                "username": "yourUsername",
                "email": "yourEmail@example.com"
            }
    ```
2.	Login User
	•	Endpoint: `POST /api/users/login`
	•	Description: Login a user and return a JWT token.
    ```json
	•	Body:
            {
                "email": "yourEmail@example.com",
                "password": "yourPassword"
            }
	•	Response:
            {
            "token": "yourJWTtoken",
            "user": 
                {
                    "_id": "userId",
                    "username": "yourUsername",
                    "email": "yourEmail@example.com",
                    "createdAt": "datetime created"
                }
            }
    ```
3.	Get User Data
	•	Endpoint: `GET /api/users/me`
	•	Description: Get the authenticated user’s data.
	•	Headers:
            Authorization: Bearer yourJWTtoken
    ```json
	•	Response:
            {
                "_id": "userId",
                "username": "yourUsername",
                "email": "yourEmail@example.com"
            }
    ```
Todo Endpoints

1.	Get All Todos
	•	Endpoint: `GET /api/todos`
	•	Description: Get all todos for the authenticated user.
	•	Headers:
            Authorization: Bearer yourJWTtoken
    ```json
	•	Response:
            [
                {
                    "_id": "todoId",
                    "title": "Test Todo",
                    "completed": false,
                    "user": "userId"
                }
            ]
    ```
2.	Create a New Todo
	•	Endpoint: `POST /api/todos`
	•	Description: Create a new todo.
	•	Headers:
            Authorization: Bearer yourJWTtoken
    ```json
	•	Body:
            {
                "title": "Test Todo"
            }
	•	Response:
            {
                "_id": "todoId",
                "title": "Test Todo",
                "completed": false,
                "user": "userId"
            }
    ```
3.	Update a Todo
	•	Endpoint: `PUT /api/todos/:id`
	•	Description: Update a todo.
	•	Headers:
            Authorization: Bearer yourJWTtoken
    ```json
	•	Body:
            {
                "title": "Updated Todo",
                "completed": true
            }
	•	Response:
            {
                "_id": "todoId",
                "title": "Updated Todo",
                "completed": true,
                "user": "userId"
            }
    ```
4.	Delete a Todo
	•	Endpoint: `DELETE /api/todos/:id`
	•	Description: Delete a todo.
	•	Headers:
            Authorization: Bearer yourJWTtoken
	•	Response: 204 No Content






## Resources:

- Pluralsight Course - TypeScript 4: Getting Started
- https://www.typescriptlang.org/download/
- https://nodejs.org/en
- https://medium.com/@induwara99/a-step-by-step-guide-to-setting-up-a-node-js-project-with-typescript-6df4481cb335
- https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript
- https://blog.logrocket.com/how-to-set-up-node-typescript-express/
- https://dev.to/cristain/how-to-set-up-typescript-with-nodejs-and-express-2023-gf
- https://medium.com/@skhans/how-to-build-a-basic-node-js-crud-app-with-mongoose-and-mongodb-3e958a36001d
- https://www.mongodb.com/developer/languages/javascript/node-crud-tutorial/
- https://medium.com/@diogo.fg.pinheiro/simple-to-do-list-app-with-node-js-and-mongodb-chapter-1-c645c7a27583
- https://medium.com/@diogo.fg.pinheiro/simple-to-do-list-app-with-node-js-and-mongodb-chapter-2-3780a1c5b039
- https://dev.to/atultyagi612/build-a-basic-todo-app-with-nodejs-mongodb-20om
- https://github.com/nlharri/simple-todo-app-mongodb-express-node
- https://www.youtube.com/watch?v=d56mG7DezGs


## Important Notes
Used GitCoPilot to resolve erros when setting up environment
Used GitCoPilot to add inline comments
Used ChatGPT for Postman Collection



