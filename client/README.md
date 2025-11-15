# Project Planner – Client (React)

This is the React frontend for the **Project Planner** application. It talks to the Node/Express backend in the `server` folder and is designed around a Kanban-style project view similar to Notion's boards.

## Tech stack

- React with Vite
- React Router
- Axios for HTTP
- Tailwind CSS for styling
- `@hello-pangea/dnd` for drag-and-drop on the Kanban board

## Getting started

From the project root:

```bash
cd client
npm install
npm run dev
```

By default the app expects the API at `http://localhost:4000/api`. You can override this via:

```bash
VITE_API_BASE_URL="https://your-backend-url.com/api"
```

Create a `.env` file in `client` if you want to set this for local development.

## File structure

The client is organised by responsibility, keeping shared pieces reusable and feature code easy to navigate:

```text
client/
│
├── src/
│   ├── api/                   → axios instances, API functions
│   │     ├── axios.js
│   │     ├── auth.api.js
│   │     ├── project.api.js
│   │     └── task.api.js
│   │
│   ├── context/               → React Context providers
│   │     ├── AuthContext.js
│   │     ├── ProjectContext.js
│   │     └── UIContext.js
│   │
│   ├── hooks/                 → Custom hooks
│   │     ├── useProjects.js
│   │     ├── useTasks.js
│   │     └── useAuth.js
│   │
│   ├── components/            → Reusable components
│   │     ├── navbar/
│   │     │     └── Navbar.jsx
│   │     ├── forms/
│   │     │     ├── AuthLayout.jsx
│   │     │     └── TextInput.jsx
│   │     ├── cards/
│   │     │     └── ProjectCard.jsx
│   │     ├── toast/
│   │     │     └── ToastContainer.jsx
│   │     └── loader/
│   │           └── Spinner.jsx
│   │
│   ├── features/              → Feature-based UI
│   │     ├── auth/
│   │     │     ├── Login.jsx
│   │     │     └── Signup.jsx
│   │     ├── dashboard/
│   │     │     └── Dashboard.jsx
│   │     ├── project/
│   │     │     ├── ProjectPage.jsx
│   │     │     ├── AddTaskModal.jsx
│   │     │     ├── AddMemberModal.jsx
│   │     │     └── ProjectPlanner.jsx
│   │     └── tasks/
│   │           └── TaskCard.jsx
│   │
│   ├── utils/
│   │     ├── socket.js        → placeholder for future Socket.IO client
│   │     └── helpers.js
│   │
│   ├── styles/
│   │     └── index.css        → Tailwind entry point
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── router.jsx
│
├── package.json
└── README.md
```

## Behaviour overview

- **Auth** – Signup/Login pages call the backend `/api/auth/signup` and `/api/auth/login` endpoints. JWT and user data are stored in `localStorage` and exposed via `AuthContext`.
- **Dashboard** – After logging in, users see all projects returned from `/api/projects`. Each card shows title, task count, and a derived completion percentage.
- **Project page** – Displays a Kanban board with three columns (To-do, In progress, Completed). Tasks are loaded from `/api/projects/:id`. Creating, updating (including drag-and-drop status changes), and deleting tasks call the corresponding task APIs.
- **Feedback** – A lightweight `UIContext` with a `ToastContainer` shows success and error notifications for key actions.

Real-time updates via websockets are intentionally left out for now; a `socket.js` helper is in place to wire this in later without changing the current components too much.


