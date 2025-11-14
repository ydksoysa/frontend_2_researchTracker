import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import MilestoneDashboard from "./pages/MilestoneDashboard";
import DocumentDashboard from "./pages/DocumentDashboard";
import UserMilestones from "./pages/UserMilestones";
import UserDocuments from "./pages/UserDocuments";
import AllProjects from "./pages/AllProjects";
import ManageMembers from "./pages/ManageMembers";

// Protected Route
const ProtectedRoute: React.FC<{ children: JSX.Element; roles?: string[] }> = ({
  children,
  roles,
}) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (roles && roles.length > 0) {
    if (!user.role || !roles.includes(user.role)) {
      if (user.role === "ADMIN") return <Navigate to="/admin" replace />;
      if (user.role === "PI") return <Navigate to="/allprojects" replace />;
      if (user.role === "MEMBER") return <Navigate to="/user" replace />;
      return <Navigate to="/login" replace />;
    }
  }

  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* DEFAULT ROUTE */}
      <Route
        path="/"
        element={
          user ? (
            user.role === "ADMIN" ? (
              <Navigate to="/admin" replace />
            ) : user.role === "PI" ? (
              <Navigate to="/allprojects" replace />
            ) : (
              <Navigate to="/user" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* ✅ LOGIN ROUTE (Missing before — caused blank page) */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* ADMIN ONLY */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manage-members"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <ManageMembers />
          </ProtectedRoute>
        }
      />

      {/* ADMIN + PI */}
      <Route
        path="/allprojects"
        element={
          <ProtectedRoute roles={["ADMIN", "PI"]}>
            <AllProjects />
          </ProtectedRoute>
        }
      />

      {/* MEMBER ONLY */}
      <Route
        path="/user"
        element={
          <ProtectedRoute roles={["MEMBER"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* ADMIN MILESTONES/DOCS */}
      <Route
        path="/projects/:projectId/milestones"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <MilestoneDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects/:projectId/documents"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <DocumentDashboard />
          </ProtectedRoute>
        }
      />

      {/* MEMBER VIEW */}
      <Route
        path="/user/projects/:projectId/milestones"
        element={
          <ProtectedRoute roles={["MEMBER"]}>
            <UserMilestones />
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/projects/:projectId/documents"
        element={
          <ProtectedRoute roles={["MEMBER"]}>
            <UserDocuments />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

// Main App
const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);

export default App;





