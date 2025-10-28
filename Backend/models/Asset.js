import mongoose from "mongoose";

const assetModelSchema = new mongoose.Schema({
    name: {type: String, required:true},
    category:{type: String, required: true},
    manufacturer: { type: String},
    depreciationMethod : {
        type: String,
        enum:["straight_line","reducing_balance"],
        default:"straight_line"
    },
    usefulLifeYears:{type: Number,default:3},
    description:{type: String},
},{timestamps:true})

const AssetModel =mongoose.model("AssetModel",assetModelSchema)

export default AssetModel;