# Contact Backend

## Features
- Add, Edit, and Delete Contacts
- Responsive Design
- Search and Filter Contacts
- User Authentication
- import/export excel
  

## Prerequisites
- Node.js (v14.x or later)
- npm or yarn
- A modern web browser

## Installation

1. Clone the repository:
   ```
   git clone git@github.com:SavaliyaJay/Contact_backend.git
   ```

2. Navigate to the project directory:
   ```
   cd Contact_backend
   ```

3. Install dependencies:
   ```
   npm install
   ```
   (or `yarn install` if using Yarn)

4. Set up environment variables:
   - Copy the `.env.example` file to `.env`
   - Fill in the necessary environment variables:
     ```
     PORT=port
     DATABASE_URL=your_database_connection_string
     JWT_SECRET=your_jwt_secret
     ```

5. [Any additional setup steps, like database migrations]

## Usage

1. Start the server:
   ```
   npm start
   ```
   (or `yarn start` if using Yarn)

2. The server will start running on `http://localhost:3000` (or the port you specified in the .env file)

## API Endpoints

### Contact Routes

- `GET /api/contacts`: Get all contacts
- `POST /api/contacts`: Create a new contact
- `POST /api/contacts/bulkUpload`: Create multiple contacts in bulk
- `GET /api/contacts/checkDuplicate`: Check for duplicate contacts
- `GET /api/contacts/:id`: Get a specific contact by ID
- `PUT /api/contacts/:id`: Update a specific contact
- `DELETE /api/contacts/:id`: Delete a specific contact
- `POST /api/contacts/bulkDelete`: Delete multiple contacts in bulk

### User Routes

- `POST /api/users/login`: User login
- `GET /api/users/current`: Get current user (requires authentication)

### Authentication

The `/api/users/current` endpoint requires a valid token. Use the `validateToken` middleware for protected routes.

## Contact
Jay Savaliya - work.jaysavaliya@gmail.com

Project Link: [https://contact-frontend-three.vercel.app/](https://contact-frontend-three.vercel.app/)

login by using this creditatial

email: admin@gmail.com
password: 123456789
