import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash, Eye } from "lucide-react";
import axios from "axios";
import FoodItemForm from "./FoodItemForm";
import DeleteConfirmation from "./DeleteConfirmation";

const FoodItemsTable = ({
  foods,
  loading,
  error,
  searchTerm,
  setSearchTerm,
  currentPage,
  setCurrentPage,
  sortConfig,
  requestSort,
  refreshData,
}) => {
  const [isFoodFormOpen, setIsFoodFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [formMode, setFormMode] = useState("add");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Derived values
  const foodsPerPage = 10;


  // Filtering logic for foods
  const filteredFoods = foods.filter((food) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (food.name && food.name.toLowerCase().includes(searchLower)) ||
      (food.description &&
        food.description.toLowerCase().includes(searchLower)) ||
      (food.category && food.category.toLowerCase().includes(searchLower)) ||
      (food.restaurant &&
        food.restaurant.name &&
        food.restaurant.name.toLowerCase().includes(searchLower))
    );
  });

  // Sorting implementation for foods
  const sortedFoods = React.useMemo(() => {
    let sortableFoods = [...filteredFoods];
    if (sortConfig.key) {
      sortableFoods.sort((a, b) => {
        let aValue, bValue;

        // Special handling for restaurant name which is nested
        if (sortConfig.key === "restaurant") {
          aValue = (a.restaurant && a.restaurant.name) || "";
          bValue = (b.restaurant && b.restaurant.name) || "";
        } else {
          aValue = a[sortConfig.key] || "";
          bValue = b[sortConfig.key] || "";
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableFoods;
  }, [filteredFoods, sortConfig]);

  // Pagination logic for foods
  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = sortedFoods.slice(indexOfFirstFood, indexOfLastFood);
  const totalPages = Math.ceil(sortedFoods.length / foodsPerPage);

  // Page navigation
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Sorting indicator component
  const SortIndicator = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return (
      <span className="ml-1">
        {sortConfig.direction === "ascending" ? "↑" : "↓"}
      </span>
    );
  };

  // Open the add food form
  const handleAddFood = () => {
    setSelectedFood(null);
    setFormMode("add");
    setIsFoodFormOpen(true);
  };

  // Open the edit food form
  const handleEditFood = (food) => {
    setSelectedFood(food);
    setFormMode("edit");
    setIsFoodFormOpen(true);
  };

  // Open the delete confirmation dialog
  const handleDeleteClick = (food) => {
    setSelectedFood(food);
    setIsDeleteDialogOpen(true);
  };

  // Submit handler for creating/updating foods
  const handleFoodSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      // Ensure we're sending the correct data structure that the API expects
      const apiData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price), // Ensure price is a number
        category: formData.category,
        restaurant: formData.restaurant, // This is the restaurant ID
        restaurantId: formData.restaurant, // Add this as backup for compatibility
        available: formData.available,
        image: formData.image || ""
      };
      
      if (formMode === "add") {
        // Create new food item
        await axios.post(
          "http://localhost:3000/api/food-items", 
          apiData, 
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      } else {
        // Update existing food item
        await axios.put(
          `http://localhost:3000/api/food-items/${selectedFood._id}`,
          apiData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      }

      // Refresh the foods list
      if (refreshData) {
        refreshData();
      }
    } catch (error) {
      console.error("Error submitting food item:", error);
      console.error("Error details:", error.response?.data);
      throw error; // Re-throw to let the form component handle it
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete food handler
  const handleDeleteFood = async () => {
    if (!selectedFood) return;

    setIsDeleting(true);
    try {
      await axios.delete(
        `http://localhost:3000/api/food-items/${selectedFood._id}`
      );

      // Refresh the foods list
      if (refreshData) {
        refreshData();
      }

      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting food item:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle availability toggle
  const handleToggleAvailability = async (food) => {
    try {
      await axios.put(`http://localhost:3000/api/food-items/${food._id}`, {
        ...food,
        available: !food.available,
      });

      // Refresh the foods list
      if (refreshData) {
        refreshData();
      }
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  if (loading) return <div className="p-4">Loading foods data...</div>;

  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-800">
        <p className="font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleAddFood} className="flex items-center gap-1">
          <PlusCircle size={16} /> Add Food Item
        </Button>
      </div>

      {/* Food Search and Filters */}
      <div className="mb-4 flex justify-between items-center">
        <div className="w-full max-w-sm">
          <Input
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="mb-4"
          />
        </div>
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstFood + 1}-
          {Math.min(indexOfLastFood, sortedFoods.length)} of{" "}
          {sortedFoods.length} foods
        </div>
      </div>

      {/* Foods Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("name")}
              >
                Name <SortIndicator columnKey="name" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("restaurant")}
              >
                Restaurant <SortIndicator columnKey="restaurant" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("category")}
              >
                Category <SortIndicator columnKey="category" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("price")}
              >
                Price <SortIndicator columnKey="price" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("available")}
              >
                Available <SortIndicator columnKey="available" />
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentFoods.length > 0 ? (
              currentFoods.map((food) => (
                <TableRow key={food._id}>
                  <TableCell className="font-medium">
                    {food._id && food._id.substring(0, 8)}
                  </TableCell>
                  <TableCell>{food.name || "-"}</TableCell>
                  <TableCell>
                    {food.restaurant && typeof food.restaurant === 'object' 
                      ? food.restaurant.name 
                      : food.restaurantName || "Restaurant data missing"}
                  </TableCell>
                  <TableCell>
                    {food.category
                      ? food.category.charAt(0).toUpperCase() +
                        food.category.slice(1)
                      : "-"}
                  </TableCell>
                  <TableCell>${Number(food.price).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-2 py-1 rounded-full text-xs ${
                        food.available
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                      onClick={() => handleToggleAvailability(food)}
                    >
                      {food.available ? "Available" : "Not Available"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditFood(food)}
                        title="Edit food item"
                      >
                        <Pencil size={16} className="text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(food)}
                        title="Delete food item"
                      >
                        <Trash size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No food items found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>
                <div className="flex items-center justify-between">
                  <div>Total Food Items: {sortedFoods.length}</div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevPage}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm">
                      Page {currentPage} of {totalPages || 1}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextPage}
                      disabled={currentPage === totalPages || totalPages === 0}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Food Item Form Dialog */}
      <FoodItemForm
        isOpen={isFoodFormOpen}
        onClose={() => setIsFoodFormOpen(false)}
        foodItem={selectedFood}
        onSubmit={handleFoodSubmit}
        mode={formMode}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmation
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteFood}
        title="Delete Food Item"
        description={`Are you sure you want to delete the food item "${selectedFood?.name}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default FoodItemsTable;
