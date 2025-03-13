import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import Header from "./header";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Initialize navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists with matching credentials
    const user = existingUsers.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (user) {
      alert("Logged In Successfully!");
      localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store logged-in user
      navigate("/"); // Redirect to dashboard or home
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      {/* <Header /> */}
      <br />
      <div className="flex items-center text-black justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don&apos;t have an account?
            <Link to="/signup" className="text-blue-500 ml-1 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
