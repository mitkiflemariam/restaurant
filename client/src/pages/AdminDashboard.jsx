import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import UsersTable from "../components/admin/UsersTable";
import FoodItemsTable from "../components/admin/FoodItemsTable";
import RestaurantsTable from "../components/admin/RestaurantsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserIcon, Utensils, Store } from "lucide-react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [foodsLoading, setFoodsLoading] = useState(true);
  const [restaurantsLoading, setRestaurantsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [foodsError, setFoodsError] = useState(null);
  const [restaurantsError, setRestaurantsError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [foodSearchTerm, setFoodSearchTerm] = useState("");
  const [restaurantSearchTerm, setRestaurantSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [foodCurrentPage, setFoodCurrentPage] = useState(1);
  const [restaurantCurrentPage, setRestaurantCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [foodSortConfig, setFoodSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [restaurantSortConfig, setRestaurantSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [activeTab, setActiveTab] = useState("users");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/users");

      // Ensure users is always an array
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else if (response.data && Array.isArray(response.data.users)) {
        setUsers(response.data.users);
      } else if (response.data && typeof response.data === "object") {
        // Try to convert object of users to array if API returns object format
        const usersArray = Object.values(response.data);
        if (usersArray.length > 0 && typeof usersArray[0] === "object") {
          setUsers(usersArray);
        } else {
          setUsers([]);
        }
      } else {
        setUsers([]);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(
        "Error fetching users: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchFoods = async () => {
    setFoodsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/food-items");

      // Extract food items from response
      let foodItems = [];

      if (Array.isArray(response.data)) {
        foodItems = response.data;
      } else if (response.data && Array.isArray(response.data.foods)) {
        foodItems = response.data.foods;
      } else if (response.data && typeof response.data === "object") {
        const foodsArray = Object.values(response.data);
        if (foodsArray.length > 0 && typeof foodsArray[0] === "object") {
          foodItems = foodsArray;
        }
      }

      const processedFoods = await Promise.all(
        foodItems.map(async (food) => {
          // If restaurant is already populated correctly, return as is
          if (
            food.restaurant &&
            typeof food.restaurant === "object" &&
            food.restaurant.name
          ) {
            return food;
          }

          // If restaurant is just an ID, fetch restaurant data
          if (food.restaurant && typeof food.restaurant === "string") {
            try {
              const restaurantRes = await axios.get(
                `http://localhost:3000/api/restaurants/${food.restaurant}`
              );
              return {
                ...food,
                restaurantName: restaurantRes.data?.name || "Unknown",
                restaurantId: food.restaurant,
              };
            } catch (err) {
              return {
                ...food,
                restaurantName: "Unknown",
              };
            }
          }

          return food;
        })
      );

      setFoods(processedFoods);

      setFoodsError(null);
    } catch (err) {
      console.error("Error fetching foods:", err);
      setFoodsError(
        "Error fetching foods: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setFoodsLoading(false);
    }
  };

  const fetchRestaurants = async () => {
    setRestaurantsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/restaurants");

      // Handle the restaurant data
      if (Array.isArray(response.data)) {
        setRestaurants(response.data);
      } else if (response.data && Array.isArray(response.data.restaurants)) {
        setRestaurants(response.data.restaurants);
      } else if (response.data && typeof response.data === "object") {
        const restaurantsArray = Object.values(response.data);
        if (
          restaurantsArray.length > 0 &&
          typeof restaurantsArray[0] === "object"
        ) {
          setRestaurants(restaurantsArray);
        } else {
          setRestaurants([]);
        }
      } else {
        setRestaurants([]);
      }

      setRestaurantsError(null);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setRestaurantsError(
        "Error fetching restaurants: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setRestaurantsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data for all tabs on initial load
    fetchUsers();
    fetchFoods();
    fetchRestaurants();
  }, []);

  // Sorting logic for users
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Sorting logic for foods
  const requestFoodSort = (key) => {
    let direction = "ascending";
    if (
      foodSortConfig.key === key &&
      foodSortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setFoodSortConfig({ key, direction });
  };

  // Sorting logic for restaurants
  const requestRestaurantSort = (key) => {
    let direction = "ascending";
    if (
      restaurantSortConfig.key === key &&
      restaurantSortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setRestaurantSortConfig({ key, direction });
  };

  // Tab change handler
  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  if (loading && foodsLoading && restaurantsLoading)
    return <div className="p-4">Loading data...</div>;

  if (error && foodsError && restaurantsError) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <div className="p-4 border border-red-300 bg-red-50 rounded-md text-red-800">
          <p className="font-semibold">Error: {error}</p>
          <p className="font-semibold">Food Error: {foodsError}</p>
          <p className="font-semibold">Restaurant Error: {restaurantsError}</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="container mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs
        defaultValue="users"
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <UserIcon size={16} /> Customers
          </TabsTrigger>
          <TabsTrigger value="restaurants" className="flex items-center gap-2">
            <Store size={16} /> Restaurants
          </TabsTrigger>
          <TabsTrigger value="foods" className="flex items-center gap-2">
            <Utensils size={16} /> Food Items
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-0">
          <UsersTable
            users={users}
            loading={loading}
            error={error}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            sortConfig={sortConfig}
            requestSort={requestSort}
            refreshData={fetchUsers}
          />
        </TabsContent>

        <TabsContent value="restaurants" className="mt-0">
          <RestaurantsTable
            restaurants={restaurants}
            loading={restaurantsLoading}
            error={restaurantsError}
            searchTerm={restaurantSearchTerm}
            setSearchTerm={setRestaurantSearchTerm}
            currentPage={restaurantCurrentPage}
            setCurrentPage={setRestaurantCurrentPage}
            sortConfig={restaurantSortConfig}
            requestSort={requestRestaurantSort}
            refreshData={fetchRestaurants}
          />
        </TabsContent>

        <TabsContent value="foods" className="mt-0">
          <FoodItemsTable
            foods={foods}
            loading={foodsLoading}
            error={foodsError}
            searchTerm={foodSearchTerm}
            setSearchTerm={setFoodSearchTerm}
            currentPage={foodCurrentPage}
            setCurrentPage={setFoodCurrentPage}
            sortConfig={foodSortConfig}
            requestSort={requestFoodSort}
            refreshData={fetchFoods}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AdminDashboard;
