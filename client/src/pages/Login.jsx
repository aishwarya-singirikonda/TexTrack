import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", formData);

      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data)
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-blue-900">
          TexTrack
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Sign in to your account
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            onChange={handleChange}
          />

          <button className="w-full bg-blue-900 text-white py-3 rounded-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;