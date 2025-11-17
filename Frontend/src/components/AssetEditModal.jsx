import axios from "axios";
import { useState } from "react";

function AssetEditModal({ handleModalClose, editAsset }) {
  const isEdit = Object.keys(editAsset).length > 0; // edit mode or add mode
  const [assetDetails, setAssetDetails] = useState(
    isEdit
      ? editAsset
      : {
          name: "",
          category: "",
          manufacturer: "",
          depreciationMethod: "straight_line",
          usefulLifeYears: 3,
          description: "",
        }
  );

  function onChangeHandler(event) {
    const { name, value } = event.target;
    setAssetDetails({ ...assetDetails, [name]: value });
  }

  async function saveChanges(event) {
    event.preventDefault();
    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:8000/api/v1/asset-model/edit/${assetDetails._id}`,
          assetDetails,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          "http://localhost:8000/api/v1/asset-model/add",
          assetDetails,
          { withCredentials: true }
        );
      }
      handleModalClose();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
       {/* Asset Edit Modal  */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-2xl max-h-full">
          <form
            className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700"
            onSubmit={saveChanges}
          >
            {/* <!-- Modal Header --> */}
            <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isEdit ? "Edit Asset Model" : "Add New Asset Model"}
              </h3>
              <button
                onClick={handleModalClose}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            {/* <!-- Modal Body --> */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-6 gap-6">
                {/* Name */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Asset Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    value={assetDetails.name}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Category */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    required
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    value={assetDetails.category}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Manufacturer */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="manufacturer"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Manufacturer
                  </label>
                  <input
                    type="text"
                    name="manufacturer"
                    id="manufacturer"
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    value={assetDetails.manufacturer}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Depreciation Method */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="depreciationMethod"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Depreciation Method
                  </label>
                  <select
                    name="depreciationMethod"
                    id="depreciationMethod"
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    value={assetDetails.depreciationMethod}
                    onChange={onChangeHandler}
                  >
                    <option value="straight_line">Straight Line</option>
                    <option value="reducing_balance">Reducing Balance</option>
                  </select>
                </div>

                {/* Useful Life (Years) */}
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="usefulLifeYears"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Useful Life (Years)
                  </label>
                  <input
                    type="number"
                    name="usefulLifeYears"
                    id="usefulLifeYears"
                    min="1"
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    value={assetDetails.usefulLifeYears}
                    onChange={onChangeHandler}
                  />
                </div>

                {/* Description */}
                <div className="col-span-6">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows="3"
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                    value={assetDetails.description}
                    onChange={onChangeHandler}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* <!-- Modal Footer --> */}
            <div className="flex items-center p-6 space-x-3 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                {isEdit ? "Save Changes" : "Add Asset Model"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AssetEditModal;
