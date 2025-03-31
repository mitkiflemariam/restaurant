import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Simple email validation
const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const UserForm = ({ isOpen, onClose, user, onSubmit, mode }) => {
  // State for form data
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  
  // State for validation errors
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  
  // UI state
  const [isSaving, setIsSaving] = useState(false);

  // Load user data when editing
  useEffect(() => {
    if (user && mode === "edit") {
      setFirstname(user.firstname || "");
      setLastname(user.lastname || "");
      setUsername(user.username || "");
      setEmail(user.email || "");
      setRole(user.role || "user");
      setPassword(""); // Don't populate password for security
    } else {
      // Reset form for new users
      setFirstname("");
      setLastname("");
      setUsername("");
      setEmail("");
      setRole("user");
      setPassword("");
    }
    
    // Clear any errors
    clearErrors();
  }, [user, mode, isOpen]);

  // Clear all validation errors
  const clearErrors = () => {
    setFirstnameError("");
    setLastnameError("");
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setFormError("");
  };

  // Validate the form before submission
  const validateForm = () => {
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate required fields
    if (!firstname.trim()) {
      setFirstnameError("First name is required");
      isValid = false;
    }
    
    if (!lastname.trim()) {
      setLastnameError("Last name is required");
      isValid = false;
    }
    
    if (!username.trim()) {
      setUsernameError("Username is required");
      isValid = false;
    }
    
    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }
    
    // Validate password - only required for new users
    if (mode === "add" && !password.trim()) {
      setPasswordError("Password is required for new users");
      isValid = false;
    } else if (password && password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }
    
    return isValid;
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate before submitting
    if (!validateForm()) return;
    
    setIsSaving(true);
    
    try {
      // Prepare data for submission
      const submitData = {
        firstname,
        lastname,
        username,
        email,
        role,
        ...(password && { password })
      };
      
      // Submit and close on success
      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error("Could not save user:", error);
      
      // Show error message
      setFormError(
        error.response?.data?.message || 
        "Could not save user. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };
  
  // Cancel form and close dialog
  const handleCancel = () => {
    onClose();
  };
  
  // Don't render anything if the form is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            {mode === "add" ? "Add New User" : "Edit User"}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} id="user-form" className="space-y-4">
            {/* First Name Field */}
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="firstname" className="text-sm font-medium w-1/3">
                First Name
              </label>
              <div className="w-2/3">
                <Input
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Enter first name"
                  autoFocus
                  autoComplete="off"
                  className={firstnameError ? "border-red-500" : ""}
                />
                {firstnameError && (
                  <p className="text-sm text-red-500 mt-1">{firstnameError}</p>
                )}
              </div>
            </div>
            
            {/* Last Name Field */}
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="lastname" className="text-sm font-medium w-1/3">
                Last Name
              </label>
              <div className="w-2/3">
                <Input
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Enter last name"
                  autoComplete="off"
                  className={lastnameError ? "border-red-500" : ""}
                />
                {lastnameError && (
                  <p className="text-sm text-red-500 mt-1">{lastnameError}</p>
                )}
              </div>
            </div>
            
            {/* Username Field */}
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="username" className="text-sm font-medium w-1/3">
                Username
              </label>
              <div className="w-2/3">
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  autoComplete="off"
                  className={usernameError ? "border-red-500" : ""}
                />
                {usernameError && (
                  <p className="text-sm text-red-500 mt-1">{usernameError}</p>
                )}
              </div>
            </div>
            
            {/* Email Field */}
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="email" className="text-sm font-medium w-1/3">
                Email
              </label>
              <div className="w-2/3">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  autoComplete="off"
                  className={emailError ? "border-red-500" : ""}
                />
                {emailError && (
                  <p className="text-sm text-red-500 mt-1">{emailError}</p>
                )}
              </div>
            </div>
            
            {/* Role Field */}
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="role" className="text-sm font-medium w-1/3">
                Role
              </label>
              <div className="w-2/3">
                <Select
                  value={role}
                  onValueChange={setRole}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select user role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Password Field */}
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="password" className="text-sm font-medium w-1/3">
                {mode === "edit" ? "New Password" : "Password"}
              </label>
              <div className="w-2/3">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "edit" ? "Leave blank to keep current" : "Enter password"}
                  autoComplete="new-password"
                  className={passwordError ? "border-red-500" : ""}
                />
                {passwordError && (
                  <p className="text-sm text-red-500 mt-1">{passwordError}</p>
                )}
              </div>
            </div>
            
            {/* Form-level error message */}
            {formError && (
              <div className="p-3 mt-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
                {formError}
              </div>
            )}
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2 border-t px-6 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            form="user-form"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : (mode === "add" ? "Add User" : "Save Changes")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserForm;