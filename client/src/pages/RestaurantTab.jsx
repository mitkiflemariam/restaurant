// frontend/src/components/RestaurantTab.js
// import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import axios from "axios";

// function RestaurantTab({ restaurants, role }) {
function RestaurantTab() {
  const API_URI = "http://localhost:3000/api/restaurants";
  // State to manage the list of restaurants
  const [restaurants, setRestaurants] = useState([]);
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to manage form inputs
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    location: "",
    rating: "",
  });

  // State to manage loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch restaurants when the component mounts
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError(null);
      try {
        // const response = await axios.get("/api/restaurants");
        const response = await axios.get(`${API_URI}`);
        setRestaurants(response.data);
      } catch (err) {
        setError("Failed to fetch restaurants. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle form submission (add a new restaurant)
  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    // Validate inputs (basic validation)
    if (
      !newRestaurant.name ||
      !newRestaurant.location ||
      !newRestaurant.rating
    ) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Send a POST request to the backend to add the new restaurant
      const response = await axios.post(`${API_URI}`, {
        name: newRestaurant.name,
        location: newRestaurant.location,
        rating: parseFloat(newRestaurant.rating), // Convert rating to a number
      });

      // Add the new restaurant (returned from the backend) to the list
      setRestaurants((prev) => [...prev, response.data]);

      // Reset the form and close the modal
      setNewRestaurant({ name: "", location: "", rating: "" });
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to add restaurant. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // // Function to handle deleting a restaurant (placeholder for future implementation)
  // const handleDeleteRestaurant = async (id) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     await axios.delete(`http://localhost:3000/api/restaurants/${id}`);
  //     setRestaurants((prev) =>
  //       prev.filter((restaurant) => restaurant.id !== id)
  //     );
  //   } catch (err) {
  //     setError("Failed to delete restaurant. Please try again.");
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleDeleteRestaurant = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${API_URI}/${id}`);
      setRestaurants((prev) =>
        prev.filter((restaurant) => restaurant.id !== id)
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete restaurant");
      // console.error("Delete error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Render loading state
  if (loading && restaurants.length === 0) {
    return <div>Loading...</div>;
  }

  // // Render error state
  // if (error && restaurants.length === 0) {
  //   return <div>{error}</div>;
  // }

  //   if (role !== "owner") return null;
  if (!Array.isArray(restaurants)) {
    return <div>No restaurant available</div>;
  }

  return (
    <div>
      {/* Restaurant Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Restaurants</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {restaurants.length === 0 && !loading && !error && (
          <div>No restaurants available</div>
        )}
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr key={restaurant._id || restaurant.id}>
                <td className="p-2">{restaurant.name}</td>
                <td className="p-2">{restaurant.location}</td>
                <td className="p-2">
                  <button aria-label="Edit">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button aria-label="Delete">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() =>
                        handleDeleteRestaurant(restaurant._id || restaurant.id)
                      }
                      disabled={loading}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 bg-black text-white rounded"
          disabled={loading}
        >
          Add Restaurant
        </button>
      </div>

      {/* Modal for Adding a Restaurant */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Restaurant</h2>
            <form onSubmit={handleAddRestaurant}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newRestaurant.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={newRestaurant.location}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={newRestaurant.rating}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  step="0.1"
                  min="0"
                  max="5"
                  required
                  disabled={loading}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded mr-2"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
// PropTypes validation
RestaurantTab.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      rating: PropTypes.number, // Rating is optional in the table but required in the form
    })
  ).isRequired,
};
export default RestaurantTab;
