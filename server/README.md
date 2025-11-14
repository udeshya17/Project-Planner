## Collaborative Project Planner - Backend

This is the Node.js/Express backend for the Collaborative Project Planner (MERN) application. It exposes JWT-protected REST APIs for authentication, projects, and tasks, using MongoDB as the database.

### Tech stack

- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- Joi for request validation

### Folder structure

```text
server/

├── src/
│   ├── config/                → DB, JWT, environment configs
│   │     ├── db.js
│   │     ├── logger.js
│   │     └── index.js
│   │
│   ├── models/                → Mongoose schemas
│   │     ├── User.model.js
│   │     ├── Project.model.js
│   │     └── Task.model.js
│   │
│   ├── middleware/            → JWT auth, validation, error handling
│   │     ├── auth.js
│   │     ├── asyncHandler.js
│   │     ├── validate.js
│   │     └── errorHandler.js
│   │
│   ├── services/              → Business logic layer
│   │     ├── auth.service.js
│   │     ├── project.service.js
│   │     └── task.service.js
│   │
│   ├── controllers/           → API Route handlers
│   │     ├── auth.controller.js
│   │     ├── project.controller.js
│   │     └── task.controller.js
│   │
│   ├── routes/                → REST API routes
│   │     ├── auth.routes.js
│   │     ├── project.routes.js
│   │     └── task.routes.js
│   │
│   ├── sockets/               → Socket.IO real-time events
│   │     └── project.socket.js
│   │
│   ├── utils/                 → Helper utilities
│   │     ├── ApiResponse.js
│   │     ├── ApiError.js
│   │     └── calculatePercentage.js
│   │
│   ├── validation/            → Joi schemas
│   │     ├── auth.validation.js
│   │     ├── project.validation.js
│   │     └── task.validation.js
│   │
│   ├── app.js                 → Express setup
│   └── server.js              → Start server
│
├── .env
├── package.json
└── README.md
```

### Setup

1. Install dependencies:

```bash
cd server
npm install
```

2. Create a `.env` file in the `server` directory with:

```bash
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-strong-secret
PORT=4000
```

3. Run in development mode:

```bash
npm run dev
```

The API will be available at `http://localhost:4000`.

### Main endpoints

- `POST /api/auth/signup` – register user
- `POST /api/auth/login` – log in and receive JWT
- `GET /api/projects` – list projects where the user is a member
- `POST /api/projects` – create project (authenticated)
- `GET /api/projects/:id` – project details with tasks
- `PATCH /api/projects/:id` – update project (owner only)
- `DELETE /api/projects/:id` – delete project and its tasks (owner only)
- `POST /api/projects/:id/members` – add member by email (owner only)
- `POST /api/tasks/:projectId/tasks` – create task in project (members only)
- `PATCH /api/tasks/:id` – update task (members only)
- `DELETE /api/tasks/:id` – delete task (members only)


