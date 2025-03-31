// frontend/src/components/CustomerTab.js
// import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import axios from "axios";

// function CustomerTab({ customers, role }) {
function CustomerTab() {
  const API_URI = "http://localhost:3000/api/users";
  // State to manage the list of customers
  const [customers, setCustomers] = useState([]);
  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to manage form inputs
  const [newCustomer, setNewCustomer] = useState({
    firstname: "",
    email: "",
    password: "",
  });

  // State to manage loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch customers when the component mounts
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        // const response = await axios.get("/api/customers");
        const response = await axios.get(`${API_URI}`);
        setCustomers(response.data);
      } catch (err) {
        setError("Failed to fetch customers. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []); // Empty dependency array means this runs once on mount

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle form submission (add a new Customer)
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    // Validate inputs (basic validation)
    if (!newCustomer.firstname || !newCustomer.email || !newCustomer.password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Send a POST request to the backend to add the new Customer
      const response = await axios.post(`${API_URI}/register`, {
        firstname: newCustomer.firstname,
        email: newCustomer.email,
        password: newCustomer.password, // Convert rating to a number
      });

      console.log(response);
      // Add the new Customer (returned from the backend) to the list
      setCustomers((prev) => [...prev, response.data]);

      // Reset the form and close the modal
      setNewCustomer({ firstname: "", email: "", password: "" });
      setIsModalOpen(false);
    } catch (err) {
      setError("Failed to add Customer. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = async (id) => {
    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${API_URI}/${id}`);
      setCustomers((prev) => prev.filter((Customer) => Customer.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete Customer");
      // console.error("Delete error:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Render loading state
  if (loading && customers.length === 0) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(customers)) {
    return <div>No Customer available</div>;
  }

  return (
    <div>
      {/* Customer Table */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Customers</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {customers.length === 0 && !loading && !error && (
          <div>No customers available</div>
        )}
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">First Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Orders</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((Customer) => (
              <tr key={Customer._id || Customer.id}>
                <td className="p-2">{Customer.firstname}</td>
                <td className="p-2">{Customer.email}</td>
                <td className="p-2">{Customer.orders}</td>
                <td className="p-2">
                  <button aria-label="Edit">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button aria-label="Delete">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() =>
                        handleDeleteCustomer(Customer._id || Customer.id)
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
          Add Customer
        </button>
      </div>

      {/* Modal for Adding a Customer */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add Customer</h2>
            <form onSubmit={handleAddCustomer}>
              <div className="mb-4">
                <label className="block mb-1">Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={newCustomer.firstname}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                  type="text"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={newCustomer.password}
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
CustomerTab.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      rating: PropTypes.number, // Rating is optional in the table but required in the form
    })
  ).isRequired,
};
export default CustomerTab;

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
// // function CustomerTab({ customers, role }) {
// function CustomerTab({ customers }) {
//   //   if (role !== "customer" && role !== "owner") return null;
//   if (!Array.isArray(customers)) {
//     return <div>No Customer available</div>;
//   }

//   return (
//     <div className="bg-white shadow rounded-lg p-4">
//       <h2 className="text-xl font-semibold mb-4">Customers</h2>
//       <table className="w-full">
//         <thead>
//           <tr className="bg-gray-100">
//             {/* <th className="p-2 text-left">ID</th> */}
//             <th className="p-2 text-left">Name</th>
//             <th className="p-2 text-left">Email</th>
//             <th className="p-2 text-left">Orders</th>
//             <th className="p-2 text-left">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.map((customer) => (
//             <tr key={customer._id} className="border-b">
//               {/* <td className="p-2">{customer.id}</td> */}
//               <td className="p-2">{customer.firstname}</td>
//               <td className="p-2">{customer.email}</td>
//               <td className="p-2">{customer.orders}</td>
//               <button aria-label="Edit">
//                 <FontAwesomeIcon icon={faEdit} />
//               </button>
//               <button aria-label="Delete">
//                 <FontAwesomeIcon icon={faTrash} />
//               </button>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button className="px-4 py-2 mr-2 rounded bg-black text-white">
//         Add Customer
//       </button>
//     </div>
//   );
// }

// export default CustomerTab;
