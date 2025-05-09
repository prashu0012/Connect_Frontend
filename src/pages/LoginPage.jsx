import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData, { withCredentials: true });

      // setCookie
      const accessToken = response.headers['accessToken'];
      const responseToken = response.headers['responseToken'];
      console.log(accessToken, "\n", responseToken);
      if (accessToken) Cookies.set('accessToken', accessToken, { path: '/', secure: true, sameSite: 'None' });
      if (responseToken) Cookies.set('responseToken', responseToken, { path: '/', secure: true, sameSite: 'None' });
      navigate("/");

    } catch (error) {
      console.log("Error ", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 border-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 border-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-md text-lg font-semibold hover:opacity-90 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-white text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

