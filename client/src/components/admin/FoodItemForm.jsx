import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

// Food categories for the dropdown
const CATEGORIES = [
  "appetizer",
  "main course", 
  "dessert",
  "beverage",
  "breakfast",
  "lunch", 
  "dinner",
  "snack"
];

const FoodItemForm = ({ isOpen, onClose, foodItem, onSubmit, mode }) => {
  // State for food data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  const [available, setAvailable] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  
  // State for restaurants dropdown
  const [restaurants, setRestaurants] = useState([]);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(false);
  
  // State for validation errors
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [restaurantError, setRestaurantError] = useState("");
  const [formError, setFormError] = useState("");
  
  // UI state
  const [isSaving, setIsSaving] = useState(false);
  
  // Load restaurants for dropdown
  useEffect(() => {
    if (!isOpen) return;
    
    async function fetchRestaurants() {
      setIsLoadingRestaurants(true);
      
      try {
        const response = await axios.get("http://localhost:3000/api/restaurants");
        let restaurantsList = [];
        
        if (Array.isArray(response.data)) {
          restaurantsList = response.data;
        } else if (response.data && Array.isArray(response.data.restaurants)) {
          restaurantsList = response.data.restaurants;
        }
        
        setRestaurants(restaurantsList);
        
        // Set default restaurant for new items
        if (mode === "add" && restaurantsList.length > 0 && !restaurantId) {
          setRestaurantId(restaurantsList[0]._id);
        }
      } catch (error) {
        console.error("Could not load restaurants:", error);
      } finally {
        setIsLoadingRestaurants(false);
      }
    }
    
    fetchRestaurants();
  }, [isOpen, mode]);

  // Load food item data when editing
  useEffect(() => {
    if (foodItem && mode === "edit") {
      setName(foodItem.name || "");
      setDescription(foodItem.description || "");
      setPrice(foodItem.price ? String(foodItem.price) : "");
      setCategory(foodItem.category || "");
      setRestaurantId(foodItem.restaurant || "");
      setAvailable(foodItem.available ?? true);
      setImageUrl(foodItem.image || "");
    } else {
      // Reset form for new food item
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setAvailable(true);
      setImageUrl("");
      // Restaurant is set from the dropdown data
    }
    
    // Clear any errors
    clearErrors();
  }, [foodItem, mode, isOpen]);

  // Clear all validation errors
  const clearErrors = () => {
    setNameError("");
    setDescriptionError("");
    setPriceError("");
    setCategoryError("");
    setRestaurantError("");
    setFormError("");
  };

  // Validate the form before submission
  const validateForm = () => {
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate required fields
    if (!name.trim()) {
      setNameError("Food item name is required");
      isValid = false;
    }
    
    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    }
    
    if (!category) {
      setCategoryError("Category is required");
      isValid = false;
    }
    
    if (!restaurantId) {
      setRestaurantError("Restaurant is required");
      isValid = false;
    }
    
    // Validate price
    if (!price) {
      setPriceError("Price is required");
      isValid = false;
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
      setPriceError("Price must be a positive number");
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
        name,
        description,
        price: Number(price),
        category: category.toLowerCase(),
        restaurant: restaurantId,
        available,
        image: imageUrl
      };
      
      // Submit and close on success
      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error("Could not save food item:", error);
      
      // Show error message
      setFormError(
        error.response?.data?.message || 
        error.response?.data?.error || 
        "Could not save food item. Please try again."
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
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            {mode === "add" ? "Add New Food Item" : "Edit Food Item"}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} id="food-form" className="space-y-4">
            {/* Name Field */}
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="name" className="text-sm font-medium w-1/3">
                Food Name
              </label>
              <div className="w-2/3">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter food name"
                  autoFocus
                  autoComplete="off"
                  className={nameError ? "border-red-500" : ""}
                />
                {nameError && (
                  <p className="text-sm text-red-500 mt-1">{nameError}</p>
                )}
              </div>
            </div>
            
            {/* Description Field */}
            <div className="flex items-start gap-4 mb-2">
              <label htmlFor="description" className="text-sm font-medium w-1/3 pt-2">
                Description
              </label>
              <div className="w-2/3">
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe this food item"
                  rows={3}
                  autoComplete="off"
                  className={descriptionError ? "border-red-500" : ""}
                />
                {descriptionError && (
                  <p className="text-sm text-red-500 mt-1">{descriptionError}</p>
                )}
              </div>
            </div>
            
            {/* Price Field */}
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="price" className="text-sm font-medium w-1/3">
                Price ($)
              </label>
              <div className="w-2/3">
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  autoComplete="off"
                  className={priceError ? "border-red-500" : ""}
                />
                {priceError && (
                  <p className="text-sm text-red-500 mt-1">{priceError}</p>
                )}
              </div>
            </div>
            
            {/* Category Dropdown */}
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="category" className="text-sm font-medium w-1/3">
                Category
              </label>
              <div className="w-2/3">
                <Select
                  value={category}
                  onValueChange={setCategory}
                >
                  <SelectTrigger id="category" className={categoryError ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select food category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {categoryError && (
                  <p className="text-sm text-red-500 mt-1">{categoryError}</p>
                )}
              </div>
            </div>
            
            {/* Restaurant Dropdown */}
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="restaurant" className="text-sm font-medium w-1/3">
                Restaurant
              </label>
              <div className="w-2/3">
                <Select
                  value={restaurantId}
                  onValueChange={setRestaurantId}
                  disabled={isLoadingRestaurants}
                >
                  <SelectTrigger id="restaurant" className={restaurantError ? "border-red-500" : ""}>
                    <SelectValue placeholder={isLoadingRestaurants ? "Loading..." : "Select restaurant"} />
                  </SelectTrigger>
                  <SelectContent>
                    {restaurants.map((restaurant) => (
                      <SelectItem key={restaurant._id} value={restaurant._id}>
                        {restaurant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {restaurantError && (
                  <p className="text-sm text-red-500 mt-1">{restaurantError}</p>
                )}
              </div>
            </div>
            
            {/* Image URL Field */}
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="image" className="text-sm font-medium w-1/3">
                Image URL
              </label>
              <div className="w-2/3">
                <Input
                  id="image"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  autoComplete="off"
                />
              </div>
            </div>
            
            {/* Available Checkbox */}
            <div className="flex items-center gap-4 mb-2">
              <label className="text-sm font-medium w-1/3">
                Availability
              </label>
              <div className="w-2/3 flex items-center space-x-2">
                <Checkbox
                  id="available"
                  checked={available}
                  onCheckedChange={setAvailable}
                />
                <label htmlFor="available" className="text-sm font-medium">
                  Item is available for order
                </label>
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
            form="food-form"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : (mode === "add" ? "Add Food Item" : "Save Changes")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FoodItemForm;
