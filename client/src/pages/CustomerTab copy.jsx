import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
// function CustomerTab({ customers, role }) {
function CustomerTab({ customers }) {
  //   if (role !== "customer" && role !== "owner") return null;
  if (!Array.isArray(customers)) {
    return <div>No Customer available</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Customers</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            {/* <th className="p-2 text-left">ID</th> */}
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Orders</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id} className="border-b">
              {/* <td className="p-2">{customer.id}</td> */}
              <td className="p-2">{customer.firstname}</td>
              <td className="p-2">{customer.email}</td>
              <td className="p-2">{customer.orders}</td>
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
        Add Customer
      </button>
    </div>
  );
}

export default CustomerTab;
