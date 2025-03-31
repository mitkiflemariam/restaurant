// frontend/src/components/RestaurantTab.js
// import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
// function RestaurantTab({ restaurants, role }) {
function RestaurantTab({ restaurants: initialRestaurants }) {
  // State to manage the list of restaurants
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to manage form inputs
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    location: "",
    rating: "",
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleAddRestaurant = (e) => {
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

    // Create a new restaurant object
    const restaurant = {
      name: newRestaurant.name,
      location: newRestaurant.location,
      rating: parseFloat(newRestaurant.rating), // Convert rating to a number
    };

    // Add the new restaurant to the list
    setRestaurants((prev) => [...prev, restaurant]);

    // Reset the form and close the modal
    setNewRestaurant({ name: "", location: "", rating: "" });
    setIsModalOpen(false);
  };

  //   if (role !== "owner") return null;
  if (!Array.isArray(restaurants)) {
    return <div>No restaurant available</div>;
  }

  return (
    <div>
      {/* Restaurant Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Restaurants</h2>
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
              <tr key={restaurant.id}>
                <td className="p-2">{restaurant.name}</td>
                <td className="p-2">{restaurant.location}</td>
                <td className="p-2">
                  <button aria-label="Edit">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button aria-label="Delete">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 bg-black text-white rounded"
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
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RestaurantTab;
