import React, { useEffect, useState } from "react";
import AdminEditModal from "../AdminEditModal";
import axios from "axios";
import toast from "react-hot-toast";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState({});

  // ✅ Fetch Admins
  const fetchAdmins = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/admins", // change this endpoint
        { withCredentials: true }
      );
      setAdmins(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch admins");
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      fetchAdmins();
    }
  }, [isModalOpen]);

  // ✅ Modal controls
  const handleModalOpen = (admin) => {
    setEditAdmin(admin);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setEditAdmin({});
    setIsModalOpen(false);
  };

  // ✅ Delete Admin
  const handleDelete = async (id) => {
    try {
      toast.loading("Deleting...", { id: "delete" });
      await axios.delete("http://localhost:8000/api/v1/user/delete/admin", {
        headers: { userid: id },
        withCredentials: true,
      });
      setAdmins((a) => a.filter((ad) => ad._id !== id));
      toast.success("Deleted successfully", { id: "delete" });
    } catch (error) {
      console.error("Error deleting admin:", error);
      toast.error("Failed to delete", { id: "delete" });
    }
  };

  const addAdminModal = () => {
    setEditAdmin({});
    setIsModalOpen(true);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search for admins"
          />
        </div>

        <div>
          <button
            className="text-md text-white hover:bg-white hover:text-blue-500 bg-blue-500 py-2 px-2 rounded-sm border border-blue-400"
            onClick={addAdminModal}
          >
            Add Admin
          </button>
        </div>
      </div>

      {/* ✅ Admin Table */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((admin) => (
            <tr
              key={admin._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <th className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="ps-3">
                  <div className="text-base font-semibold">{admin.name}</div>
                  <div className="font-normal text-gray-500">{admin.email}</div>
                </div>
              </th>

              <td className="px-6 py-4">{admin.email}</td>
              <td className="px-6 py-4">{admin.role}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                  Active
                </div>
              </td>

              <td className="px-6 py-4 flex w-full justify-start gap-4">
                <button
                  className="text-md text-white hover:underline bg-blue-500 py-2 px-2 rounded-full"
                  onClick={() => handleModalOpen(admin)}
                >
                  Edit
                </button>

                <button
                  className="text-md text-white hover:underline bg-red-500 py-2 px-2 rounded-full"
                  onClick={() => handleDelete(admin._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <AdminEditModal
          handleModalClose={handleModalClose}
          editAdmin={editAdmin}
        />
      )}
    </div>
  );
};

export default Admins;
