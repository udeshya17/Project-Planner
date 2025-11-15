import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./router";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import Dashboard from "./features/dashboard/Dashboard";
import ProjectPage from "./features/project/ProjectPage";
import Navbar from "./components/navbar/Navbar";
import ToastContainer from "./components/toast/ToastContainer";
import AppLoader from "./components/loader/AppLoader";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <AppLoader />;
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-10 pt-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects/:projectId" element={<ProjectPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
