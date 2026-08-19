import axios from "../../api/axios";
import { useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("/admin/auth/login", {
        email,
        password,
      });

      const token = res.data?.token;

      if (!token) {
        throw new Error(
          "Login successful but server did not return a token."
        );
      }

      localStorage.setItem("adminToken", token);

      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error(
        "Admin login failed:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Admin Login</h2>

      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default AdminLogin;