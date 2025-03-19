import React, { useState } from "react";
import { requestPasswordReset } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function RequestReset() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestPasswordReset(email);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending reset link");
    }
  };

  return (
    <div className="flex items-center text-black justify-center min-h-screen">
      <div className="p-6 shadow-xl rounded-lg border bg-card text-card-foreground overflow-hidden flex flex-col h-full w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        {message && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Send Reset Link{" "}
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            <p>
              Remember your password?{" "}
              <Link to="/login" className="underline" aria-label="sign in">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestReset;
