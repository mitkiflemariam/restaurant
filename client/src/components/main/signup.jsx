import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const emailExists = existingUsers.some(
      (user) => user.email === formData.email
    );
    if (emailExists) {
      alert("Email already exists! Please use a different email.");
      return;
    }

    // Save new user
    const newUser = {
      fName: formData.fName,
      email: formData.email,
      password: formData.password, // Ideally, hash the password before storing
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Signed Up Successfully!");
    navigate("/login");

    // Clear form
    setFormData({
      fName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <br />
      <div className="flex items-center text-black justify-center min-h-screen ">
        <div className="p-6 shadow-xl rounded-lg border bg-card text-card-foreground overflow-hidden flex flex-col h-full w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Sign up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Full Name</Label>
                <Input
                  type="text"
                  name="fName"
                  value={formData.fName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline" aria-label="sign up">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
