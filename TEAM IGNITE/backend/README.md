# Farm-Connect Web Application Documentation


## Introduction

The Farm-Connect web application is a platform designed to connect farmers with wholesalers, enabling the exchange of locally grown products. It allows farmers to upload their products, and wholesalers can browse and purchase these products directly from the farmers.
## Features
- Farmers can upload products they have grown.
- Wholesalers can browse products uploaded by farmers and purchase them.
- Wholesalers can bargain with farmers on product prices.
- Notification system for farmers to accept or reject bargain requests.

## Technology Stack
- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Architecture Overview
The application follows the MERN (MongoDB, Express.js, React.js, Node.js) stack architecture.

- **Client Side** (Frontend): React.js is used to build the user interface and handle client-side interactions.

- **Server Side** (Backend): Node.js with Express.js is used to handle server-side logic and API endpoints.

- **Database**: MongoDB is used as the database to store user data, product information, and bargain requests.

-**Authentication**: JWT is used for user authentication and authorization.

## Installation:
**Prerequisites**
- Node.js and npm should be installed on your machine.
- MongoDB should be installed and running.

**Steps**
1. Clone the Frontend and Backend repository from GitHub:

  **Frontend:**
```python
git clone https://github.com/raghavjaiswal709/Project_Farm_Connect.git 
```


   **Backend:**
```python
git clone https://github.com/raghavjaiswal709/Project_Farm_Connect_Backend.git 
```

2. Rename Folder **Project_Farm_Connect_Backend** to **Backend**
3. Rename Folder **Project_Farm_Connect_frontend** to **frontend**
4. Navigate to the project directory:
```python
cd frontend
```
5. Install dependencies for Backend:
```python
npm install
```

6. Set up environment variables:
   - Create a **.env** file in the server directory.
   - Define following environment variables -

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_API= http://localhost:3000/`

4. Navigate to the project directory:
```python
  	cd ..
   ```

4. Navigate to the project directory:

  ```python
  	cd Backend
   ```


5. Install dependencies for Backend:

  ```python
  	npm install
   ```



6. Set up environment variables:
   - Create a **.env** file in the server directory.
   - Define following environment variables -

`PORT = 8080`

`MONGO_url =` 

`JWT_SECRET = `

`BRAINTREE_MERCHANT_ID = `

`BRAINTREE_PUBLIC_KEY = `

`BRAINTREE_PRIVATE_KEY = `

**Usage**
1. Start Both Server and client at a time (using concurrently)

   ```python
   npm run dev
   ```
      ```python
   "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "client": "npm start --prefix ../frontend",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }, ```

   
   2. Access the application in your web browser at  
      http://localhost:3000.


      For More details checkout 👇

      Docs Frontend : https://docs.google.com/document/d/1BGqAR-twFhGoGBUptZIqBUXemS3iCqcudnySke0D3DQ/edit?usp=sharing

      Docs Backend : https://docs.google.com/document/d/1PCiXe3jYtLolER0EZZSK-8INDJIQZGVt5DqyO21D09M/edit?usp=sharing


