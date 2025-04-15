import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Initial empty state for a new restaurant
const EMPTY_RESTAURANT = {
  name: "",
  location: ""
};

const RestaurantForm = ({ isOpen, onClose, restaurant, onSubmit, mode }) => {
  // State for form data and UI
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage]=useState("")
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  // Load existing restaurant data when in edit mode
  useEffect(() => {
    if (restaurant && mode === "edit") {
      setName(restaurant.name || "");
      setLocation(restaurant.location || "");
      setImage(restaurant.image || "");
    } else {
      // Reset form for new restaurant
      setName("");
      setLocation("");
      setImage("");
    }
    // Clear any errors
    setNameError("");
    setLocationError("");
    setFormError("");
  }, [restaurant, mode, isOpen]);
  
  // Validate and handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setNameError("");
    setLocationError("");
    setFormError("");
    
    // Validate form fields
    let isValid = true;
    
    if (!name.trim()) {
      setNameError("Restaurant name is required");
      isValid = false;
    }
    
    if (!location.trim()) {
      setLocationError("Location is required");
      isValid = false;
    }
    if (!image.trim()) {
      setImageError("Location is required");
      isValid = false;
    }
    
    if (!isValid) return;
    
    // Proceed with submission
    setIsSaving(true);
    
    try {
      await onSubmit({ name, location });
      onClose(); // Close dialog on success
    } catch (error) {
      console.error("Failed to save restaurant:", error);
      setFormError(
        error.response?.data?.message || 
        "Could not save the restaurant. Please try again."
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
            {mode === "add" ? "Add New Restaurant" : "Edit Restaurant"}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} id="restaurant-form" className="space-y-4">
            {/* Restaurant Name Field */}
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="name" className="text-sm font-medium w-1/3">
                Restaurant Name
              </label>
              <div className="w-2/3">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter restaurant name"
                  autoFocus
                  autoComplete="off"
                  className={nameError ? "border-red-500" : ""}
                />
                {nameError && (
                  <p className="text-sm text-red-500 mt-1">{nameError}</p>
                )}
              </div>
            </div>
            
            {/* Location Field */}
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="location" className="text-sm font-medium w-1/3">
                Location
              </label>
              <div className="w-2/3">
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                  autoComplete="off"
                  className={locationError ? "border-red-500" : ""}
                />
                {locationError && (
                  <p className="text-sm text-red-500 mt-1">{locationError}</p>
                )}
              </div>
            </div>
            {/* Location Field */}
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="location" className="text-sm font-medium w-1/3">
                Image
              </label>
              <div className="w-2/3">
                <Input
                  id="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Enter image"
                  autoComplete="off"
                  // className={locationError ? "border-red-500" : ""}
                />
                {/* {locationError && (
                  <p className="text-sm text-red-500 mt-1">{locationError}</p>
                )} */}
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
            form="restaurant-form"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : (mode === "add" ? "Add Restaurant" : "Save Changes")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RestaurantForm;