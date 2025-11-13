

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
import ManageMembers from "./pages/ManageMembers"; // ✅ NEW IMPORT

// ✅ Updated Protected route wrapper to support multiple roles
const ProtectedRoute: React.FC<{ children: JSX.Element; roles?: string[] }> = ({
  children,
  roles,
}) => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  
  // If roles are specified, check if user's role is in the allowed list
  if (roles && roles.length > 0) {
    if (!user.role || !roles.includes(user.role)) {
      // Redirect based on user's actual role
      if (user.role === "ADMIN") return <Navigate to="/admin" />;
      if (user.role === "PI") return <Navigate to="/allprojects" />;
      if (user.role === "MEMBER") return <Navigate to="/user" />;
      return <Navigate to="/login" />;
    }
  }
  
  return children;
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Login and Register */}
     <Route
  path="/"
  element={
    user ? (
      user.role === "ADMIN" ? (
        <Navigate to="/admin" />
      ) : user.role === "PI" ? (
        <Navigate to="/allprojects" />
      ) : (
        <Navigate to="/user" />
      )
    ) : (
      <Navigate to="/login" />
    )
  }
/>
      <Route path="/register" element={<Register />} />

      {/* Admin Dashboard - ADMIN only */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ✅ NEW: Manage Members Page - ADMIN only */}
      <Route
        path="/manage-members"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <ManageMembers />
          </ProtectedRoute>
        }
      />

      {/* ✅ All Projects Page - Accessible to ADMIN and PI */}
      <Route
        path="/allprojects"
        element={
          <ProtectedRoute roles={["ADMIN", "PI"]}>
            <AllProjects />
          </ProtectedRoute>
        }
      />

      {/* User Dashboard - MEMBER only */}
      <Route
        path="/user"
        element={
          <ProtectedRoute roles={["MEMBER"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin: Milestones & Documents - ADMIN only */}
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

      {/* User: Milestones & Documents (Read-Only) - MEMBER only */}
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

      {/* Default fallback */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

// ✅ Main App component
const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);

export default App;




