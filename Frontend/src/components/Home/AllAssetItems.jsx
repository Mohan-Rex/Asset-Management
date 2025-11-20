import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddAssetItemModal from "../AssetItemEditModal";

function AllAssetItems() {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [isModalOpen, setIsModalOpen]= useState(false)
  const [editItem, setEditItem]=useState(null)

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

      setModel(response.data.data);

    } catch (error) {
      console.log(error);
    }
  }

  if (!model) {
    return <div className="p-6">Loading...</div>;
  }


  async function handleDelete(itemId) {

    try {
        await axios.delete(
            "http://localhost:8000/api/v1/asset-items/delete",
            {
                data: { id: itemId },      //  axios DELETE must send body inside `data`
                withCredentials: true
            }
        );

        alert("Item deleted");
        fetchAllItems();

    } catch (error) {
        console.log(error);
        alert("Delete failed");
    }
}

  return (
    <div className="p-6">
      
      {/*  BUTTON MOVED TO THE TOP LEFT CORNER  */}
      <div className=" flex justify-end mb-4"> {/* Added mb-4 for spacing below the button */}
        <button className="text-md text-white hover:bg-white hover:text-blue-500 bg--500 py-2 px-2 rounded-sm border border-blue-400" 
        onClick={()=>{
          setEditItem(null)
          setIsModalOpen(true)}}>
          Add  Items 
        </button>
      </div>

      {/* MODEL HEADER */}
      <div className="bg-green-600 text-white p-5 rounded-lg shadow-md mb-6">
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
            <p><strong>Price:</strong> ₹ {item.purchaseCost || "—"}</p>
            <p><strong>Purchase:</strong> {new Date(item.purchaseDate).toLocaleDateString()}</p>

            <div className="flex gap-3 mt-4">
              <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              onClick={()=>{
                setEditItem(item);
                setIsModalOpen(true)
              }}>
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(item._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (<AddAssetItemModal
      handleClose={()=>{
        setIsModalOpen(false)
        setEditItem(null) 
      }
      }
      modelId={id}
      refreshItems={fetchAllItems}
      editItem={editItem}/>)} 
    </div>
  );
}

export default AllAssetItems;