import { useState } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/auth/login", form);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    navigate(data.role === "admin" ? "/admin/doctors" : "/patient/doctors");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">LOGIN</h2>
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-4" />
        <button className="bg-blue-600 text-white w-full p-2 rounded">Login</button>
        <div className="mt-2">
          <span>New User <Link to="/register" className="text-blue-900 font-semibold">Click here !</Link></span>
            
        </div>
      </form>
    </div>
  );
};

export default Login;
