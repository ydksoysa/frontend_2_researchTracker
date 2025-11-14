import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/auth.service";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("MEMBER");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const res = await signup({ username, password, role });

      const msg =
        typeof res === "string"
          ? res
          : res?.message || "Registration successful! Redirecting to login...";

      setMessage(msg);

      setTimeout(() => navigate("/login"), 1200);
    } catch (err: any) {
      console.error(err);
      const errMsg =
        typeof err?.response?.data === "string"
          ? err.response.data
          : err?.response?.data?.message || "Registration failed";
      setError(errMsg);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        padding: 20,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: 32,
          borderRadius: 20,
          width: 360,
          boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
          animation: "fadeIn 0.5s ease",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 20,
            color: "#1e3a8a",
            fontWeight: 600,
          }}
        >
          Create an Account ✨
        </h2>

        <label style={{ color: "#475569", fontSize: 14 }}>Username</label>
        <input
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginTop: 5,
            marginBottom: 15,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            outline: "none",
            transition: "0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
          onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
          required
        />

        <label style={{ color: "#475569", fontSize: 14 }}>Password</label>
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginTop: 5,
            marginBottom: 15,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            outline: "none",
            transition: "0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
          onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
          required
        />

        <label style={{ color: "#475569", fontSize: 14 }}>Select Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            marginTop: 5,
            marginBottom: 15,
            borderRadius: 8,
            border: "1px solid #cbd5e1",
            background: "#fff",
            outline: "none",
            transition: "0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
          onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
        >
          <option value="MEMBER">Student</option>
          <option value="PI">PI</option>
          <option value="ADMIN">Admin</option>
        </select>

        {error && (
          <div style={{ color: "red", marginBottom: 10, fontSize: 14 }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{ color: "green", marginBottom: 10, fontSize: 14 }}>
            {message}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            background: "linear-gradient(135deg, #16a34a, #22c55e)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 500,
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Register
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: 14,
            fontSize: 14,
            color: "#475569",
          }}
        >
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2563eb", fontWeight: 500 }}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;



