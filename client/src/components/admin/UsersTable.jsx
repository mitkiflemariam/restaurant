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
import { PlusCircle, Pencil, Trash } from "lucide-react";
import axios from "axios";
import UserForm from "./UserForm";
import DeleteConfirmation from "./DeleteConfirmation";

const UsersTable = ({
  users,
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
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formMode, setFormMode] = useState("add");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Derived values
  const usersPerPage = 10;

  // Filtering logic for users
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (user.firstname && user.firstname.toLowerCase().includes(searchLower)) ||
      (user.lastname && user.lastname.toLowerCase().includes(searchLower)) ||
      (user.username && user.username.toLowerCase().includes(searchLower)) ||
      (user.email && user.email.toLowerCase().includes(searchLower)) ||
      (user.role && user.role.toLowerCase().includes(searchLower))
    );
  });

  // Sorting implementation for users
  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...filteredUsers];
    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        const aValue = a[sortConfig.key] || "";
        const bValue = b[sortConfig.key] || "";

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [filteredUsers, sortConfig]);

  // Pagination logic for users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

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

  // Open the add user form
  const handleAddUser = () => {
    setSelectedUser(null);
    setFormMode("add");
    setIsUserFormOpen(true);
  };

  // Open the edit user form
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormMode("edit");
    setIsUserFormOpen(true);
  };

  // Open the delete confirmation dialog
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  // Submit handler for creating/updating users
  const handleUserSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (formMode === "add") {
        // Create new user
        await axios.post("http://localhost:3000/api/users/register", formData);
      } else {
        // Update existing user
        await axios.put(
          `http://localhost:3000/api/users/${selectedUser._id}`,
          formData
        );
      }

      // Refresh the users list
      if (refreshData) {
        refreshData();
      }
    } catch (error) {
      console.error("Error submitting user:", error);
      throw error; // Re-throw to let the form component handle it
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete user handler
  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:3000/api/users/${selectedUser._id}`);

      // Refresh the users list
      if (refreshData) {
        refreshData();
      }

      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <div className="p-4">Loading users data...</div>;

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
        <Button onClick={handleAddUser} className="flex items-center gap-1">
          <PlusCircle size={16} /> Add User
        </Button>
      </div>

      {/* User Search and Filters */}
      <div className="mb-4 flex justify-between items-center">
        <div className="w-full max-w-sm">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="mb-4"
          />
        </div>
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstUser + 1}-
          {Math.min(indexOfLastUser, sortedUsers.length)} of{" "}
          {sortedUsers.length} users
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-md border mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("firstname")}
              >
                First Name <SortIndicator columnKey="firstname" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("lastname")}
              >
                Last Name <SortIndicator columnKey="lastname" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("username")}
              >
                Username <SortIndicator columnKey="username" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("email")}
              >
                Email <SortIndicator columnKey="email" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => requestSort("role")}
              >
                Role <SortIndicator columnKey="role" />
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">
                    {user._id.substring(0, 8)}
                  </TableCell>
                  <TableCell>{user.firstname || "-"}</TableCell>
                  <TableCell>{user.lastname || "-"}</TableCell>
                  <TableCell>{user.username || "-"}</TableCell>
                  <TableCell>{user.email || "-"}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role || "User"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditUser(user)}
                        title="Edit user"
                      >
                        <Pencil size={16} className="text-blue-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(user)}
                        title="Delete user"
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
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>
                <div className="flex items-center justify-between">
                  <div>Total Users: {sortedUsers.length}</div>
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

      {/* User Form Dialog */}
      <UserForm
        isOpen={isUserFormOpen}
        onClose={() => setIsUserFormOpen(false)}
        user={selectedUser}
        onSubmit={handleUserSubmit}
        mode={formMode}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmation
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteUser}
        title="Delete User"
        description={`Are you sure you want to delete the user "${selectedUser?.username}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default UsersTable;
