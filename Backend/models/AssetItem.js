import mongoose from "mongoose";

// Define the schema for a single asset item (like a specific laptop or tool)
const assetItemSchema = new mongoose.Schema({
    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssetModel", 
        required: true
    },

    serialNumber: {
        type: String,
        unique: true, 
        required: true,
    },

    purchaseDate: {
        type: Date, 
        required: true,
    },
    purchaseCost: {
        type: Number,
    },
 location: {
        type: String,
    },
    status: {
        value: {
            type: String,
            enum: ["available", "assigned", "maintenance", "retired"],
            default: "available"
        },
    },
    condition: {
        type: String,
        enum: ["new", "good", "fair", "poor"],
        default: "good",
    },


}, { 
    timestamps: true 
});

// Create and export the Mongoose model
const AssetItem = mongoose.model("AssetItem", assetItemSchema);

export default AssetItem
