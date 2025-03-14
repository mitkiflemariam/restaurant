import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
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
      <div className="flex items-center text-black justify-center min-h-screen ">
        <div className="p-6 shadow-xl rounded-lg border bg-card text-card-foreground overflow-hidden flex flex-col h-full w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="underline" aria-label="sign up">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
