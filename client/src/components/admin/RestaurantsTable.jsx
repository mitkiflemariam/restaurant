import React, { useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DeleteConfirmation from "./DeleteConfirmation";
import RestaurantForm from "./RestaurantForm";
import { PlusCircle, Pencil, Trash } from "lucide-react";

const RestaurantsTable = ({
  restaurants,
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
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const itemsPerPage = 10; // Match food items per page

  // Filter restaurants by search term
  const filteredRestaurants = restaurants.filter((restaurant) => {
    const name = restaurant.name?.toLowerCase() || "";
    const location = restaurant.location?.toLowerCase() || "";

    return (
      name.includes(searchTerm.toLowerCase()) ||
      location.includes(searchTerm.toLowerCase())
    );
  });

  // Sort restaurants (matching FoodItemsTable's memoization approach)
  const sortedRestaurants = React.useMemo(() => {
    let sortableRestaurants = [...filteredRestaurants];
    if (sortConfig.key) {
      sortableRestaurants.sort((a, b) => {
        const keyA = a[sortConfig.key] || "";
        const keyB = b[sortConfig.key] || "";

        if (keyA < keyB) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (keyA > keyB) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableRestaurants;
  }, [filteredRestaurants, sortConfig]);

  // Paginate restaurants
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedRestaurants.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(sortedRestaurants.length / itemsPerPage);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // CRUD operations
  const handleAddRestaurant = async (restaurantData) => {
    try {
      await axios.post("http://localhost:3000/api/restaurants", restaurantData);
      refreshData();
      return true;
    } catch (error) {
      console.error("Error adding restaurant:", error);
      throw error;
    }
  };

  const handleEditRestaurant = async (restaurantData) => {
    try {
      await axios.put(
        `http://localhost:3000/api/restaurants/${selectedRestaurant._id}`,
        restaurantData
      );
      refreshData();
      return true;
    } catch (error) {
      console.error("Error updating restaurant:", error);
      throw error;
    }
  };

  const handleDeleteRestaurant = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(
        `http://localhost:3000/api/restaurants/${selectedRestaurant._id}`
      );
      setIsDeleteDialogOpen(false);
      refreshData();
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      alert("Error deleting restaurant: " + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Form handlers
  const openAddForm = () => {
    setIsAddFormOpen(true);
  };

  const openEditForm = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsEditFormOpen(true);
  };

  const openDeleteDialog = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsDeleteDialogOpen(true);
  };

  // Add a sort indicator component to match FoodItemsTable
  const SortIndicator = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return (
      <span className="ml-1">
        {sortConfig.direction === "ascending" ? "↑" : "↓"}
      </span>
    );
  };

  if (loading) {
    return <div className="p-4">Loading restaurants data...</div>;
  }

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
        <Button onClick={openAddForm} className="flex items-center gap-1">
          <PlusCircle size={16} /> Add Restaurant
        </Button>
      </div>

      {/* Restaurant Search and Filters */}
      <div className="mb-4 flex justify-between items-center">
        <div className="w-full max-w-sm">
          <Input
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="mb-4"
          />
        </div>
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, sortedRestaurants.length)} of{" "}
          {sortedRestaurants.length} restaurants
        </div>
      </div>

      {/* Restaurants Table */}
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
                onClick={() => requestSort("location")}
              >
                Location <SortIndicator columnKey="location" />
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-gray-500"
                >
                  No restaurants found
                </TableCell>
              </TableRow>
            ) : (
              currentItems.map((restaurant) => (
                <TableRow key={restaurant._id}>
                  <TableCell className="font-medium">
                    {restaurant._id && restaurant._id.substring(0, 8)}
                  </TableCell>
                  <TableCell>{restaurant.name || "-"}</TableCell>
                  <TableCell>{restaurant.location || "-"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditForm(restaurant)}
                        title="Edit restaurant"
                      >
                        <Pencil size={16} className="text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(restaurant)}
                        title="Delete restaurant"
                      >
                        <Trash size={16} className="text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <div className="flex items-center justify-between">
                  <div>Total Restaurants: {sortedRestaurants.length}</div>
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

      {/* Forms and Dialogs */}
      <RestaurantForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSubmit={handleAddRestaurant}
        mode="add"
      />

      <RestaurantForm
        isOpen={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        restaurant={selectedRestaurant}
        onSubmit={handleEditRestaurant}
        mode="edit"
      />

      <DeleteConfirmation
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteRestaurant}
        title="Delete Restaurant"
        description={`Are you sure you want to delete the restaurant "${selectedRestaurant?.name}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default RestaurantsTable;
