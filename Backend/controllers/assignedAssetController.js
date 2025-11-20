import AssetItem from "../models/AssetItem.js";
import AssignedAsset from "../models/AssignedAsset.js";
import User from "../models/User.js";


export const addAssignedAsset = async (req, res) => {
    try {
        if (req.body) {
            const { assetItem, assignedTo } = req.body;
            let assignedBy = req.user._id; //admin or superadmin id
            console.log(assignedBy);
            if (!assetItem && !assignedTo) {
                res.status(400).send({ message: "please provide data for all fields" });
            } else 
               
             {

                const isItem = await AssetItem.findById(assetItem);
                const isUser = await User.findById(assignedTo);
                console.log(isUser)
                if (isItem && isUser) {
                    if (isItem.status.value == "available") {


                        const assetDetails = new AssignedAsset({ ...req.body ,assignedBy});
                        await assetDetails.save();
                        isItem.status.value = "assigned";
                        await isItem.save();
                        return res.status(201).send({ message: "asset Created" });
                    }
                    else {
                        return res.status(400).send({ message: "Item is not available" });
                    }
                }
            }
        } else {
            res.status(400).send({ message: "data is mandetory" });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Something went worng",
            error: error.message,
        });
    }
};

export const getAllAssignedAssets = async(req,res)=>{
    try {
        const getAllAssignedAssets= await AssignedAsset.find()
        .populate("assignedTo")
        .populate("assetItem")
        .populate("assignedBy")
        .populate({
            path:"assetItem",
            populate:{
                path:"model",
                model:"AssetModel"
            }
        })
        return res.status(200).send(getAllAssignedAssets)
    } catch (error) {
         return res.status(500).send({
            message: "Something went worng",
            error: error.message
    })
}
}

export const getMyAssignedAssets = async (req,res) => {
    try {
        const id = req.user._id 
        const myAssets = await AssignedAsset.find({assignedTo:id})
        .populate("assetItem")
        .populate("assignedBy")
        .populate({
            path:"assetItem",
            populate:{
                path:"model",
                model:"AssetModel"
            }
        })
        return res.status(200).send(myAssets)

    } catch (error) {
          return res.status(500).send({
            message: "Something went worng",
            error: error.message
    })
    }
}