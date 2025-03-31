import { useState, useEffect } from "react";
import CustomerTab from "./CustomerTab";
import RestaurantTab from "./RestaurantTab";

// const AdminDashboard = (role) => {
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [customers, setCustomers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch customers
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => setCustomers(data));

    // Fetch restaurants
    fetch("http://localhost:3000/api/restaurants")
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .then((data) => setRestaurants(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${
            activeTab === "customers" ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("customers")}
        >
          Customers
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "restaurants" ? "bg-black text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("restaurants")}
        >
          Restaurants
        </button>
      </div>

      <div>
        {activeTab === "customers" && (
          // <CustomerTab customers={customers} role={role} />
          <CustomerTab customers={customers} />
        )}
        {activeTab === "restaurants" && (
          // <RestaurantTab restaurants={restaurants} role={role} />
          <RestaurantTab restaurants={restaurants} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
