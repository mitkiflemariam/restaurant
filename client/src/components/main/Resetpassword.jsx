import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(token, newPassword);
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="flex items-center text-black justify-center min-h-screen ">
      <div className="p-6 shadow-xl rounded-lg border bg-card text-card-foreground overflow-hidden flex flex-col h-full w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Input
                type="password"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
