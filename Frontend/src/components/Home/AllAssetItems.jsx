import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AllAssetItems() {
  const { id } = useParams();
  const [model, setModel] = useState(null); // <-- FIXED

  useEffect(() => {
    fetchAllItems();
  }, []);

  async function fetchAllItems() {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/asset-model/items/${id}`,
        { withCredentials: true }
      );

      console.log("MODEL DATA:", response.data.data);

      // Store ONLY the first object
      setModel(response.data.data);  // <-- FIXED

    } catch (error) {
      console.log(error);
    }
  }

  if (!model) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      {/* MODEL HEADER */}
      <div className="bg-blue-600 text-white p-5 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold">{model.name}</h2>
        <p>Category: {model.category}</p>
        <p>Useful Life: {model.usefulLifeYears} years</p>
        <p>Depreciation: {model.depreciationMethod}</p>
        <p className="mt-2 font-semibold">
          Total Items: {model.items.length}
        </p>
      </div>

      {/* ITEMS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {model.items.length==0 && <h1>No Items Available</h1>}
        {model.items.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg shadow-md bg-white p-5 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Serial: {item.serialNumber}
            </h3>

            <p><strong>Status:</strong> {item.status?.value}</p>
            <p><strong>Condition:</strong> {item.condition}</p>
            <p><strong>Price:</strong> ₹ {item.price || "—"}</p>
            <p><strong>Purchase:</strong> {new Date(item.purchaseDate).toLocaleDateString()}</p>

            <div className="flex gap-3 mt-4">
              <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllAssetItems;
