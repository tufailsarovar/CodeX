import axios from "../../api/axios";
import { useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await axios.post("/admin/auth/login", {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);

      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error(
        "Admin login failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submit}>
        Login
      </button>
    </div>
  );
};

export default AdminLogin;