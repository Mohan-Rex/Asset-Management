import axios from "axios";
import { useState, useEffect } from "react";

function AddAssetItemModal({ handleClose, modelId, refreshItems, editItem }) {

    const isEditing = !!editItem;

    // ---------------------------
    // PREFILLED FORM FOR EDIT
    // ---------------------------
    const [itemDetails, setItemDetails] = useState({
        serialNumber: "",
        condition: "",
        purchaseCost: "",
        purchaseDate: "",
        status: "available",
    });

    // Prefill when editing
    useEffect(() => {
        if (isEditing && editItem) {
            setItemDetails({
                serialNumber: editItem.serialNumber || "",
                condition: editItem.condition || "",
                purchaseCost: editItem.purchaseCost || "",
                purchaseDate: editItem.purchaseDate
                    ? editItem.purchaseDate.split("T")[0]
                    : "",
                status: editItem.status?.value || "available",
            });
        }
    }, [editItem]);


    // ---------------------------
    // HANDLE INPUT
    // ---------------------------
    function onChangeHandler(event) {
        const { name, value } = event.target;
        setItemDetails({ ...itemDetails, [name]: value });
    }


    // ---------------------------
    // SAVE (ADD or EDIT)
    // ---------------------------
    async function saveItem(event) {
        event.preventDefault();

        try {
            if (isEditing) {
                // EDIT ITEM (PUT)
                await axios.put(
                    "http://localhost:8000/api/v1/asset-items/edit",
                    { id: editItem._id, ...itemDetails },
                    { withCredentials: true }
                );

                alert("Item updated successfully");
            } else {
                // ADD ITEM (POST)
                await axios.post(
                    "http://localhost:8000/api/v1/asset-items/add",
                    { ...itemDetails, model: modelId },
                    { withCredentials: true }
                );

                alert("Item added successfully");
            }

            refreshItems();
            handleClose();

        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }


    return (
        <>
            {/* Add / Edit Modal */}
            <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    <form
                        className="relative bg-white rounded-lg shadow-sm"
                        onSubmit={saveItem}
                    >

                        {/* HEADER */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {isEditing ? "Edit Asset Item" : "Add Asset Item"}
                            </h3>

                            <button
                                onClick={handleClose}
                                type="button"
                                className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                            >
                                ✕
                            </button>
                        </div>


                        {/* BODY */}
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-6 gap-6">

                                {/* Serial Number */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Serial Number</label>
                                    <input
                                        type="text"
                                        name="serialNumber"
                                        required
                                        value={itemDetails.serialNumber}
                                        onChange={onChangeHandler}
                                        className="shadow-xs bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                    />
                                </div>

                                {/* Condition */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Condition</label>
                                    <input
                                        type="text"
                                        name="condition"
                                        required
                                        value={itemDetails.condition}
                                        onChange={onChangeHandler}
                                        className="shadow-xs bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                    />
                                </div>

                                {/* Purchase Cost */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Purchase Cost</label>
                                    <input
                                        type="number"
                                        name="purchaseCost"
                                        value={itemDetails.purchaseCost}
                                        onChange={onChangeHandler}
                                        className="shadow-xs bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                    />
                                </div>

                                {/* Purchase Date */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Purchase Date</label>
                                    <input
                                        type="date"
                                        name="purchaseDate"
                                        required
                                        value={itemDetails.purchaseDate}
                                        onChange={onChangeHandler}
                                        className="shadow-xs bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                    />
                                </div>

                                {/* Status */}
                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block mb-2 text-sm font-medium">Status</label>
                                    <select
                                        name="status"
                                        value={itemDetails.status}
                                        onChange={onChangeHandler}
                                        className="shadow-xs bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                    >
                                        <option value="available">Available</option>
                                        <option value="assigned">Assigned</option>
                                        <option value="damaged">Damaged</option>
                                        <option value="lost">Lost</option>
                                    </select>
                                </div>

                            </div>
                        </div>


                        {/* FOOTER */}
                        <div className="flex items-center p-6 space-x-3 border-t border-gray-200 rounded-b">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                {isEditing ? "Update Item" : "Add Item"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}

export default AddAssetItemModal;
