import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useUserStore } from "../stores/useUserStore";
// import { sign } from "jsonwebtoken";

const Signup = () => {
  const [formData, setFormData] = useState({
     name: "",
     email: "", 
     password: "",
     confirmpassword: ""
    });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    navigate("/login"); // Redirect to login after signup
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-md bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 border-none"
            required
          />
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
            Sign Up
          </button>
        </form>
        <p className="text-amber-100 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

