// frontend/src/components/RestaurantTab.js
// import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
// function RestaurantTab({ restaurants, role }) {
function RestaurantTab({ restaurants }) {
  //   if (role !== "owner") return null;
  if (!Array.isArray(restaurants)) {
    return <div>No restaurant available</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Restaurants</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            {/* <th className="p-2 text-left">ID</th> */}
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Action</th>
            {/* <th className="p-2 text-left">Rating</th> */}
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={restaurant._id} className="border-b">
              {/* <td className="p-2">{restaurant.id}</td> */}
              <td className="p-2">{restaurant.name}</td>
              <td className="p-2">{restaurant.location}</td>
              {/* <td className="p-2">{restaurant.rating}</td> */}
              <button aria-label="Edit">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button aria-label="Delete">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="px-4 py-2 mr-2 rounded bg-black text-white">
        Add Restaurant
      </button>
    </div>
  );
}

export default RestaurantTab;
