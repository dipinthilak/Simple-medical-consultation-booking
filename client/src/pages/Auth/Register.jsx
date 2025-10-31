import { useState } from "react";
import axios from "../../api/axios";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "patient" });
  
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    if(form.name.trim('').length==0||form.email==""||form.password=="")
    {
      alert("Fill all details")
    }
    const res=await axios.post("http://localhost:4000/api/auth/register", form);
    
    



    if(res.data.success){
      alert("Registered successfully!");
      navigate("/login");
    }
    else{
      alert("Registered not successfully!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-md w-2/4">
        <h2 className="text-2xl font-bold mb-4 text-center">REGISTER</h2>
        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full mb-2" />
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full mb-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-2" />

        <select name="role" onChange={handleChange} className="border p-2 w-full mb-4">
          <option value="patient">Patient</option>
          <option value="admin">Admin</option>
        </select>

        <button className="bg-blue-600 text-2xl text-white w-full p-2 rounded">REGISTER</button>
      </form>
    </div>
  );
};

export default Register;
