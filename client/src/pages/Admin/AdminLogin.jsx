import axios from "../../api/axios";
import { useState } from "react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await axios.post("/api/admin/auth/login", {
      email,
      password,
    });
    localStorage.setItem("adminToken", res.data.token);
    window.location.href = "/admin/dashboard";
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input
        placeholder="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={submit}>Login</button>
    </div>
  );
};

export default AdminLogin;
