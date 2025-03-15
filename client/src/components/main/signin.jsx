import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { loginUser } from "@/lib/utils";
import { AuthContext } from "@/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Initialize navigation
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Sending to loginUser:", formData);
    try {
      // Basic input validation
      if (!formData.email || !formData.password) {
        throw new Error("Please fill in all fields");
      }
      const response = await loginUser(formData);
      console.log("Response:", response);
      if (!response.token) {
        throw new Error("Invalid response from server");
      }

      // localStorage.setItem("token", response.token);
      login(response.token, response.username || formData.email);
      navigate("/", { replace: true });
    } catch (err) {
      // console.error("Error details:", err.response?.data); // Log server response
      // setError(
      //   err.response?.data?.message || "Login failed. Please try again."
      // );
      setError(err.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex items-center text-black justify-center min-h-screen ">
        <div className="p-6 shadow-xl rounded-lg border bg-card text-card-foreground overflow-hidden flex flex-col h-full w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                  disabled={isLoading}
                  aria-invalid={error ? "true" : "false"}
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
                  disabled={isLoading}
                  aria-invalid={error ? "true" : "false"}
                  placeholder="Password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:underline"
                  aria-label="sign up"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
          <p>
            <Link to="/request-reset" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
